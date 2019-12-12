module.exports = function(req, res) {
  return res.status(200).json({
    type: req.file.mimetype,
    name: req.file.originalname,
    size: req.file.size
  });
};
