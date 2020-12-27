import React,{useState} from 'react';
import HOC from './HOC';
import {Link,Redirect} from 'react-router-dom';
import 'axios'
import Axios from 'axios';

const Signup=()=>{
    const [data,setdata] = useState({
        error:false
    })
    const {error} = data

    const actionSignUp=(e)=>{
        const pass1 = e.target.children[3].value;
        const pass2 = e.target.children[4].value;
        if ((pass1 !== pass2)){
            setdata({
                error:true
            })
            setTimeout(()=>{
                setdata({
                    error:false
                })
            },3000)
        }
        const email = e.target.children[1].value;
        const username = e.target.children[2].value;
        console.log(e.target.children[1].innerText)

        // signing up here and then redirecting to login page 
        const headers={
            'Content-Type':'application/json'
        }
        const body = JSON.stringify({'email':email,'username':username,'password':pass1})
        async function POST(){
            console.log(body)
            await Axios.post('http://127.0.0.1:8000/signup/',body,
            {
                headers
            })
            return <Redirect to='/login/'/>
        }
        POST();
        
        e.preventDefault();
    }

    return(
        <HOC classname='d-flex'>
            <div className='container border p-5 align-self-center' style={{width:35+'%'}}>
                <form method='POST' onSubmit={actionSignUp}>
                    <legend className='text-center'>Sign Up</legend>
                    <input placeholder='Email' type='email' name='email' className='form-control'/>
                    <input placeholder='Name' type='text' name='name' className='form-control my-2'/>
                    <input placeholder='Password' type='password' name='password1' className='form-control'/>
                    <input placeholder='Confirm Password' type='password' name='password1' className='form-control my-2'/>
                    {error?<p className='text-danger'>Passwords do not match!</p>:null}
                    <button className='btn btn-primary w-100'>
                        Sign up
                    </button>
                    <small><Link to='/login/'>Login Here</Link></small>
                    
                </form>
            </div>
        </HOC>
    )
}
export default Signup;