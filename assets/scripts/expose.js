// expose.js

window.addEventListener('DOMContentLoaded', init);
const jsConfetti = new JSConfetti();

function init() {
  // TODO
  const imgElements = document.getElementsByTagName("img");
  const audioElement = document.querySelector("audio");

  // Change image to the right horn when selected
  const selectElement = document.getElementById("horn-select");
  const hornImgElement = imgElements[0];

  selectElement.addEventListener("change", () => {
    let horn = selectElement.value;
    hornImgElement.src = `assets/images/${horn}.svg`;
    audioElement.src = `assets/audio/${horn}.mp3`;
  })

  // Change volume icon picture when user changes volume
  const sliderElement = document.getElementById("volume");
  const volumeImgElement = imgElements[1];

  sliderElement.addEventListener("change", () => {
    let volume = sliderElement.value;
    audioElement.volume = volume / 100;

    // Display right volume icon
    if (volume == 0) {
      volumeImgElement.src = "assets/icons/volume-level-0.svg";
    } else if (volume >= 1 && volume < 33) {
      volumeImgElement.src = "assets/icons/volume-level-1.svg";
    } else if (volume >= 33 && volume < 67) {
      volumeImgElement.src = "assets/icons/volume-level-2.svg";
    } else {
      volumeImgElement.src = "assets/icons/volume-level-3.svg";
    }
  })

  // Play audio when button is clicked
  const buttonElement = document.querySelector("button");
  buttonElement.addEventListener("click", () => {
    audioElement.play();
    if (selectElement.value === "party-horn") {
      jsConfetti.addConfetti();
    }
  })
}