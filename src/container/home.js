import React,{useEffect,useState} from 'react';
import HOC from './HOC';
import QRCode from 'qrcode.react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'


const Home=()=>{
    const [data,setdata]=useState({
        course:'',
        showQr:false,
        redirect:false
    })
    const {course,showQr,redirect} = data
    useEffect(()=>{
        async function getCourse(){
            const id = localStorage.getItem('course_id')
            const token = localStorage.getItem('access')
            const headers={
                'Authorization':`JWT ${token}`,
                'Content-Type':'application/json'
            }
            await axios.get('https://newqr.pythonanywhere.com/to-qr-code/'+id+'/',{headers})
            .then((res)=>{
                setdata({
                    course:res.data['name'],
                    showQr:true
                })
            })
            .catch((err)=>{
                if (err.response.status===401){
                    setdata({
                        redirect:true
                    })
                }
            })

        }
        getCourse()
    },[]);


    const clicked=(e)=>{
        const token = localStorage.getItem('access')
        const refresh = localStorage.getItem('refresh')
        const headers={
            'Authorization':`JWT ${token}`,
            'Content-Type':'application/json'
        }
        async function logout(){
            const x = axios.post('https://newqr.pythonanywhere.com/logout/',JSON.stringify({refresh}),{headers})
            console.log(x.data)
            localStorage.removeItem('access','refresh')
            setdata({
                ...data,
                redirect:true
            })
        }
        logout()
    }
    if (redirect===true){
        return <Redirect to='/login/' />
    }

    return(
        <div classname='d-flex-column'>
            <div className='text-center'>
                <h1>
                    Scan the qr code below to mark your attendance
                </h1>
                <span onClick={clicked} style={{cursor:'pointer',width:'fitContent'}}>Logout</span>
            </div>
            {showQr?(
                <div className='mx-auto mt-5' style={{width:'fit-content'}}>
                    <QRCode value={'https://newqr.pythonanywhere.com/'+course+'/'} size={300}  />
                </div>
            )
            :null
            
        }

        </div>

    )
}
export default Home;