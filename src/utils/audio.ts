// Audio Utility using Web Audio API and SpeechSynthesis API

class SoundEngine {
  private audioCtx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Metronome click sound
  playClick(pitch = 800, duration = 0.05, volume = 0.3) {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  }

  // Play musical tone (frequency in Hz or note string like 'C4', 'D4', etc.)
  playNote(freqOrNote: number | string, duration = 0.5, type: OscillatorType = "triangle") {
    try {
      const ctx = this.getContext();
      let freq = typeof freqOrNote === "number" ? freqOrNote : this.noteToFreq(freqOrNote);

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context error fallback
    }
  }

  // Convert note name (e.g., C4, D#4, Eb4) to frequency in Hz
  noteToFreq(note: string): number {
    const notes: Record<string, number> = {
      C3: 130.81, "C#3": 138.59, D3: 146.83, "D#3": 155.56, E3: 164.81, F3: 174.61, "F#3": 185.0, G3: 196.0, "G#3": 207.65, A3: 220.0, "A#3": 233.08, B3: 246.94,
      C4: 261.63, "C#4": 277.18, D4: 293.66, "D#4": 311.13, E4: 329.63, F4: 349.23, "F#4": 369.99, G4: 392.0, "G#4": 415.3, A4: 440.0, "A#4": 466.16, B4: 493.88,
      C5: 523.25, "C#5": 554.37, D5: 587.33, "D#5": 622.25, E5: 659.25, F5: 698.46, "F#5": 739.99, G5: 783.99, "G#5": 830.61, A5: 880.0
    };
    return notes[note] || 440.0;
  }

  // Timer beep for workout & warmup intervals
  playBeep(isHigh = false) {
    this.playClick(isHigh ? 1200 : 600, isHigh ? 0.2 : 0.1);
  }

  // Play success chime
  playSuccess() {
    this.playNote("C5", 0.15);
    setTimeout(() => this.playNote("E5", 0.15), 100);
    setTimeout(() => this.playNote("G5", 0.3), 200);
  }

  // Play soothing singing bowl / meditation chime sound
  playMeditationBell(pitch = 300, duration = 3.5) {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);

      // Gentle attack and long decaying chime envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  // Speak text in French or English/Korean using Web Speech API
  speakKorean(text: string) {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.rate = 0.85; // Clear & steady

    // Try to find a native Korean voice if available
    const voices = window.speechSynthesis.getVoices();
    const koVoice = voices.find((v) => v.lang.includes("ko") || v.lang.includes("KO"));
    if (koVoice) {
      utterance.voice = koVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

export const soundEngine = new SoundEngine();

