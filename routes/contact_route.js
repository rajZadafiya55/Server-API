const express = require('express');
const contactController = require('../controllers/contact_controller');
const router = express.Router();

router.get('/getAll', (req,res) => contactController.contact.get(req,res));
router.post('/add', (req,res) => contactController.contact.add(req,res));
router.delete('/delete/:id', (req,res) => contactController.contact.delete(req,res));

module.exports = router;