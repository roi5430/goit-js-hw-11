export default class BtnControl {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.spinner = document.querySelector(`${selector} .spinner`);
    return refs;
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }
  hide() {
    this.refs.button.classList.add('is-hidden');
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.spinner.classList.add('is-hidden');
  }
  disable() {
    this.refs.button.disabled = true;
    if (this.refs.spinner) {
      this.refs.spinner.classList.remove('is-hidden');
    }
  }
}
