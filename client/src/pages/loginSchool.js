import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function LoginSchool() {
  const navigate = useNavigate()
  const [form , setForm] =useState({
    name: "",
    password: ""
  });
  const [err, setErr]= useState();
  const api = async (stu)=>{
  await  axios({
      method:"POST",
      url: `http://localhost:3005/loginschool`,
      data: stu
    }).then(res => {
          if(res.data.login){
            navigate('/');
          }else{
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
    api(data);
  }

  return (
<div>
    <div className="text-center p-5">
          <h2 className="text-secondary">قياس نسبة السمنة والنحف فالمدارس</h2>
    </div>
    <div className="d-flex justify-content-center p-5" >
            <form className="bg-secondary p-5 rounded text-light  " onSubmit={onSubmit} dir="rtl">
              <h6 className="text-center text-danger">{err}</h6>
              <br/>
                  <div className=" d-flex justify-content-center p-3">
                      <label className="form-label " htmlFor="name" >اسم المدرسة</label>
                      <input className="form-control" id="name" type="text" name="school_name"  
                       onChange={(e)=> updateForm({name: e.target.value})} />
                  </div>
                  <div className=" d-flex justify-content-center p-3">
                  <label className="form-label" htmlFor="pass">كلمة المرور</label>
                      <input className="form-control" id="pass" type="password" name="school_password"  
                        onChange={(e)=> updateForm({password: e.target.value})} />
                  </div>
                  <div className="d-flex justify-content-center p-3">
                        <input className="btn btn-outline-light w-50" value="دخول"  type="submit" />
                  </div>
                  <div className="d-flex justify-content-center p-3">
                        <Link onClick={()=> alert('تواصل معنا عبر : madinaitadmin@moe.edu.sa') }>هل نسيت كلمة السر؟</Link>
                  </div>
            </form>
    </div>
</div>
  );
}

export default LoginSchool;
