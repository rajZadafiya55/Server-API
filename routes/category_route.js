const express = require('express');
const categoryController = require('../controllers/category_controller');
const router = express.Router();

router.get('/getAll', (req,res) => categoryController.category.get(req,res));
router.post('/add', (req,res) => categoryController.category.add(req,res));
router.delete('/delete/:id', (req,res) => categoryController.category.delete(req,res) );
router.put('/edit/:id', (req,res) => categoryController.category.edit(req,res) );

module.exports = router;