const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title:String,
    description:String,
    link:String
})

module.exports = mongoose.model('notifications',notificationSchema);