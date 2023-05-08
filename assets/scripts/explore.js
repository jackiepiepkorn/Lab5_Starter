const synth = window.speechSynthesis;
const inputForm = document.getElementById("explore");
const inputTxt = document.getElementById("text-to-speak");
const voiceSelect = document.getElementById('voice-select');
const button = document.querySelector('button');
const img = document.querySelector('img');
let voices = [];
const utterThis = new SpeechSynthesisUtterance();
window.addEventListener('DOMContentLoaded', init);

function init() {

  // Populate the dropdown with available voices
  synth.addEventListener("voiceschanged", () => {
    voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
  
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  })

  // Speak when button is pressed
  button.addEventListener("click", () => {
    utterThis.text = inputTxt.value;
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
  })
  
  // Change image when it's speaking
  utterThis.onstart = function(event) {
    // Change the image source to a speaking image
    img.src = 'assets/images/smiling-open.png';
  }
  utterThis.onend = function(event) {
    // Change the image source back to the original image
    img.src = 'assets/images/smiling.png';
  }
}