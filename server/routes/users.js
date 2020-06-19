const express = require("express")
const router = express.Router()
const {Signup,Login} = require("../controllers/login")

router.route("/signup").post(Signup)
router.route("/login").post(Login)

module.exports = router