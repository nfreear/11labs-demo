const { customElements, HTMLElement } = window;

/**
 * A form to store an API key to browser local storage.
 *
 * @copyright © Nick Freear, June-2025.
 * @customElement app-configuration
 */
export class AppConfigurationElement extends HTMLElement {
  #keyHidden = true;

  get #formElement () { return this.querySelector('form'); }

  get #elements () { return this.#formElement.elements; }

  get #toggleButton () { return this.#elements.toggleButton; }

  connectedCallback () {
    console.assert(this.#formElement, '<form> element not found');
    console.assert(this.#toggleButton, 'toggle button not found');

    this.#formElement.addEventListener('submit', (ev) => this.#onSubmitEvent(ev));
    this.#toggleButton.addEventListener('click', (ev) => this.#onClickEvent(ev));

    console.log('app-configuration:', this.#elements);
  }

  #onSubmitEvent (ev) {
    ev.preventDefault();

    const apiKey = this.#elements.apiKey.value;

    console.debug('Store:', apiKey, ev);
  }

  #onClickEvent (ev) {
    ev.preventDefault();

    this.#elements.apiKey.type = this.#keyHidden ? 'password' : 'text';
    this.#keyHidden = !this.#keyHidden;

    console.debug('Toggle:', this.#keyHidden, ev);
  }
}

customElements.define('app-configuration', AppConfigurationElement);
