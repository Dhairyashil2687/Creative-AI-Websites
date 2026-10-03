// --- CORE APPLICATION ARCHITECTURE ---
const UI = {
    input: document.getElementById('horror-input'),
    warning: document.getElementById('warning-log'),
    universe: document.getElementById('universe'),
    terminalLogs: document.getElementById('terminal-logs'),
    corruptionFill: document.getElementById('corruption-fill'),
    interrogation: document.getElementById('interrogation-zone'),
    targetLabel: document.getElementById('target-label'),
    spike: document.getElementById('execution-spike'),
    blood: document.getElementById('blood'),
    doll: document.getElementById('victim-doll'),
    status: document.getElementById('execution-status'),
    finalDump: document.getElementById('final-dump'),
    bsod: document.getElementById('blue-screen'),
    bootScreen: document.getElementById('boot-screen'),
    btnInitialize: document.getElementById('btn-initialize'),
    btnSubmitName: document.getElementById('btn-submit-name')
};

// Psychological Triggers and Campus Scripts
const collegeHorrors = [
    "RUN NOW ", "SOMEONE TARGETING YOU ", "LOCATION FOR COLLEGE GETTING ACCESSED ", 
    "DATA WILL BE TRACED ", "GO BACK ", "DHAIRYA IS WATCHING ", "CAMERA PRIVACY COMPROMISED ",
    "DATABASE DOWNLOADING ", "ACADEMIC PORTAL CORRUPTED ", "CGPA REROUTED TO ZERO "
];

const terminalScripts = [
    "Connecting to proxy pipeline root...",
    "Bypassing educational campus server firewalls...",
    "Extracting academic performance registries...",
    "Syncing target structural geo-coordinates...",
    "CRITICAL: AI proctoring modules reporting illegal behavior...",
    "Dhairya's dimension deployment vector confirmed."
];

let cachedIdentity = "";
let currentScriptIndex = 0;
let phraseSelection = "";
let phraseCharIndex = 0;

// --- FULLSCREEN & BOOT ENGINE ---
UI.btnInitialize.addEventListener('click', () => {
    SoundEngine.init();
    SoundEngine.triggerClick();
    
    // Request Native Fullscreen mode across all standard browsers
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
    } else if (docEl.mozRequestFullScreen) { /* Firefox */
        docEl.mozRequestFullScreen();
    } else if (docEl.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) { /* IE/Edge */
        docEl.msRequestFullscreen();
    }

    // Hide the boot overlay smoothly
    UI.bootScreen.style.opacity = "0";
    setTimeout(() => {
        UI.bootScreen.style.display = "none";
        UI.input.focus();
    }, 500);
});

// --- STAGE 1: PORTAL INTEGRATION ENGINE ---
function handleVirtualTyping(simulatedKey) {
    if (!phraseSelection || phraseCharIndex >= phraseSelection.length) {
        phraseSelection = collegeHorrors[Math.floor(Math.random() * collegeHorrors.length)];
        phraseCharIndex = 0;
        UI.warning.innerText = "CRITICAL OUTCOME: " + phraseSelection;
        SoundEngine.play(70 + Math.random() * 30, 0.35, 'sine', 0.6);
    }

    UI.input.value += phraseSelection[phraseCharIndex];
    phraseCharIndex++;

    if (simulatedKey && simulatedKey.length === 1) {
        cachedIdentity += simulatedKey;
    }

    if (Math.random() > 0.72) {
        triggerVisualGlitch(90);
    }
}

UI.input.addEventListener('keydown', (e) => {
    SoundEngine.init();

    if (e.key === 'Enter') {
        if (cachedIdentity.trim().length > 0) {
            transitionToStage2();
        } else {
            UI.warning.innerText = "REGISTRY REQUIRES VALID DATA DATA STRUCT...";
        }
        return;
    }

    if (e.key !== 'Backspace' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        handleVirtualTyping(e.key);
    } else if (e.key === 'Backspace') {
        cachedIdentity = cachedIdentity.slice(0, -1);
    }
});

// Fallback listener for Mobile Text input environments
UI.input.addEventListener('input', (e) => {
    // If the value changed but didn't come from desktop keydown intercept
    if(e.inputType === "insertText" && e.data) {
        UI.input.value = UI.input.value.slice(0, -1); // Remove raw character
        handleVirtualTyping(e.data);
    }
});

UI.btnSubmitName.addEventListener('click', () => {
    if (cachedIdentity.trim().length > 0) {
        transitionToStage2();
    } else {
        UI.warning.innerText = "REGISTRY REQUIRES VALID DATA DATA STRUCT...";
    }
});

// --- STAGE 2: INQUISITION MATRIX ENGINE ---
function transitionToStage2() {
    triggerVisualGlitch(300);
    SoundEngine.triggerSubDrop();

    document.getElementById('stage-portal').classList.remove('active');
    const stage2 = document.getElementById('stage-inquisition');
    stage2.classList.add('active');
    UI.universe.style.transform = "rotateX(180deg)";

    runTerminalSequence(0);
}

function runTerminalSequence(index) {
    if (index >= terminalScripts.length) {
        renderInterrogationChallenge();
        return;
    }

    const logRow = document.createElement('div');
    logRow.innerText = `[>] ${terminalScripts[index]}`;
    UI.terminalLogs.appendChild(logRow);
    UI.terminalLogs.scrollTop = UI.terminalLogs.scrollHeight; // Auto scroll down terminal
    
    const progressPercent = ((index + 1) / terminalScripts.length) * 100;
    UI.corruptionFill.style.width = `${progressPercent}%`;
    
    SoundEngine.play(300 + (index * 60), 0.1, 'square', 0.1);

    setTimeout(() => {
        runTerminalSequence(index + 1);
    }, 1100);
}

