const router = require('express').Router();
const stu = require('../controller/students');
const school = require('../controller/schools');

// query routes
router.get('/getstu',stu.getStu);
router.get('/getonestu',stu.getOneStu);
router.get('/getstuAll',stu.getStuForAdmin);
router.get('/getschools',school.getSchools);

// session check
router.get('/check',(req,res)=>{
    if(req.session.school){
            if(req.session.admin){
                res.json({signned: true,isAdmin: true,school: req.session.school});
            }else{
                res.json({signned: true,school: req.session.school});
            }
    }else{
        res.json({signned: false});
    }
});
// session destroy
router.get('/logout',(req,res)=>{
    if(req.session.school){
        req.session.destroy();
        res.json({logout: true});
    }
});

// sign
router.post('/signschool',school.sign);
router.post('/signmalestu',stu.signMaleStu);
router.post('/signfemalestu',stu.signFemaleStu);

router.post('/loginschool',school.login);// login

// delete
router.delete('/deleteschool',school.delete);
router.delete('/delete',stu.delete);

router.put('/update',stu.update);// update students
router.put('/updateschool',school.update);// update schools



module.exports = router;