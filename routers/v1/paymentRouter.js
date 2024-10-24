import express from 'express'
const router = express.Router()

import { getpayment, processPayment } from '../../contollers/paymentController.js';
import { authUser } from '../../middleWare/authUser.js';
// Route to process a payment
router.post("/create",authUser,processPayment);    //authUser 

router.get("/getpayment/:id",getpayment)

export default router;