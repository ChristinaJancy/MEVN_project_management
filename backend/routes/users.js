const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/users');
const tasks = require('../models/tasks');
const projects = require('../models/projects');
const { verifyToken } = require('../validation');

// Verify JWT 
router.post("/verify-token", (req, res) => {
    const token = req.body.token;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Failed to authenticate" });
        }
        return res.json({
            message: "Token is valid",
            decoded: decoded
        });
    });
});

// Create new user
router.post("/register", async (req, res) => {   
    // Check if email is already registeret
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
        return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // Generate initials
    let initials = req.body.name.toUpperCase().split(' ').map(name => name[0]);
    if (initials.length > 2) {
        for (let i = 1; i < initials.length - 1; i++) {
            console.log(initials[i]);
            initials.splice(1, initials.length - 2);
            initials = initials.join('')
        }
    } else {
        initials = initials.join('');
    }

    // Placeholder role for user ---- Replace when frontend is ready

    // Create user object and save it in Mongo (via try-catch)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
        initials: initials,
        roles: req.body.roles
    });
    // Try to save user in database (via try-catch)
    try {
        const savedUser = await user.save(); //save user
        res.json({ message: "New user created.😊", newUser: savedUser });
    } catch (err) { //if error, return error
        res.status(400).json({ error: err.message });
    }
});



// Login user and send JWT token
router.post("/login", async (req, res) => {

    // If login info is valid find the user by email in database
    const user = await User.findOne({ email: req.body.email });

    // Throw error if email is wrong - user does not exist in DB 
    if (!user) {
        return res.status(400).json({ error: "Email is wrong" });
    }

    // Check for password correctness - compare hashed password with password from DB
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    //throw error if password is wrong 
    if (!validPassword) {
        return res.status(400).json({ error: "Password is wrong" })
    }

    // create authentication token with username and id
    const token = jwt.sign(
        //payload data
        {
            name: user.name,
            id: user._id,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.status(200).header("auth-token", token).json({
        message: "User logged in 😊",
        token: token,
        id: user._id,
        initials: user.initials,
        userColor: user.roles,

    });
})

// Get all users
router.get("/", verifyToken, (req, res) => {
    User.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// Get user by id
router.get("/:id", verifyToken, (req, res) => {
    User.findById(req.params.id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }) })
});

// Update user by id
router.put("/:id", verifyToken, async (req, res) => {
    try {
        let body = req.body;
        const user = await User.findOne({ email: req.body.email });

        // Throw error if email is wrong - user does not exist in DB 
        if (!user) {
            return res.status(400).json({ error: "Email is wrong" });
        }

        if (body.name) {
            let initials = req.body.name.toUpperCase().split(' ').map(name => name[0]);
            console.log(initials)
            if (initials.length > 2) {
                for (let i = 1; i < initials.length - 1; i++) {
                    console.log(initials[i]);
                    initials.splice(1, initials.length - 2);
                    initials = initials.join('')
                }
            } else {
                initials = initials.join('');
            }
            body['initials'] = initials;
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, body, { new: true });
        res.json({ message: "User updated successfully 😊", updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete user by id and remove user from all tasks and projects
router.delete("/:id", verifyToken, async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await User.findByIdAndRemove(id)
        await tasks.updateMany({ assigned: id }, { $pull: { assigned: id } })
        await projects.updateMany({ assigned: id }, { $pull: { assigned: id } })
        res.json({ message: "User deleted.😊", deleted })
    } catch (error) {
        res.status(400).json({ error })
    }
})

module.exports = router;

