const express = require("express");

// body parser library
const parser = require("body-parser");
const encodedParser = parser.urlencoded({ extended: true });
// multer library
const multer = require("multer");
const uploadProcessor = multer({ dest: "public/upload" });

const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(encodedParser);

// Submit page
app.get("/submit", (req, res) => {
  res.render("submit.ejs", {});
});

// About page
app.get("/about", (req, res) => {
  res.render("about.ejs", {});
});

//Home Page
app.get("/", (req, res) => {
  res.render("home.ejs", { arrayToBeSent: data });
});

//exited items
let items = {
  item1: {
    title: "A Drawing of Emi",
    itemDes: "SW drew an Emi during our Theatre as Art Form class. ",
    id: generateID(),
    imgSrc: "img/drawing.png",
  },
  item2: {
    title: "Emmeline",
    itemDes:
      "Susu bought these earrings for Emi's birthday. \n They're called Emmeline.",
    id: generateID(),
    imgSrc: "img/earingStar.png",
  },
  item3: {
    title: "Nici Fox",
    itemDes:
      "A Nici Fox keyring that traveled all the way from Berlin to New York!! \n - LY",
    id: generateID(),
    imgSrc: "img/nici.png",
  },
  item4: {
    title: "Note",
    itemDes: "Cute Hypercinema feedback note from Katherine. ⋆𐙚₊˚⊹♡",
    id: generateID(),
    imgSrc: "img/hypercinema.png",
  },
  item5: {
    title: "To Where? - ♡",
    itemDes: "Get me more fortune cookies!",
    id: generateID(),
    imgSrc: "img/fortuneCookie.png",
  },
  item6: {
    title: "Sea Turtle Charm",
    itemDes: "Tina sent a sea turtle from Jamaica to Emi.",
    id: generateID(),
    imgSrc: "img/turtle.png",
  },
  item7: {
    title: "A Turtle's Guide to Introversion",
    itemDes:
      "I find enjoyment in creative, philosiphical, and spiritual endeavors. \n I can sit around wondering about things...  \n magining different scenarios...\n recalling events from the past...",
    id: generateID(),
    imgSrc: "img/introvertBook.png",
  },
  item9: {
    title: "Pink _?_",
    itemDes: "A Pink _?_ traveled from Japan to New York from Bir.",
    id: generateID(),
    imgSrc: "img/bailey.png",
  },
  item10: {
    title: "Dreamcacher",
    itemDes:
      "A dreamcatcher, gifted by Susu before college, has been hanging above Emi's bed ever since.\n Emi hopes that one day, something magical will happen.",
    id: generateID(),
    imgSrc: "img/dreamcacher.png",
  },
  item11: {
    title: "Choco-Pie Birthday Cake",
    itemDes: "The BBQ at that restaurant isn't good, but the cake is cute.",
    id: generateID(),
    imgSrc: "img/cake.png",
  },
  item12: {
    title: "Star Necklace",
    itemDes:
      "Received when Emi visited Yuxi in West Lafayette, Indiana during Christmas.",
    id: generateID(),
    imgSrc: "img/necklaceStar.png",
  },
};

// array that stores all of the data on the server
let data = [];

// push existed items to array
for (let object in items) {
  data.push(items[object]);
}

// POST for upload data
app.post("/upload", uploadProcessor.single("theimage"), (req, res) => {
  // message object that holds the data from the form
  let message = {
    title: req.body.title,
    itemDes: req.body.itemDes,
    id: generateID(),
    imgSrc: "upload/" + req.file.filename,
  };
  // adding the most recent message to the top of the array
  data.unshift(message);
  // redirect to home page
  res.redirect("/");
});

// generate random ID
function generateID() {
  return Math.floor(Math.random() * 10000);
}

//Item details page
app.get("/itemDetails/:id", (req, res) => {
  const itemId = req.params.id;
  const itemDetails = data.find((post) => post.id === parseInt(itemId));
  console.log(itemDetails);
  res.render("itemDetails", {
    itemDetails: itemDetails,
  });
});

// POST for delete item
app.post("/delete/:id", (req, res) => {
  const itemId = req.params.id;
  data = data.filter((post) => post.id !== parseInt(itemId));
  res.redirect("/");
});

app.listen(5555, () => {
  console.log("server starts");
});
