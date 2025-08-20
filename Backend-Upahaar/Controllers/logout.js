const logout = async (req, res) => {
    try {
        const user = req.user;

        // logout
        res.clearCookie("token");

        res.json({
            message: `${user.name} is successfully Logged out!`
        })
    } catch (err) {
        res.status(400).json({
            err: err.message
        })
    }
}

module.exports = logout;