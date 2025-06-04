
const express = require('express');
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter')

const app = express();

// using ejs for dynamic content.

app.use(express.json())
app.use(express.urlencoded())


app.set('view engine','ejs')
app.set('views', 'views')

// set up the session
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://Anil:Joymax%40123@anil.l5zcbng.mongodb.net/Backend";



const store = new MongoDBStore({
  uri : mongoUrl,
  collection : 'sessions'
});

app.use(session({
  secret : 'Anil Varikala',
  resave : false,
  saveUninitialized : true,
  store
}))

app.use((req,res,next) => {
   req.isLoggedIn = req.session.isLoggedIn;
   console.log(req.isLoggedIn)
   next();
});
app.use(userRouter)
app.use(hostRouter)
app.use(authRouter)


const PORT = 3001;


//Multer




mongoose.connect(mongoUrl).then(() => {
       app.listen(PORT , () => {
       console.log(`Server is running on http://localhost:${PORT}`)
    }) 
   
}).catch(err => console.log(err));
