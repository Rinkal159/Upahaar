const User = require("../Model/User");

const update = async (req, res) => {
    try {
        const { name, age } = req.body;
        const id = req.id;
        const oldUser = req.user;
        const { name: nameO, age: ageO } = oldUser;

        await User.updateOne({ _id: id }, {
            name, age
        }, { runValidators: true });

        const updatedUser = await User.findById(id);
        const { name: nameU, age: ageU } = updatedUser;

        if (nameO === nameU && ageO === ageU) {
            throw new Error("New values cannot be same as old ones.")
        }

        res.json(updatedUser);

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

module.exports = update;