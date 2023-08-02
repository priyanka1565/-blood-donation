const express = require("express");

//rest object
const app = express();

//routes
// 1 test
app.get("/", (req, res) => {
    res.status(200).json({
        messege:"Welcome to Bloo Bank App"
    })
})

//port
const PORT = 8080;

//listen

app.listen(PORT, () => {
    console.log("server is running http://localhost:8080")
    
})