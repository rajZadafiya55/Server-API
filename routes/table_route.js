const express = require('express');
const tableController = require('../controllers/table_controller');
const router = express.Router();

router.get('/getAll', (req,res) => tableController.table.get(req,res));
router.post('/add', (req,res) => tableController.table.add(req,res));
router.delete('/delete/:id', (req,res) => tableController.table.delete(req,res));
router.put('/edit/:id', (req,res) => tableController.table.edit(req,res));

module.exports = router;