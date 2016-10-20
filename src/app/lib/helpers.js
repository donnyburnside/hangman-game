module.exports = {

  addEvent: (target, event, handler) => {
    return target.addEventListener(event, handler);
  },

  sanitiseHash: (hash) => {
    return hash.replace('#', '');
  },

  getTemplate: (node) => {
    if (document.getElementById(node)) {
      return document.importNode(document.getElementById(node).content, true);
    };
    return null;
  },

  redirectTo: (string, duration = 1000) => {
    setTimeout(() => {
      window.location.hash = string;
    }, parseInt(duration));
  },

  removeChildNodes: (node) => {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    };
  },

  toggleUIState: (element, progress = 'in-progress', completed = 'completed', duration = 1000) => {
    if (element) {
      element.dataset.uiState = progress;
      setTimeout(() => {
        element.dataset.uiState = completed;
      }, parseInt(duration));
    };
  },

  randomString: () => {
    return Math.random().toString(36).slice(2);
  },

  randomFromArray: (array) => {
    return array[Math.floor(Math.random() * array.length)]
  },

}
