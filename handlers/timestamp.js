function handler(req, res) {
  const { date_string } = req.params;

  if (!date_string) {
    const date = new Date();
    const unix = date.getTime();
    const utc = date.toUTCString();
    return res.status(200).json({ unix, utc });
  }

  const { validUnix, validString } = dateValidator(date_string);

  if (!validUnix && !validString) {
    console.log(date_string);
    return res.status(200).json({ error: "Invalid Date" });
  }

  const date = validString
    ? new Date(date_string)
    : new Date(parseInt(date_string));

  const response = { unix: date.getTime(), utc: date.toUTCString() };

  return res.status(200).json(response);
}

function dateValidator(date_string) {
  const stringNaN = isNaN(new Date(date_string));
  const unixNaN = isNaN(new Date(parseInt(date_string)));
  return { validUnix: !unixNaN, validString: !stringNaN };
}

module.exports = handler;
