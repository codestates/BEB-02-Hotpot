const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routesURLs = require("./routes/routes");
const app = express();
const PORT = process.env.PORT;
const port = PORT || 8888;

dotenv.config();
mongoose.connect(process.env.DB_URI, () => console.log("DB 연결됨"));
app.use(express.json());
app.use(cors());
app.use("/", routesURLs);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});