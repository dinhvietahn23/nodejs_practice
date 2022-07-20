import mongoose from "mongoose"
import {UserModel} from "../models/User.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config( )

export const signup = async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body)
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({name:req.body.name})
        !user && res.status(400).json("User not exist")
        const checkPassword = user.password === req.body.password
        !checkPassword && res.status(400).json("Invalid password")
        // res.status(400).json("Login success")
        const access_token = jwt.sign({id:user._id}, process.env.JWT)
        const {password, ...others} = user._doc
        console.log(access_token)

        res.cookie("access_token", access_token,{
            httpOnly: true
        }).status(200).json(others)

    } catch (error) {
        next(error)
    } 
}

export const googleAuth = async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(user._doc);
      } else {
        const newUser = new UserModel({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
        res.cookie("access_token", token, {
            httpOnly: true,
          }).status(200).json(savedUser._doc);
      }
    } catch (err) {
      next(err);
    }
  };
  