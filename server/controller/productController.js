
const mongoose = require('mongoose')
const ProductsSchema = require('../model/product-model')
const StoresSchema = require('../model/model')
const HistorySchema = require('../model/history')

exports.getProducts = async (req, res) => {
    try {
        const productCount = req.query.productCount;
        const owner = req.query.owner;
        const query = { owner: owner };
        if (productCount != null) {
            const allProducts = await ProductsSchema.find(query);
            const count = allProducts.length;
            res.json(count);
        } else {
            const limit = parseInt(req.query.limit) || 10;
            const allProducts = await ProductsSchema.find(query);
            const limitedData = allProducts.slice(0, limit);
            res.json(limitedData);
        }
    } catch (err) {
        res.json({ message: err });
    }
};

exports.createProduct = async (req, res) => {
    const {
        owner,
        productName,
        productPrice,
        productDescription,
        productIMG,
        quantity,
        productType
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
            quantity: parseInt(quantity),
            productType
        });
        const savedProduct = await newProduct.save();
        await StoresSchema.findOneAndUpdate(
            { _id: req.body.owner, storeProductLength: { $exists: true } },
            { $inc: { storeProductLength: 1 } },
            { new: true }
        );
        res.json(savedProduct)
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

exports.buyProductById = async (req, res) => {
    try {
      const { buyer, products } = req.body;
      for (const product of products) {
        const { _id, quantity } = product;
  
        const existingProduct = await HistorySchema.findOne({ productId: _id });
  
        if (existingProduct) {
          existingProduct.quantity += parseInt(quantity);
          await existingProduct.save();
        } else {
          const selectedProduct = await ProductsSchema.findById(_id);
  
          if (!selectedProduct) {
            return res.status(404).json({
              message: `Product with ID ${_id} not found.`,
              status: false,
            });
          }
  
          const newPurchase = new HistorySchema({
            ownerProduct: selectedProduct.owner,
            productId: _id,
            status: 'Success',
            productName: selectedProduct.productName,
            productIMG: selectedProduct.productIMG,
            productPrice: selectedProduct.productPrice,
            buyer: buyer,
            quantity: parseInt(quantity),
          });
  
          const savedPurchase = await newPurchase.save();
  
          await ProductsSchema.findOneAndUpdate(
            { _id: _id, quantity: { $exists: true } },
            { $inc: { quantity: -parseInt(quantity) } },
            { new: true }
          );
        }
      }
  
      res.status(200).json({
        message: "Successful product purchase!",
        status: true,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};