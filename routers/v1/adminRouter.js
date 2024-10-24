import express from 'express'
import { addproduct, adminCreate, adminLogin, AdminLogout, checkAdmin, clear, deleteProduct, deleteUser, getAllProduct, getAllUsers, getById, getcart, updateProduct } from '../../contollers/adminController.js';
import { authAdmin } from '../../middleWare/authAdmin.js';
import upload from '../../Config/multer.js';
const router = express.Router()

router.post('/admincreate', adminCreate)

//cheack user for frontent protection
router.get('/cheack-user', authAdmin, checkAdmin)

// login
router.post("/login", adminLogin);

// admin logout
router.post('/logout', authAdmin, AdminLogout)


//user=================>  

router.get("/user", authAdmin, getAllUsers);

// Route to delete a user by ID (admin only)
router.delete("/delete/:id", authAdmin, deleteUser);

//=======================> Cart
//Get All
router.get("/getcart", authAdmin, getcart);

//clear =============================================> Iam not cheack with postman
router.delete('/clearall', authAdmin, clear)


//product=============>

//Add Product 
router.post('/addproduct', upload.array('images', 5), authAdmin, addproduct)
//get all product
router.get('/getallproduct', authAdmin, getAllProduct)

//get by id
router.get('/getbyid/:id',authAdmin,getById)


//update product
router.put('/editproduct/:id', authAdmin, updateProduct)

//Delete Product

router.delete('/deleteproduct/:id', authAdmin, deleteProduct)


export default router;