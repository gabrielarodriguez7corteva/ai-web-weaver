
import React, { useState, useCallback } from 'react';
import { ClipboardCheckIcon, ClipboardIcon } from './Icons';

interface CodePreviewProps {
  code: string;
  viewMode: 'preview' | 'code';
}

export const CodePreview: React.FC<CodePreviewProps> = ({ code, viewMode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  if (viewMode === 'preview') {
    return (
        <div className="w-full h-full bg-white">
            <iframe
                srcDoc={code}
                title="Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts"
            />
        </div>
    );
  }

  return (
    <div className="relative h-full bg-gray-900 text-sm p-4 overflow-auto font-mono">
       <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 transition-colors"
        aria-label="Copy code"
      >
        {copied ? (
          <ClipboardCheckIcon className="w-5 h-5 text-green-400" />
        ) : (
          <ClipboardIcon className="w-5 h-5" />
        )}
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};
