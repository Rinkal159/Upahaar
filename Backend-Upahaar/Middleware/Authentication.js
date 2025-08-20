const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const authentication = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        const { token } = cookie;

        if (!cookie || !token) {
            throw new Error("Please log in!")
        }

        const id = jwt.verify(token, process.env.SECRET_JWT);
        
        req.id = id.id;

        const user = await User.findById({_id : id.id});

        if (!user) {
            throw new Error("User not found.")
        }

        req.user = user;

        next();

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }

}

module.exports = authentication; 