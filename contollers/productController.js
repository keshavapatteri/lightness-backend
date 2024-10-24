// import Product from "../models/productModel.js";

import { Product } from "../models/productModel.js";





export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, color, tags,userId } = req.body;

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
      userId
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
  }
};



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

// delete Product

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



export const getid = async(req, res) => {
  try {
    const { id } = req.params; // Get the product ID from the request parameters
    const product = await Product.findById(id); // Find the product by its ID

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json(product); // Send the found product as the response
  } catch (error) {
    res.status(500).json({ success: false, message: error.message }); // Handle errors
  }
};



export const getByUser = async (req, res) => {
  try {
    const user = req.user; 
    console.log(user);

    const userData = await Product.find({ userId: user._id }); 
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
