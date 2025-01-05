import React, { useState, useRef, useEffect } from 'react';
import { env, pipeline } from '@xenova/transformers';
import Spinner from './Spinner';

env.allowLocalModels = false;
env.useBrowserCache = true;

function AudioRecorder({ transcription, setTranscription }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [isTranscriberLoaded, setIsTranscriberLoaded] = useState(false);
  const [isTranscripting, setIsTranscripting] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const transcriber = useRef(null);
  const model = "Xenova/whisper-tiny";

  useEffect(() => {
    const init = async () => {
      if (transcriber.current) return;
      transcriber.current = await pipeline('automatic-speech-recognition', model);
      setIsTranscriberLoaded(true);
    };
    init();
  }, []);

  const convertBlobToFloat32Array = (blob) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(blob);
      audio.onloadeddata = () => {
        const context = new AudioContext({ sampleRate: 16000 });
        fetch(audio.src)
          .then(res => res.arrayBuffer())
          .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
          .then(audioBuffer => {
            const audioData = audioBuffer.getChannelData(0);
            resolve(audioData);
          })
          .catch(error => {
            console.log("Error in decodeAudioData:", error);
            reject(error);
          });
      }
      audio.onerror = (error) => {
        console.error("Error loading audio source:", error);
        reject(error);
      }
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/mp4' });
        setAudioURL(URL.createObjectURL(audioBlob));
        audioChunks.current = [];
        if (transcriber.current) {
          setIsTranscripting(true);

          try {
            const audioData = await convertBlobToFloat32Array(audioBlob);
            const output = await transcriber.current(audioData);
            // , {
            //     chunk_length_s: 10,
            //     stride_length_s: 5,
            // });
            console.log("Transcription done: " + output.text);
            setTranscription(output.text);
          }
          catch (e) {
            console.log(e);
            setTranscription("Transcription failed.")
          }
          finally {
            setIsTranscripting(false);
          }
        } else {
          setTranscription("Model not loaded.");
        }
      };
      
      setTranscription('');
      setAudioURL('');
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      setTranscription('Error accessing microphone:' + error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-4">

      {!isTranscriberLoaded &&
        <Spinner text={`Loading ${model}...`} />
      }
      {isTranscripting &&
        <Spinner text="Transcribing..." />
      }
      {isTranscriberLoaded && !isTranscripting && 
        <>
          <div className="flex space-x-4">
            <button
              onClick={startRecording}
              hidden={isRecording}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              Start recording
            </button>
            <button
              onClick={stopRecording}
              hidden={!isRecording}
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              Stop recording
            </button>
          </div>
          {transcription && (
            <div className="mt-4 border p-2 rounded shadow-md bg-white w-full overflow-y-auto">
              <p className="text-gray-800 whitespace-pre-line">{transcription}</p>
            </div>
          )}
          {audioURL && (
            <audio controls src={audioURL} className="w-full" />
          )}
        </>
      }
    </div>
  );
}

export default AudioRecorder;