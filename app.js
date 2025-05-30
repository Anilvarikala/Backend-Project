
const express = require('express');
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');

const app = express();

// using ejs for dynamic content.

app.use(express.json())
app.use(express.urlencoded())


app.set('view engine','ejs')
app.set('views', 'views')

app.use(userRouter)
app.use(hostRouter)



const PORT = 3000;

const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://Anil:Joymax%40123@anil.l5zcbng.mongodb.net/Backend";
mongoose.connect(mongoUrl).then(() => {
       app.listen(PORT , () => {
       console.log(`Server is running on http://localhost:${PORT}`)
    }) 
   
}).catch(err => console.log(err));
