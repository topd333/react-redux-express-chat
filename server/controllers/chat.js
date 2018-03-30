const Message = require('../models/message'),
  User = require('../models/user');

exports.getMessages = function (req, res, next) {
  let oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const messages = [];

  Message.find({"createdAt": {"$gte": oneWeekAgo}})
    .sort('createdAt')
    .populate({
      path: 'author',
      select: 'username'
    })
    .exec((err, message) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      return res.status(200).json({ messages: message });
    });
};

exports.send = function (req, res, next) {
  const message = new Message({
    body: req.body.message,
    author: req.user._id
  });

  message.save((err, sentReply) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    return res.status(200).json({ message: 'successfully sent!' });
  });
};
