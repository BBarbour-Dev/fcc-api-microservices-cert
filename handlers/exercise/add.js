const exerciseUsers = require("../../.data/exercise-users.json");
const exercises = require("../../.data/exercises.json");

module.exports = function(req, res) {
  return res.send(200).json(req.body);
};
