
const mongoose = require('mongoose')
const StoresSchema = require('../model/model')

exports.getStores = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const collection = await CollectionSchema.find();
        const limitData = collection.slice(0, limit);
        res.json(limitData)
    } catch (err) {
        res.json({ message: err })
    }
}

exports.createStore = async (req, res) => {
    const Store = new StoresSchema({
        storeId: req.body.storeId,
        storeName: req.body.storeName,
        storeDescription: req.body.storeDescription,
        storeAvatar: req.body.storeAvatar,
        storeBanner: req.body.storeBanner,
        storeProductLength: req.body.storeProductLength,
    })
    try {
        const saveStore = await Store.save().then((result) => {
            res.status(200).json({
                message: "created a successful store!",
            })
        })
        res.json(saveStore)
    } catch (err) {
        res.json({ message: err })
    }
}

exports.getStoreById = async (req, res) => {
    try {
        const store = await StoresSchema.findById(req.params._id)
        res.json(store)
    } catch (err) {
        res.json({ message: err })
    }
}


exports.removeStore = (req, res) => {
    StoresSchema.remove({ _id: req.params._id }, function (err, response) {
        if (err) {
            res.status(200).json({
                code: 200,
                message: "Error from removeStore"
            })
        } else {
            res.status(201).json({
                code: 201,
                message: "Store delete successful!",
                data: response
            })
        }
    })
}

exports.updateStore = async (req, res) => {
    const updateStore = {
        storeId: req.body.storeId,
        storeName: req.body.storeName,
        storeDescription: req.body.storeDescription,
        storeAvatar: req.body.storeAvatar,
        storeBanner: req.body.storeBanner,
        storeProductLength: req.body.storeProductLength,
    };
    StoresSchema.findByIdAndUpdate(
        { _id: req.params._id },
        updateStore,
        function (err, response) {
            if (err) {
                res.status(200).json({
                    code: 200,
                    message: "Store update failed!",
                });
            } else {
                res.status(201).json({
                    code: 201,
                    message: "Store update successful!",
                    data: response,
                });
            }
        }
    );
}
