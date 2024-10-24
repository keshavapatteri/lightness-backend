import { User } from "../models/userModel.js";
import { generateUserToken } from "../utilits/jwtToken.js";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, address, phonenumber } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            address,
            phonenumber
        });

        // Save the user to the database
        await user.save();

       

        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//user login


export const UserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if user exists
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        console.log("Plain Password:", password); // Check if password is defined
        console.log("Hashed Password from DB:", userExist.password); // Check if hashed password is defined

        // Compare password
        const passwordMatch = bcrypt.compareSync(password, userExist.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }
        
        const token = generateUserToken(email,userExist._id);
        res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

        res.cookie('token', token,{sameSite:"None",secure:true});
        res.json({ success: true, message: "User logged in successfully", status: 200, token: token });

    } catch (error) {
        console.error("Error:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
}



export const UserProfile = async (req, res, next) => {
    try {

        const user=req.user;
        console.log(user)
        const userData=await User.find({email:user.email}).select("-password")

        
      res.json({success:true,message:'user data fetched',data:userData})

    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server" });


    }
}


//user logout
export const UserLogout = async (req, res, next) => {

    res.clearCookie("token")
    res.json({ success: true, message: 'User logged out successfully' })


}