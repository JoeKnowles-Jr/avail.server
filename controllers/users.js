const User = require('../models/user');
const { userAvails } = require('./avails');

exports.getUser = function (req, res, next) {
    let filter = {};
    const { uid } = req.params;
    if (uid !== 'all') {
        filter = { _id: uid };
    }
    User.find(filter).select('-password')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(403).json({ message: err });
        });
}

exports.getUserDash = function (req, res, next) {
    const { filter } = req.body;
    User.findOne(filter).select('-password')
        .populate('groups')
        .populate('avents')
        .populate('avails')
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(403).json({ message: err });
        });
}
