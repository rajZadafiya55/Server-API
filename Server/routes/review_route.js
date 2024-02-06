const express = require('express');
const reviewController = require('../controllers/review_controller');
const router = express.Router();

router.get('/getAll', (req,res) => reviewController.review.get(req,res));
router.post('/add', (req,res) => reviewController.review.add(req,res));
router.delete('/delete/:id', (req,res) => reviewController.review.delete(req,res));

module.exports = router;