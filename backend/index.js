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

//api to get all products
// app.get("/", async (req, res) => {
//   try {
//     let data = await Products.find({});
//     return res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

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

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Products.findById(id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
});

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
