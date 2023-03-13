const express = require("express");
const router = express.Router();

const slotController = require("../controller/slotController");

router.post("/slot", slotController.SlotPost);

module.exports = router;
