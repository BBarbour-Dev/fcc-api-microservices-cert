const express = require('express');
const router = express.Router();

const newuser = require('../handlers/exercise/newuser');
const users = require('../handlers/exercise/users');
const add = require('../handlers/exercise/add');
const log = require('../handlers/exercise/log');

router.post('/new-user', (req, res) => newuser(req, res));
router.get('/users', (req, res) => users(req, res));
router.post('/add', (req, res) => add(req, res));
router.get('/log', (req, res) => log(req, res));

module.exports = router;
