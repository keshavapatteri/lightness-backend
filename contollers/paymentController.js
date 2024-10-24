
import Razorpay from 'razorpay';
import { Payment } from '../models/paymentModel.js';

const razorpay = new Razorpay({
  key_id: 'rzp_test_pEZkADDtQIAgoQ',
  key_secret: 'guLsKjZwjkWip5PBOfub4GqO'
});


export const processPayment = async (req, res) => {
  try {
    
    const { amount } = req.body;

    const options = {
      amount: amount, 
      currency: "INR",
      receipt: "order_rcptid_11"
    };

    const order = await razorpay.orders.create(options);
    
//model create



    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order: ", error);
    res.status(500).json({ message: "Payment processing failed", error });
  }
};






export const getpayment = async(req, res) => {
  try {
    const { id } = req.params; // Get the product ID from the request parameters
    const payment = await Payment.findById(id); // Find the product by its ID

    if (!payment) {
      return res.status(404).json({ success: false, message: "payment not found" });
    }

    res.status(200).json(payment); // Send the found product as the response
  } catch (error) {
    res.status(500).json({ success: false, message: error.message }); // Handle errors
  }
};

