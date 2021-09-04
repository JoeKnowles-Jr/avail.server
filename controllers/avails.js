const Avail = require('../models/avail');

exports.userAvails = function (req, res, next) {
    Avail.find({ user: req.body.userId })
        .then(avails => {
            res.status(200).json(avails);
        })
        .catch(err => {
            res.status(403).json({ message: err });
        });
}

exports.aventAvails = function (req, res, next) {
    Avail.find({ avent: req.body.aventId })
        .then(avails => {
            res.status(200).json(avails);
        })
        .catch(err => {
            res.status(403).json({ message: err });
        });
}

exports.groupAvails = function (req, res, next) {
    Avail.find({ group: req.body.groupId })
        .then(avails => {
            res.status(200).json(avails);
        })
        .catch(err => {
            res.status(403).json({ message: err });
        });
}

exports.insertAvail = function (req, res, next) {
    Avail.create(req.body.avail)
        .then(na => { res.status(200).json({ availId: na._id }); })
        .catch(err => { res.status(403).json({err: err}); });
};

exports.updateAvail = function (req, res, next) {
    Avail.findOneAndUpdate(req.body.filter, req.body)
        .then(ua => { res.status(200).json({ message: "success" }); })
        .catch(err => { res.status(403).json({ err: err }); });
};


