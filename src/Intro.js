
function Intro() {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="px-6 py-4">
      {/* <h2 className="font-bold text-2xl mb-2 text-gray-800">Demo app</h2> */}
      <h2 className="text-gray-700 text-base mb-4">
        This is a demo app made with <a href="https://react.dev">React 19</a>, <a href="https://tailwindcss.com">Tailwind CSS</a> and <a href="https://huggingface.co/docs/transformers.js/index">Hugging Face Transformers.js</a>.
      </h2>
      <p className="text-xs">
        Your browser will ask permission to use your microphone. <strong>All recorded text will not be sent to the server, as the model is running in your browser.</strong>
      </p>
      <p className="text-xs">
        The first time you visit this page the models are downloaded; this may take some time.
      </p>
    </div>
    <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
        #react
      </span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
        #tailwind
      </span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
        #huggingface
      </span>
    </div>
  </div>
  );
}

export default Intro;