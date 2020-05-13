const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const { check, validationResult, sanitizeBody } = require("express-validator");
const uuid = require("uuid/v4");
// import { v4 as uuidv4 } from 'uuid';

const commentPath = path.join(__dirname, "comments.json");
const bookPathComment = path.join(__dirname, "../book/book.json");

const getAllComments = async () => {
  const buffer = await fs.readFile(commentPath);
  return JSON.parse(buffer.toString());
};

const getBooksComments = async () => {
  const buffer = await fs.readFile(bookPathComment);
  return JSON.parse(buffer.toString());
};

const router = express.Router();

router.get("/", async (req, res) => {
  const allComments = await getAllComments();
  res.send(allComments);
  // res.send("ok")
});

router.get("/:id", async (req, res) => {
  const comments = await getAllComments();
  const comment = comments.find((x) => x.comment_Id === req.params.id);
  if (comment) res.send(comment);
  else res.status(404).send("Not FOund");
  // res.send("ok")
});

//  - CommentID //Server Generated
//  - BookID //ASIN
//  - UserName
//  - Text
//  - Date //Server Generated
router.post(
  "/",
  [
    check("username").exists().withMessage("You need to give your user name"),
    check("text")
      .isLength({ min: 5, max: 1000 })
      .withMessage("Text between 5 to 1000 chars"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).send(errors);
    const books = await getBooksComments();
    if (!books.find((x) => x.asin === req.body.bookId))
      return res.status(404).send("Comment not found");
    const toAdd = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      comment_Id: uuid(),
    };
    const newComment = await getAllComments();
    newComment.push(toAdd);
    await fs.writeFile(commentPath, JSON.stringify(newComment));
    res.send(toAdd);
    // res.send("ok")
  }
);

router.put("/:id", async (req, res) => {
  //Is there any book with the given bookId?
  const books = await getBooksComments();
  if (req.body.bookId && !books.find((x) => x.asin === req.body.bookId))
    return res.status(404).send("Book not found");

  const comments = await getAllComments();
  console.log(comments);
  const comment = comments.find((x) => x.comment_Id === req.params.id);
  if (comment) {
    // delete req.body.comment_Id
    // delete req.body.createdAt
    req.body.updatedAt = new Date();
    const updatedVersion = Object.assign(comment, req.body);
    const index = comments.indexOf(comment);
    comments[index] = updatedVersion;
    await fs.writeFile(commentPath, JSON.stringify(comments));
    res.send(updatedVersion);
  } else res.status(404).send("Not found");
  // res.send("ok")
});

router.delete("/:id", async (req, res) => {
  const comments = await getAllComments();
  const afterDelete = comments.filter((x) => x.comment_Id !== req.params.id);
  if (comments.length === afterDelete.length) {
    return res.status(404).send("Not Found");
  } else {
    await fs.writeFile(commentPath, JSON.stringify(afterDelete));
    res.send("Comment Deleted Successfully");
  }
  // res.send("ok")
});

module.exports = router;
