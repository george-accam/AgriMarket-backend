import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/generateToken.js";

export const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({ message: "User already exist" });
        }
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Password do not match" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = { name, email, password: hashedPassword };

        if(!userData) {
            res.status(400).json({ message: "All fields are required" });
        }
        const user = new User(userData);
        const savedUser = await user.save();
        res.status(201).json({ 
            success: true, 
            message: "registered successfully", 
            savedUser: savedUser 
        });
    } 
    catch (error) {
        res.status(500).json({ message: `Internal server error ${error.message}` });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (!userExist) {
            res.status(404).json({ message: "User does not exist" });
        }
        const comparePassword = await bcrypt.compare(password, userExist.password);
        if (!comparePassword) {
            res.status(404).json({ message: "Invalid credentials" });
        }
        const token = generateToken(userExist);
        
        res.status(200).json({
            message: "Login successful",
            user: userExist,
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error.message}` });
    }
};