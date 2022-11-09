import { useEffect, useRef, useState } from "react";
import axios from "axios";


function Sign(props) {
  const {gender} = props;
  const stuGender = gender === "بنين" ? "male" : "female"
  const [form , setForm] =useState({
    name: "",
    tall: "",
    age: "",
    weight: "",
    school_id: ""
  });
  const [err , setErr]= useState('');
  const bmi  = useRef(0);
  const api = async (stu)=>{
  await  axios({
      method:"POST",
      url: `http://localhost:3005/sign${stuGender}stu`,
      data: stu
    });
  }
 const updateForm = (value)=>{
    return setForm(pre => {
      return {...pre , ...value};
    });
}
  const onSubmit = (e)=>{
    e.preventDefault();
    const data = {
      name: form.name,
      tall: form.tall,
      age: form.age,
      weight: form.weight,
      school_id: props.school,
    };
    if(form.age === "" || form.name === ""|| form.tall === ""|| form.weight === ""){
          setErr('ادخل كامل بيانات الطالب');
    }else{
      api(data);
    }
  }

  useEffect(()=>{
    const tall = form.tall * form.tall;
    const b = form.weight / tall * 10000;
    bmi.current = b.toFixed(4);
  });

  return (
<div>
    <br/>
    <div className="">
            <form className="row p-5 text-light" onSubmit={onSubmit} dir="rtl"  >
                  <h5 className="d-flex justify-content-center text-danger ">{err}</h5>
                  <div className="col">
                                <label className="form-label" htmlFor="tall" >الطول</label>
                                <input className="form-control" id="tall" type="number" name="stu_tall" placeholder="students tall" 
                                value={form.tall} onChange={(e)=> updateForm({tall: e.target.value})} />
                                <br/>
                  </div>
                  <div className="col">
                                <label className="form-label" htmlFor="age">العمر</label>
                                <input className="form-control" id="age" type="number" name="stu_age" placeholder="students age"
                                value={form.age}  onChange={(e)=> updateForm({age: e.target.value})} />
                                <br/>
                  </div>
                  <div className="col">
                                <label className="form-label" htmlFor="we">الوزن</label>
                                <input className="form-control" id="we" type="number" name="stu_weight" placeholder="students weight" 
                                value={form.weight}  onChange={(e)=> updateForm({weight: e.target.value})} />
                                <br/>
                  </div>
                  <div className="row">
                        <div className="col">
                                <label className="form-label" htmlFor="name">اسم الطالب</label>
                                <input className="form-control" id="name" type="text" name="stu_name" placeholder="students name" 
                                value={form.name}  onChange={(e)=> updateForm({name: e.target.value})} />
                                <br/>
                        </div>
                       <div className="col">
                                <label className="form-label" htmlFor="bmi">الكتلة</label>
                                <input className="form-control" id="bmi"  type="number" value={bmi.current} readOnly/>
                                <br/>
                       </div>
                  </div>
                            <input className="btn btn-outline-light" value="تسجيل الطالب"  type="submit" />
            </form>
    </div>
</div>
  );
}

export default Sign;
