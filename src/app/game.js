import Config from './config';
import Helpers from './lib/helpers';

export default class Game {

  constructor() {

    // console.log('Game instantiated!');

  };



  // Method: Start a New Game
  start() {

    // console.log('New Game started!');

    // Grab some DOM elements
    const currentWord = document.querySelector('.current-word');
    const usedLetters = document.querySelector('.used-letters');
    const canvas = document.querySelector('.canvas');
    const controls = document.querySelector('.game__controls .form-group');
    const inputField = document.querySelector('.form-field');
    const guessButton = document.querySelector('.button');
    const errorElement = document.querySelector('.errors');

    // Setup the game properties
    this.attempts = {
      total: 0,
      correct: 0,
      incorrect: 0
    };
    this.usedLetters = [];
    this.currentWord = Helpers.randomFromArray(Config.dictionary);
    this.wordToGuess = new Array(this.currentWord.length);

    // Iterate over currentWord and populate wordToGuess with an '_' for each letter
    for(let i = 0; i < this.currentWord.length; i++) {
      this.wordToGuess[i] = '_';
    };

    // Render wordToGuess to DOM
    currentWord.innerHTML = this.wordToGuess;

    // Render usedLetters to DOM
    usedLetters.innerHTML = this.usedLetters;

    // Add checkLetter function to guessButton
    Helpers.addEvent(guessButton, 'click', () => {
      this.checkLetter(inputField.value.toLowerCase());
    });


    // Check Letter
    this.checkLetter = (letter) => {

      if (letter) {

        // console.log('Letter:', letter);

        // Create some variables for storing letter positions and matches
        let position = 0;
        let matches = [];

        // Check if this letter has already been used
        if (this.usedLetters.indexOf(letter) != -1) {

          // console.log('You\'ve already used this letter');
          this.printError('You\'ve already used this letter');

          // Update UI (clears the input field and re-applies focus to it)
          this.updateUI();

        } else {

          // Increment number of attempts
          this.attempts.total = ++this.attempts.total;

          // Push letter to the usedLetters array
          this.usedLetters.push(letter);

          // Iterate over the word to find any matching letters.
          // Then push their (incremented) position to the matches array
          // We need to increment the position to account for us using an array
          while ( (position = this.currentWord.indexOf(letter, position) ) > -1 ) {
            matches.push(++position);
          }

          // Check for matching letters
          if (matches.length == 0) {

            // No matches were found

            // Increment number of incorrect attempts
            this.attempts.incorrect = ++this.attempts.incorrect;

            // Update the 'data-stage' attribute on the canvas
            canvas.dataset.stage = this.attempts.incorrect;

          } else {

            // Matches were found

            // Increment number of correct attempts
            this.attempts.correct = ++this.attempts.correct;

            // Iterate over matching letters
            for (let i = 0; i < matches.length; i++) {

              // Find position of the letter and replace '_' with the letter
              // (Splice: Start Position, Delete Count, Element to Add)
              this.wordToGuess.splice(matches[i] - 1, 1, letter);

            }

            // Render updated wordToGuess to DOM
            currentWord.innerHTML = this.wordToGuess;

          }

          // Render updated usedLetters to DOM
          usedLetters.innerHTML = this.usedLetters;

          // Update Canvas
          this.updateCanvas(canvas.dataset.stage);

          // Update UI (clears the input field and re-applies focus to it)
          this.updateUI();

          // Check Game Status
          this.checkStatus();

        }

      } else {

        this.printError('Please enter a letter');

        // Update UI (clears the input field and re-applies focus to it)
        this.updateUI();

      }

      // console.log(this.attempts);

    };



    // Check Status (of the game)
    this.checkStatus = () => {

      // Get the current guess
      let currentGuess = this.wordToGuess.join('');

      // console.log('Current Guess:', currentGuess);
      // console.log('Current Word:', this.currentWord);

      // Check if the current guess is equal to the current word
      if (currentGuess === this.currentWord) {

        // console.log('Win');

        // Store current word in localStorage (for collecting from the Win view)
        localStorage.setItem('word', this.currentWord);

        // Then redirect to the 'Win' view
        Helpers.redirectTo('win', 0);

      // Check if the maximum number of incorrect attempts has been reached
      } else if (this.attempts.incorrect >= Config.maxIncorrectAttempts) {

        // console.log('Lose');

        // Disable the controls
        inputField.disabled = true;
        guessButton.disabled = true;

        // Then redirect to the 'Lose' view
        Helpers.redirectTo('lose', 1000);

      }

    };



    // Update UI
    this.updateUI = () => {

      // Reset and focus the letterField
      inputField.value = '';
      inputField.focus();

    };



    // Update Canvas
    this.updateCanvas = (stage) => {

      // Pass the stage through to setCanvas()
      this.setCanvas(stage);

    };



    // Set Canvas
    this.setCanvas = (stage) => {

      // console.log('Stage:', stage);

      // Get the canvas context
      const ctx = canvas.getContext('2d');

      // Setup the path
      ctx.beginPath();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;

      // Update the canvas depending on the current stage
      switch (parseInt(stage)) {
        case 1:
          // Bottom Frame
          this.drawLine(ctx, 10, 170, 300, 170);
        break;

        case 2:
          // Left Frame
          this.drawLine(ctx, 10, 10, 10, 170);
        break;

        case 3:
          // Top Frame
          this.drawLine(ctx, 10, 10, 150, 10);
        break;

        case 4:
          // Rope
          this.drawLine(ctx, 150, 10, 150, 30);
        break;

        case 5:
          // Head
          this.drawCircle(ctx, 150, 40, 10, 0);
        break;

        case 6:
          // Torso
          this.drawLine(ctx, 150, 50, 150, 95);
        break;

        case 7:
          // Left Arm
          this.drawLine(ctx, 150, 55, 130, 85);
        break;

        case 8:
          // Right Arm
          this.drawLine(ctx, 150, 55, 170, 85);
        break;

        case 9:
          // Left Leg
          this.drawLine(ctx, 150, 95, 165, 130);
        break;

        case 10:
          // Right Leg
          this.drawLine(ctx, 150, 95, 135, 130);
        break;
      };

    };



    // Helper for drawing lines to the canvas
    this.drawLine = (ctx, fromX, fromY, toX, toY) => {

      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

    };



    // Helper for drawing circles to the canvas
    this.drawCircle = (ctx, fromX, fromY, radius, angle) => {

      ctx.beginPath();
      ctx.arc(fromX, fromY, radius, angle, Math.PI*2, true);
      ctx.stroke();

    };



    // Print Errors
    this.printError = (error) => {

      // Add error element and classes
      errorElement.innerHTML = '<span>' + error + '</span>';
      controls.setAttribute('data-animation-duration', '1s');
      controls.setAttribute('data-animation', 'shake-ltr');

      setTimeout(() => {

        // Remove error classes once viewAnimationDuration has elapsed
        controls.removeAttribute('data-animation');
        controls.removeAttribute('data-animation-duration');

      }, Config.viewAnimationDuration);

      setTimeout(() => {

        // Remove error elements once viewAnimationDuration has elapsed
        // viewAnimationDuration is multiplied here to account for CSS animation delay
        Helpers.removeChildNodes(errorElement);

      }, Config.viewAnimationDuration * 2);

    };



  };



  // Method: Win
  win() {

    // console.log('Called win method');

    // Check local storage for the word
    if (localStorage.getItem('word')) {

      // This is a genuine victory

      // Get the current word from localStorage and render it to the DOM
      document.querySelector('.guessed-word').textContent = localStorage.getItem('word');

      // Remove word from localStorage
      localStorage.removeItem('word');

    } else {

      // This is a fake victory

      // The user either reloaded the 'win' view OR manually changed the hash 
      Helpers.redirectTo('start', 0);

    };

  };

};
