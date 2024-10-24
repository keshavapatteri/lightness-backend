import express from 'express'
import { authUser } from '../../middleWare/authUser.js';
import { createAddress, deleteAddress, getAddresses, getAll, updateAddress } from '../../contollers/addressController.js';

const router = express.Router()

//add 
router.post('/add',authUser,createAddress)
//get address by user
router.get('/get',authUser,getAddresses)

// update
router.put('/update/:addressId',authUser,updateAddress)

//delete by address id
router.delete('/delete/:addressId',deleteAddress)

//get all adddress

router.get('/getalladdress',getAll)






export default router;