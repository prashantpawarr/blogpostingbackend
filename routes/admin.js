const { Router } = require("express");
const router = Router();
const { Admin } = require("../db")

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

module.exports = router;
