const User = require("../Model/User");

const loginVaidation = async (fieldValue, fieldName, password) => {

    const existedUser = await User.findOne({ [fieldName]: fieldValue });
    if (!existedUser) {
        throw new Error(`Please check ${fieldName} and password`);
    }
    
    const isCorrectPassword = await existedUser.comparePassword(password); //function called
    if (!isCorrectPassword) {
        throw new Error(`Please check ${fieldName} and password`);
    }

    return existedUser;
};

module.exports = loginVaidation;