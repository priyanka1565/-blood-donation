const express = require("express");
const { testControllers } = require("../controllers/testControllers");



//router object
const router = express.Router();

//routes
router.get("/",testControllers )

//exports

module.exports = router;