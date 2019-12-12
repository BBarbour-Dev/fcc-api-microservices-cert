const fs = require('fs');
const exerciseUsers = require('../../.data/exercise-users.json');
const exercises = require('../../.data/exercises.json');

module.exports = function(req, res) {
  const validReq = validateReq(req.body);
  if (!validReq) {
    return res.status(400).json({
      error: 'Request must have a userId, description, and duration.'
    });
  }

  let { userId, description, duration, date } = req.body;

  const user = exerciseUsers.find(user => user._id === userId);

  if (!user) {
    return res.status(400).json({ error: 'Must provide a valid userId' });
  }

  const invalidDate = isNaN(new Date(date));

  if (invalidDate) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    date = `${year}-${month}-${day}`;
  }

  exercises.push({ userId, description, duration, date });

  const updatedJson = JSON.stringify(exercises);

  return fs.writeFile('.data/exercises.json', updatedJson, err => {
    if (err) {
      console.error(err);
      return res.status(500);
    }
    console.log('exercises.json updated');
    return res.status(200).json({ ...user, description, duration, date });
  });
};

function validateReq({ userId, description, duration }) {
  if (!userId || !description || !duration) {
    return false;
  }
  return true;
}
