const Group = require('../models/group');
const User = require('../models/user');

exports.getGroups = function (req, res, next) {
    Group.find({})
        .populate('invites')
        .populate('requests')
        .populate('users')
        .populate('owner')
        .then(groups => {
            res.status(200).json(groups);
        })
        .catch(err => {
            res.status(403).json({ message: err });
        });
}

exports.getUserGroups = function (req, res) {
    Group.find({ users: req.params.uid })
        .populate('avents')
        .populate('users')
        .then(groups => {
            res.status(200).json({ groups: groups});
        })
        .catch(err => {
            res.status(403).json({ message: err });
        });
}

exports.insertGroup = function (req, res) {
    Group.create(req.body)
        .then(ng => { res.status(200).json({ message: 'Group created!' }); })
        .catch(err => { res.status(403).json({ err: err }); });
};

exports.requestJoinGroup = function (req, res) {
    const { uid, gid } = req.body;
    Group.findOne({ _id: gid })
        .then(group => {
            group.addJoinRequest(uid);
            res.status(200).json({ message: 'Request sent!' });
        })
        .catch(err => { res.status(422).json({ message: 'Could not process request!\n' + err }) });
}

exports.joinGroup = function (req, res) {
    const { uid, gid } = req.body;
    Group.findOne({ _id: gid })
        .then(group => {
            group.addUser(uid);
            User.findOne({ _id: uid })
                .then(user => {
                    user.addGroup(gid);
                    res.status(200).json({ message: 'Group joined!' });
                })
                .catch(err => { res.status(422).json({ message: 'Could not process join!\n' + err }) });
        })
        .catch(err => { res.status(422).json({ message: 'Could not process join!\n' + err }) });
}


