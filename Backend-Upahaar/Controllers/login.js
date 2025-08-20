const User = require("../Model/User");
const loginVaidation = require("../Utils/loginValidation");

const login = async (req, res) => {
    try {
        if (!req.body) {
            throw new Error("Kindly enter mobile number/email and password.")
        }
        const { email, mobileNumber, password } = req.body;

        // if none entered or both entered
        if ((!email && !mobileNumber) || (email && mobileNumber)) {
            throw new Error("Either email or mobile number is required.");
        }

        if (!password) {
            throw new Error("Password is required.");
        }

        let loggedUser;
        if (email) {
            loggedUser = await loginVaidation(email, "email", password); //function called

        } else if (mobileNumber) {
            loggedUser = await loginVaidation(mobileNumber, "mobileNumber", password); //function called
        };

        const token = loggedUser.genJWT();

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 3600 * 1000
        });

        res.json(loggedUser)

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

module.exports = login;