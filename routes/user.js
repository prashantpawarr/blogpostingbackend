const { Router } = require("express")
const { User } = require("../db")
const router = Router()

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

module.exports = router;
