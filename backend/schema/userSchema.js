const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("user", userSchema);
