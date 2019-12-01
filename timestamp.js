const moment = require("moment");

module.exports = function(req, res) {
  const { date_string } = req.params;

  if (!date_string) {
    const date = new Date();
    const unix = date.getTime();
    const utc = date.toUTCString();
    return res.status(200).json({ unix, utc });
  }

  const validDateString = moment(date_string).isValid();
  const date = new Date(date_string);
  const unix = date.getTime();
  const utc = date.toUTCString();

  if (!validDateString) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  return res.status(200).json({ unix, utc });
};
