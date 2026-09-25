// Audio and Speech Synthesis Utility (100% Free & Zero external dependencies)

class SoundEffects {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCorrect() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // AudioContext not supported or restricted
    }
  }

  playWrong() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // AudioContext not supported
    }
  }

  playWin() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A major arpeggio

      notes.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        const startTime = now + index * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {
      // AudioContext not supported
    }
  }

  playClick() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // AudioContext not supported
    }
  }
}

export const soundEffects = new SoundEffects();

export const isSpeechSynthesisSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

export const getBestEnglishVoice = (): SpeechSynthesisVoice | null => {
  if (!isSpeechSynthesisSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Prefer high quality English voices (Natural / Neural / US / GB)
  const preferred = voices.find(
    v => (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en')) &&
         (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Karen'))
  );
  if (preferred) return preferred;

  return voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en')) || null;
};

export const cleanTextForSpeech = (text: string): string => {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // remove markdown bold markers
    .replace(/[_~`#]/g, '')
    .trim();
};

export const stopSpeech = () => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
};

export const pauseSpeech = () => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.pause();
  }
};

export const resumeSpeech = () => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.resume();
  }
};

// Browser Speech Synthesis for High-Quality Pronunciation
export const speakEnglish = (text: string, rate: number = 0.9) => {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis not supported');
    return;
  }

  window.speechSynthesis.cancel(); // Stop any ongoing speech

  const cleanText = cleanTextForSpeech(text);
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = 1.0;

  const englishVoice = getBestEnglishVoice();
  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
};
