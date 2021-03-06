
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
      { title: 'M?? ????n', field: 'id', editable: 'never'},
      { title: 'Ng??y ?????t', field: 'time', render: rowData => (new Date(rowData.time)).getDate()+'/'+((new Date(rowData.time)).getMonth()+1)+'/'+(new Date(rowData.time)).getFullYear()},
      { title: 'Kh??ch h??ng', field: 'user_info.name' },
      { title: 'S??? ??i???n tho???i', field: 'user_info.phone' },
      { title: 'T???ng ti???n', field: 'total', render: rowData => <p>{rowData.total} VN??</p>},
      // { title: 'Tr???ng th??i', field: 'checkout', render: rowData => {
      //     if (rowData.checkout == 1) {
      //       return <p>???? thanh to??n</p>
      //     }
      // }}
    
    ]);

    
    const [data, setData] = useState([]);
    const [user, setUser] = React.useState('');

    const getData = (uid) => {
    // console.log(uid);
      db.collection('order').where('storeId', '==', uid).orderBy('time', 'desc').get().then( async snapshot => {
        const order = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          const id = doc.id;
          order.push({
            ...data,
            uid: id
          });
        });
        const newOrder = await order.map((item,index) => {
            
            return {
            ...item,
            id: item.uid,
          }
        })
        setData(newOrder)       
      });
    }
  
    const authListener = () => {
      auth.onAuthStateChanged((user) => {
          if (user) {
              getData(user.uid)
              setUser(user);
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
        title="Qu???n l?? ho?? ????n"
        columns={columns}
        data={data}    
      />
    )
  }
  
export default ClassTable;