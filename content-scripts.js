let song;
let frequencyArray;
let fft;
let isPlaying = false;
let frequencyArray1 = [];
function togglePlayback(element) {
    element.classList.toggle('active');
    
    const audio = document.getElementById('audioPlayer');
    
    if (element.classList.contains('active')) {
      playAudio();
    } else {
      stopAudio();
    }
}
function preload() {
  song = loadSound('./Audio 1.wav');
  frequencyArray = loadJSON('frequency-array.json');
}

function setup() {
 

  // Create an instance of p5.FFT
  fft = new p5.FFT();
  
  // Create buttons

    }
  


function draw() {
  
  if (isPlaying) {
    // Get the frequency spectrum of the audio signal
    const spectrum = fft.analyze();
    const filspectrum = spectrum.filter(value => value !== 0);
    let maxSpectrum1 = max(filspectrum);

    // Push the spectrum to the frequency array
    frequencyArray1.push(maxSpectrum1);
    
  }
}

function playAudio() {
  if (!isPlaying) {
    // Start playing the audio
    song.play();
    isPlaying = true;
  }
}

function stopAudio() {
  if (isPlaying) {
    // Stop the audio playback
    song.stop();
    isPlaying = false;
    
    // Display the captured frequency array
    compare();
  }
}

function compare() {
    let c=0;
    for (let key in frequencyArray) {
        freq=frequencyArray[key];
    }
    for(let i =0 ; i< freq.length; i++){
        
    if(Math.abs(freq[i]-frequencyArray1[i])<20){
    
        c=c+1;
    }
   }
  let  percent = ( c / freq.length) * 100;
   per=document.getElementById('similarity');
   per.textContent=percent + '%';
}
