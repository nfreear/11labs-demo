
import SpeechRecognizer from 'SpeechRecognizer';

const recognizer = new SpeechRecognizer();
const formElem = document.querySelector('form');

console.debug('Recognizer:', recognizer, formElem.elements);

formElem.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const elements = ev.target.elements;
  const audioUrl = elements.audioUrl.value;

  console.assert(elements.apiKey.value, 'apiKey - required.');
  console.assert(audioUrl, 'audioUrl - required.');

  recognizer.apiKey = elements.apiKey.value;

  // console.debug('submit:', elements.apiKey.value);

  const { response, data } = await recognizer.fetchTranscript(audioUrl);
  elements.output.value = data;

  console.debug('submit:', response, apiKey, audioUrl, ev);
});
