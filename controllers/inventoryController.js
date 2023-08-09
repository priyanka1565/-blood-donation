const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");


const createInventoryController = async(req, res) => {
    try {
      const { email, inventoryType } = req.body;
      //validation
        const user = await userModel.findOne({ email });
        if (!user) {
          throw new Error("User Not Found");
        }

       if (inventoryType === "in" && user.role !== "donar") {
         throw new Error("Not a donar account");
       }
        
       if (inventoryType === "out" && user.role !== "hospital") {
         throw new Error("Not a hospital");
       }
        
        //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Reocrd Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Errro In Create Inventory API",
      error,
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel.find({
      organisation: req.body.organisation,
    }).populate('donar').populate('hospital').sort({createdAt:-1})
    return res.status(200).send({
      success: true,
      message: 'get all recors sucessfully',
      inventory,
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message:'Error In Get All Inventory'
    })
  }
  
}

module.exports = {createInventoryController,getInventoryController}