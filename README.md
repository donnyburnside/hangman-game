# Hangman
My version of the game of Hangman. An exercise in writing a web app/game using JavaScript.
[View the demo](http://codepen.io/donnyburnside/full/qaQJxY/).

**Table of Contents**
* [Features](#features)
* [Game Mechanics](#game-mechanics)
* [Getting Started](#getting-started)
* [Further Development](#further-development)
* [Contributors](#contributors)

# Features
* Written in **ECMAScript2015 / ES6** - *and compiled back to ES5 using Babel*
* Styled using **PostCSS** - *because I prefer it to SASS*
* Bundled using **Webpack** - *which compiles all code and assets into a single JavaScript file*
* Responsive

# Game Mechanics
* Chooses a random word from an array of pre-defined words - *can be changed in src/app/config.js*
* Multiple pages / views - *(loading, start, game, win and lose)*
* Anti-cheat - *the 'win' screen is only accessible after successfully completing a word*
* Capture 404 pages / missing views and redirect them to the 'start' screen

# Getting Started
* Pull the repo down to your machine
* Run ``npm install`` to install dependencies

That's all there is to it. Once the above command has completed, Webpack will automatically compile a production-ready version under the games ``dist`` directory. Just open the ``dist/index.html`` file in your browser to run the game locally.

As you can probably tell, Node/NPM are required.

# Further Development
If you plan to change or further develop the game you'll need to to be aware of the following commands:
* ``webpack --watch`` - *watches source files and re-compiles them as and when they change*
* ``webpack --p`` - *generates a new, production-ready version of the game*

# Contributors

* [Donny Burnside](http://donnyburnside.com)
