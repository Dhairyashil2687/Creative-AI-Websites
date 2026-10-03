// --- CENTRAL SOUND ARCHITECT ---
const SoundEngine = {
    ctx: null,

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    play(freq, duration, type = 'sawtooth', volume = 0.25) {
        this.init();
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        if (type === 'sawtooth' || type === 'square') {
            osc.frequency.linearRampToValueAtTime(freq - (freq * 0.2), this.ctx.currentTime + duration);
        }

        gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        
        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },

    triggerScream() {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                this.play(80 + (Math.random() * 450), 1.8, 'sawtooth', 0.15);
                this.play(900 + (Math.random() * 400), 1.0, 'square', 0.08);
            }, i * 40);
        }
    },

    triggerSubDrop() {
        this.play(55, 3.0, 'sine', 0.7);
        this.play(110, 2.0, 'triangle', 0.4);
    },

    triggerClick() {
        this.play(1200, 0.03, 'square', 0.15);
    },

    // NEW SCARY HORROR DRONE EFFECT
    triggerHorrorDrone() {
        this.play(50, 6.0, 'sawtooth', 0.6); // Deep mechanical sub-bass
        this.play(55, 6.0, 'sawtooth', 0.5); // Dissonant vibrating pulse
        this.play(950, 6.0, 'sine', 0.12);   // Piercing hospital flatline tone
    }
};
