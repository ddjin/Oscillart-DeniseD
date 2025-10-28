const input = document.getElementById('input');

function frequency(pitch){


}

function handle() { 
 audioCtx.resume();
 gainNode.gain.value = 0;
    frequency(input.value);
 
}

// create web audio api elements
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();

// create Oscillator node 
const oscillator = audioCtx.createOscillator(); 
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type ="sine";

oscillator.start();
gainNode.gain.value = 0;
