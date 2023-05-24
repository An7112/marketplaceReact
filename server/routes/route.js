const express = require('express')
const router = express.Router()
const Stores = require('../controller/controller')

router.get('/stores', Stores.getStores)
router.get('/stores/:_id', Stores.getStoreById)
router.post('/stores', Stores.createStore)
router.patch('/stores/:_id', Stores.updateStore)
router.delete('/stores/:_id', Stores.removeStore)

module.exports = router
