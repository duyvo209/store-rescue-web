
import React from 'react';
import MaterialTable from 'material-table'
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { db, auth } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const useStyles1 = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '30ch',
      },
    },
  }));  

  function ClassTable() {
    const { useState, useEffect } = React;
    const classes = useStyles1();

    const [columns, setColumns] = useState([
      { title: 'ID', field: 'id', editable: 'never'},
      { title: 'Từ (km)', field: 'from' },
      { title: 'Đến (km)', field: 'to' },
      { title: 'Giá', field: 'price', render: rowData => <p>{rowData.price} VNĐ</p> },

    ]);

    
    const [data, setData] = useState([]);
    const [user, setUser] = React.useState('');
    const [priceService, setPriceService] = useState(0);

    const getData = (uid) => {
      console.log(uid);
      db.collection('store').doc(uid).collection('prices_move').orderBy('from', 'asc').get().then( async snapshot => {
        const service = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          const id = doc.id;
          service.push({
            ...data,
            id: id
          });
        });
        const newService = await service.map((item,index) => {
          console.log(item);
          return {
            ...item,
            id: index+1,
            idFee: item.id,
          }
        })
        setData(newService)
        
      });
    }

    const getPriceService = async(uid) => {
      await db.collection('store').doc(uid).get().then( async doc => {
        const service = []   
            const data = doc.data().price_service
            const id = doc.id        
            console.log(data);
            setPriceService(data)
            return data
        // const newPriceService = await priceService.map((item) => {
        //   return {
        //     ...item,
        //     id: item.id
        //   }
        // })
        // setPriceService(newPriceService)
      })
    }

    const addPriceService = async(uid,priceServiceForm) => {
      console.log(uid,priceServiceForm);
      await db.collection('store').doc(uid).update({
        'price_service':Number(priceServiceForm/100)
      })
    }
  
    const authListener = () => {
      auth.onAuthStateChanged((user) => {
          if (user) {
              getData(user.uid)
              getPriceService(user.uid)
              setUser(user);
          } else {
              setUser('');
          }
      });
    }
  
    React.useEffect(() => {
      authListener();
    },[]);

    const HandlerService = () => {  
      return(
        <div>
          <form className={classes.root} onSubmit={(even)=>{
                even.preventDefault()
                addPriceService(user.uid,Number(even.target.haha.value))
          }}  >
            <TextField  name='haha' id="outlined-basic" label="Phí dịch vụ (theo %)" variant="outlined"  defaultValue={priceService ? priceService*100 : 0} />
            <br/>
            <Button variant="contained" type='submit' color="primary">Lưu thay đổi</Button>
          </form>
        </div>
      );
    }
   
    return (
    <>
      <HandlerService />
      <br />
      <MaterialTable
        icons={tableIcons}
        title="Phí di chuyển"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                db.collection('store').doc(auth.currentUser.uid).collection('prices_move').add({
                  'from': Number(newData.from),
                  'to': Number(newData.to),
                  'price': newData.price,
                });
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
               
                db.collection('store').doc(auth.currentUser.uid).collection('prices_move').doc(newData.idFee).update({
                  'from': Number(newData.from),
                  'to': Number(newData.to),
                  'price': newData.price,
                });
                  console.log(auth.currentUser.uid)
                  console.log(newData.idFee)
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                  console.log(oldData.uid);
                db.collection('store').doc(auth.currentUser.uid).collection('prices_move').doc(oldData.idFee).delete();
                
                resolve()
              }, 1000)
            }),
        }}
      />
    </>
    )
  }
  
export default ClassTable;