# ai-speech-text-translation

Demo React/Tailwind app with AI speech-to-text and translation capabilities. This application uses browser-based machine learning models to convert English speech to text and translate it to Dutch.

## Features

- Speech-to-text conversion using Whisper AI model
- English to Dutch translation using Opus MT model
- Real-time audio recording and transcription 
- Modern UI built with Tailwind CSS
- Fully client-side processing - no server required

## Technologies

- React 19
- Tailwind CSS
- Hugging Face Transformers.js
- Web Audio API

## Installation

First, install all dependencies:

```bash
npm install
```

## Development

To run the development server:

```bash
npm start
```

This will start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Production Build

To create a production build:

```bash
npm run build
```

This will create an optimized build in the build folder.

## Important Notes

- The browser will request microphone permissions for audio recording
- ML models are downloaded when first visiting the page, which may take some time
- All processing happens locally in the browser - no audio/text is sent to external servers
- This readme was written by Claude 3.5 Sonnet, based on the contents of this repository.
