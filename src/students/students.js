const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const uuid = require("uuid/v4");
const router = express.Router(); // will be the middleware that will take care for this route
const studentsFilePath = path.join(__dirname, "students.json");

const readFile = async () => {
  const buffer = await fs.readFile(studentsFilePath);
  const content = buffer.toString();
  return JSON.parse(content);
};

router.get("/", async (req, res) => {
  const students = await readFile();
  res.send(students);
  // res.send("All students")
});

router.get("/:id", async (req, res) => {
  const students = await readFile();
  const student = students.find((x) => x._id === req.params.id);
  if (student) res.send(student);
  else res.status(404).send("Not found");
  // res.send("Single Student")
});

router.post("/", async (req, res) => {
   const previousStudents=await readFile()
   const student=previousStudents.find(x=>x.email===req.body.email)
    if(student)
    res.status(500).send("Cannot create:email already use")
    // req.body._id=uuid()
    // req.body.creationTime=new Date()
    const toAdd = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        _id: uuid(),
      };
      previousStudents.push(toAdd)
      await fs.writeFile(studentsFilePath,JSON.stringify(previousStudents))
      res.send(toAdd)

//   res.send("ok");
});

router.delete("/:id", async (req, res) => {
const students=await readFile()
const studentsToRemain=students.filter(x=>x._id!==req.params.id)
if(studentsToRemain.length<students.length){
    await fs.writeFile(studentsFilePath,JSON.stringify(studentsToRemain))
    res.send("Removed")
}
else
res.status(404).send("Not found")

//   res.send("ok");
});

router.put("/:id", async (req, res) => {
    const students=await readFile()
    const student =students.find(x=>x._id===req.params.id)
    if(student)
    {
        const mergedStudent=Object.assign(student,req.body)//copy the properties in req.body on student
        const position=students.indexOf(student)
        students[position]=mergedStudent
        await fs.writeFile(studentsFilePath,JSON.stringify(students))
        res.send(mergedStudent)
        
    }
    else
    res.status(404).send("Not found")
//   res.send("ok");
});

router.post("/checkEmail/:email",async(req,res)=>{
    const students=await readFile()
    res.send(students.find(x=>x.email===req.params.email))
    ?"Email in use":"Email not in use"
})

module.exports = router;
