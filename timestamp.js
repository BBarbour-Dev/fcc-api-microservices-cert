const moment = require("moment");

module.exports = function(req, res) {
  const { date_string } = req.params;

  if (!date_string) {
    const unix = moment().unix();
    const utc = moment().utc();
    return res.status(200).json({ unix, utc });
  }

  const validDateString = moment(date_string).isValid();
  const unix = moment(date_string).unix();
  const utc = moment(date_string).utc();

  if (!validDateString) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  return res.status(200).json({ unix, utc });
};
