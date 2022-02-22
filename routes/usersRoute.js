const express = require("express");
const router = express.Router();

const User = require("../models/users");

router.post("/login", async (req, res) => {
    try {
        // await User.findOne({
        //     userd: req.body.userId,
        //     password: req.body.password,
        //     verified: true,
        // });
        const user = await User.findByCredentials(
            req.body.userId,
            req.body.password,
            );
        res.send(user);
    } catch (error) {
        res.status(400).send();
    }
});

router.post("/register", async (req, res) => {
    try {
        const newUser = new User({ ...req.body, verified: false });
        await newUser.save();
        res.send();
    } catch (error) {
        res.status(400).send();
    }
});

module.exports = router;
