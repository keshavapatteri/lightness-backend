import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
},
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'],
  },
  category: {
    type: String,
    required: true,
    // enum: ['Electronics', 'Clothing', 'Home', 'Books', 'Beauty', 'Sports', 'Automotive'],
  },
  brand: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock must be a non-negative number'],
  },
  images: [{
    type: String,
    trim: true,
  }],
 
  color: {
    type: String,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const Product = mongoose.model('Product', productSchema);

//  default Product;
