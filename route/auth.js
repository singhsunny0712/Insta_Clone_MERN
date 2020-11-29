const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model("User")
const bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
const {JWT_SECRET}=require('../keys');
const requireLogin=require("../middleWare/requireLogin");

router.get('/',(req,res)=>{
    res.send("home page");
})

router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello buddy!!");
});

router.post('/signup',(req,res)=>{
    
    const {name,email,password}=req.body;
    
    
    if(!email || !password || !name){
        return  res.status(422).json({error:"plase add the all the field"})
    }
    
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"email id already exist"});
        }
        
        bcrypt.hash(password,12)
        .then(hashpassword =>{
            const user=new User({
                name,
                email,
                password:hashpassword
            });
            
            user.save()
            .then(user =>{
                // console.log(user);
                res.json({message:"Saved successfully"});
            })
            .catch(err =>{
                console.log(err);
            })
        })

        
    })
    .catch(err =>{
        
        console.log(err);
    })

})

router.post('/signin',(req,res)=>{
    console.log("i am in signin get")
    const {email,password}=req.body;
    if(!email || ! password){
        return res.json({error:"Please fill the all field for sing in"});
    }

    User.findOne({email:email})
    .then(savedUser =>{
        if(!savedUser){
            res.send(422).json({message:"Invaild password or password"});
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch =>{
            if(doMatch){

                const token=jwt.sign({_id:savedUser._id},JWT_SECRET);
                res.json({token});
                
            }else{
                return res.status(422).json({message:"Password in wrong"});
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
})

module.exports= router;