import SpeechRecognizer from 'SpeechRecognizer';

const { customElements, CustomEvent, HTMLElement } = window;

/**
 * Simple demo of speech recognition.
 *
 * @customElement recognizer-app
 */
export class RecognizerAppElement extends HTMLElement {
  get eventName () { return 'api:transcribe'; }

  get _formElement () { return this.querySelector('form'); }

  get elements () { return this._formElement.elements; }

  get _output () { return this.elements.output; }

  connectedCallback () {
    console.assert(this._formElement, '<form> element not found');

    this._recognizer = new SpeechRecognizer();

    this._formElement.addEventListener('submit', async (ev) => this._onSubmitEvent(ev));

    this.addEventListener(this.eventName, (ev) => this._apiFetchTranscript(ev));

    console.debug('recognizer-app:', this._recognizer, this.elements);
  }

  _onSubmitEvent (ev) {
    ev.preventDefault();

    const apiKey = this.elements.apiKey.value;
    const audioUrl = this.elements.audioUrl.value;
    const dryRun = this.elements.dryRun.checked;

    console.assert(apiKey, 'apiKey - required.');
    console.assert(audioUrl, 'audioUrl - required.');

    this._fireApiFetchEvent({ apiKey, audioUrl, dryRun, origEvent: ev });

    // setTimeout(() => this._fetchTranscript(audioUrl));
  }

  async _apiFetchTranscript (event) {
    const { apiKey, audioUrl, dryRun } = event.detail;

    this._recognizer.apiKey = apiKey;
    this._recognizer.dryRun = dryRun;

    this.dataset.appWorking = true;

    const { response, data } = await this._recognizer.fetchTranscript(audioUrl);

    this.dataset.appWorking = false;
    this.dataset.appOk = response.ok;
    this.dataset.appStatus = response.status;

    this._output.value = data;

    if (response.ok) {
      console.debug('API Success:', response.status, response, data, event);
    } else {
      console.error('API Error:', response.status, response, data, event);
    }
  }

  _fireApiFetchEvent (detail) {
    this.dispatchEvent(new CustomEvent(this.eventName, { detail }));
  }
}

customElements.define('recognizer-app', RecognizerAppElement);
