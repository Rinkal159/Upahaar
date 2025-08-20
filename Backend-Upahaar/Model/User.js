const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordValidation = require("../Utils/passwordValidation");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "This email is already registered."],
        trim: true,
        sparse: true,
        lowercase: true,
        match: [/.+@.+\..+/, `{VALUE} is not valid`],

    },
    mobileNumber: {
        type: String,
        unique: true,
        sparse: true,
        match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"]
    },
    password: {
        type: String,
        required: [true, `Password is required`]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name must not exceed 50 characters."],
        minLength: [4, "Name must not be less than 4 characters."]
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [1, "Age must be greater then 0"]
    }
}, { timestamps: true });


// either email or mobile number is required
userSchema.pre("validate", function (next) {
    if (!this.email && !this.password) {
        next(new Error("Either email or phone number is required"));
    } else {
        next();
    }
})

// compare password
userSchema.methods.comparePassword = function (pw) {
    return bcrypt.compare(pw, this.password);
}

// generate jwt token
userSchema.methods.genJWT = function () {
    const token = jwt.sign({ id: this._id.toString() }, process.env.SECRET_JWT, { expiresIn: '1h' });
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;