import React, { useState, useRef, useEffect } from 'react';
import { env, pipeline } from '@xenova/transformers';
import Spinner from './Spinner';

env.allowLocalModels = false;
env.useBrowserCache = true;

function TextTranslator({ text }) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslatorLoaded, setIsTranslatorLoaded] = useState(false);
  const [translation, setTranslation] = useState('');
  const translator = useRef(null);
  const model = "Xenova/opus-mt-en-nl";

  useEffect(() => {
    const init = async () => {
      if (translator.current) return;
      translator.current = await pipeline('translation', model);
      setIsTranslatorLoaded(true);
    };
    init();
  }, []);

  const performTranslation = async (textToTranslate) => {
    if (!translator.current) {
      console.log("translator not loaded");
      return;
    }

    setIsTranslating(true);

    try {
      const output = await new Promise((resolve) => {
        setTimeout(async () => {
          const result = await translator.current(textToTranslate);
          resolve(result);
        }, 500);
      });

      if (output && output[0]) {
        setTranslation(output[0].translation_text);
      }
    } catch (error) {
      setTranslation("Error performing translation:", error);
    } finally {
      setIsTranslating(false);
    }
  }

  useEffect(() => {
    if (text) {
      performTranslation(text);
    } else {
      setTranslation('');
    }
    // eslint-disable-next-line
  }, [text]);

  return (
    <div className="flex flex-col items-start space-y-4">
      {!isTranslatorLoaded &&
        <Spinner text={`Loading ${model}...`} />
      }
      {text &&
        <div className="mt-4 border p-2 rounded shadow-md bg-white w-full overflow-y-auto">
          <span className="text-1xl">🇬🇧 {text}</span>
        </div>
      }
      {isTranslating &&
        <Spinner text="Vertalen..." />
      }
      {translation &&
        <div className="mt-4 border p-2 rounded shadow-md bg-white w-full overflow-y-auto">
          <span className="text-1xl">🇳🇱 {translation}</span>
        </div>
      }
    </div>
  );
}

export default TextTranslator;