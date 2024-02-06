const express = require('express');
const orderController = require('../controllers/order_controller');
const router = express.Router();

router.get('/getAll', (req,res) => orderController.order.get(req,res));
router.post('/add', (req,res) => orderController.order.add(req,res));
router.delete('/delete/:id', (req,res) => orderController.order.delete(req,res));

module.exports = router;