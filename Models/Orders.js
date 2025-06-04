
const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
   // order details of the person who is odering + pickle details..
   userName : {
    type : String,
    required : true,
   },
   address : {
    type : String,
    required : true,
   },
   pickleName: {
    type : String,
    required : true,
   }
   ,
   grams : {
      type : Number,
      required : true,
   },
   url : {
      type : String,
      required : true,
   },
   price : {
      type : Number,
      required : true,
   }

})

module.exports = mongoose.model('Orders', orderSchema)