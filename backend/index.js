const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors"); // Add this line

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors()); // This allows all origins, adjust accordingly for your needs

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/SMENGINEERS");

const routes = require("./routes/index");
app.use("/api", routes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
