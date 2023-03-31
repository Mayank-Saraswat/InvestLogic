const express = require("express")
const router = express.Router()

const controller = require("../Controllers/calculator")

router.get("/getSipCalculator",controller.inputValidator)

module.exports = router