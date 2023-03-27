const express = require("express");
const {UserModel} = require("../model/user.model");
const {hash,compare} = require("bcrypt");
const jwt = require("jsonwebtoken")
const userRouter = express.Router()

userRouter.post("/register", (req,res) => {
    try{
        const {name,email,gender,password,age,city,is_married} = req.body;
        hash(password, 5, async(err,hash) => {
            const user = new UserModel({name,email,gender,password:hash,age,city,is_married});
            await user.save();
            res.status(200).send({"msg":"Registration Successful!"})
        })
    }
    catch(err){
        res.status(400).send({"msg":"Registration Failed!"})
    }
})

userRouter.post("/login", async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        compare(password,user.password, (err, matched) => {
            if(matched){
                res.status(200).send({"msg":"Login Successful!", token:jwt.sign({"name":"backend"}, "fullstack")})
            }
            else{
                res.status(400).send({"msg":"Login Successful!"})
            }
        })
    }
    catch(err){
        res.send(err.message)
    }
})

module.exports={userRouter}