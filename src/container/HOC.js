import React from 'react';
import './style.css';

const HOC=(props)=>{
    console.log(props.classname)
    return (
        <div className={props.classname+' pic'}>
            {props.children}
        </div>
    )
}
export default HOC;