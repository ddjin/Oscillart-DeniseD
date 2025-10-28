// connect the js elements to the html elements
const input = document.getElementById('input');

// define canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var amplitude = 40;
var interval = null;
var counter = 0;


// create web audio api elements
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();

// create Oscillator node 
const oscillator = audioCtx.createOscillator(); 
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type ="sine";

// make the oscillator not start immediately
oscillator.start();
gainNode.gain.value = 0;

//allow users to type in a key, shorthand for the frequencies
notenames = new Map();

// shorthands for frequencies
notenames.set("C", 261.6);
notenames.set("D", 293.7);
notenames.set("E", 329.6);
notenames.set("F", 349.2);
notenames.set("G", 392.0);
notenames.set("A", 440);
notenames.set("B", 493.9);

// function to set frequency and channel sound
function frequency(pitch){

gainNode.gain.setValueAtTime(100, audioCtx.currentTime);
oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
gainNode.gain.setValueAtTime(0, audioCtx.currentTime + 1);
}

// function to handle button click and stop and resume
function handle() { 
var usernotes = String(input.value);
 audioCtx.resume();
 gainNode.gain.value = 0;
 frequency(notenames.get(usernotes));
}

// canvas methods 

function line() {
   var freq = pitch / 10000;
    y = height/2 + (amplitude * Math.sin(x * 2 * Math.PI * freq));
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
    counter++;
    if (counter > 50) {
        clearInterval(interval);
    }
}

function drawWave() {
    ctx.clearRect(0, 0, width, height);
   x = 0;
   y = height/2;
    ctx.moveTo(x, y);
    ctx.beginPath();
    counter = 0;
    interval = setInterval(line, 20);
}



