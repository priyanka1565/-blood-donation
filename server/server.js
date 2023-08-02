const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
//dot config
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
// 1 test
app.use("/api/v1/test", require("./routes/testRoutes"));

//port
const PORT = process.env.PORT || 8080;

//listen

app.listen(PORT, () => {
  console.log(
    `Node server is Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
      .bgBlue.white
  );
});
