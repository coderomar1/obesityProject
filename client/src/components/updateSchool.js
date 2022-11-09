import axios from 'axios'
import React, {useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from './context';

export default function UpdateSchool(props) {
  const {school} = props;
  const {setUpdate} = useContext(Context);
  const [form , setForm] =useState({
    _id: school._id,
    school_name: school.school_name,
    school_email: school.school_email,
    school_password: school.school_password,
    school_gender: school.school_gender,
  });

  const UpdateApi = async (Form)=>{
    await axios({
       method: 'PUT',
       data:{
         sch:Form,
       },
       url:"http://localhost:3005/updateschool"
     }).then((res)=>{
         if(res.data.updated){
           setUpdate({isUp: false});
         }
     })
 }
  const updateForm = (value)=>{
     return setForm(pre => {
       return {...pre , ...value};
     });
 }
   const onUpdate = ()=>{
     const data = {
    _id: form._id,
    school_name: form.school_name,
    school_email: form.school_email,
    school_password: form.school_password,
    school_gender: form.school_gender,
     };
    UpdateApi(data);
   }

  return (
<div className='col text-decoration-none' >
  <div className='card text-center text-dark' style={{margin: 20}}>
    <div className='d-flex justify-content-between'>
        <Link onClick={()=> onUpdate()} >
          <i className="bi bi-check-lg"></i>
        </Link>
        <Link onClick={()=> setUpdate({isUp: false})} >
          <i className="bi bi-x-lg"></i>
        </Link>
    </div>
            <div className='card-body'>
                <input className='card-title' type="text" id='name'
                    value={form.school_name} 
                    onChange={(e)=> updateForm({school_name:e.target.value})} 
                />
                <input className='card-title' type="text" 
                    value={form.school_email} 
                    onChange={(e)=> updateForm({school_email:e.target.value})} 
                />
                <input className='card-title' type="text" 
                    value={form.school_password} 
                    onChange={(e)=> updateForm({school_password:e.target.value})} 
                />
                {/* <input className='card-title' type="text" value={form.school_gender} /> */}
            </div>      
    </div>
</div>
  )
}
