const passwordValidation = require("../Utils/passwordValidation");
const hashPassword = require("../Utils/hashPassword");

const User = require("../Model/User");

const signup = async (req, res) => {
    try {
        if (!req.body) {
            throw new Error("Please enter your name and age to register.")
        }

        const { email, mobileNumber, password, name, age } = req.body;

        if (!name || !age || !password) {
            throw new Error("All fields are required")
        }

        if ((!email && !mobileNumber) || (email && mobileNumber)) {
            throw new Error("Either email or mobile number is required.");
        }

        const error = passwordValidation.validate(password).error; //function called
        
        if (error) {
            throw new Error(error.details[0].message);
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name, age, email, mobileNumber, password: hashedPassword
        })

        const token = newUser.genJWT();

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 3600 * 1000
        });

        await newUser.save();

        res.json(newUser)

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

module.exports = signup;