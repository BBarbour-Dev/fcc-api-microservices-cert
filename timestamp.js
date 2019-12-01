module.exports = function(req, res) {
  const { date_string } = req.params;

  if (!date_string) {
    const date = new Date();
    const unix = date.getTime();
    const utc = date.toUTCString();
    return res.status(200).json({ unix, utc });
  }

  const date = new Date(date_string);
  const invalidDate = isNaN(date);
  const unix = date.valueOf();
  const utc = date.toUTCString();

  if (invalidDate) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  return res.status(200).json({ unix, utc });
};
