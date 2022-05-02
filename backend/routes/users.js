const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/users');
const tasks = require('../models/tasks');
const projects = require('../models/projects');
const { registerValidation, loginValidation, verifyToken } = require('../validation');


router.post("/register", async (req, res) => {

    //validate user inputs (name, email, password)
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    //check if email is already registeret
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
        return res.status(400).json({ error: "Email already exists" });
    }

    //hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    //generate initials
    const initials = req.body.name.toUpperCase().split(' ').map(name => name[0]).join('');
    
    const role = ["62554108c76611700f3d804d"]

    //create user object and save it in Mongo (via try-catch)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
        avatarPicture: req.body.avatarPicture,
        initials: initials,
        roles: role
    });
    //try to save user in database (via try-catch)
    try { 
        const savedUser = await user.save(); //save user
        res.json({ message: "New user created.😊", newUser : savedUser});
    } catch (error) { //if error, return error
        res.status(400).json({ error });
    }
    // res.send("User registered successfully");
});

router.post("/login", async (req, res) => {

    //validate user login info (email, password)
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    //if login info is valid find the user by email in database
    const user = await User.findOne({ email: req.body.email });

    //throw error if email is wrong - user does not exist in DB 
    if (!user) {
        return res.status(400).json({ error: "Email is wrong" });
    }

    //check for password correctness - compare hashed password with password from DB
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    //throw error if password is wrong 
    if (!validPassword) { 
        return res.status(400).json({ error: "Password is wrong" })
    }

    //create authentication token with username and id
    const token = jwt.sign(
            //payload data
            {
                name: user.name,
                id: user._id
            },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
        );

    res.header("auth-token", token).json({
        message: "User logged in 😊",
        token: token,
        id: user._id,
    });
})

router.get("/", verifyToken, (req, res) => {
    User.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

//get user by id
router.get("/:id", verifyToken, (req, res) => {
    User.findById(req.params.id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

//update user by id
router.put("/:id", verifyToken, (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "User updated successfully 😊", updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete user by id and remove user from all tasks and projects
router.delete("/:id", verifyToken, async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await User.findByIdAndRemove(id)
        await tasks.updateMany({ assigned: id }, { $pull : { assigned: id }})
        await projects.updateMany({ assigned: id }, { $pull : { assigned: id }})
        res.json({ message: "User deleted.😊", deleted })
    } catch (error) {
        res.status(400).json({ error })
    }
})

module.exports = router;

