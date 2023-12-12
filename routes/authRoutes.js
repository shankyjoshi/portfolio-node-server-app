const express = require("express");

const { signup, login, updateRole, getUserDetails } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);

router.get("/getUserDetails/:userId", getUserDetails);

router.post("/login", login);

router.patch("/update-role", updateRole);

module.exports = router;
