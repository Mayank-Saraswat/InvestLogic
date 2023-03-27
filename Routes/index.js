const express = require("express");
const router = express.Router();

const controller = require("../Controllers/calculator.js");

router.get("/api",controller.validator);

module.exports = router;