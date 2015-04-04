var express = require('express');
var http = require('http');
var app = express();
var fs = require('fs');
var nStore = require('nstore');
var gen = require('./server/gen');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set("view options", { layout: false });
app.set('views', __dirname + '/public/views');
app.set('db', __dirname + '/db');
app.use("/res", express.static(__dirname + '/res'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(request, response) {
    //response.send('Hello World 2!');
    response.render('index.html');
});

app.get('/home', function (request, response) {
    //response.send('Hello World 2!');
    response.render('home.html');
});

app.get('/write', function (request, response) {
    fs.writeFile('/res/test.txt', 'abc', function (err, data) {
        if (err) {
            console.log(err);
            response.send(err);
        }
        console.log(data);
        response.send(data);
    });
});

app.get('/install', function (request, response) {
    var users = nStore.new('db/users.db', function (err) {
        response.send(err);
    });

    
    users.save("id1", { name: "Tim Caswell", age: 29 }, function (err) {
        if (err) { throw err; }
        // The save is finished and written to disk safely
    });
 

    users.get("id1", function (err, doc, key) {
        if (err) { throw err; }
        response.send(doc +" gen=" + gen.x());
    });
});


app.get('/translate.js', function (request, response) {
    response.contentType("text/javascript");
    response.send("console.log('response from server id = " +request.query.id+"');");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
