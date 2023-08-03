const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        //validation
        if (existingUser) {
            return res.status(200).send({
                sucess: false,
                messege:'User Already exists'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        //res data
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({
            sucess: true,
            messege:'User Regisred sucessfully'
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            messege:'Error in Registration'
        })
    };
    
}
//login controller
const loginController = async (req,res) => {
    try {
      const existingUser = await userModel.findOne({ email: req.body.email });
      if (!existingUser) {
        return res.status(404).send({
          sucess: false,
          messege: "Invalid Credentials",
        });
      }
      //check role
      if (existingUser.role !== req.body.role) {
        return res.status(500).send({
          success: false,
          message: "role dosent match",
        });
      }

      //comapre password
      const comparePassword = await bcrypt.compare(
        req.body.password,
        existingUser.password
      );
      if (!comparePassword) {
        return res.status(500).send({
          sucess: false,
          messge: "Invalid Credentials",
        });
      }
      const token = jwt.sign(
        { existingUserId: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).send({
        messege: "Login Sucessfully",
        token,
        existingUser,
      });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: true,
            messege:'Error In Login API',


        })
    }
    
}
//GET current users
const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.existingUserId }) 
        return res.status(200).send({
          sucess: true,
          messege: "User Fetched Sucessfully",
          user,
        });

        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            sucess: false,
            messege: 'unable to get the current user',
            error
         });
    }
   
   
    
    
    
}
module.exports = { registerController, loginController,currentUserController };