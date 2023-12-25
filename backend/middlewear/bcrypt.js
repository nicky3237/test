const bcrypt = require("bcrypt");
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";

/** hash password */
async function hash_Password(password, hash) {
  const result = await bcrypt.hash(password, 10);
  return result;
}

/** compare password */
async function comparePassword(password, hashpassword) {
  const result = await bcrypt.compare(password, hashpassword);
  return result;
}
module.exports = { hash_Password, comparePassword };
