const express=require("express")
const booksRouter=require("./src/book")
const commentsRouter=require("./src/comments")
const studetsRoute=require("./src/students/students")
const cors =require("cors")
const listEndpoints=require("express-list-endpoints")

const server=express()// Create http server with express
// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

// if multiple host for accessing the backend
// var whitelist = ['http://localhost:3000', 'http://localhost:3001',"http://immense-depths-66658.herokuapp.com/","https://immense-depths-66658.herokuapp.com/"]
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

const port =process.env.PORT || 5000
// server.use(cors())//insecured way to define cors
//  server.use(cors(corsOptions))
server.use(express.json())// To parse request bodies into objects
// server.use("/books",cors(corsOptions),booksRouter)//cors work as a middleware also
server.use("/books",booksRouter)
server.use("/comments",commentsRouter)
server.use("/students",studetsRoute)
server.get("/",(req,res)=>{
    res.send("Hello")
})

console.log(listEndpoints(server))
server.listen(port,()=>{console.log(`I am listening at ${port}`)})