const mongoose = require('mongoose');

const schools = new mongoose.Schema({
        school_name:{
            type:String,
            required: true,
        },
        school_email:{
            type:String,
            required: true,
        },
        school_password:{
            type:String,
            required: true,
        },
        school_gender:{
            type:String,
            required: true,
        },
        isAdmin:{
            type:Boolean,
            default: false,
        }
});

module.exports = mongoose.model("schools",schools);