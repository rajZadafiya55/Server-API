const express = require('express');
const paymentController = require('../controllers/payment_controller');
const router = express.Router();

router.get('/getAll', (req,res) => paymentController.payment.get(req,res));
router.post('/add', (req,res) => paymentController.payment.add(req,res));
router.delete('/delete/:id', (req,res) => paymentController.payment.delete(req,res));

module.exports = router;