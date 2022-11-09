import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sign from "../../components/sign";
import Table from "../../components/Table";



function SchoolPage() {
  const navigate = useNavigate();
  const {id,gen} = useParams();
  const scid = id.replace("id=","");
  const scgen = gen.replace("gen=","");
axios.defaults.withCredentials = true;
useEffect(()=>{
        axios.get("http://localhost:3005/check")
        .then((res)=> {
          if(!res.data.signned){
          navigate('/login');
          }else{
                  if(!res.data.isAdmin){
                    navigate('/');
                  }
          }
        });
},[navigate])
  return (
<div className="p-3">
  <div className={scgen === "بنات" ? "bg-danger" : "bg-primary"}>
        <Sign gender={scgen} school={scid}  />
    <Table gender={scgen} id={scid} />
  </div>
</div>
  );
}

export default SchoolPage;
