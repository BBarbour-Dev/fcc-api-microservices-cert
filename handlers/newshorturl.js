const fs = require('fs');
const shorturls = require('../.data/shorturls.json');

module.exports = function(req, res) {
  const { url } = req.body;
  const expression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
  const urlRegex = new RegExp(expression);
  const validUrl = urlRegex.test(url);
  if (!validUrl) {
    return res.status(400).json({ error: 'invalid URL' });
  }

  const getUrl = shorturls.find(storedUrl => storedUrl.original_url === url);

  if (getUrl) {
    return res
      .status(200)
      .json({ original_url: getUrl.original_url, short_url: getUrl.short_url });
  }

  const newId = `${shorturls.length + 1}a`;
  const newShortened = `${req.protocol}://${req.headers.host}/api/shorturl/${newId}`;

  const updatedShorturls = [
    ...shorturls,
    { _id: newId, original_url: url, short_url: newShortened }
  ];

  const updatedJson = JSON.stringify(updatedShorturls);

  return fs.writeFile('.data/shorturls.json', updatedJson, err => {
    if (err) {
      console.error(err);
      return res.send(500);
    }
    console.log('shorturls.json updated');
    return res.status(200).json({ original_url: url, short_url: newShortened });
  });
};
