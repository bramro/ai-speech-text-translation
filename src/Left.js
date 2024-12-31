import AudioRecorder from './AudioRecorder';

function Left({ text, setText }) {

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden min-h-72">
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">Speech recording</h3>
        <p className="text-gray-700 text-xs mb-4">
          Start the recording and say some English words or a short sentence.
        </p>
        <AudioRecorder transcription={text} setTranscription={setText} />
      </div>
    </div>
  );
}

export default Left;