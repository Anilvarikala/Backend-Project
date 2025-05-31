
const mongoose = require('mongoose')

const homeSchema = mongoose.Schema({
    pickleName : {
      type : String,
      required : true,
    },
    url :{
      type : String,
      required : true,
    },
    grams :{
      type:Number,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    data:{
      type:Date,
    },
    description:{
      type:String, 
      required:true
    }
});

module.exports = mongoose.model("Home", homeSchema);