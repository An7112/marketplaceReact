const express = require('express')
const router = express.Router()
const Stores = require('../controller/controller')
const multer = require('multer');
const upload = multer();

router.get('/stores', Stores.getStores)
router.get('/stores/listId', Stores.getListId)
router.get('/stores/:_id', Stores.getStoreById)
router.post('/stores', upload.none(), Stores.createStore)
router.patch('/stores/:_id', upload.none(), Stores.updateStore)
router.delete('/stores/:_id', Stores.removeStore)

module.exports = router
