
# 11labs-demo #

[![Node.js][ci-badge]][ci]

A demo of using the [ElevenLabs][] speech recognition API in the browser.

## `<audio-recorder>`

The repository contains an `<audio-recorder>` custom element:
```html
<audio controls></audio>
<audio-recorder></audio-recorder>
```

This is an example of listening for the `audio-recorder` event emitted by the custom element:

```js
const audioElem = document.querySelector('audio');

document.body.addEventListener('audio-recorder', (event) => {
  const { eventName } = event;
  const recorder = event.target;

  if (event.is('stop')) {
    audioElem.src = recorder.createAudioURL();
  }

  console.debug('audio-recorder:', eventName, event);
});
```

[elevenlabs]: https://elevenlabs.io/docs/capabilities/speech-to-text
[ci]: https://github.com/nfreear/11labs-demo/actions/workflows/node.js.yml
[ci-badge]: https://github.com/nfreear/11labs-demo/actions/workflows/node.js.yml/badge.svg