function renderInterrogationChallenge() {
    UI.interrogation.innerHTML = `
        <p style="color:var(--warning-yellow); font-size:0.9rem; margin-bottom:10px;">Identity lock requires conscious verification. Confirm execution of local registry deletion contract?</p>
        <div class="btn-wrap-flex" style="position:relative; width:100%; min-height:120px;">
            <button id="btn-accept" class="horror-btn">I ACCEPT TERMINATION</button>
            <button id="btn-refuse" class="horror-btn escape-btn-style">ATTEMPT ESCAPE</button>
        </div>
    `;

    document.getElementById('btn-accept').addEventListener('click', () => {
        transitionToStage3();
    });

    const refuseBtn = document.getElementById('btn-refuse');

    function jumpEscapeButton(e) {
        SoundEngine.play(90, 0.2, 'sawtooth', 0.4);
        refuseBtn.style.position = 'absolute';
        // Keeps the button jumping strictly bounded inside its matrix safely on screens
        refuseBtn.style.left = `${Math.random() * 60}%`;
        refuseBtn.style.top = `${Math.random() * 60}%`;
        
        if (Math.random() > 0.5) {
            spawnPoltergeistText();
        }
    }

    // Triggers escaping for both mouse-hover (Desktop) and direct touch taps (Mobile)
    refuseBtn.addEventListener('mouseover', jumpEscapeButton);
    refuseBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        jumpEscapeButton(e);
    });
}

// --- STAGE 3: MORTAL CRUCIFIXION ENGINE ---
function transitionToStage3() {
    UI.targetLabel.innerText = cachedIdentity.toUpperCase();
    triggerVisualGlitch(400);
    SoundEngine.triggerScream();

    document.getElementById('stage-inquisition').classList.remove('active');
    document.getElementById('stage-execution').classList.add('active');
    UI.universe.style.transform = "rotateY(180deg) rotateX(180deg)";

    setTimeout(() => {
        UI.status.innerText = "LOCAL FILES LOCKOUT COMPLETED.";
        SoundEngine.play(80, 1.5, 'sine', 0.7);
    }, 1000);

    setTimeout(() => {
        UI.status.innerText = "EXECUTING DHAIRYA'S AXIS STRIKE ARBITER...";
        for (let i = 0; i < 20; i++) {
            setTimeout(spawnPoltergeistText, i * 70);
        }
    }, 2600);

    // Final Impact Sequence
    setTimeout(() => {
        UI.spike.style.animation = "spike-strike 0.35s forwards cubic-bezier(0.6, -0.28, 0.735, 0.045)";
        
        setTimeout(() => {
            UI.blood.style.opacity = "1";
            UI.doll.style.animation = "doll-destroy 0.9s forwards";
            UI.status.innerText = `${cachedIdentity.toUpperCase()} EXCISED FROM REGISTRY.`;
            
            SoundEngine.play(45, 1.2, 'sawtooth', 0.8);
            SoundEngine.play(2200, 0.6, 'square', 0.25);
            triggerVisualGlitch(500);
            
            document.documentElement.style.setProperty('--void-color', '#1c0000');
            dumpFakeSystemLogs();
        }, 120);
    }, 4500);
}

// System Utilities
function triggerVisualGlitch(duration) {
    document.body.classList.add('glitch-active');
    setTimeout(() => document.body.classList.remove('glitch-active'), duration);
}

function spawnPoltergeistText() {
    const textNode = document.createElement('span');
    textNode.className = 'manifestation';
    textNode.style.left = `${Math.random() * 70}vw`;
    textNode.style.top = `${Math.random() * 70}vh`;
    
    const logs = ["EXAM_OVERRIDE", "IP_STOLEN", "CLEANING_HARD_DRIVE", "DHAIRYA_OWNED_YOU", "PORT_SCAN_ACTIVE"];
    textNode.innerText = logs[Math.floor(Math.random() * logs.length)];
    document.body.appendChild(textNode);
    
    SoundEngine.play(500 + Math.random() * 500, 0.06, 'triangle', 0.12);
    setTimeout(() => textNode.remove(), 700);
}

function dumpFakeSystemLogs() {
    let lines = [
        "SYSTEM CORE DUMP: STACK CORRUPT",
        "DELETING C:/WINDOWS/SYSTEM32...",
        "ACADEMIC STATUS -> EXPELLED",
        "ERROR: DEVICE ADAPTER FAILURE",
        "GOODBYE."
    ];
    
    lines.forEach((line, i) => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.innerText = line;
            UI.finalDump.appendChild(div);
            UI.finalDump.scrollTop = UI.finalDump.scrollHeight;
            SoundEngine.triggerClick();
            
            if(i === lines.length - 1) {
                setTimeout(() => {
                    UI.bsod.classList.remove('hidden');
                    SoundEngine.play(150, 4.0, 'sawtooth', 0.6);
}, 1500);
}
}, i * 400);
});
}
// Judges Mobile Exit Hatch: Tapping the screen breaks out of full-screen and resets the page
UI.bsod.addEventListener('click', () => {
    // Release native mobile fullscreen mode safely
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    } else if (document.webkitExitFullscreen) { /* Safari / iOS compatibility */
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    
    // Smoothly reload the browser back to the initial state
    setTimeout(() => {
        window.location.reload();
    }, 300);
});
