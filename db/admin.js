const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    password:String
})

module.exports = mongoose.model('admins',adminSchema);