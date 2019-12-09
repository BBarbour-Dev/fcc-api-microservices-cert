const shorturls = require("../data/shorturls.json");

module.exports = function(req, res) {
  const { id } = req.params;
  console.log(id);
  const shorturl = shorturls.find(url => url._id === id);
  if (!shorturl) {
    return res.status(400).json({ error: "invalid URL" });
  }
  let redirect = shorturl.original_url;
  const expression = /http(s)?:\/\//;
  const protocolRegex = new RegExp(expression);
  const hasProtocol = protocolRegex.test(redirect);
  if (!hasProtocol) {
    redirect = "http://" + redirect;
  }
  return res.redirect(redirect);
};
