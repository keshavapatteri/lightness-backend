import express from 'express'
import { addItemToCart, clearCart, getAllCart, getCart, removeItemFromCart } from '../../contollers/cartController.js';
import { authUser } from '../../middleWare/authUser.js';

const router = express.Router()

//add 
router.post('/add',authUser,addItemToCart)

//remove 1 by one
router.delete('/remove/:productId',authUser,removeItemFromCart)

//get with user id
router.get('/get/:userId',authUser,getCart)

//delete all by user id
router.delete('/clear/:id',authUser,clearCart)


router.get('/getallcart',authUser,getAllCart)
export default router;