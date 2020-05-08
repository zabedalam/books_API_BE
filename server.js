const express=require("express")
const booksRouter=require("./src/book")

const server=express()


const port =process.env.PORT || 5000
server.use("/books",booksRouter)
server.get("/",(req,res)=>{
    res.send("Hello")
})


server.listen(port,()=>{console.log(`I am listening at ${port}`)})