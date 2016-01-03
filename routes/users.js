var express = require('express');
var mongo = require('mongodb');
var cytro = require('crypto');
var router = express.Router();

var host = 'localhost';
var port = 27017;

var db = new mongo.Db('SHINEEY', new mongo.Server(host, port, {}), {});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    var data = req.body;
    db.open(function (err, db) {
        if (err) {
            console.log('db error')
        }
        db.collection('user', function (err, collection) {
            collection.find({username: req.username, password: req.password}, function (err, doc) {
                doc.toArray(function (err, docItem) {
                    console.log(docItem);
                })
            });
        });
    });
    console.log(data);
    res.redirect('/');
});

router.post('/signup', function (req, res, next) {
    var data = req.body;
    data.avatar = "https://secure.gravatar.com/avatar/" + data.email + "?=s=48";
    db.open(function (err, db) {
        if (err){
            console.log('mongodb err');
        }
        db.collection('uers', function (err, collection) {
            collection.insert(data, function (err, doc) {
                console.log(doc);
                db.close();
            })
        });
    });
    res.render('signupSuccess');
});


module.exports = router;
