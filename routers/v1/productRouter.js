import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getByUser, getid, updateProduct } from '../../contollers/productController.js';
import upload from '../../Config/multer.js';
import { authUser } from '../../middleWare/authUser.js';


const router = express.Router()

// router.post('/create', createProduct);
router.post('/create', upload.array('images', 5), createProduct);

//get all product
router.get('/getallproduct',getAllProduct)

// get by id
router.get('/getid/:id',authUser,getid)

//Update Product
router.put('/update/:id',authUser,updateProduct)

//Delete product
router.delete('/deleteproduct/:id',deleteProduct)



router.get('/getuserproduct',authUser,getByUser)


export default router;