import Config from './config';
import Helpers from './lib/helpers';

import Game from './game';

export default class Controller {

  constructor() {

    // Get DOM element for the app
    this.element = document.getElementById(Config.appElementId);

    // Create a new instance of Game()
    this.game = new Game();

  };



  // Method: Set the View
  setView(hash) {

    // console.log('Hash:', hash);

    // Get the view object by passing the hash in to the getView method
    let viewObject = this.getViewObject(hash);

    // console.log('View Object:', viewObject);

    // Handle the view object
    if (viewObject.name === Config.loadingClass || viewObject.hasOwnProperty('template')) {

      // VIEW: Loading OR App View

      // Update'data-view' attribute on app element
      this.element.dataset.view = viewObject.name;

      // Check which view were dealing with
      if (viewObject.name === Config.loadingClass) {

        // VIEW: Loading

        // console.log('Loading viewwww');

        // Remove DOM nodes from the app element
        Helpers.removeChildNodes(this.element);

        // Redirect to start view after a 2s delay (to imitate async behaviour)
        Helpers.redirectTo('start', 2000);

      } else if (viewObject.hasOwnProperty('template')) {

        // VIEW: App View

        // Pass the view template to the render method
        this.render(viewObject.template);

      };

    } else {

      // VIEW: 404, View Not Found ;)

      // This is likely achieved by changing the url manually (guessing pages) but
      // also when a matching <template> element has not been found for the view

      // Redirect to the start view
      Helpers.redirectTo('start', 250);

    };



    // Bind logic to the view
    switch (viewObject.name) {

      case 'start':

        // This is the Start view
        // console.log('Start');

      break;

      case 'game':

        // This is the Game view
        // console.log('Game');

        // Initialise the game
        this.game.start();

        // Ensure the letter field is focused
        this.element.querySelector('.form-field').focus();

      break;

      case 'win':

        // This is the Win view
        // console.log('Win');

        // Initialise the games Win method
        this.game.win();

      break;

      case 'lose':

        // This is the Lose view
        // console.log('Lose');

      break;

      case Config.loadingClass:

        // This is the loading view
        // console.log('Loading', '..Then redirecting...');

      break;

      case '404':

        // This view was not found
        // console.log('Error 404 !!!', 'Redirecting...');

      break;

    };

  };


  // Method: Get the View Object
  getViewObject(hash) {

    // console.log('Get View:', hash);

    // Create a sanitised version of the hash (simply removes the '#')
    let cleanHash = Helpers.sanitiseHash(hash);

    // console.log('Clean Hash:', cleanHash);

    // Check the DOM for an element with an ID that matches the view
    let viewExists = !!document.getElementById(cleanHash);

    // Setup the viewName variable based on the following conditions;
    //  - No hash was passed,
    //  - No view template was found
    // Otherwise we set the view name to the clean hash.

    let viewName;

    if (cleanHash === '') {
      viewName = Config.loadingClass;
    } else if (!viewExists) {
      viewName = '404';
    } else {
      viewName = cleanHash;
    }

    // console.log('View Name:', viewName);

    // console.log('View Exists:', viewExists);

    // Create an object for the view
    let viewObject = {
      name: viewName
    };

    // Add the view template (if found) to the view object
    if (viewExists) {
      viewObject.template = Helpers.getTemplate(viewName);
    }

    // Return the view object
    return viewObject;

  };



  render(template) {

    // console.log('Render:', template);

    // Ensure the app element is clear of any child nodes
    Helpers.removeChildNodes(this.element);

    // Render the new template node
    this.element.appendChild(template);

    // Then start the UI state attribute toggle
    // Adds a 'data-ui-state' attribute to the app element, to help with styling
    Helpers.toggleUIState(this.element, 'animating', 'animated', Config.viewAnimationDuration);

  };

};
