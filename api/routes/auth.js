// external imports
import express from "express";
import bcrypt from "bcrypt";

// internal imports
import User from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) =>  {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        const user = await newUser.save();
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json("Wrong credentials!");
    } 
        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
           return res.status(400).json("Wrong credentials!");
        } 
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router; 