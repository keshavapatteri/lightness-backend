import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true
    }, 
    // Product: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Product',
    //     required: true
    //   },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    name: {
        type: String,
        required: true,
    },
    totalCartPrice: {
        type: String,
        required: true,
    },
    // cart: {
    //     type: String,
    //     required: true,
    // },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        // required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    }, 
    phone: {
        type: String,  // Change from Number to String
        required: true,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Export the Address model
const Address = mongoose.model('Address', AddressSchema);
export default Address;
