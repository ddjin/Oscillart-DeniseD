// connect css to js
const color_picker = document.getElementById('color');
const vol_slider = document.getElementById('vol-slider');



// connect the js elements to the html elements
const input = document.getElementById('input');

// define canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var amplitude = 40;
var interval = null;
var reset = false;
var timepernote = 0;
var length = 0;

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
 freq = pitch / 10000;
gainNode.gain.setValueAtTime(vol_slider.value, audioCtx.currentTime);
setting = setInterval(() => {gainNode.gain.value = vol_slider.value}, 1);
oscillator.type = waveTypeSelect.value;
oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
setTimeout(()=>{
     clearInterval(setting);
      gain.Node.gain.value = 0;
     },((timepernote)-10));
}

// function to handle button click and stop and resume
function handle() { 
 reset = true;

var usernotes = String(input.value);
var noteslist = [];
 audioCtx.resume();
 gainNode.gain.value = 0;
 length = usernotes.length; 
 timepernote = (6000 / length);

 for ( i = 0; i < usernotes.length;i++) {
    noteslist.push(notenames.get(usernotes.charAt(i)));
 }
  let j = 0;
  
  repeat = setInterval(() =>{
        if (j <noteslist.length) {
            frequency(parseInt(noteslist[j]));
            drawWave();
            j++;
        } else {
            clearInterval(repeat)
        }
    }, timepernote)

 }

// canvas methods 
var counter = 0;

function line() {
     y = height/2 + ((vol_slider.value/100)*40) * Math.sin(x * 2  * Math.PI * freq * (0.5 * length));
    ctx.lineTo(x, y);
     ctx.strokeStyle = color_picker.value;
    ctx.stroke();
    x = x + 1;
    counter++;
    if ( counter > (timepernote / 20)) {
        clearInterval(interval);
    }
}

function drawWave() {
    clearInterval(interval);
if (reset) {
    ctx.clearRect(0,0,width, height);
    x = 0;
    y= height/2;
    ctx.moveTo(x, y);
    ctx.beginPath();
}
counter = 0;
interval = setInterval(line, 20);
reset = false;
}



