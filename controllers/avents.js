const Avent = require('../models/avent');
const Group = require('../models/group');
const User = require('../models/user');

exports.groupAvents = function (req, res, next) {
    Avent.find({ group: req.body.groupId })
        .populate('avails')
        .populate('invites')
        .then(avents => {
            res.status(200).json(avents);
        })
        .catch(err => {
            res.status(403).json({ message: err });
        });
}

exports.userAvents = function (req, res, next) {
    Avent.find({ group: req.body.groupId })
        .populate('avails')
        .populate('invites')
        .then(avents => {
            res.status(200).json(avents);
        })
        .catch(err => {
            res.status(403).json({ message: err });
        });
}

exports.insertAvent = function (req, res, next) {
    Avent.create(req.body)
        .then(na => {
            Group.findOne({ _id: na.group })
                .then(g => {
                    g.addAvent(na._id);
                    console.log("owner", na.owner)
                    User.findOne({ _id: na.owner })
                        .then(u => {
                            u.addAvent(na._id);
                            res.status(200).json({ newAvent: na });
                        })
                        .catch(err => console.log(err));
                })
                .catch();
        })
        .catch(err => { res.status(403).json({ err: err }); });
};
