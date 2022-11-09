import { useState } from "react";
import axios from "axios";


function SignSchool(props) {
  const [form , setForm] =useState({
    gender: "",
    name: "",
    email: "",
    password: ""
  });
  const [err , setErr]= useState('');
  const api = async (stu)=>{
  await  axios({
      method:"POST",
      url: `http://localhost:3005/signschool`,
      data: stu
    }).then(res => {
      if(!res.data.sign){
        setErr(res.data.msg);
      }
    });
  }

 const updateForm = (value)=>{
    return setForm(pre => {
      return {...pre , ...value};
    });
}

  const onSubmit = (e)=>{
    e.preventDefault();
    const data = {...form};
    if(form.name === "" || form.email === ""|| form.password === ""|| form.gender === ""){
      setErr('ادخل كامل بيانات المدرسة');
    }else{
      api(data);
    }
  }

  return (
<div>
    <br/>
    <div  >
            <form className="row p-5" onSubmit={onSubmit} dir="rtl">
                      <h5 className="d-flex justify-content-center text-danger p-3">{err}</h5>
                <div className="">
                        <select className="form-select" name="gender" value={form.gender} onChange={(e)=> updateForm({gender: e.target.value})}>
                                <option value="">بنين او بنات</option>
                                <option value="بنين">بنين</option>
                                <option value="بنات">بنات</option>
                        </select>
                </div><br/>
                  <div className="col">
                      <label className="form-label " htmlFor="name" >اسم المدرسة</label>
                      <input className="form-control" id="name" type="text" name="school_name"  
                      value={form.name} onChange={(e)=> updateForm({name: e.target.value})} /><br/>
                  </div>
                  <div className="col">
                  <label className="form-label" htmlFor="email">ايميل المدرسة</label>
                      <input className="form-control" id="email" type="email" name="school_email" 
                      value={form.email}  onChange={(e)=> updateForm({email: e.target.value})} /><br/>
                  </div>
                  <div className="col">
                  <label className="form-label" htmlFor="pass">كلمة المرور</label>
                      <input className="form-control" id="pass" type="password" name="school_password"  
                      value={form.password}  onChange={(e)=> updateForm({password: e.target.value})} /><br/>
                  </div>
                        <input className="btn btn-outline-light" value="اضافة المدرسة"  type="submit" />
            </form>
    </div>
</div>
  );
}

export default SignSchool;
