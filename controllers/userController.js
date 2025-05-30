
const Favourite = require('../Models/Favourite');
const Home = require('../Models/Home')
exports.getHome = (req,res,next) => {
   res.render('store/Home')
}
exports.getPickleDetails = (req, res) => {
    const pickleId = req.params.pickleId;
    Home.findById(pickleId).then((pickle) => {
        res.render('store/pickleDetail', {
            pickle : pickle,
        })
    }).catch(err => console.log(err));   
}

exports.postFavouriteAdd = (req, res) => {
    const pickleId = req.params.pickleId;
    console.log(pickleId);
    Favourite.find({favouriteId : pickleId}).then(exist => {
        if(exist) return res.redirect("/favourites");
    })
    const fav = new Favourite({favouriteId : pickleId});
    fav.save().then((re) => {
        if(re){
          res.redirect('/favourites')
        }
    }).catch(err => {
        console.log(err);
    })
}

exports.getFavourites = (req, res) => {
    Home.find().then((allPickles => {
        Favourite.find().then((favouritesIds) => {
            allPickles = allPickles.filter(pickle => {
                return favouritesIds.some(fav => {
                    return fav.favouriteId.toString() === pickle._id.toString();
                });
            })
            console.log(allPickles)
            res.render("store/favourites", {
                allPickles : allPickles
            })
        })
    }))
}

exports.getFavouriteRemove = (req, res) => {
    const pickleId = req.params.pickleId;
    console.log(pickleId);
    Favourite.deleteOne({favouriteId : pickleId}).then((result) => {
        if(result) {
            res.redirect('/favourites');
        }
        else{
            console.log("Error while deleting..");
        }
    })
}