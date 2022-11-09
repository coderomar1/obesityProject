import axios from 'axios'
import React, {useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from './context';

export default function SchoolCard(props) {
  const {id,gender} = props;
  const {setUpdate} = useContext(Context);
    const [stu,setStu]= useState({
            data: null,
            oBstate: null,
            tHstate:null
    });
    const Delete = (schid)=>{
      alert('هل انت متأكد انك تريد حذف المدرسة؟')
      axios({
        method: 'DELETE',
        data:{
          id:schid
        },
        url:"http://localhost:3005/deleteschool"
      })
}
    useEffect(()=>{
      axios.get("http://localhost:3005/getstuAll/",{
        params:{
          id:id,
          gender:gender
        }
      })
      .then(res => {
        setStu({
          data: res.data.stu,
          oBstate: res.data.ob,
          tHstate: res.data.th,
        })
      })
    },[id,gender])
  return (
<Link to={"/school/id="+id+"/gen="+gender} className='col text-decoration-none' >
  <div className='card text-center text-dark' style={{margin: 20}}>
    <div className='d-flex justify-content-between'>
        <Link onClick={()=> Delete(id)} >
          <i className="bi bi-trash-fill"></i>
        </Link>
        <Link onClick={()=> setUpdate({isUp: true,id: id})} >
          <i className="bi bi-pencil-fill"></i>
        </Link>
    </div>
        <div className='card-body'>
              <h4 className='card-title'>{props.gender}</h4>
              <h4 className='card-title'>  المدرسة : {props.name}</h4><br/>
                <h6 className='card-text'> {stu.data ? stu.data.length : null} : عدد الطلاب فالمدرسة </h6>
                      {/* عرض نسبة السمنة */}
                      {stu.oBstate ? 
                          <h5 className='card-text bg-danger p-1 rounded'>نسبة السمنة  : 
                                <span>%{parseInt(stu.oBstate)} </span>
                          </h5>
                          :
                      null}
                       {/* عرض نسبة النحف */}
                      {stu.tHstate ? 
                          <h5 className='card-text bg-success p-1 rounded'>نسبة النحف  : 
                                <span>%{parseInt(stu.tHstate)} </span>
                          </h5> 
                          :
                      null}      
                             {stu.oBstate && stu.tHstate ?
                                <div>
                                    <h5 className='card-text bg-info p-1 rounded'> طبيعي او وزن زائد  : 
                                      <span>%{100 - (parseInt(stu.tHstate) + parseInt(stu.oBstate)) } </span>
                                    </h5>
                                        <h5> : مقارنة</h5>
                                      <div className='rounded'>
                                            <div className='d-flex bg-dark'  style={{height: 50,width: "100%"}}>
                                                        <div className='card-text bg-danger ' style={{height: 50,width:parseInt(stu.oBstate)+"%"}}></div>
                                                        <div className='card-text bg-success' style={{height: 50,width:parseInt(stu.tHstate)+"%"}}></div>
                                                        <div className='card-text bg-info' style={{height: 50,width: 100 - (parseInt(stu.tHstate) + parseInt(stu.oBstate))+"%"}}></div>
                                            </div>
                                      </div>
                                </div>
                              :
                              null}
          </div>      
    </div>
</Link>
  )
}
