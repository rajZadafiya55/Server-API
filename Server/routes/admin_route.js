const express = require('express');
const adminController = require('../controllers/admin_controller');
const router = express.Router();


router.get('/getAll', (req,res) => adminController.admin.get(req,res));
router.post('/add', (req,res) => adminController.admin.add(req,res) );
router.post('/login', (req,res) => adminController.admin.login(req,res) );

module.exports = router;