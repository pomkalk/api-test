var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var User = mongoose.model('User');
var Post = mongoose.model('Post');
var secret = "asddsawww";

exports.create_user = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, pass)=>{
        var user = new User();
        user.name = req.body.name;
        user.password = pass;

        user.save((err, user)=>{
            if (err) {
                if (err.code == 11000) {
                    return res.status(400).json({'message': 'User already exists.'});
                }
                else {
                    return res.status(400).json(err);
                }
            }
            res.json({'message': 'User created.'});
        });
    });
}

exports.login = (req, res) => {
    User.findOne({"name": req.body.name}, (err, user)=>{
        if (!user)
            return res.status(401).json({"message": 'User not founded.'});
        bcrypt.compare(req.body.password, user.password, (err, same)=>{
            if (!same)
                return res.status(401).json({'message': 'Incorrect user password.'});
            res.json({
                "token": jwt.sign({
                    'userId': user._id
                }, secret)
            });
        });
    });
}

exports.create_post = (req, res) => {
    var post = new Post(req.body);
    console.log(req.body);
    post.author = req.user._id;
    post.save((err, post)=>{
        res.send(post);
    });
}

exports.get_posts = (req, res) => {
    Post.find({}).populate('author').exec((err, posts)=>{
        res.json(posts);
    });
}

exports.protected = (req, res, next)=>{
    token = req.headers['x-token'];
    if (token) {
        jwt.verify(token, secret, (err, decoded)=>{
            if (err)
                return res.status(401).json({'message': err.message});
            User.findOne({"_id": decoded.userId}, (err, user)=>{
                if (!user)
                    return res.status(401).json({'message': 'Not authorized.'});
                req.user = user;
                next();
            });
        });
    }else{
        return res.status(401).json({'message': 'Not authorized.'});
    }
}