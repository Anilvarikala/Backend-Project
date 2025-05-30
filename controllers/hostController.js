
const Home = require('../Models/Home')
exports.getPickleAdd = (req, res) => {
    console.log("form creating")
    res.render('host/Form')
}
exports.postPickleAdd = (req, res) => {
   /* 1. Fetch the data from the form.
   */
    const pickleData = req.body;
    const {pickleName, url, grams, price, data,description} = pickleData;
    const newPickle = new Home({pickleName, url, grams, price, data, description});

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
      })
   }) 

}