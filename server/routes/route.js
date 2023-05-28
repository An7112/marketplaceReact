const express = require('express')
const router = express.Router()
const Stores = require('../controller/controller')
const Products = require('../controller/productController')
const multer = require('multer');
const upload = multer();

router.get('/stores', Stores.getStores)
router.get('/stores/listId', Stores.getListId)
router.get('/stores/:_id', Stores.getStoreById)
router.post('/stores', upload.none(), Stores.createStore)
router.patch('/stores/:_id', upload.none(), Stores.updateStore)
router.delete('/stores/:_id', Stores.removeStore)

router.get('/products', Products.getProducts)
router.get('/products/:_id', Products.getProductById)
router.post('/products', upload.none(), Products.createProduct)
router.get('/productCount', Products.getProductLength);

module.exports = router
