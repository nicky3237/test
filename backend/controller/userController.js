const User = require("../schema/userSchema");
const bcrypt = require("../middlewear/bcrypt");
const auth = require("../middlewear/authentication");
const jwt = require("jsonwebtoken");
const { getJwtToken, cookieToken } = require("../middlewear/authentication");

exports.signup = async (req, res) => {
  try {
    let body = req.body;
    let data = await User.findOne({ email: body.email });

    if (!data) {
      // Hash the password
      body.password = await bcrypt.hash_Password(body.password);

      let result = await User.create(body);
      res.send({ message: "Registration successfully done", data: result });
    } else {
      res.send({ message: "User already exists" });
    }
  } catch (error) {
    res.send({ message: "Error" });
    console.log("error", error);
  }
};

exports.login = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user !== undefined && user !== null && user !== "") {
      let passwordCheck = await bcrypt.comparePassword(
        body.password,
        user.password
      );
      if (passwordCheck == true) {
        const token = getJwtToken(user._id);
        cookieToken(user, res);
        res.status(200).json({
          message: "Login successful",
          user: {
            _id: user._id,
            email: user.email,
            token,
          },
        });
      }
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
