var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const order_schema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    pending: Boolean,
    name: String,
    mobile_num: String,
    address: String,
    payment_method: String,
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: {
      rate: Number,
      count: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", order_schema);

module.exports = Order;
