
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

  

  function ClassTable() {
    const { useState, useEffect } = React;

    const [columns, setColumns] = useState([
      { title: 'ID', field: 'id', editable: 'never'},
      { title: 'T??n d???ch v???', field: 'name' },
      { title: 'Gi??', field: 'price', render: rowData => <p>{rowData.price} VN??</p>},
      { title: 'M?? t???', field: 'desc' },

    ]);

    
    const [data, setData] = useState([]);
    const [user, setUser] = React.useState('');

    const getListService = async() => {
      var a = {}
      await db.collection('services').get().then( async snapshot => {
          const service = []
          snapshot.forEach(doc => {
              const data = doc.data()
              const id = doc.id
              a[id] = data.name 
              console.log(data);
              return data
          })
      })
      setColumns([
          { title: 'ID', field: 'id', editable: 'never'},
          { title: 'T??n d???ch v???', field: 'service_id', lookup: a},
          { title: 'Gi??', field: 'price', render: rowData => <p>{rowData.price} VN??</p>},
          { title: 'M?? t???', field: 'desc' },
        ])
    }

    const getData = (uid) => {
      console.log(uid);
      db.collection('store').doc(uid).collection('service').get().then( async snapshot => {
        const service = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          const id = doc.id;
          service.push({
            ...data,
            uid: id
          });
        });
        const newService = await service.map((item,index) => {
          console.log(item);
          return {
            ...item,
            id: index+1
          }
        })
        setData(newService)
        
      });
    }
  
    const authListener = () => {
      auth.onAuthStateChanged((user) => {
          if (user) {
              getData(user.uid)
              setUser(user);
              getListService(user)
          } else {
              setUser('');
          }
      });
    }
  
    React.useEffect(() => {
      authListener();
    },[]);
    
   
    return (
      <MaterialTable
        icons={tableIcons}
        title="Qu???n l?? d???ch v???"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                db.collection('store').doc(auth.currentUser.uid).collection('service').add({
                  'service_id': newData.service_id,
                  'price': newData.price,
                  'desc': newData.desc,
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
                db.collection('store').doc(auth.currentUser.uid).collection('service').doc(newData.uid).update({
                  'price': newData.price,
                  'desc': newData.desc,
                });
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
                db.collection('store').doc(auth.currentUser.uid).collection('service').doc(oldData.uid).delete();
                
                resolve()
              }, 1000)
            }),
        }}
      />
    )
  }
  
export default ClassTable;