import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sign from "../components/sign";
import Table from "../components/Table";


function Home() {
  const navigate = useNavigate();
  const [school, setSchool]= useState('');

axios.defaults.withCredentials = true;
useEffect(()=>{
        axios.get("http://localhost:3005/check")
        .then((res)=> {
          if(!res.data.signned){
          navigate('/login');
          }else{
                  if(res.data.isAdmin){
                    navigate('/adminpage')
                  }else{
                    setSchool(res.data.school);
                  }
          }
        });
    
},[school,navigate])
  return (
<div className="p-3">
  <div className={school.school_gender === "بنات" ? "bg-danger" : "bg-primary"}>
        <Sign gender={school.school_gender} school={school._id} />
    </div>
    <Table gender={school.school_gender} id={school._id} />
</div>
  );
}

export default Home;
