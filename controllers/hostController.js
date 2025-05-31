
const Home = require('../Models/Home')
const User = require('../Models/User')

exports.getPickleAdd = (req, res) => {
    console.log("form creating")
    res.render('host/Form',{
      currPickle : { },
      editing : false,
    })
}


exports.postPickleAdd = (req, res) => {
   /* 1. Fetch the data from the form.
   */
    const {pickleName,url,grams,price,data,description} = req.body;
   //  const url = `/uploads/${req.file.filename}`;
   //find if the pickle already exists
   //Home.findById({_id : })
   const d = new Date(data);
   d.setUTCHours(0, 0, 0, 0);
    //const {pickleName, url1, grams, price, data,description} = pickleData;
    const newPickle = new Home({pickleName, url, grams, price, data:d, description});
  
    newPickle.save().then((data) => {
      console.log(data);
    })
    .catch(err => {
        console.log("Error while adding to the database...", err);
    })

  /*
      2. Add the data in the mongodb ie add a new Pickle using pickle model.
      3. after adding successfully redirect to "/all-pickles"
   */
   res.redirect("/all-pickles")
}

exports.getAllPickles = (req,res) => {
   // fetch all the pickles from the database Backend that to from homes collection
   console.log("Iam in Homes collection")
   Home.find().then(data => {
      console.log(data);
      res.render('store/allPickles', {
        allPickles : data,
         isLoggedIn : req.session.isLoggedIn,
         user : req.session.user,
      })
   }) 

}

exports.getHostPickles = async (req, res) => {

   const allPickles = await Home.find();
   res.render("host/hostPickles", {
      allPickles : allPickles,
      isLoggedIn : req.session.isLoggedIn,
      user : req.session.user,
      userCount : await User.countDocuments()
   })
}

exports.getDeletePickle = async (req, res) => {
   const userId = req.session.user._id;
   const pickleId = req.params.pickleId;
   // delete pickle from the Home.
   const sucess = await Home.findByIdAndDelete({_id : pickleId});
   if(sucess){
      res.redirect("/host/host-pickles")
   }
}


exports.getEditPickle = async (req, res) => {
    const pickleId = req.params.pickleId;
    // find and update.
    // find the details of the current editable pickle and send it to the add 
    // form pickle add section. use their..
    const currPickle = await Home.findById({_id : pickleId})
    console.log(currPickle);
    res.render("host/Form", {
      currPickle : currPickle,
      editing : true,
    })
   // res.send("editing..")
}


exports.postEditPickle = async (req, res) => {
   const pickleId = req.params.pickleId;
   const {pickleName,url,grams,price,data,description} = req.body;
   //upadet the above pickle.
   const currEditablePickle = await Home.findById({_id : pickleId})
   currEditablePickle.pickleName = pickleName;
   currEditablePickle.url = url;
   currEditablePickle.grams = grams;
   currEditablePickle.price = price;
   currEditablePickle.data = data;
   currEditablePickle.description = description;
   const done = currEditablePickle.save()
   if(done)
   res.redirect("/host/host-pickles");
}