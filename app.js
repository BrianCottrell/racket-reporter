/* Racket Reporter    */
/* by Brian Cottrell  */
/* 07-25-2015         */

//Create a basic express app
var express = require('express');
var app = express();
var http = require('http').Server(app);
//Add Myo armband library
var Myo = require('myo');
//Track the gestures detected
var swing = {
    swingType: 'none',
    strength: 'none',
    direction: 'none',
    count: 0
};
//Start talking with Myo Connect
Myo.connect();

Myo.on('imu', function(data){
    if(data.gyroscope.z > 200){
        swing.swingType = 'underhand';
        swing.direction = 'backhand';
        if(swing.strength == 'none'){
            swing.strength = 'slow';
        }
        if(data.gyroscope.z > 400){
            if(swing.strength != 'fast'){
                swing.strength = 'medium';
            }
            if(data.gyroscope.z > 500){
                swing.strength = 'fast';
            }
        }
        swing.count++;
        console.log(swing);
    }
    else if(data.gyroscope.z < -200){
        swing.swingType = 'underhand';
        swing.direction = 'forehand';
        if(swing.strength == 'none'){
            swing.strength = 'slow';
        }
        if(data.gyroscope.z < -400){
            if(swing.strength != 'fast'){
                swing.strength = 'medium';
            }
            if(data.gyroscope.z < -500){
                swing.strength = 'fast';
            }
        }
        swing.count++;
        console.log(swing);
    }
    else if(data.gyroscope.y > 300){
        swing.swingType = 'overhand';
        swing.direction = 'forehand';
        if(swing.strength == 'none'){
            swing.strength = 'slow';
        }
        if(data.gyroscope.y > 400){
            if(swing.strength != 'fast'){
                swing.strength = 'medium';
            }
            if(data.gyroscope.y > 500){
                swing.strength = 'fast';
            }
        }
        swing.count++;
        console.log(swing);
    }
});

Myo.on('fist', function(){
    console.log('fist gesture detected');
    this.vibrate();
});

Myo.on('fingers_spread', function(){
    console.log('finger spread gesture detected');
    this.vibrate();
});

Myo.on('wave_in', function(){
    console.log('wave in gesture detected');
    this.vibrate();
});

Myo.on('wave_out', function(){
    console.log('wave out gesture detected');
    this.vibrate();
});

app.get('/racket_report', function(req, res){
    res.status(200).send(swing);
    swing = {
        swingType: 'none',
        strength: 'none',
        direction: 'none',
    };
});

var port = process.env.PORT || 80;
//Run server
http.listen(port, function() {
  console.log('listening on 80');
});