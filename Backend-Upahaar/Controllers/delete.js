const User = require("../Model/User");

const remove = async (req, res) => {
    try {
        const id = req.id;
        const user = req.user;

        const { name } = user;

        // delete user
        await User.findByIdAndDelete(id);

        res.clearCookie("token");

        res.json({
            message: `${name}'s account is successfully deleted.`
        })

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

module.exports = remove;