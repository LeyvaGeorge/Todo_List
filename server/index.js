const express = require("express");
require('dotenv').config();
const app = express();
const cors = require("cors");

//Middleware
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Server has started on port: ${process.env.PORT}`);
});
