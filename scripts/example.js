/**
 * @see https://elevenlabs.io/docs/cookbooks/speech-to-text/quickstart
 */

// example.mts
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

export default ElevenLabsClient;

export async function transcribe () {
  const elevenlabs = new ElevenLabsClient();

  // https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3
  const response = await fetch(
    'https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3'
  );

  const audioBlob = new Blob([await response.arrayBuffer()], { type: 'audio/mp3' });

  const transcription = await elevenlabs.speechToText.convert({
    file: audioBlob,
    modelId: "scribe_v1", // Model to use, for now only "scribe_v1" is supported.
    tagAudioEvents: true, // Tag audio events like laughter, applause, etc.
    languageCode: "eng", // Language of the audio file. If set to null, the model will detect the language automatically.
    diarize: true, // Whether to annotate who is speaking
  });

  console.log(transcription);
}
