/**
 * cursor.js
 * Manages the text-cursor element inside the hero name heading.
 * Shows cursor during typing, keeps blinking after done.
 */

(function () {
  'use strict';

  window.HeroCursor = {
    _el: null,

    init(selector) {
      this._el = document.querySelector(selector);
      return this;
    },

    show() {
      this._el && this._el.classList.add('visible');
    },

    hide() {
      this._el && this._el.classList.remove('visible');
    },

    blink() {
      // The CSS animation handles blinking; just ensure visible
      this.show();
    },
  };

})();
