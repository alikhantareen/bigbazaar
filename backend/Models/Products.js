var mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        id: Number,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        rating: {
            rate: Number,
            count: Number
        }
    },
    {
        timestamps: true
    }
)

const Products = mongoose.model('Products', productSchema);

module.exports = Products;