const express = require("express");
const errorHandler = require("./middlewares/errorMiddleware");
const cors = require("cors");

const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server start ${PORT}`);
});
