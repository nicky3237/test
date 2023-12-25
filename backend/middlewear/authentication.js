const jwt = require("jsonwebtoken");

// Replace these values with your actual secret, expiry, and cookie time
const hardcodedSecret = "yourSecretKeyHere";
const hardcodedExpiry = "1h"; // Example: 1 hour
const hardcodedCookieTime = 7; // Example: 7 days

function getJwtToken(userId) {
  return jwt.sign({ id: userId }, hardcodedSecret, {
    expiresIn: hardcodedExpiry,
  });
}

const cookieToken = (user, res) => {
  const token = getJwtToken(user._id);
  const options = {
    expires: new Date(Date.now() + hardcodedCookieTime * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  // Assuming you want to set the token as a cookie in the response
  res.cookie("token", token, options);
};

module.exports = { getJwtToken, cookieToken };
