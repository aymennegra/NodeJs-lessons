const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema(
    {
    label: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    image:{type:String},
    user:{type:String},
    
    },
    {
    timestamps: true
    }
);

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
