const Joi = require("joi");

// Define regex
const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?![!@#$%^&*(),.?":{}|<>])(?!.*[!@#$%^&*(),.?":{}|<>]{2})([a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,20})(?<![!@#$%^&*(),.?":{}|<>])$/;

// Create Joi schema
const passwordSchema = Joi.string()
        .pattern(passwordRegex)
        .required()
        .messages({
                "string.empty": "Password is required",
                "string.pattern.base":
                        "Password must be 8-20 characters long, include at least one uppercase, one lowercase, one digit, and one special character. It should not start or end with a special character and must not contain consecutive special characters."
        });

module.exports = passwordSchema;

/*
* 1. ^ : 
        start of a password

* 2. ?=.*[a-z] : 
        must contain atleast one lowercase letter

* 3. ?=.*[A-Z] :
        must contain atleast one uppercase letter

* 4. ?=.*\d :
        must contain atleast one number

* 5. ?![!@#$%^&*(),.?":{}|<>] : 
        should not contain underscore and dot at start, ?! is for negative lookahead at the start. “The next thing must NOT match this pattern.”

* 6. ?!.*[!@#$%^&*(),.?":{}|<>]{2} : 
        no consecutive underscores and dots

* 7. [a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{4,20} : 
        owercase letters, uppercase letters, 0-9, . and _ are allowed within the range of 4 and 20.

* 8. ?<![!@#$%^&*(),.?":{}|<>] : 
        should not contain underscore and dot at end, ?<! is for negative lookbehind. “The thing just before this point must NOT match this pattern.”
*/