const User = require("../Model/User")

const getAllUsers = async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let limitUsers = 2;
        let skipUsers = limitUsers * (page - 1);

        const allUsers = await User.find({})
            .sort()
            .limit(limitUsers)
            .skip(skipUsers);

        if (!allUsers.length) {
            throw new Error("There is no more users to show...")
        }

        res.json(allUsers);

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
};

module.exports = getAllUsers;