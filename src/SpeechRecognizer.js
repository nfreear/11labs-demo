
const { fetch, FormData, Request } = window;

/**
 * Minimal wrapper round the ElevenLabs speech-to-text API.
 *
 * @see https://elevenlabs.io/docs/api-reference/speech-to-text/convert
 * @see https://elevenlabs.io/docs/cookbooks/speech-to-text/quickstart
 */
export class SpeechRecognizer {
  constructor () {
    this.dryRun = false;
    this._options = {
      model_id: 'scribe_v1'
    }
  }

  get apiKey () { return this._apiKey; }

  set apiKey (key) { this._apiKey = key; }

  set options (OPT) { this._options = OPT; }

  get apiUrl () { return 'https://api.elevenlabs.io/v1/speech-to-text'; }

  get modelId () { return this._options.model_id; }

  async _fetchAudioBlob (audioUrl, type = 'audio/mp3') {
    const response = await fetch(audioUrl);
    const audioBlob = new Blob([await response.arrayBuffer()], { type });
    return audioBlob;
  }

  _getFormData (audioBlob) {
    const formData = new FormData();
    formData.append('file', audioBlob);
    // formData.append('model_id', this.modelId);
    Object.entries(this._options).forEach(([ key, value ]) => formData.append(key, value));
    return formData;
  }

  async _createPostRequest (audioUrl, type = 'audio/mp3') {
    console.assert(this._apiKey, 'apiKey - Property required.');
    const audioBlob = await this._fetchAudioBlob(audioUrl, type);
    return new Request(this.apiUrl, {
      method: 'POST',
      headers: {
        'xi-api-key': this._apiKey,
        // Don't set!
        // https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
        // https://stackoverflow.com/questions/35192841/how-do-i-post-with-multipart-form-data-using-fetch
        // 'Content-Type': 'multipart/form-data',
      },
      body: this._getFormData(audioBlob),
      redirect: 'error',
    });
  }

  async fetchTranscript (audioUrl, type = 'audio/mp3') {
    const request = await this._createPostRequest(audioUrl, type);
    if (this.dryRun) {
      console.debug('API dry-run. Request:', request, this);
      return { request };
    }
    const response = await fetch(request);
    const data = await response.text();
    console.assert(response.ok, `API Error: ${response.status}`);
    return { data, response, request };
  }
}

export default SpeechRecognizer;

/*
422 (Unprocessable Content)

{"detail":[{"type":"missing","loc":["body","model_id"],"msg":"Field required","input":null}]}
*/
