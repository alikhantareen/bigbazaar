const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const app = express();
const PORT = 5050;
const Products = require("./Models/Products");
const User = require("./Models/User");
const Order = require("./Models/Order");

//Database connection
(async () => {
  await mongoose.connect(
    "mongodb+srv://alikhantareen:Pakistan786@cluster0.po7h8av.mongodb.net/bazar_db"
  );
  console.log("MongoDB connected");
})();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get all products
app.get("/products", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data = await Products.find({});
    const paginatedData = data.slice(startIndex, endIndex);
    return res.status(200).json(paginatedData);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//get specific product
app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Products.findById(id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
});

//placing order
app.post("/placeOrder", async (req, res) => {
  //incoming arrays of objects
  const data = req.body;
  try {
    const inInserted = await Order.insertMany(data);
    return res.status(200).json({ respose: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ response: false });
  }
});

//get users orders
app.get("/profile/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const list_of_products = await Order.find({user: id});
    return res.status(200).json(list_of_products);
  } catch (error) {
    return res.status(404).json({ res: false });
  }
})

// Handling user signup
const signUp = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please Provide Required Information",
    });
  }
  const hash_password = await bcrypt.hash(password, 10);

  const userData = {
    email,
    hash_password,
  };

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User already registered",
    });
  } else {
    User.create(userData).then((user, err) => {
      if (err) res.status(400).json({ err });
      else {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        const { _id, email } = user;
        res.status(200).json({
          message: "User created Successfully",
          token,
          user: { _id, email },
        });
      }
    });
  }
};

const signIn = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({
        message: "Please enter email and password",
      });
      return;
    }

    const user = await User.findOne({ email: req.body.email });
    const authenticated = await user.authenticate(req.body.password);

    if (user) {
      if (authenticated) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        const { _id, email } = user;
        res.status(200).json({
          token,
          user: { _id, email },
        });
      } else {
        res.status(400).json({
          message: "Something went wrong!",
        });
      }
    } else {
      res.status(404).json({
        message: "User does not exist..!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

app.post("/signup", signUp);
app.post("/login", signIn);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// app.post("/insert", async (req, res) => {
//     try {
//       const data = req.body;
//       const inInserted = await Products.insertMany(data);
//       return res.status(200).json({ message: "Data has been inserted" });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ error: "Something went wrong" });
//     }
//   });
