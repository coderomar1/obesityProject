import {  useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "./context";

function UpdateStu(props) {
  const { student} = props;
  const {setUpdate} = useContext(Context);

  const [form , setForm] =useState({
    _id: student._id,
    Student_name: student.Student_name,
    Student_age:  student.Student_age,
    Student_bmi: student.Student_bmi,
    Student_obse_state: student.Student_obse_state,
  });
  
  const UpdateApi = async (stuForm)=>{
   await axios({
      method: 'PUT',
      data:{
        stu:stuForm,
      },
      url:"http://localhost:3005/update"
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
      Student_name: form.Student_name,
      Student_age: form.Student_age,
      Student_bmi: form.Student_bmi,
      Student_obse_state: form.Student_obse_state,
    };
   UpdateApi(data);
  }
  


  return (
<>
                  <tr>
                        <th scope="row" >{form._id}</th>
                        <td>
                            <input 
                            type="text"
                             value={form.Student_name} 
                             onChange={(e)=> updateForm({Student_name:e.target.value})} 
                             />
                        </td>
                        <td>
                            <input 
                            type="number"    
                            value={form.Student_age} 
                            onChange={(e)=> updateForm({Student_age:e.target.value })} 
                            />
                        </td>

                        <td>
                            <input 
                            type="number"   
                            value={form.Student_bmi} 
                            onChange={(e)=> updateForm({Student_bmi:e.target.value })} 
                            />
                        </td>

                        <td>
                            <input 
                            type="text"   
                            value={form.Student_obse_state} 
                            onChange={(e)=> updateForm({Student_obse_state:e.target.value })} 
                            />
                        </td>
                        <td >
                            <Link  onClick={()=> onUpdate()}>
                                  <i className="bi bi-check-lg"></i>
                            </Link>
                        </td>
                        <td>
                            <Link onClick={()=> setUpdate({isUp: false})}>
                                  <i className="bi bi-x-lg"></i>
                            </Link>
                        </td>
                  </tr>  
</>
  );
}

export default UpdateStu;
