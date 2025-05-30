
const mongoose = require('mongoose');

const FavouriteSchema = mongoose.Schema({
   favouriteId : {
    ref : 'Home',
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    unique : true,
   }
})

module.exports = mongoose.model('Favourite', FavouriteSchema)