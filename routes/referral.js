const express = require("express");
const router = express.Router();
const referralControllers = require("./../Controllers/referralControllers")


router.route("/").post(referralControllers.createRefer).get(referralControllers.getAllRefer)
router.route("/:id").get(referralControllers.getReferById)

module.exports = router;