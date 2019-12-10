const fs = require("fs");
const exerciseUsers = require("../../.data/exercise-users.json");

module.exports = function(req, res) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "username required" });
  }

  const taken = exerciseUsers.find(user => username === user.username);
  if (taken) {
    return res.status(400).json({ error: "username taken" });
  }

  const newId = `${exerciseUsers.length + 1}a`;
  const newUser = { username, _id: newId };
  const updatedUsers = [...exerciseUsers, newUser];

  const updatedJson = JSON.stringify(updatedUsers);

  return fs.writeFile(".data/exercise-users.json", updatedJson, err => {
    if (err) {
      console.error(err);
      return res.status(500);
    }
    console.log("exercise-users.json updated");
    return res.status(200).json(newUser);
  });
};
