var express = require('express');
var mongoose = require('mongoose');
var path = require("path");
var http = require('http');
var mongojs = require('mongojs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dbCalendar');
var db = mongoose.connection;
var app = express();
global.database = mongojs('dbCalendar');
global.database.on('error', function (err) {
    console.log('database error', err)
})
global.database.on('connect', function () {
    console.log('database connected')
})
//var ObjectID = require('mongodb').ObjectID;
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) { 
res.render('index.html');
});

app.get('/update/',function(req,res){
if(req.query.id==0)
{
   database.collection('calc').insert(req.query, function (err, doc) {
        res.json(doc);
    });
}
else{
       database.collection('calc').findAndModify({query: {_id: mongojs.ObjectId(req.query.id)},
        update: {$set: {'title':req.query.title,'startAt':req.query.startAt,'endsAt':req.query.endsAt}},new: true}, function (err, doc){
        res.json(doc);
 });
 }
});

app.get('/view/', function (req, res) {
    database.collection('calc').insert(req.query, function (err, doc) {
        res.json(doc);
    });
});

app.get('/DeleteEvent/', function (req, res) {
        console.log('res.query.id'+req.query._id);
        database.collection('calc').remove({_id: mongojs.ObjectId(req.query._id)}, function(err, doc) {
            res.json(doc);
    });
});

app.get('/calc', function (req, res) {
    database.collection('calc').find().sort({ _id: -1 }).limit(0, function (err, docs) {
	     res.json(docs);
	 });
});


app.listen(8001);
console.log("Running at Port 8001");