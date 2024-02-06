const express = require('express');
const router = express.Router();

const itemRoute = require('./item_route')
const adminRoute = require('./admin_route')
const reviewRoute = require('./review_route')
const tableRoute = require('./table_route')
const paymentRoute = require('./payment_route')
const categoryRoute = require('./category_route')
const orderRoute = require('./order_route')
const contactRoute = require('./contact_route')

router.use('/item', itemRoute);
router.use('/register', adminRoute); 
router.use('/review', reviewRoute);
router.use('/table', tableRoute);
router.use('/payment',paymentRoute);
router.use('/category',categoryRoute);
router.use('/order',orderRoute);
router.use('/contact',contactRoute);

module.exports = router;