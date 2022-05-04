const joi = require('joi'); //joi validation library
const jwt = require("jsonwebtoken");  //jsonwebtoken library

const registerValidation = (data) => { //validate user inputs (name, email, password)
    const schema = joi.object(
        {
            name: joi.string().min(6).max(255).required(), //name must be string, min 6 chars, max 255 chars
            email: joi.string().min(6).max(255).required(), //email must be string, min 6 chars, max 255 chars
            password: joi.string().min(6).max(255).required(), //password must be string, min 6 chars, max 255 chars
            avatarPicture: joi.string() //avatarPicture must be string, min 6 chars, max 255 chars
        });
    return schema.validate(data); //return validated data
}

const loginValidation = (data) => { //validate user login info (email, password)
    const schema = joi.object(
        {
            email: joi.string().min(6).max(255).required(), //email must be string, min 6 chars, max 255 chars
            password: joi.string().min(6).max(255).required() //password must be string, min 6 chars, max 255 chars
        });
    return schema.validate(data); //return validated data
}

// middleware to verify token
const verifyToken = (req, res, next) => { //middleware to verify token 
    const token = req.header("auth-token");

    //if there is no token in the request, then fail
    if (!token) return res.status(401).json({ error: "Access Denied 🤷‍♂️" }); //401 - unauthorized

    //check the token...
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET); //verify token
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Token is not valid" }); //400 - bad request
    }
}

module.exports = { registerValidation, loginValidation, verifyToken }; //export validation functions