import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import UpdateStu from "./updateStu";
import { Context } from "./context";


function Table(props) {
  const {id } = props;
  const [data , setData] = useState(null);
  const [update , setUpdate] = useState({isUp: false,id: 0});

  const Delete = (stuid)=>{
        axios({
          method: 'DELETE',
          data:{
            id:stuid,
          },
        url:"http://localhost:3005/delete"
        });
  }
  useEffect(()=>{
      axios.get("http://localhost:3005/getstu/",{
        params:{
          id:id
        }
      })
      .then((res)=> {
        setData(res.data.stu);
      });
  });
  return (
<Context.Provider value={setUpdate}>
<div className="text-center text-light " dir="rtl">
    <div className="">
          <table className="table table-light">
            <thead className="table-active">
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">age</th>
                    <th scope="col">bmi</th>
                    <th scope="col">obse state</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
    {data ?  data.map((c,i) =>{ 
           return( 
            <tbody key={i}>
              {update.isUp ? 
                 c._id === update.id ? 
                    <UpdateStu student={c} />
                        :
                        null
              :
                <tr>
                      <th scope="row">{c._id}</th>
                      <td>{c.Student_name}</td>
                      <td>{c.Student_age}</td>
                      <td>{c.Student_bmi}</td>
                      <td>{c.Student_obse_state}</td>
                    <td >
                        <Link  onClick={()=> Delete(c._id)}>
                            <i className="bi bi-trash-fill"></i>
                        </Link>
                    </td>
                    <td>
                        <Link onClick={()=> setUpdate({isUp:true,id:c._id})}>
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                    </td>
                </tr>  
              }
            </tbody>
              )
                    })
                    :
            <tbody>
                  <tr>
                        <td>
                            <h2>لا يوجد</h2> 
                        </td>
                  </tr>
            </tbody>
    }
            </table>
    </div>
</div>
</Context.Provider>
  );
}


export default Table;
