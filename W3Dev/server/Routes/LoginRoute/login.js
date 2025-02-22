const router = require("express").Router()
const loginModel = require("../../Models/loginModel")

router.post("/login-check", async(req,res) => {
    const { email, password } = req.body

    try {
        const check = await loginModel.findOne({email: email, password: password})
        if (check) {
            res.status(200).json({data: "Login Successfull"})
        } else {
            res.status(400).json({error: "Wrong Credentials"})
        }
    } catch(e) {
        res.status(400).json({error: "Error in Login"})
    }
})

module.exports = router
