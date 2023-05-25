
const mongoose = require('mongoose')
const ProductsSchema = require('../model/product-model')
const StoresSchema = require('../model/model')

exports.getProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const owner = req.query.owner;
        const query = { owner: owner };
        const allProducts = await ProductsSchema.find(query);
        const limitData = allProducts.slice(0, limit);
        res.json(limitData)
    } catch (err) {
        res.json({ message: err })
    }
}

exports.createProduct = async (req, res) => {
    const {
        owner,
        productName,
        productPrice,
        productDescription,
        productIMG,
        quantity
    } = req.body;
    try {
        const existingStore = await StoresSchema.findOne({ _id: owner });
        if (!existingStore) {
            return res.status(201).json({ 
                message: "Owner not found in store list",
                status: false,
             });
        }
        let existingProduct = await ProductsSchema.findOne({
            owner, productName
        });
        if (existingProduct) {
            existingProduct.quantity += parseInt(quantity);
            await existingProduct.save();
            return res.status(200).json({
                message: "Updated product quantity successfully!",
                status: true,
            });
        }
        const newProduct = new ProductsSchema({
            owner,
            productName,
            productPrice,
            productDescription,
            productIMG,
            quantity: parseInt(quantity)
        });
        const savedProduct = await newProduct.save();
        await StoresSchema.findOneAndUpdate(
            { _id: req.body.owner, storeProductLength: { $exists: true } },
            { $inc: { storeProductLength: 1 } },
            { new: true }
        );

        res.status(200).json({
            message: "Created a new product successfully!",
            status: true,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getProductById = async (req, res) => {
    const productId = req.params._id;
    try {
        const product = await ProductsSchema.findById(productId)
        res.json(product)
    } catch (err) {
        res.json({ message: err })
    }
}