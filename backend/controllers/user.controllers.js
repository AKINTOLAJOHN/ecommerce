const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET

const signup = (req,res)=>{
    userModel.find({email:req.body.email},(err,result)=>{
        if(result.length>0){
            res.send({message:'email already exists!',status:false})
        } else{
            let form = new userModel(req.body)
            form.save((err)=>{
            if(err){
                res.send({message:'oh no, oh no!, error!',status:'500'})
            }
            else{
                res.send({message:'sign up successful',status:true})
            }
            })
        }
    })
}


const signin = (req,res)=>{
    console.log(req.body)
    let {email,password} = req.body;
    userModel.findOne({email:email},(err,result)=>{
        if(err){
            res.send({message:'internal server error'})
        }else{
            if (result){
                bcrypt.compare(password,result.password2,(err,same)=>{
                    if(err){
                        res.send({message : 'invalid password'})
                    }
                    else{
                        if(same){
                            var userDetails = {email}
                            const token=jwt.sign(userDetails,secret,{expiresIn:'120s'})
                            res.send({message:'sign in successful',token:token})
                        }
                        else{ 
                            res.status(401).send({message:'Incorrect details'})
                        } 
                    }
                })   
            }else{
                res.send({message:`invalid credentials`})
            }
        }
    })
}


const dashboard = (req,res)=>{
    const auth= req.headers.authorization;
    const token = auth.split(' ')[1];
    console.log(token)
    jwt.verify(token,secret,(err,decoded)=>{
        if(err){
            res.send({message:err.message})
        }else{
            res.send({userDetails:decoded.email,message:'verification successful'})
        }
    })
}




module.exports = {signin,signup,dashboard}