const express = require('express');
const itemController = require('../controllers/item_controller');
const router = express.Router();
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({storage:storage});

router.get('/getAll', (req,res) => itemController.item.get(req,res));
router.get('/getById/:id', (req,res) => itemController.item.getById(req,res));
router.post('/add', upload.single('imagename') , (req,res) => itemController.item.add(req,res));
router.delete('/delete/:id',(req,res) => itemController.item.delete(req,res));
router.patch('/edit/:id', upload.single('imagename') ,(req,res) => itemController.item.edit(req,res));

module.exports = router;