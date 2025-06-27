const { customElements, HTMLElement } = window;

/**
 * A form to store an API key to local storage.
 *
 * @customElement app-configuration
 */
export class AppConfigurationElement extends HTMLElement {
  get _formElement () { return this.querySelector('form'); }

  get elements () { return this._formElement.elements; }

  get _toggleButton () { return this.elements.toggleButton; }

  connectedCallback () {
    console.assert(this._formElement, '<form> element not found');
    console.assert(this._toggleButton, 'toggle button not found');

    this._keyHidden = true;

    this._formElement.addEventListener('submit', (ev) => this._onSubmitEvent(ev));
    this._toggleButton.addEventListener('click', (ev) => this._onClickEvent(ev));

    console.log('app-configuration:', this.elements);
  }

  _onSubmitEvent (ev) {
    ev.preventDefault();

    const apiKey = this.elements.apiKey.value;

    console.debug('Store:', apiKey, ev);
  }

  _onClickEvent (ev) {
    ev.preventDefault();

    this.elements.apiKey.type = this._keyHidden ? 'password' : 'text';
    this._keyHidden = !this._keyHidden;

    console.debug('Toggle:', this._keyHidden, ev);
  }
}

customElements.define('app-configuration', AppConfigurationElement);
