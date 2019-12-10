const express = require("express");
const router = express.Router();

const newuser = require("../handlers/exercise/newuser");

router.post("/new-user", (req, res) => newuser(req, res));

module.exports = router;
