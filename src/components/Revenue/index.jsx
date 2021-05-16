import React from 'react';
import { Line, Doughnut } from "react-chartjs-2";
import { auth, db } from '../../firebase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles1 = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function Revenue () {

    const classes1 = useStyles1();
    const [data, setData] = React.useState([]);
    const [user, setUser] = React.useState('');
    // const [date, setDate] = React.useState([]);
    const [label, setLabel] = React.useState([]);
    const [total, setTotal] = React.useState([]);
    const [labelDoughnut, setLabelDoughnut] = React.useState([]);
    const [totalDoughnut, setTotalDoughnut] = React.useState([]);
    const [month, setMonth] = React.useState((new Date()).getMonth() + 1);

    const getData = (uid) => {
        console.log(uid);   
        db.collection('order').where('storeId', '==', uid).orderBy('time', 'asc').get().then( snapshot => {           
            const revenue = []
            snapshot.forEach(doc => {
                const data = doc.data()
                revenue.push(data)
            })
            console.log(revenue);
            const responseData = []
            const newData = revenue.filter(data => (new Date(data.time)).getMonth() + 1 == month)
            newData.reduce((res, val) => { 
                if (!res[(new Date(val.time)).getDate()]) {
                  res[(new Date(val.time)).getDate()] = {
                        date: (new Date(val.time)).getDate() + "/" + ((new Date(val.time)).getMonth() + 1),  
                        total: 0,
                        // quantity: 0,
                    };
                  responseData.push(res[(new Date(val.time)).getDate()])
                }
                res[(new Date(val.time)).getDate()].total += Number(val.total)
                // res[(new Date(val.time)).getDate()].quantity += 1 
                return res

            }, {});
            
            const label = []
            const total = []

            for(let data of responseData) {
                label.push(data.date)
                total.push(data.total)
            }
            console.log(label, total);

            setLabel(label);
            setTotal(total);
        })
    }

    const getDataDoughnut = (uid) => {
        db.collection('order').where('storeId', '==', uid).orderBy('time', 'asc').get().then( snapshot => {           
            const revenue = []
            snapshot.forEach(doc => {
                const data = doc.data()
                revenue.push(data)
            })
            console.log(revenue)
            const responseData = []
            const newData = revenue.filter(data => (new Date(data.time)).getMonth() + 1)
            newData.reduce((res, val) => { 
                if (!res[(new Date(val.time)).getMonth()]) {
                  res[(new Date(val.time)).getMonth()] = {
                        date: (new Date(val.time)).getMonth() + 1,  
                        total: 0,
                        // quantity: 0,
                    };
                  responseData.push(res[(new Date(val.time)).getMonth()])
                }
                res[(new Date(val.time)).getMonth()].total += Number(val.total)
                // res[(new Date(val.time)).getMonth()].quantity += 1 
                return res
            }, {});
            
            const labelDoughnut = []
            const totalDoughnut = []

            for(let data of responseData) {
                labelDoughnut.push(data.date)
                totalDoughnut.push(data.total)
            }
            console.log(labelDoughnut, totalDoughnut);

            setLabelDoughnut(labelDoughnut);
            setTotalDoughnut(totalDoughnut);
        })
    }

    const handleMonth = (e) => {
        setMonth(Number(e.target.value))
    }
   
    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getData(user.uid)
                setUser(user)
                getDataDoughnut(user.uid)
                // getDay(new Date());
            } else {
                setUser('');
            }
        });

    }

    React.useEffect(() => {
        authListener()
    }, [month])

    // const getDay = (d) => {
    //     d = new Date(d.setDate(d.getDate()));
    //     // setDataNoAtt([])
    //     // setDataAbsence([])
    //     var day = d.getDay(),
    //         diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    //     const dateArr = [];
    //     for(let i=0 ; i<7 ; i++) {
    //         const date = new Date(d.setDate(diff));
    //         const newDate = new Date(date.setDate(date.getDate() + i));
    //         console.log((new Date(newDate)).getDate() +'/' + ((new Date(newDate)).getMonth()+1));
    //         dateArr.push(newDate.getDate() + '-' + (newDate.getMonth()+1));
    //         // getNoattendace(date, 0);
    //         // getAbsence(date)
    //     }

    // }



    const HandlerSelector = () => {  
        return(
          <div>
            <FormControl className={classes1.formControl}>
              <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
              <Select
                onChange={(e) => handleMonth(e)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={month} 
              >
                <MenuItem value={1}>Tháng 1</MenuItem>
                <MenuItem value={2}>Tháng 2</MenuItem>
                <MenuItem value={3}>Tháng 3</MenuItem>
                <MenuItem value={4}>Tháng 4</MenuItem>
                <MenuItem value={5}>Tháng 5</MenuItem>
                <MenuItem value={6}>Tháng 6</MenuItem>
                <MenuItem value={7}>Tháng 7</MenuItem>
                <MenuItem value={8}>Tháng 8</MenuItem>
                <MenuItem value={9}>Tháng 9</MenuItem>
                <MenuItem value={10}>Tháng 10</MenuItem>
                <MenuItem value={11}>Tháng 11</MenuItem>
                <MenuItem value={12}>Tháng 12</MenuItem>
              </Select>
            </FormControl>
          </div>
        );
    }

    return (
        <div>
            <HandlerSelector />
            <br/> <br/> <br/>
          
            <div style={{ display: 'flex', 'flex-direction': 'row', height: 500, alignItems: 'flex-end'}}>
                <div style={{ width: '32%', height: '100%'}}>
                    <Doughnut
                        data={{
                        labels: labelDoughnut,
                        datasets: [
                            {
                                data: totalDoughnut,
                                label: "Tổng tiền",
                                backgroundColor: [
                                    "#3e95cd",
                                    "#8e5ea2",
                                    "#3cba9f",
                                    "#e8c3b9",
                                    "#c45850"
                                ],      
                            }
                        ]
                        }}
                        option={{
                        title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050"
                        }
                        }}
                    />
                </div>
                <div style={{ display: 'flex', 'flexGrow': 1}}/>
                <div style={{width: '65%', height: '100%'}}>
                    <Line
                        data={{
                            labels: label,
                            datasets: [
                                {
                                data: total,
                                label: "Tổng tiền",
                                borderColor: "#3e95cd",
                                fill: false,
                                }
                            ]
                        }}
                        options={{
                            title: {
                                display: true,
                                text: "World population per region (in millions)"
                            },
                            legend: {
                                display: true,
                                position: "bottom"
                            }
                        }}
                    />
                </div>         
            </div>
        </div>
        
    );
};


export default Revenue;