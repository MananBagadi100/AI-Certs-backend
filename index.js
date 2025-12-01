const express = require("express");
const cors = require("cors");
const versionRoutes = require("./routes/versionRoutes");

const app = express();
//Importing .env file
require("dotenv").config();

//Middlewares for cors and json data handling
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", versionRoutes);

//For testing in production
app.use("/", (req,res) => {
    res.json({message : "The server is running perfectly !"})
})

const PORT = process.env.PORT ;

//listening to server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});