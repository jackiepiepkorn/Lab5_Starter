// explore.js

const synth = window.speechSynthesis;
const inputForm = document.querySelector("explore");
const inputTxt = document.querySelector("text-to-speak");
const voiceSelect = document.querySelector('voice-select');
let voices = [];
window.addEventListener('DOMContentLoaded', init);

function init() {
  //populateVoiceList();
}
  // Function to populate the dropdown with available voices
  function populateVoiceList() {
    voices = synth.getVoices();
    console.log(voices);
  
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
  }
  populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// inputForm.onsubmit = (event) => {
  // event.preventDefault();

  const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  synth.speak(utterThis);

  inputTxt.blur();
// };