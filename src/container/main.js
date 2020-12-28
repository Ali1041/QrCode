import React,{useState} from 'react';
import HOC from './HOC'
import QrReader from 'react-qr-scanner'
import axios from 'axios';

const Main=()=>{
    const [data,setdata] = useState({
        result:'',

    })
    const {result} = data
    const handleScan=(data)=>{
        console.log(data)
        if(data!==null){
            async function markAttendance(){
                const token = localStorage.getItem('access')
                const headers={
                    'Authorization':`JWT ${token}`,
                    'Content-Type':'application/json'
                }
                axios.get(`${data}`,{headers})
                .then((res)=>{
                    setdata({
                        result:'Your attendance has ben marked'
                    })
                })
            }
            markAttendance()
        }
    }
    const handleError=(err)=>{
        console.log(err)
    }
    const previewStyle={
        height: 240,
        width: 320,
    }
    return(
        <HOC>
            <h2>Scan the Qr code</h2>
        <QrReader
          delay={3000}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          />
        <h1>{result}</h1>
        </HOC>
    )
}

export default Main;