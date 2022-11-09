import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../components/context";
import SchoolCard from "../components/schoolCard";
import SignSchool from "../components/signSchool";
import UpdateSchool from "../components/updateSchool";

function AdminPage() {
  const navigate = useNavigate();
  const [schools, setSchools]= useState('');
  const [update , setUpdate] = useState({isUp: false,id: 0});

const checkSessionApi = ()=>{
  axios.get("http://localhost:3005/check")
  .then((res)=> {
      if(!res.data.signned){
             navigate('/login');
      }else{
            if(res.data.isAdmin){
                  axios.get("http://localhost:3005/getschools")
                  .then((res) => {
                    setSchools(res.data.schools);
                  });
            }else{
                 navigate('/');
            }
      } 
    })
}
useEffect(()=>{
  checkSessionApi();
});

  return (
<Context.Provider value={{update,setUpdate}}>
    <div className="bg-dark text-light p-5">
          <SignSchool />
          <div className="row row-cols-1 row-cols-md-4 g-4">
              {update.isUp ? 
                  schools ? schools.map((s,i) =>{
                      return( 
                        <>
                            {s._id === update.id ?
                                <div key={i}>
                                    <UpdateSchool school={s} />
                                </div>
                          :
                              null
                          }
                        </>
                       )
                  })
                     :
                       null
              :
              schools ? schools.map((s,i) =>{
                 return( 
                 <div key={i}>
                      <SchoolCard name={s.school_name} id={s._id} gender={s.school_gender} />
                  </div>
                  )
            })
                :
                  null
            }
          </div>
    </div>
</Context.Provider>
  );
}

export default AdminPage;
