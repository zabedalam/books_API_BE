const express=require("express")
const fs =require("fs-extra")
const path =require("path")
const {check,validationResult,sanitizeBody}=require("express-validator")
const uuid=require("uuid")

const commentPath=path.join(__dirname,"comments.json")
const bookPathComment=path.join(__dirname,"../book/books.json")

const getAllComments=async()=>{
    const buffer=await fs.readFile(commentPath)
    return JSON.parse(buffer.toString())
}

const getBooksComments=async()=>{
    const buffer=await fs.readFile(bookPathComment)
    return JSON.parse(buffer.toString())
}

const router =express.Router()

router.get("/",async(req,res)=>{
    res.send("ok")
})

router.get(":/id",async(req,res)=>{
    res.send("ok")
})

router.post("/",async(req,res)=>{
    res.send("ok")
})

router.put("/:id",async(req,res)=>{
    res.send("ok")
})

router.delete("/:id",async(req,res)=>{
    res.send("ok")
})

module.exports=router
