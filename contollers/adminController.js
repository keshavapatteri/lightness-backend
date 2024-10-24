

import bcrypt from 'bcrypt';
import { Admin } from "../models/adminModel.js";
import { generateAdminToken } from '../utilits/generateAdminToken.js';
import { User } from '../models/userModel.js';
import Cart from '../models/cartModel.js';
import { Product } from '../models/productModel.js';


//admin create
export const adminCreate = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
  
  
      if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      const adminExist = await Admin.findOne({ email });
  
      if (adminExist) {
        return res.status(400).json({ success: false, message: "Admin already exists" });
      }
  
      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      // Create new admin
      const newAdmin = new Admin({ username, email, password: hashedPassword });
      await newAdmin.save();
  
      // Generate token
      const token = generateAdminToken(email, "admin");
  
      // Set token in cookie
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  
      res.json({ success: true, message: "Admin created successfully" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
  };
  

  
// Check user authentication
export const checkAdmin = async (req, res, next) => {
  try {
    const admin = req.user;

    // If user is not authenticated, return an error
    if (!admin) {
      return res.status(400).json({ success: false, message: 'admin not authenticated' });
    }

    // If user is authenticated, send success response
    return res.json({ success: true, message: "admin authenticated" });
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};


export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const adminExist = await Admin.findOne({ email });

    if (!adminExist) {
      return res.status(404).json({ success: false, message: "Admin does not exist" });
    }

    // Compare provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, adminExist.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Create token (assuming you have a function `generateAdminToken`)
    const token = generateAdminToken(adminExist._id, "admin");

    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
        });

  res.cookie('token', token,{sameSite:"None",secure:true});
  
    // Send response
    return res.json({ success: true, message: "Admin login successful", status: 200, token });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

//admin logout

export const AdminLogout = async (req, res, next) => {

  res.clearCookie("token")
  res.json({ success: true, message: 'Admin logout successfully' })


}


//get all data from user
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Delete a user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//===================>  Cart




export const getcart = async (req, res, next) => {
  try {
    const cart = await Cart.find();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

//clear cart
export const clear = async (req, res) => {
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
/////////================= products
//Add Product


export const addproduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, color, tags } = req.body;

    // Get image URLs from Cloudinary
    const images = req.files.map((file) => file.path); // Cloudinary stores the URL in `file.path`

    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      images, // Save the array of image URLs
      color,
      tags,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating product',
      error: error.message,
      
    });
    console.log(error);
  }
};


//get all product

export const getAllProduct = async (req, res) => {
  try {

    const product = await Product.find();
    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


// updateProduct

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, brand, stock, color, tags} = req.body;
   

  console.log({id});
  
  console.log(req.body);

    const updateProduct = await Product.findByIdAndUpdate(id, { name, description, price, category, brand, stock, color, tags}, { new: true })
   

    res.json({ success: true, message: "New Product list Updated successfully", data: updateProduct });
 
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

}

// // delete Product

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, brand, stock, color, tags} = req.body;
   

  console.log({id});
  
  console.log(req.body);

    const deleteproduct = await Product.findByIdAndDelete(id, { name, description, price, category, brand, stock, color, tags}, { new: true })
   

    res.json({ success: true, message: "Product  deleted successfully", data: deleteproduct });
 
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

}

///// GET  by iD

export const getById = async(req,res)=>{
  try {
    const {id}= req.params;
    const { name, description, price, category, brand, stock, color, tags} = req.body;
    const product = await Product.findById(id);
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}