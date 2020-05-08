const express =require("express")
const fs=require("fs-extra")
const path=require("path")
const {check,validationResult,sanitizeBody}=require("express-validator")
const booksJsonPath=path.join(__dirname,"book.json")
const getBooks=async()=>{
const buffer=await fs.readFile(booksJsonPath)
console.log(buffer)
return JSON.parse(buffer.toString())
}
const router =express.Router()

router.get("/",async(req,res)=>{
    res.send(await getBooks())
    // res.send("OK")
})

router.get("/:asin",async(req,res)=>{
    const books=await getBooks()
    const book=books.find(b=>b.asin===req.params.asin)
    if(book)
    res.send(book)
    else
    res.status(404).send("Not found")
})

router.post("/",[check("asin").exists().withMessage("You should specify the asin"),
check("title").exists().withMessage("Title is required"),
check("category").exists().withMessage("Category is required"),
check("price").isNumeric().withMessage("Price should be a number"),
check("img").exists().withMessage("Img is required"),
sanitizeBody("price").toFloat()],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    res.status(400).send(errors)
    const books =await getBooks()
    const asinCheck =books.find(x=>x.asin===req.body.asin)
    if(asinCheck)
    res.status(500).send("ASIN should be unique")
    books.push(req.body)
    await fs.writeFile(booksJsonPath,JSON.stringify(books))
    res.status(201).send("Created")

    // res.send("OK")
})

router.put("/:asin",async(req,res)=>{
    
    // res.send("OK")
})

router.delete("/",async(req,res)=>{
    res.send("OK")
})

module.exports=router