const Product = require('../models/ProductModel');
const fs = require('fs');

module.exports = {
    getAllproducts: async (req, res) => {
        const products = await Product.find().sort( { pseudo: -1 } );
        console.log(products)
        res.status(200).render('listproduct', { products });
    },
    getproductbyid: async (req, res) => {
        const _id = req.params.id;
        const product = await Product.findOne({ _id });
        res.status(200).render('product', { product });
    },
    showCreate: async (req, res) => {
        res.render('create');
    },
    createproduct: async (req, res) => {
        const product = new Product({
            label: req.body.label,
            price: req.body.price,
            quantity: req.body.quantity,
            user: req.body.user,
        });
        if (req.file) {
            product.image = req.file.filename;
        }
        
        console.log(product);
        await product.save();

        const products = await Product.find().sort( { pseudo: -1 } );
        res.status(200).render('listproduct', { products });
    },

     deleteproduct : async (req,res)=>{
        const _id=req.params.id;
        await Product.findOneAndRemove({_id})
        const products = await Product.find();
        console.log(products)
        res.status(200).render('listproduct', { products });
     } ,
    

    

}