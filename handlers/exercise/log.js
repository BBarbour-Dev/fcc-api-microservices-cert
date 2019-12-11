const exercises = require('../../.data/exercises.json');
const exerciseUsers = require('../../.data/exercise-users.json');

module.exports = function(req, res) {
  const { userId, from, to, limit } = req.query;

  if (!userId) {
    res.status(400).json('userId is required.');
  }

  const user = exerciseUsers.find(user => user._id === userId);

  if (!from && !to) {
    let log = exercises.filter(record => {
      return record.userId === userId;
    });

    return res.status(200).json({ ...user, log, count: log.length });
  }

  // implement limit and from logic

  return res.status(200).json('ok');
};
