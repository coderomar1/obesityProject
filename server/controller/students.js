const students = require('../model/students');
const xlsx = require('xlsx');
const workbook = xlsx.readFile('countbyage.xlsx');
const sheet = workbook.SheetNames;

module.exports = ({
// تسجيل بنبن
signMaleStu:(req,res)=>{
    const {name ,tall , age , weight,school_id} = req.body;
    const t = tall * tall;
    const bmi = weight/t*10000;

    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet[1]]);
    data.map(async c => {
            if(c.age == age){
                let state;
                    if(bmi > c.SD2){
                          state = 'سمنة';
                    }else if(bmi < c.SD2 && bmi > c.SD1){
                          state = 'وزن زائد';
                    }else if(bmi < c.SD1 && bmi > c.SD2neg){
                          state = 'طبيعي';
                    }else if(bmi < c.SD2neg){
                          state = 'نحافة';
                    }
                    try{
                        const newStu = new students(
                            {
                                Student_name: name,
                                Student_age: age,
                                Student_bmi:bmi,
                                Student_obse_state: state,
                                School_id: school_id
                            }
                            );
                        await newStu.save().then(()=> res.json({signed: true}));
                    }catch(err){
                        console.log(err);
                    }
            }
    });
},
// تسجيل بنات
signFemaleStu: (req,res)=>{
    const {name ,tall , age , weight,school_id} = req.body;
    const t = tall * tall;

    const bmi = weight/t*10000;

    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet[0]]);

    data.map(async c => {
        if(c.age == age){
            let state;
                if(bmi > c.SD2){
                      state = 'سمنة';
                }else if(bmi < c.SD2 && bmi > c.SD1){
                      state = 'وزن زائد';
                }else if(bmi < c.SD1 && bmi > c.SD2neg){
                      state = 'طبيعي';
                }else if(bmi < c.SD2neg){
                      state = 'نحافة';
                }
                
                try{
                    const newStu = new students(
                        {
                            Student_name: name,
                            Student_age: age,
                            Student_bmi:bmi,
                            Student_obse_state: state,
                            School_id: school_id
                        }
                        );
                    await newStu.save().then(()=> res.json({signed: true}));
                }catch(err){
                    console.log(err);
                }
        }
});
},
// جلب البيانات
getStu:(req,res)=>{
    const {id } =req.query;
        try{
            students.find({School_id: id},(err,r)=>{
                if(err) console.log(err);
                else res.json({stu: r});
            })
        }catch(err){
            console.log(err);
        }
},
getOneStu: async(req,res)=>{
    const {id} =req.query;
        try{
                await students.find({_id: id},(err,r)=>{
                if(err) console.log(err);
                else res.json({stu: r});
                })
            }catch(err){

            }

},
getStuForAdmin: async(req,res)=>{
    const {id} =req.query;
        try{
            const query = await  students.find({School_id: id});
    
            const obseQuery = await  students.find({School_id: id,Student_obse_state: "سمنة"});
            const thinQuery = await  students.find({School_id: id,Student_obse_state: "نحافة"});
    
            // قياس نسبة السمنة والنحف بالمئة
            const obseNum = obseQuery.length / query.length * 100;
            const thinNum = thinQuery.length / query.length * 100;
    
            res.json({
                stu: query,
                ob: obseNum,
                th: thinNum
            });
            }catch(err){
                    console.log(err);
            }

   
},
update: async(req,res)=>{
    const {stu} = req.body;
    try{
        await students.findByIdAndUpdate(stu._id,stu);
        res.json({updated: true});
    }catch(err){
        console.log(err);
    }
},

delete: async(req,res)=>{
    const {id} = req.body;
        try{
                await students.findByIdAndDelete(id);
                res.json({deleted: true});
        }catch(err){
                console.log(err);
        } 
}

});