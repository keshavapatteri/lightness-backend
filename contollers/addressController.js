

import Address from "../models/addressModel.js";



export const createAddress = async (req, res) => {
    const { name,street, city, state, postalCode, country, phone,totalCartPrice,cartId} = req.body;
    const { userId } = req.user;   // Assuming req.user contains userId
    console.log("userid",userId);
console.log("backend===>",req.body);

// When creating or updating the document
    try {
        // Create a new address for the user
        const newAddress = new Address({
             user:userId,
             name,  // Reference to the user creating the address
            street,
            city,
            state,
            postalCode,
            country,
            phone,
            totalCartPrice,cartId
            
        });

        // Save the new address
        await newAddress.save();

        res.status(201).json({ success: true, message: 'Address created', address: newAddress });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};





// Get all addresses for a user
// export const getAddresses = async (req, res) => {
//     const { userId } = req.user;  
//     console.log("userid",userId);
//     try {
//         const addresses = await Address.find({ user: userId });
//         res.status(200).json({ success: true, addresses });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

export const getAddresses = async (req, res) => {
    const { userId } = req.user;  
    console.log("userid", userId);
    
    try {
       
        const addresses = await Address.find({ user: userId }).populate('cart');
       
        res.status(200).json({ success: true, addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Update an address
export const updateAddress = async (req, res) => {
    const { addressId } = req.params; // Expecting address ID in the URL
    const { street, city, state, postalCode, country } = req.body;

    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            addressId,
            { street, city, state, postalCode, country },
            { new: true } // Return the updated document
        );

        if (!updatedAddress) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }

        res.status(200).json({ success: true, message: 'Address updated', address: updatedAddress });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete an address
export const deleteAddress = async (req, res) => {
    const { addressId } = req.params; // Expecting address ID in the URL

    try {
        const deletedAddress = await Address.findByIdAndDelete(addressId);

        if (!deletedAddress) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }

        res.status(200).json({ success: true, message: 'Address deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//get all address


export const getAll = async(req,res)=>{
    try {

        const address = await Address.find();
        res.status(200).json(address);
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });  
    }
}

