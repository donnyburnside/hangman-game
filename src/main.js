import Helpers from './app/lib/helpers';

import App from './app/app';

// Start things off with an IIFE
(function() {

  'use strict';

  // Create a new instance of App()
  const app = new App();

  // console.log('App:', app);

  // Create a helper for passing the current url hash into the app
  const setView = () => {
    app.controller.setView(document.location.hash);
  };

  // Attach setView helper to 'load' and 'hashchange' events
  Helpers.addEvent(window, 'load', setView);
  Helpers.addEvent(window, 'hashchange', setView);

}());
