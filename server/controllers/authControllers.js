const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
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
            messege:`Error in Registration`
        })
    }

    
}
module.exports ={registerController}