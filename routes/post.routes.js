
const express = require("express");
const {PostModel} = require("../model/post.model");

const postRouter = express.Router();

postRouter.get("/", async (req,res) => {
    const {page} = req.query;
    try{
        const perPage = 3;
        let pageP = 1;
        if(page){
            pageP = page
            const posts = await PostModel.find({userId:req.body.userId}).skip(perPage * (pageP - 1)).limit(perPage);
            res.status(200).send(posts);
        }
        else{
            const posts = await PostModel.find({userId:req.body.userId});
             res.status(200).send(posts);
        }
        
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRouter.get("/top", async (req,res) => {
    try{
        const posts = await PostModel.find().sort({no_of_comments : -1}).limit(3)
        res.status(200).send(posts);
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRouter.post("/add", async (req,res) => {
    try{
        const payload = req.body;
        const post = new PostModel(payload);
        await post.save()
        res.status(200).send({"msg":"A new post has been made"});
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRouter.patch("/update/:postId", async (req,res) => {
    const {postId} = req.params;
    const payload = req.body
    try{
        await PostModel.findByIdAndUpdate({_id:postId},payload)
        res.status(200).send({"msg":"The post has been updated"});
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRouter.delete("/delete/:postId", async (req,res) => {
    const {postId} = req.params;
    try{
        await PostModel.findByIdAndDelete({_id:postId})
        res.status(200).send({"msg":"The Post has been deleted"});
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={postRouter}