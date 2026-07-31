// Helper for speech synthesis in the browser with Gemini TTS fallback

export async function speakQuote(
  text: string,
  lang: string = 'en',
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
) {
  // First try Web Speech API if supported in browser
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any existing speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set appropriate language code
    if (lang === 'hi') utterance.lang = 'hi-IN';
    else if (lang === 'mr') utterance.lang = 'mr-IN';
    else utterance.lang = 'en-US';

    utterance.rate = 0.9; // Slightly slower, calm reading speed
    utterance.pitch = 1.0;

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = (e) => {
      console.warn('Web Speech API error, trying server TTS fallback', e);
      speakWithServerTTS(text, onStart, onEnd, onError);
    };

    window.speechSynthesis.speak(utterance);
    return;
  }

  // Fallback to Server Gemini TTS
  speakWithServerTTS(text, onStart, onEnd, onError);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

async function speakWithServerTTS(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
) {
  try {
    onStart?.();
    const res = await fetch('/api/quotes/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceName: 'Kore' }),
    });

    if (!res.ok) {
      throw new Error(`TTS server response error: ${res.statusText}`);
    }

    const data = await res.json();
    if (data.audioBase64) {
      const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
      audio.onended = () => onEnd?.();
      audio.onerror = (e) => {
        onError?.(e);
        onEnd?.();
      };
      await audio.play();
    } else {
      throw new Error('No audio returned from server');
    }
  } catch (err) {
    console.error('Server TTS error:', err);
    onError?.(err);
    onEnd?.();
  }
}
