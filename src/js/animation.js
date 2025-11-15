//jshint esversion:6

const button = document.querySelector(".btn"),
  sectionOne = document.querySelector(".section-one"),
  sectionTwo = document.querySelector(".section-two"),
  flash = document.querySelector(".flash");

// These are the text elements that hold messages to be displayed in the respective sections

const sectionOneText = document.querySelectorAll(".section-one .section-text"), // Section 1 messages
  sectionTwoText = document.querySelectorAll(".section-two .section-text"), // Section 2 messages
  sectionTitle = document.querySelector(".section-title"), // Section 2 title
  CTAtext = document.querySelector(".btn-ref");

//Elements in the card page

const frames = document.querySelectorAll(".frame"),
  msgWindow = document.querySelector(".scroll"), // this one has the message frame in [0] and card fram in [1]
  msg = document.querySelector(".text"); // the Message para

//Sfx files

const music = document.querySelector(".hbd-aud"),
  soundMp3 = document.querySelector(".sound-aud");

//  readMsg() displays the paras in each scene successively. It takes an array of the para elements as input.

const readMsg = (text, isTitle = false) => {
  if (isTitle) {
    // Show title immediately
    text.classList.add("read");
    return;
  }
  
  for (let i = 0; i < text.length; i++) {
    // this loop goes through all the text msg paras
    setTimeout(() => {
      // A timeout of 3s is applied to all text elements so that appear successively one after the other
      text[i].classList.add("read"); // this adds a fadeIn-fadeOut animation to elements
      if (i === text.length - 1) {
        // this ensures that the button appears only after the last text is displayed.
        button.style.display = "inline-block";
        CTAtext.style.display = "block";
      }
    }, 3000 * i);
  }
};

// transition() is animation for change from one scene to another. It takes the current scene div element as input.

const transition = (currentScene) => {
  currentScene.classList.add("fade-in");
  currentScene.style.opacity = "0";
  button.style.display = "none";
  CTAtext.style.display = "none";
};

//Animation Code

/*
    Section 1: Happy Birthday message appears first
    Section 2: Permata Nitya appears after clicking Next
    Then the birthday card displays
*/

export const animate = function () {
  // Hide button and text initially
  button.style.display = "none";
  CTAtext.style.display = "none";
  
  CTAtext.innerHTML = "Click Next";
  button.classList.add("next-btn");

  readMsg(sectionOneText);

  button.addEventListener("click", function () {
    if (button.classList.contains("next-btn")) {
      /* 
        When Next is clicked on Section 1, play sound.mp3 and transition to Section 2
      */
      soundMp3.play();
      
      transition(sectionOne);
      CTAtext.innerHTML = "Click Next";
      setTimeout(function () {
        sectionOne.style.display = "none";
        sectionTwo.style.display = "block";
        sectionTwo.style.opacity = "1";
        
        // Show title first
        readMsg(sectionTitle, true);
        
        // Then show text messages
        setTimeout(() => {
          readMsg(sectionTwoText);
        }, 500);
        
        button.classList.remove("next-btn");
        button.classList.add("final-next");
      }, 1000);
    } else if (button.classList.contains("final-next")) {
      /* 
        When Next is clicked on Section 2, show the birthday card
      */
      transition(sectionTwo);
      
      music.loop = true;
      music.play();

      setTimeout(function () {
        sectionTwo.style.display = "none";
        flash.style.display = "block";
        flash.style.opacity = "1";
      }, 1000);

      setTimeout(() => {
        flash.classList.add("fade-in");
        flash.style.opacity = "0";
      }, 2000);

      setTimeout(() => {
        flash.style.display = "none";
        frames[0].style.display = "flex";
        frames[0].classList.add("appear");
        frames[0].style.opacity = "1";
      }, 3500);
    }
  });
};
