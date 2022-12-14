const mongoose = require('mongoose');

const students = new mongoose.Schema({
    Student_name:{
            type:String,
            required: true,
        },
    Student_age:{
        type:Number,
        required: true,
    },
    Student_bmi:{
        type:Number,
        required: true,
    },
    Student_obse_state:{
        type:String,
        required: true,
    },
    School_id:{
        type:mongoose.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model("students",students);