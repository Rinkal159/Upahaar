const getUser = async (req, res) => {
    try {
        // get the user
        const user = req.user;
        res.json(user)
        
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

module.exports = getUser;