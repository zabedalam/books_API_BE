const express=require("express")
const fs=require("fs-extra")
const path=require("path")
const router=express.Router()// will be the middleware that will take care for this route
const studentsFilePath=path.join(__dirname,"students.json")

const readFile=async()=>{
    const buffer=await fs.readFile(studentsFilePath)
    const content=buffer.toString()
    return JSON.parse(content)
}

router.get("/",async(req,res)=>{
    res.send("All students")
})

router.get("/:id",async(req,res)=>{
    res.send("Single Student")
})

router.post("/",async(req,res)=>{
    res.send("ok")
})

router.delete("/:id",async(req,res)=>{
    res.send("ok")
})

router.put("/:id",async(req,res)=>{
    res.send("ok")
})

module.exports=router