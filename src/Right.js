import React from 'react';

import TextTranslator from './TextTranslator';

function Right({text}) {

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden min-h-72">
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">Translation</h3>
        <TextTranslator text={text} />
      </div>
    </div>
  );
}

export default Right;