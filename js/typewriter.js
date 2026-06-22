/**
 * typewriter.js
 * Lightweight typewriter engine — no dependencies.
 * Types text character-by-character with configurable delay and optional callback.
 */

class Typewriter {
  /**
   * @param {HTMLElement} el - Target element to type into
   * @param {object}      opts
   * @param {number}      opts.speed   - Base ms per character (default 55)
   * @param {number}      opts.jitter  - Random ±ms added per char (default 25)
   * @param {number}      opts.delay   - Initial delay before typing starts (default 0)
   */
  constructor(el, opts = {}) {
    this.el      = el;
    this.speed   = opts.speed  ?? 55;
    this.jitter  = opts.jitter ?? 25;
    this.delay   = opts.delay  ?? 0;
    this._queue  = [];
    this._running = false;
  }

  /**
   * Queue a string to be typed.
   * @param {string}   text
   * @param {function} [onDone] - Callback fired after string is fully typed
   */
  type(text, onDone) {
    this._queue.push({ text, onDone });
    if (!this._running) this._run();
    return this;
  }

  /** Clear element and queue */
  reset() {
    this._queue  = [];
    this._running = false;
    this.el.textContent = '';
  }

  _run() {
    if (!this._queue.length) { this._running = false; return; }
    this._running = true;

    const { text, onDone } = this._queue.shift();
    let i = 0;

    const tick = () => {
      if (i < text.length) {
        this.el.textContent += text[i++];
        const wait = this.speed + Math.random() * this.jitter * 2 - this.jitter;
        setTimeout(tick, Math.max(10, wait));
      } else {
        onDone && onDone();
        this._run();
      }
    };

    setTimeout(tick, this.delay);
    this.delay = 0; // only first entry gets the initial delay
  }
}

window.Typewriter = Typewriter;
