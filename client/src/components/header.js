import { useEffect, useState } from "react";
import axios from 'axios';
import {Link } from "react-router-dom";

function Header() {
  const [user , setUser]= useState();

  axios.defaults.withCredentials = true;

  const logout = ()=>{
    axios.get("http://localhost:3005/logout")
    .then((res)=> {
          if(res.data.logout){
            window.location.reload();
          }
    });
  }
  
  useEffect(()=>{
    axios.get("http://localhost:3005/check")
      .then((res)=>  {
        if(res.data.signned){
              setUser(res.data.school); 
        }
      });
  },[user])

  return(
<div>
   { user ? <div className={
      user.school_gender ?
            user.school_gender === "بنين" ?
            "justify-content-end text-primary"
            :
            "justify-content-end text-danger"
      :
      "justify-content-end text-dark"
    }>
      <div className="container-fluid ">
         <div className="nav-tabs ">
              <div className="d-flex justify-content-center">
                        <h2> قياس نسبة السمنة في المدارس</h2>
                </div>
                  {user ? 
                  <div className="d-flex justify-content-between">
                        <nav className="nav-item">
                              <Link onClick={()=> logout()} className="nav-link">خروج</Link>
                        </nav>
                        <nav className="nav-item">
                              <Link to="/" className="nav-link" >{user.school_name}</Link>
                        </nav>
                  </div>
                  :
                  null
                  }
         </div>
      </div>
    </div> : null}
</div>
  )
}

export default Header;
