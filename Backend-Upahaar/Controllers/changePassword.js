const User = require("../Model/User");
const passwordValidation = require("../Utils/passwordValidation");
const hashPassword = require("../Utils/hashPassword");

const changePassword = async (req, res) => {
    try {
        const user = req.user;
        const userID = req.id;

        const { currentPassword, newPassword, confirmPassword } = req.body;
        

        if (!currentPassword || !newPassword || !confirmPassword) {
            throw new Error("All fields are required.")
        }

        const isCorrectPassword = await user.comparePassword(currentPassword); //function called
        if (!isCorrectPassword) {
            throw new Error("Please check your password.")
        }

        if (newPassword !== confirmPassword) {
            throw new Error("New password and confirm password do not match.")
        }

        const isSamePassword = await user.comparePassword(newPassword); //function called
        if(isSamePassword) {
            throw new Error("Cannot change same password.")
        }

        const errorInPasswordValidation = passwordValidation.validate(newPassword).error; //function called
        if (errorInPasswordValidation) {
            throw new Error(errorInPasswordValidation.details[0].message);
        }

        const hashedPassword = await hashPassword(newPassword); //function called

        await User.updateOne({ _id: userID }, { password: hashedPassword });

        const updatedUser = await User.findById(userID);

        res.json(updatedUser);

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
};

module.exports = changePassword;