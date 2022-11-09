const schools = require('../model/schools');
const students = require('../model/students');
const bcrypt = require('bcrypt');

module.exports = ({

login: async(req,res)=>{
const {name , password} = req.body;
    try{
        const user = await schools.findOne({school_name: name});
        if(user){
            await bcrypt.compare(password,user.school_password).then((match)=>{
                if(match){
                    req.session.school = user;
                    req.session.admin = user.isAdmin;
                    res.json({login: true});
                }else{
                    res.json({login:false,msg:"خطأ في اسم المستخدم او كلمة المرور"});
                }
            })
        }else{
            res.json({msg: 'المدرسة غير مسجلة'});
        }
    }catch(err){
        console.log(err);
    }
},

sign: async (req,res)=>{
    const {name ,email, password,gender} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);

   try{
    const user = await schools.findOne({school_name: name});
    if(user){
        res.json({sign:false,msg:"المدرسة مسجلة"});
    }
    else{
        const newUser = new schools(
            {
                school_name:name,
                school_email:email,
                school_password:hashedPassword,
                school_gender: gender
            });
        await newUser.save();
    }
   }catch(err){
        console.log(err);
   }

},
getSchools: async(req,res)=>{
  const query =   await schools.find({
    school_name:{$ne: "omar"}
    }).select();
res.json({schools: query});
},

update: async(req,res)=>{
    const {sch} = req.body;
    const hashedPassword = await bcrypt.hash(sch.school_password , 10);
    try{
        await schools.findByIdAndUpdate(sch._id,{
            school_name:sch.school_name,
            school_email:sch.school_email,
            school_gender:sch.school_gender,
            school_password:hashedPassword,
        });
        res.json({updated: true});
    }catch(err){
        console.log(err);
    }
},

delete: async(req,res)=>{
    const {id} = req.body;
      try{
                await schools.findByIdAndDelete(id)
                .then(async ()=>{
                    await students.deleteMany({School_id:id})
                    .then(()=> {
                        res.json({isDelete:true});
                    })
                })
      }catch(err){
            console.log(err);
      }
       
}

});