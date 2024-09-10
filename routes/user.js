const { Router } = require("express")
const { User } = require("../db")
const router = Router()
const jwt = require("jsonwebtoken")
const { JWT_SECRET_KEY } = require("../config")


router.post("/signup", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role

    await User.create({
        username,
        password,
        role
    })

    res.status(200).json({
        message: "User created successfully!"
    })
})

router.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })
    if (user) {
        const token = jwt.sign({
            username
        }, JWT_SECRET_KEY)
        res.status(200).json({
            token
        })
    }
    else {
        res.status(403).json({
            message: "Invalid username or password"
        })
    }
})

module.exports = router;
