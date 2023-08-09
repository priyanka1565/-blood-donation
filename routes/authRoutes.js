const express = require("express");
const { registerController, loginController, currentUserController } = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//register ||POST
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

//get current user || GET
router.get("/current-user",authMiddleware,currentUserController)

module.exports = router;