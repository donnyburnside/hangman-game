import Config from './config';

import Controller from './controller';

require('../css/style.css');

export default class App {

  constructor() {

    this.title = Config.title;
    this.description = Config.description;

    // Controller
    this.controller = new Controller();

  };

};
