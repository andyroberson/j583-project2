var db = require('../config/db');

//after .list it's using mongo stuff
exports.list = function(req, res) {
    var collection = db.get().collection('users');

    collection.find({}).toArray(function(err, results) {
        res.render('user/list', {users: results});
    });
};

exports.show = function(req, res) {
    var collection = db.get().collection('users');

    collection.find({"username": req.params.id}).limit(1).toArray(function(err, results) {
        res.render('user/show', {user: results[0]});
    });
};

exports.update = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    //updateOne is built in mongo thing
    //req.params is built in express functions
    //id is /users/:id //colon uses it as the end of the path?

    //last name as path? no matter what clicked on id will be right person

    //$set is saying whatever they enter use that as the new username or author etc
    collection.updateOne(
        {username: req.params.id},
        {
            $set: {
                username: req.body.username,
                name: req.body.name,
                link: req.body.link
            }
        }
    );

    res.redirect('/users');
};

exports.form = function(req, res) {
    res.render('user/form');
}

exports.create = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    collection.insert({
        username: req.body.username,
        name: req.body.name,
        link: req.body.link
    });

    res.redirect('/users');
};

exports.remove = function(req, res) {
    var collection = db.get().collection('users');

    //note about xss and sanitization
    collection.removeOne({
        username: req.params.id
    });

    return res.redirect('/users');
};
