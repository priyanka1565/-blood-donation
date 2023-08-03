const userModel = require("../models/userModel");

const createInventoryController = async(req, res) => {
    try {
        const { email, inventoryType } = req.body;
        //validation
        const user = await userModel.findOne({ email })
        if (!user) {
            return  Error("User Not Found");
        }
        if (inventoryType === "in" && user_role !== "donar") {
                 return Error(" Not a donar account");
            
        }
        if (inventoryType === "out" && user_role !== "hospital") {
          return  Error(" Not a hostpital");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
           sucess:false,
            messege: 'Error In Inventory API',
            
        })

    }
    
}
module.exports = {createInventoryController}