const express = require('express')
const port = 3000
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");
const app = express();
const a = [];
global.cat= "";
global.keey="";
const cont = mongoose.createConnection("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});
const sas = mongoose.createConnection("mongodb://localhost:27017/saDB", {
  useNewUrlParser: true
});
const bcrypt = require("bcrypt");
const salt = 10;
const userSchema = {
  email: String,
  password: String
};
const User = cont.model("User", userSchema);
const miniSchema = {
  title: String,
  content: String
};
const {spawn} = require('child_process');
const sasSchema = new mongoose.Schema({url: String,});
const Url = sas.model("Url", sasSchema);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
var titles = ["aaaa", "kkkkk"];
var contents = ["aaaa", "kkkkk"];
app.get("/login", function(res, res) {
  res.render("login");
});
app.get("/admin", function(res, res) {
  res.render("admin");
});
app.get("/write", function(res, res) {
  res.render("write");
});
app.get("/", function(res, res) {
  res.render("home");
});
app.get("/report", function(res, res) {
  res.render("report");
});
app.post("/report", function(res, res) {
  res.render("report");
});
app.get("/analyse", function(res, res) {
  res.render("analy");
});

app.post("/analyse", function(res, res) {
  res.render("analy");
});

app.post("/analysere", function(req, res) {
   keey = req.body.key;
  var categ = cat;
  const python = spawn('python', ['./scraperanaly.py',categ,keey]);
  python.stdout.on('data', (data) => {
   var site = data.toString();
    console.log(site);
    res.render("anares", {
      urls: site,
      word:keey
    });
  });
   python.stderr.on('data', (data) => {
    console.error('err: ', data.toString());
  });
  python.on('error', (error) => {
    console.error('error: ', error.message);
  });
python.on('close', (code) => {
    console.log('child process exited with code ', code);
  });
});
app.post("/admin", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({
      email: username
    })
    .then(function(err, foundUser) {
      if (err) {
        if (err) {
          bcrypt.compare(password, err.password, function(err, result) {
            // result == true
            if (result === true) {
              res.redirect("/dash")
            }
          });

        }

      } else {

        res.redirect("/admin")
      }
    });
});
app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({
      email: username
    })
    .then(function(err, foundUser) {
      if (err) {
        if (err) {
          bcrypt.compare(password, err.password, function(err, result) {
            // result == true
            if (result === true) {
              res.redirect("/dash")
            }
          });

        }

      } else {

        res.redirect("/login")
      }
    });
});
app.post("/crawl", function(req, res) {
 cat= req.body.cate;
  const key= "";
const python = spawn('python', ['./scraper.py',cat,key]);
  python.stdout.on('data', (data) => {
   var site = data.toString();
    console.log(site);
    res.render("res", {
      urls: site,
      nam:cat
    });
  });

  python.stderr.on('data', (data) => {
    console.error('err: ', data.toString());
  });

  python.on('error', (error) => {
    console.error('error: ', error.message);
  });

  python.on('close', (code) => {
    console.log('child process exited with code ', code);
  });

});





app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("css"));




app.get("/dash", function(req, res) {

    res.render("dash");
});


app.get('/analy', function(req, res) {
res.render("report")
});







app.post("/write", function(req, res) {
  var title = req.body.title;
  res.redirect("/analy")
  console.log(title);

});



app.listen(port, function() {
  console.log("started");
});
