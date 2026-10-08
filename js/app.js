const PRESETS = {
    default: {
        background: '#281c5f',
        frame: '#b4c6ff',
        clock: '#eef4ff',
        glow: '#b8f7ff',
        face: 'linear-gradient(135deg, rgba(143, 163, 255, 0.85), rgba(74, 210, 179, 0.6), rgba(245, 193, 94, 0.85))'
    },
    cool: {
        background: '#0e2434',
        frame: '#c7f0ff',
        clock: '#ebf9ff',
        glow: '#73d6ff',
        face: 'linear-gradient(135deg, rgba(42, 89, 130, 0.9), rgba(67, 123, 160, 0.8), rgba(68, 238, 198, 0.7))'
    },
    warm: {
        background: '#451e10',
        frame: '#ffd9a8',
        clock: '#fff7ef',
        glow: '#ffb26b',
        face: 'linear-gradient(135deg, rgba(255, 146, 77, 0.9), rgba(208, 59, 19, 0.8), rgba(255, 211, 92, 0.7))'
    }
};

class DigitalClock {
    constructor(rootElement) {
        this.root = rootElement;
        this.state = {
            preset: 'default',
            backgroundColor: PRESETS.default.background,
            clockColor: PRESETS.default.clock
        };

        this.dateFormatter = new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long'
        });

        this.elements = {};
        this.tickTimeoutId = null;
        this.handleOrientationChange = () => this.updateOrientationState();
        this.handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                this.updateClock();
                this.scheduleNextTick();
            } else {
                window.clearTimeout(this.tickTimeoutId);
            }
        };

        this.init();
    }

    init() {
        this.root.innerHTML = `
            <div class="app-shell">
                <aside class="controls" aria-label="Painel de configurações do relógio">
                    <label>
                        Fundo
                        <input type="color" id="backgroundColor" value="${this.state.backgroundColor}" />
                    </label>
                    <label>
                        Relógio
                        <input type="color" id="clockColor" value="${this.state.clockColor}" />
                    </label>
                    <label>
                        Estilo
                        <select id="presetSelect">
                            <option value="default">Padrão</option>
                            <option value="cool">Frio</option>
                            <option value="warm">Quente</option>
                            <option value="custom">Personalizado</option>
                        </select>
                    </label>
                </aside>

                <div class="orientation-warning" hidden>
                    Gire o dispositivo para o modo paisagem para uma melhor visualização.
                </div>

                <main class="clock" aria-live="polite">
                    <div class="clock-face">
                        <div class="time-block"><span class="digit" data-time="hours">00</span></div>
                        <span class="separator">:</span>
                        <div class="time-block"><span class="digit" data-time="minutes">00</span></div>
                        <span class="separator">:</span>
                        <div class="time-block"><span class="digit" data-time="seconds">00</span></div>
                    </div>
                    <p class="date-label" data-date>segunda-feira, 01 de janeiro</p>
                </main>
            </div>
        `;

        this.cacheElements();
        this.bindEvents();
        this.applyTheme();
        this.updateClock();
        this.startTicker();
        this.updateOrientationState();
    }

    cacheElements() {
        this.elements = {
            backgroundColor: this.root.querySelector('#backgroundColor'),
            clockColor: this.root.querySelector('#clockColor'),
            presetSelect: this.root.querySelector('#presetSelect'),
            warning: this.root.querySelector('.orientation-warning'),
            hours: this.root.querySelector('[data-time="hours"]'),
            minutes: this.root.querySelector('[data-time="minutes"]'),
            seconds: this.root.querySelector('[data-time="seconds"]'),
            date: this.root.querySelector('[data-date]')
        };
    }

    bindEvents() {
        this.elements.backgroundColor.addEventListener('input', (event) => {
            this.state.backgroundColor = event.target.value;
            this.state.preset = 'custom';
            this.elements.presetSelect.value = 'custom';
            this.applyTheme();
        });

        this.elements.clockColor.addEventListener('input', (event) => {
            this.state.clockColor = event.target.value;
            this.state.preset = 'custom';
            this.elements.presetSelect.value = 'custom';
            this.applyTheme();
        });

        this.elements.presetSelect.addEventListener('change', (event) => {
            this.state.preset = event.target.value;
            if (this.state.preset === 'custom') {
                this.applyTheme();
                return;
            }

            const preset = PRESETS[this.state.preset] || PRESETS.default;
            this.state.backgroundColor = preset.background;
            this.state.clockColor = preset.clock;
            this.elements.backgroundColor.value = this.state.backgroundColor;
            this.elements.clockColor.value = this.state.clockColor;
            this.applyTheme();
        });

        window.addEventListener('resize', this.handleOrientationChange);
        window.addEventListener('orientationchange', this.handleOrientationChange);
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    startTicker() {
        this.scheduleNextTick();
    }

    scheduleNextTick() {
        window.clearTimeout(this.tickTimeoutId);

        const delayUntilNextSecond = 1000 - (Date.now() % 1000);
        this.tickTimeoutId = window.setTimeout(() => {
            this.updateClock();
            this.scheduleNextTick();
        }, delayUntilNextSecond);
    }

    updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        this.elements.hours.textContent = hours;
        this.elements.minutes.textContent = minutes;
        this.elements.seconds.textContent = seconds;
        this.elements.date.textContent = this.dateFormatter.format(now);
    }

    updateOrientationState() {
        const isPortrait = window.matchMedia('(orientation: portrait)').matches;
        this.elements.warning.hidden = !isPortrait;
    }

    applyTheme() {
        const preset = PRESETS[this.state.preset] || PRESETS.default;

        const theme = this.state.preset === 'custom'
            ? {
                background: this.state.backgroundColor,
                frame: '#ffffff',
                glow: '#ffffff',
                face: 'linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.2))'
            }
            : {
                background: preset.background,
                frame: preset.frame,
                glow: preset.glow,
                face: preset.face
            };

        document.documentElement.style.setProperty('--bg-gradient', `linear-gradient(180deg, ${theme.background}, #090b17)`);
        document.documentElement.style.setProperty('--clock-gradient', theme.face);
        document.documentElement.style.setProperty('--hand-color', this.state.clockColor);
        document.documentElement.style.setProperty('--frame-color', theme.frame);
        document.documentElement.style.setProperty('--glow-color', theme.glow);
    }
}

new DigitalClock(document.getElementById('root'));
