import User from '../models/User.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { createError } from '../error.js'
dotenv.config()




// login
export const adminLogin = (async (req, res, next) => {
    console.log("backend of admin login");
    try {
        
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            console.log("email not found");
            // throw new Error("Invalid credentials")
            return next(createError(404, "admin not found!"))
        }else if( user.isAdmin){
            const comparePass = await bcrypt.compare(req.body.password, user.password)
            if (!comparePass) {
                console.log("wrong password");
                return next(createError(404, "Wrong credentials"))
                // throw new Error("Invalid credentials")
            }
    
            const { password, ...others } = user._doc
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
            console.log(token, "tokennnnnnnn");
            
            res.cookie("access_token_admin", token, {
                httpOnly: true,
                // maxAge: 24 * 60 * 60 * 1000,
                secure: false,
                signed: false
            })
            .status(200)
            .json({others,token})
        
        }else{
            return next(createError(403,"You are not an Admin"))
        }
        
        // return res.status(200).json({ others, token })
    } catch (error) {
        next(error)
        // return res.status(500).json(error.message)
    }
})
