/**
 * NOTIFICATION SOUNDS - Gerador de toques de notificação
 * Gera sons sintetizados usando Web Audio API
 */

export class NotificationSounds {
  private static audioContext: AudioContext | null = null;

  private static getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  /**
   * Toque Padrão - Tom simples e neutro
   */
  static playPadrao() {
    const ctx = this.getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800; // Hz
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  }

  /**
   * Toque Suave - Som calmo e relaxante
   */
  static playSuave() {
    const ctx = this.getAudioContext();
    
    // Primeira nota
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    osc1.frequency.value = 523.25; // C5
    osc1.type = 'sine';
    gain1.gain.setValueAtTime(0.15, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
    
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.8);
    
    // Segunda nota (harmônica)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc2.frequency.value = 659.25; // E5
    osc2.type = 'sine';
    gain2.gain.setValueAtTime(0, ctx.currentTime + 0.15);
    gain2.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9);
    
    osc2.start(ctx.currentTime + 0.15);
    osc2.stop(ctx.currentTime + 0.9);
  }

  /**
   * Toque Enérgico - Som vibrante e motivador
   */
  static playEnergetico() {
    const ctx = this.getAudioContext();
    
    // Sequência de notas rápidas
    const notes = [
      { freq: 659.25, time: 0 },      // E5
      { freq: 783.99, time: 0.08 },   // G5
      { freq: 1046.50, time: 0.16 },  // C6
    ];
    
    notes.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = note.freq;
      osc.type = 'triangle';
      
      const startTime = ctx.currentTime + note.time;
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
      
      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }

  /**
   * Toque Sino - Som de sino suave
   */
  static playSino() {
    const ctx = this.getAudioContext();
    
    // Tom fundamental
    const fundamental = ctx.createOscillator();
    const fundamentalGain = ctx.createGain();
    fundamental.connect(fundamentalGain);
    fundamentalGain.connect(ctx.destination);
    
    fundamental.frequency.value = 587.33; // D5
    fundamental.type = 'sine';
    fundamentalGain.gain.setValueAtTime(0.3, ctx.currentTime);
    fundamentalGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
    
    fundamental.start(ctx.currentTime);
    fundamental.stop(ctx.currentTime + 1.5);
    
    // Harmônicos (simulam o sino)
    [2, 3, 4.2, 5.4].forEach((mult, i) => {
      const harmonic = ctx.createOscillator();
      const harmonicGain = ctx.createGain();
      harmonic.connect(harmonicGain);
      harmonicGain.connect(ctx.destination);
      
      harmonic.frequency.value = 587.33 * mult;
      harmonic.type = 'sine';
      const volume = 0.1 / (i + 1);
      harmonicGain.gain.setValueAtTime(volume, ctx.currentTime);
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      
      harmonic.start(ctx.currentTime);
      harmonic.stop(ctx.currentTime + 1.5);
    });
  }

  /**
   * Toque Personalizado - Toca um arquivo de áudio
   */
  static async playCustom(audioDataUrl: string) {
    try {
      const audio = new Audio(audioDataUrl);
      audio.volume = 0.5;
      await audio.play();
    } catch (error) {
      console.error('Erro ao tocar som personalizado:', error);
    }
  }

  /**
   * Método principal para tocar qualquer som
   */
  static play(type: string, customFile?: string) {
    switch (type) {
      case 'padrao':
        this.playPadrao();
        break;
      case 'suave':
        this.playSuave();
        break;
      case 'energico':
        this.playEnergetico();
        break;
      case 'sino':
        this.playSino();
        break;
      case 'personalizado':
        if (customFile) {
          this.playCustom(customFile);
        }
        break;
      default:
        this.playPadrao();
    }
  }
}
