import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { db, auth } from '../../firebase';
import { Button } from '@material-ui/core';


const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'name', headerName: 'Tên', width: 250 },
  { field: 'desc', headerName: 'Mô tả', width: 350 },
  {
    field: 'price',
    headerName: 'Giá',
    type: 'number',
    width: 150,
  },
  { field: 'deleteService', headerName: ' ', width: 150 },
 
];

function createData(id, name, desc, price, deleteService) {
  return {id, name, desc, price, deleteService};
}


export default function Service() {
  const [user, setUser] = React.useState('');
  const [rows, setRows] = React.useState([]);

  // const handleDelete = (id) => {
  //   return <Button variant="contained" color="primary" onClick={() => deleteService(id)}>Xoá</Button>
  // }

  // const deleteService = async (uid, id) => {
  //   await db.collection('store').doc(uid).collection('service').doc(id).delete();
  //   getData();
  // }

  const getData = (uid) => {
    console.log(uid);
    db.collection('store').doc(uid).collection('service').get().then( snapshot => {
      const service = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        // const id = doc.id;
        service.push(data);
      });
      console.log(service);
      service.map((item,index) => {
          setRows(previous => [
              ...previous,
              createData(index + 1, item.name, item.desc, item.price + ' VNĐ'),
          ])
      });
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
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
