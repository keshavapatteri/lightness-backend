// controllers/cartController.js
import  Cart from '../models/cartModel.js'


import { Product } from "../models/productModel.js";


// Add item to cart
export const addItemToCart = async (req, res) => {
    const { productId, quantity, userId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the user's cart exists
        let cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            // If no cart exists, create a new one
            cart = new Cart({
                userId: userId,
                items: [],
                totalPrice: 0
            });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
           
            cart.items[itemIndex].quantity += quantity;
            cart.items[itemIndex].price = cart.items[itemIndex].quantity * product.price;
        } else {
           
            cart.items.push({
                product: productId,
                quantity,
                price: product.price * quantity
            });
        }

        // Recalculate the total price
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0);

        // Save the cart
        await cart.save();

        res.status(200).json({ success: true, message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove one quantity of item from cart
export const removeItemFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const { userId } = req.user;   //calling from
        
        // Fetch the user's cart
        const cart = await Cart.findOne({ userId: userId });
        
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }
        
        // Find the item index in the cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        // Remove the item from the cart
        cart.items.splice(itemIndex, 1);

        // Update the total price after item removal
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
        
        // Save the updated cart
        const updatedCart = await cart.save();

        res.json({ success: true, message: "Product deleted successfully", data: updatedCart });
      
    } catch (error) {
        res.status(500).json({ success: false, message: error.message }); 
    }
};

// Get user cart by user ID
export const getCart = async (req, res) => {
    // const { userId } = req.params;  // Ensure the userId is passed in the URL as a parameter
    const { userId } = req.user;
    console.log(userId);
    
    try {
       
        const cart = await Cart.findOne({ userId: userId }).populate("items.product");

      
        
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // If the cart is found, return it in the response with a success flag
        return res.status(200).json({ success: true, cart });
    } catch (error) {
        // If an error occurs, return a 500 error with the error message
        return res.status(500).json({ success: false, message: error.message });
    }
};




export const clearCart = async (req, res) => {
    const userId = req.user._id; // Ensure req.user is populated correctly

    try {
        // Find the cart by user ID, not by _id
        const cart = await Cart.findOneAndDelete({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ success: true, message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



export const getAllCart = async(req,res)=>{
    try {

        const cart = await Cart.find();
        res.status(200).json(cart);
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });  
    }
}