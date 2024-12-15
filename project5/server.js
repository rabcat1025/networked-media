const express = require("express"); //import express

// body parser library
const parser = require("body-parser");
const encodedParser = parser.urlencoded({ extended: true });
// multer library
const multer = require("multer");
// use to be named "uploadprocessor"
const upload = multer({
  dest: "public/uploads",
});
// import database nedb
const nedb = require("@seald-io/nedb");

// create an instance of express
const app = express();

app.set("view engine", "ejs"); //set the default folder for any static files such as assets, css, html
app.use(express.static("public")); // allows us to use ejs
app.use(encodedParser); // middleware to make sure the bits and bytes can be understood by the app

//New Database
let database = new nedb({
  filename: "database.txt",
  autoload: true,
});

//Home Page
app.get("/", (request, response) => {
  // search that we are using to retrieve data from db
  // if we want everything in the database, we set query to be an empty obj
  let query = {};
  let sortQuery = {
    timestamp: -1, // sort in reverse chronological order
  };

  database
    .find(query)
    .sort(sortQuery)
    .exec((err, retreivedData) => {
      response.render("home.ejs", { posts: retreivedData });
    });
});

app.post("/upload", upload.single("theimage"), (req, res) => {
  let currDate = new Date();

  let data = {
    text: req.body.text,
    selectedplant: "img/" + req.body.selectedplant + ".png",
    timestamp: currDate.getTime(),
    top: generateNum(),
    left: generateNum(),
  };

  database.insert(data, (err, newData) => {
    console.log(newData);
    res.redirect("/");
  });
});

app.get("/post/:id", (request, response) => {
  let id = request.params.id;

  let query = {
    _id: id,
  };

  database.findOne(query, (err, individualPost) => {
    response.render("singlepost.ejs", { post: individualPost });
  });
});

function generateNum() {
  return Math.floor(Math.random() * 5000);
}
console.log(generateNum());

app.listen(9981, () => {
  console.log("server starts");
});
