/*global jQuery, io, console, socket, window */

var oscControl = oscControl || {};

(function ($) {
    'use strict';
    // Set up the socket 
    oscControl.socket = io.connect('http://192.168.1.102:1337');
    
    // grab the div with the class pad and toss it in thurr
    oscControl.pad = $(".pad");
    
    // Drop an xy control in thurr
    oscControl.pad.xy({
        displayPrevious: false,
        min: 0,
        max: 255,
        fgColor: "#222222",
        bgColor: "#000000",
        change: function (values) {
            oscControl.socket.emit('xy', values);
        }
    });
    // and make it look purty
    oscControl.pad.css({'border': '5px solid #BBB'});
    
    oscControl.accel = window.addEventListener("deviceorientation", function(event) {
        // process event.alpha, event.beta and event.gamma
        oscControl.socket.emit('alpha', event.alpha);
        oscControl.socket.emit('beta', event.beta);
        oscControl.socket.emit('gamma', event.gamma);
    }, true);
}(jQuery));