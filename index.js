const exp = require("express");
const app = exp();
const fs = require("fs");
const path = require("path");
const port = 80;

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/simpleContactForm", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var contactSchema = new mongoose.Schema({
  name: String,
  lname: String,
  gender: String,
  address: String,
});

var contact = mongoose.model("Contact", contactSchema);

// express specification stuff
app.use("/static", exp.static("public")); // for serving static files
app.use(exp.urlencoded());

// pug related stuff
app.set("view engine", "pug"); // set template engine as pug
app.set("views", path.join(__dirname, "views")); // set the view directory



app.get("/", (req, res) => {
  const con = "Very fast Sale sale";
  const params = {
    title: "hey budys",
    message: "Fill the form",
    content: con,
  };

  res.render("demo", params);
});

app.post("/", (req, res) => {
  var myData = new contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("Saved");
    })
    .catch(() => {
      res.status(400).send("not Saved");
    });
  // name = req.body.name;
  // lname = req.body.lname;
  // gender = req.body.gender;
  // address = req.body.address;
  // let output = `${name} ${lname} his/her gender ${gender} and ${address}`;
  // fs.writeFileSync("output.txt", output);
  // const params = {
  //   message: "Your form is submitted Successfully",
  // };
  // res.render("demo", params);
  // res.render("demo");
});

//end points

//start the server
app.listen(port, () => {
  console.log(`the server is runnung on ${port}`);
});