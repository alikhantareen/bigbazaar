var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const order_schema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    order_number: Number,
    pending: Boolean,
    name: String,
    mobile_num: String,
    address: String,
    payment_method: String
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", order_schema);

module.exports = Order;
