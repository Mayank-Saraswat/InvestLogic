const express = require("express")
const router = express.Router()

const { inputValidator } = require("../controllers/calculator")

router.get("/getSipCalculator", inputValidator)

module.exports = router