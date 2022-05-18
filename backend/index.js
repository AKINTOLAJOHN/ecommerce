const express = require('express');
const app = express();
const userRouter = require('./routes/user.route');
const adminRouter = require('./routes/admin.route')
const cors = require('cors');
const mongoose = require('mongoose')
app.use(cors());
const formidable  = require('formidable')
const cloudinary = require('cloudinary')
const fs = require('fs')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('view engine','ejs');
const jwt = require('jsonwebtoken')
require('dotenv').config()
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_APIKEY, 
    api_secret: process.env.CLOUD_APISECRET
    });
    
const PORT = process.env.PORT
const URI = process.env.MONGO_URL;
const secret = process.env.SECRET

app.use('/user',userRouter)
app.use('/admin',adminRouter)

mongoose.connect(URI, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("mongodb is connected");
}).catch((error)=>{
    console.log("mondb not connected");
});







app.listen(PORT,(req,res)=>{
    console.log('good to go')
})