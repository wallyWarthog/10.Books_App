const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    name: {
        type:String,
        trim:true,
        required:true
    },
    address: {
        type:String,
        trim:true,
        required:true
    },
    phone:Number
});

const Store = mongoose.model('Store', storeSchema);

// make this available to other files 
module.exports = {Store};