import React, { useState, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { startVoiceRecognition } from '../utils/voiceRecognition';

const VoiceButton = ({ onTranscript, onError }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const fullTranscriptRef = useRef('');

  const toggleListening = () => {
    if (isListening) {
      if (recognition) {
        // give it a tiny delay then stop so the final words are processed
        setTimeout(() => recognition.stop(), 500); 
      }
      setIsListening(false);
    } else {
      fullTranscriptRef.current = '';
      setIsListening(true);
      const rec = startVoiceRecognition(
        (finalTranscript) => {
          if (finalTranscript) {
             fullTranscriptRef.current += ' ' + finalTranscript;
          }
        },
        (error) => {
          if (error !== 'aborted') {
            if (onError) onError(error);
          }
          setIsListening(false);
        },
        () => {
          // It stopped (either automatically or manually)
          setIsListening(false);
          const finalResult = fullTranscriptRef.current.trim();
          if (finalResult) {
            onTranscript(finalResult);
          }
          fullTranscriptRef.current = '';
        }
      );
      setRecognition(rec);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={toggleListening}
        className={`relative w-full overflow-hidden flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 shadow-md ${
          isListening
            ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 shadow-rose-100'
            : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 shadow-indigo-100'
        }`}
      >
        {isListening ? (
          <>
            <span className="absolute inset-0 bg-rose-200/50 animate-pulse"></span>
            <MicOff className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Stop Listening & Parse</span>
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            <span>Register using Voice</span>
          </>
        )}
      </button>
      
      {isListening && (
        <div className="text-center text-sm text-slate-500 animate-pulse flex items-center justify-center gap-2">
           <Loader2 className="w-4 h-4 animate-spin" />
           Keep speaking your details... Click Stop when finished.
        </div>
      )}
    </div>
  );
};

export default VoiceButton;
