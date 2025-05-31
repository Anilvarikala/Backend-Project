

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   firstName : {
    type : String, required : true,
   },
   lastName : {
    type : String, required : true,
   },
   email : {
    type : String, required : true, unique : true,
   },
   password : {
    type : String, required : true,
   },
    userType : {
    type : String, required : true,default : 'guest', 
   },
   favouritesId : [
    {
     ref : 'Home',
     type : mongoose.Schema.Types.ObjectId
    }
   ],
   cartIds : [
    {
      ref : 'Home',
      type : mongoose.Schema.Types.ObjectId,
    }
   ]
})

module.exports = mongoose.model('User', userSchema)