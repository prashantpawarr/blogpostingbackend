const { Router } = require("express");
const router = Router();
const { Admin } = require("../db");
const { JWT_SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken")

router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password
    })

    res.status(200).json({
        message: "Admin created successfully"
    })

})

router.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.find({
        username,
        password
    })

    if (admin) {
        const token = jwt.sign({
            username,
        }, JWT_SECRET_KEY)
        res.status(200).json({
            token
        })
    }
    else {
        res.status(403).json({
            message: "Incorrect Email & Password"
        })
    }


})

module.exports = router;
