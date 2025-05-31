
const { default: mongoose } = require('mongoose');
const Favourite = require('../Models/Favourite');
const Home = require('../Models/Home');
const User = require('../Models/User');

exports.getHome = (req,res,next) => {
   res.render('store/Home',{
    isLoggedIn : req.session.isLoggedIn,
    user : req.session.user,
   })
}
exports.getPickleDetails = (req, res) => {
    const pickleId = req.params.pickleId;
    Home.findById(pickleId).then((pickle) => {
        res.render('store/pickleDetail', {
            pickle : pickle,
            isLoggedIn : req.session.isLoggedIn,
            user : req.session.user,
        })
    }).catch(err => console.log(err));   
}

exports.postFavouriteAdd = async (req, res) => {
    const pickleId = req.params.pickleId;
    const userId = req.session.user._id;
    const user = await User.findById({_id : userId})
    const exist = user.favouritesId.includes((pickleId))
    if(!exist){
    user.favouritesId.push(pickleId);
    await user.save()
    }
    res.redirect("/favourites");
   
}

exports.getFavourites = async (req, res) => {
    const currUserId = req.session.user._id;
    const user = await User.findById({_id : currUserId});
    const favouritesId = user.favouritesId;
    let allPickles = await Home.find()
    allPickles = allPickles.filter((pickle) => favouritesId.includes(pickle._id));
    res.render("store/favourites", {
         allPickles : allPickles,
         isLoggedIn : req.session.isLoggedIn,
         user : req.session.user,
    })
}

exports.getFavouriteRemove = async (req, res) => {
    const pickleId = req.params.pickleId;
    console.log(pickleId);
    const userId = req.session.user._id;
    const user = await User.findById({_id : userId});
    const newfavouritesId = user.favouritesId.filter(id => id.toString() != pickleId);
    user.favouritesId = newfavouritesId;
    const u = user.save()
    res.redirect('/favourites');
}

exports.getProfile = async (req, res) => {
   res.render("store/profile",{
     user : req.session.user
   })
}

exports.postCartAdd = async (req, res) => {
   const pickleId = req.params.pickleId;
    const userId = req.session.user._id;
    const user = await User.findById({_id : userId})
    const exist = user.cartIds.includes((pickleId))
    if(!exist){
    user.cartIds.push(pickleId);
    await user.save()
    }
    res.redirect("/cart");
}

exports.getCart =  async (req, res) => {

    const currUserId = req.session.user._id;
    const currUser = await User.findById({_id : currUserId});
    let ids = currUser.cartIds;
    let allPickles = await Home.find()
    allPickles = allPickles.filter((pickle) => ids.includes(pickle._id))
    res.render("store/cart",{
        user : req.session.user,
        isLoggedIn : req.session.isLoggedIn,
        allPickles : allPickles,
    })
}

exports.getRemovePickleFromCart =  async (req, res) => {
    const userId = req.session.user._id;
    const pickleId = req.params.pickleId;

    const currUser = await User.findById({_id : userId})
    const newCartIds = currUser.cartIds.filter(id => id.toString() != pickleId);
    currUser.cartIds = newCartIds;
    await currUser.save()
    res.redirect("/cart")
}