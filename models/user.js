const mongoose = require("mongoose")
const express = require('express')
const app = express()


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required, can't be blank"],
        unique: true,
    },
    profile: {
        image: String,
        fname: String,
        lname: String,
        phone: String,
        email: String,
        facebook: String,
        instagram: String,
        address: String,
        about: String
    },
    bussiness: {
        logo: String,
        title: String,
        desc: String,
        specialities: [String],
        products: []
    },
    gallary: [],
    contact: [],
    disabled:{
        type : Boolean,
        default : true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', UserSchema);