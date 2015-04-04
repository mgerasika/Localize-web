var express = require('express');
var http = require('http');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set("view options", { layout: false });
app.set('views', __dirname + '/public/views');
app.use("/res", express.static(__dirname + '/res'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(request, response) {
    //response.send('Hello World 2!');
    response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
