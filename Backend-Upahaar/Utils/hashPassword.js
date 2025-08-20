const bcrypt = require("bcrypt");

const hashPassword = async (pw) => {
    pw = await bcrypt.hash(pw, 10);
    return pw;
}

module.exports = hashPassword;