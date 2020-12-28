import React,{useState} from 'react';
import HOC from './HOC';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios'
import './style.css';

const Login=()=>{
    const [data,setdata]=useState({
        redirect:false,
        redirect_t:false
    })
    const {redirect,redirect_t}=data
    const actionPost=(e)=>{
        const email = e.target.children[1].value;
        const password = e.target.children[2].value;
        // here the login url will be fetched in turn the jwt url will be hit
        const body = JSON.stringify({email,password})
        let headers = {
            'Content-Type':'application/json'
        }
        async function login(){
            const x = await axios.post('https://newqr.pythonanywhere.com/api/token/',body,{headers})
            localStorage.setItem('access',x.data['access'])
            localStorage.setItem('refresh',x.data['refresh'])
            setdata({
                redirect:true
            })
        }
        login()
        e.preventDefault()

    }
    if (redirect === true){
        const token = localStorage.getItem('access')
        let value = false
        const headers = {
            'Authorization':`JWT ${token}`,
            'Content-Type':'application/json'
        }
        async function getUser(){
            await axios.get('https://newqr.pythonanywhere.com/get-user/',{headers})
            .then((res)=>{
                console.log(res.data)
                value = res.data['Teacher']
                console.log(value)
                localStorage.setItem('course_id',res.data['Course'].id)
                setdata({
                    ...data,
                    redirect_t:true
                })
            })
            .catch(()=>{
                setdata({
                    ...data,
                    redirect_t:false
                })
            })
            
        }
        getUser()
 
    }
    if (redirect_t===false && redirect===true){
        return <Redirect to={'/main/'} />
    }
    else if (redirect_t===true && redirect===true){
        return <Redirect to={'/home'} /> 
    }
 
 
    return(
        <HOC classname='d-flex'>
            <div className='container border  p-5 align-self-center responsive' style={{width:35+'%'}}>
                <form method='POST' onSubmit={actionPost}>
                    <legend className='text-center'>Login</legend>
                    <input placeholder='Email' className='form-control' type='text' name='email' />
                    <input placeholder='Password' className='form-control my-2' type='password' name='password' />
                    <button className='btn btn-success w-100'>
                        Login
                    </button>
                    <small>
                        <Link to={'/signup/'}>Sign up here</Link>
                    </small>
                </form>
            </div>
        </HOC>
    )
}
export default Login;