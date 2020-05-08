const express =require("express")

const router =express.Router()

router.get("/",async(req,res)=>{
    res.send("OK")
})

router.post("/",async(req,res)=>{
    res.send("OK")
})

router.put("/",async(req,res)=>{
    res.send("OK")
})

router.delete("/",async(req,res)=>{
    res.send("OK")
})

module.exports=router