const { check, validationResult } = require("express-validator");
const User = require("../Models/User")
const bcrypt = require('bcryptjs')

exports.getSignup = (req, res) => {
   res.render('auth/Signup');
}

exports.postSignup = [
  
  check('firstName')
  .trim()
  .isLength({min : 3})
  .withMessage("First Name should be of atleast 3 characters")
  .isAlpha()
  .withMessage("First Name should be of Alpha Numeric"),


  check('lastName')
   .trim()
  .isLength({min : 3})
  .withMessage("Last Name should be of atleast 3 characters")
  .isAlpha()
  .withMessage("Last Name should be of Alpha Numeric"),

  check('email')
  .trim()
  .isEmail()
  .withMessage("Email is not valid...")
  .normalizeEmail() 
,
  check('password')
  .trim()
  .isLength({min:6})
  .withMessage("Password should be atleast 6 characters")
 ,
  check('confirmPassword')
  .isLength({min:6})
  .withMessage("Password should be atleast 6 characters")
  .custom((value, {req}) => {
    if(value !== req.body.password){
      throw new Error("Password is Not matching...")
    }
    return true;
  })
,
  check('userType')
  .isIn(['guest','host'])
  .withMessage("Only guest or host..")

   , (req,res,next) => {
       console.log(req.body)
       const {firstName, lastName,email,password,confirmPassword,userType} = req.body;
       const errors = validationResult(req);

       if(!errors.isEmpty()){
         return res.status(422).render('auth/Signup', {
           errors : errors.array().map(err => err.msg)
         })
       }
       // create a new User
       // hash the password.
       bcrypt.hash(password, 12).then(hashPassword => {
          // new User.
         
          const user = new User({
             firstName, lastName, email, password : hashPassword, userType
          })
          console.log(user)
          user.save().then((result) => {
            if(result){
                res.redirect("/login") 
            }
          }).catch(err => {
            // res.redirect("/")
            res.render("auth/signup")
          })
         // res.redirect("/") 
       })


   } 


]

exports.getLogin = (req, res) => {
    res.render("auth/Login");
}

exports.postLogin = (req,res) => {
 /// console.log(req.body);
  const {email, password} = req.body;
  console.log(req.body);
  // validate email and password in the with the db.
  User.findOne({email : email}).then((user) => {
    if(!user) return res.redirect("/login")
    bcrypt.compare(password && password, user.password).then((isMatch) => {
    if(isMatch){
      console.log("Logged in successfully.")
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/") 
    }
    else{
      //password not matched

      res.redirect("/login")
    }
  }
)
})}

exports.postLogout = (req, res) => {
  req.session.destroy(err => {
    if(err){
      console.log(err);
    }
    else{
      res.redirect("/login");
    }
  })
}
  
