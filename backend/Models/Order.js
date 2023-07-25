var mongoose = require("mongoose");

const order_schema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    order_number: Number,
    quantity: Number,
    name: String,
    mobile_num: String,
    address: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", order_schema);

module.exports = Order;
