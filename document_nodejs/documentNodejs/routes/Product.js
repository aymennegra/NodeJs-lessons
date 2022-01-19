var express = require('express');
var router = express.Router();
const path = require('path');

const ProductController = require('../Controller/ProductController');
/* GET users listing. */
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'./public/images');
  },
  filename: (req,file,cb) => {
    const newFileName = new Date().getTime().toString() + path.extname(file.originalname);
    cb(null,newFileName)
  }
})

const upload = multer({ storage })
router.get('/',ProductController.getAllproducts) 
router.get('/:id',ProductController.getproductbyid) 
router.route('/delete/:id').get(ProductController.deleteproduct)
router.route('/create')
.get(ProductController.showCreate)
.post(upload.single('image'),ProductController.createproduct)


module.exports = router;