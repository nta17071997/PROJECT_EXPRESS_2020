require('dotenv').config();
const express = require("express");
var mongoose = require('mongoose');
const app = express();
var fileUpload = require("express-fileupload");
var cloudinary = require("cloudinary").v2;
var cookieParser = require("cookie-parser");

var bookRoute = require("./routes/book.route");
var userRoute = require("./routes/users.route");
var transactionRoute = require("./routes/transactions.route");
var authRoute = require("./routes/auth.route");
var cartRoute = require("./routes/cart.route");
var sessionMiddleware = require('./middlewares/session.middleware');

var apiTransactionRoute = require('./api/routes/transaction.route');
var apiAuthRoute = require('./api/routes/auth.route');
var apiUserRoute = require('./api/routes/user.route');
var apiBookRoute = require('./api/routes/book.route');
var apiCartRoute = require('./api/routes/cart.route');

mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,}, function(err){
    if(err){
        console.log('Mongodb connected error ! ')
    }else{
        console.log('Mongodb conected successfuly.');
    }
});

const bodyParser = require('body-parser');
const cors = require('cors'); 

//var body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "pug");
app.set("views", "./views");

app.use(
  fileUpload({
    useTempFiles: true
  })
);
cloudinary.config({
  cloud_name: "nguyenthanhan",
  api_key: "339941846778115",
  api_secret: "prD1h_aJXYSsFuQqsY2Ke-C4nPs"
});
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser('ads'));
app.use(sessionMiddleware);

app.get("/", (req, res) => {
  res.render("index", {
    name: "I love CodersX"
  });
});

//API
app.use('/api/transactions', apiTransactionRoute);
app.use('/api/auth', apiAuthRoute);
app.use('/api/users', apiUserRoute);
app.use('/api/books', apiBookRoute);
app.use('/api/cart', apiCartRoute);

// book
app.use("/book", bookRoute);
// Users
app.use("/users",  userRoute);
//Transactions
app.use("/transactions", transactionRoute);
//Auth
app.use("/auth", authRoute);
//Cart
app.use("/cart", cartRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
