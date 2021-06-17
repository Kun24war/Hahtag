require('dotenv').config()
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require('connect-mongo');




require("./routes/web")(app)


//db connection
const url = "mongodb://localhost/pizza";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});



const connection = mongoose.connection;
connection.once('open', () => {
  console.log("DB connected");
}).catch(err => {
  console.log("Db failed")
});









// session config
app.use(session({
  secret: "thisismysecretcode",
  
  
  store: MongoStore.create({

    mongoUrl: "mongodb://localhost/pizza",
    collectionName:"sessions"
    
  }),
  
  saveUninitialized:true,
  resave: false,
  
  
  cookie:{ maxAge: 1000 * 60 * 60 * 24 } 
  
}))



//expressflash
app.use(flash())


//assets
app.use(express.static('public'));



//set Template Engine

app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})