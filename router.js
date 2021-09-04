const Authentication = require('./controllers/authentication');
const Avails = require('./controllers/avails');
const Avents = require('./controllers/avents');
const Groups = require('./controllers/groups');
const Users = require('./controllers/users');
const passport = require('passport');
require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
    
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    
    app.get('/users/avails', Avails.userAvails);
    app.post('/users/avails', Avails.insertAvail);
    app.patch('/users/avails', Avails.updateAvail);

    app.get('/avents', Avents.groupAvents);
    app.post('/avents', Avents.insertAvent);

    app.get('/groups', Groups.getGroups);
    app.get('/groups/:uid', Groups.getUserGroups);
    app.post('/groups', Groups.insertGroup);
    app.post('/groups/request', Groups.requestJoinGroup);
    app.post('/groups/join', Groups.joinGroup);

    app.get('/users/:uid', Users.getUser);

    app.get('/', requireAuth, (req, res, next) => {
        res.send(['water', 'phone', 'paper']);
    });
};
