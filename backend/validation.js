const jwt = require("jsonwebtoken");  //jsonwebtoken library


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
        res.status(401).json({ error: "Token is not valid" }); //400 - bad request
    }
}

module.exports = { verifyToken }; //export validation functions