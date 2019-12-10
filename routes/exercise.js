const express = require("express");
const router = express.Router();

const newuser = require("../handlers/exercise/newuser");
const users = require("../handlers/exercise/users");
const add = require("../handlers/exercise/add");

router.post("/new-user", (req, res) => newuser(req, res));
router.get("/users", (req, res) => users(req, res));
router.post("/add", (req, res) => add(req, res));

module.exports = router;
