import { secretKey } from "./Secretkey.js";
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    };
    return jwt.sign(payload, secretKey, {
        expiresIn: '30d',
    });
}


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers('authorization');

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied" });
    }

    const [bearer, token] = authHeader.split(' ');

    if(bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try {
        jwt.verify(token, secretKey, (error, user) => {
            if (error) {
                res.status(401).json({ message: "Invalid token" });
            }
            req.user = user;
            next();
        });
    
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};