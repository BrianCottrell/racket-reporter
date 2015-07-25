/* Racket Reporter    */
/* by Brian Cottrell  */
/* 07-25-2015         */

var express = require('express');
var app = express();

var http = require('http').Server(app);

var Myo = require('myo');

var count = 0;

//Start talking with Myo Connect
Myo.connect();

Myo.on('fist', function(){
    console.log('fist gesture detected');
    this.vibrate();
    count++;
});

Myo.on('fingers_spread', function(){
    console.log('finger spread gesture detected');
    this.vibrate();
    count++;
});

Myo.on('wave_in', function(){
    console.log('wave in gesture detected');
    this.vibrate();
    count++;
});

Myo.on('wave_out', function(){
    console.log('wave out gesture detected');
    this.vibrate();
    count++;
});

app.get('/racket_report', function(req, res){
    res.status(200).send(count+'');
});

var port = process.env.PORT || 8080;
//Run server
http.listen(port, function() {
  console.log('listening on *:8080');
});