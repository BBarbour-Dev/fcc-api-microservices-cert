const exerciseUsers = require('../../.data/exercise-users.json');

module.exports = function(_req, res) {
  return res.status(200).json(exerciseUsers);
};
