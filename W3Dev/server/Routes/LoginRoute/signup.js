const router = require("express").Router()
const loginModel = require("../../Models/loginModel")

router.post("/signup-check", async(req,res) => {
    const { username, email, password, confirmPassword } = req.body

    const specialChrs = /[!@#$%^&*(),.?":{}|<>]/g
    const capitalChrs = /[A-Z]/g
    const numChrs = /[0-9]/g

    if (password!==confirmPassword) {
        res.status(400).json({error: "Confirm your Password again"})
    }
    if (!specialChrs.test(password)) {
        res.status(400).json({error: "Password should have atleast 1 Special Character"})
    }
    if (!capitalChrs.test(password)) {
        res.status(400).json({error: "Password should have atleast 1 Capital Letter"})
    }
    if (!numChrs.test(password)) {
        res.status(400).json({error: "Password should have atleast 1 Digit"})
    }
    if (password.length<=6) {
        res.status(400).json({error: "Password length should be greater than 6"})
    }

    try {
        const check = await loginModel.findOne({email})
        if (check) {
            res.status(400).json({error: "Email already exists"})
        }

        await loginModel.create({username, email, password})
    } catch(e) {
        console.error(`Error saving user credentials ${e}`)
        res.status(400).json({error: "Please enter your credentials again"})
    }
    
    res.status(200).json({data: "Password is correct"})
})

module.exports = router
