export const startVoiceRecognition = async (onResult, onError, onEnd) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    if (onError) onError("Speech Recognition API is not supported in this browser.");
    return null;
  }

  let permissionStream = null;
  try {
    permissionStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Keep the stream alive while recognition is happening 
    // to prevent the OS from locking up the microphone handle.
  } catch {
    if (onError) onError("Microphone access denied. Please allow microphone permissions in your browser.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.continuous = true;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    if (onResult) onResult(finalTranscript, interimTranscript);
  };

  recognition.onerror = (event) => {
    let errorMessage = event.error;
    if (event.error === 'not-allowed') {
      errorMessage = 'Microphone access denied. Please allow microphone permissions and try again.';
    }
    if (onError) onError(errorMessage);
  };

  recognition.onend = () => {
    if (permissionStream) {
      permissionStream.getTracks().forEach(track => track.stop());
    }
    if (onEnd) onEnd();
  };

  try {
    recognition.start();
    return recognition;
  } catch (error) {
    if (permissionStream) {
      permissionStream.getTracks().forEach(track => track.stop());
    }
    if (onError) onError(error.message || "Failed to start speech recognition.");
    return null;
  }
};
