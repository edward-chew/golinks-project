const express = require("express");
const cors = require("cors");
// import mongoose from "mongoose";
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewURLPArser: true });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
