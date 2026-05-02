const SUPPORTED_LANGS = [
    { code: 'en-IN', name: 'English (India)' },
    { code: 'hi-IN', name: 'हिंदी (Hindi)' },
    { code: 'te-IN', name: 'తెలుగు (Telugu)' },
    { code: 'ta-IN', name: 'தமிழ் (Tamil)' },
    { code: 'kn-IN', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml-IN', name: 'മലയാളം (Malayalam)' },
    { code: 'bn-IN', name: 'বাংলা (Bengali)' },
    { code: 'mr-IN', name: 'मराठी (Marathi)' }
];

const appState = {
    language: 'en-IN',
    mode: 'guided', // guided or quick
    currentScreen: 'lang-screen',
    inactivityTimer: null,
    isSpeaking: false,
    isListening: false,
    recognition: null,
    currentAudio: null
};

// Localized dictionary
const i18n = {
    en: {
        welcome: "Welcome to SakhiVote AI. Please select your language.",
        modeQ: "How would you like to use the assistant?",
        modeGuided: "Simple Guided Mode",
        modeQuick: "Quick Mode",
        mainMenu: "Main Menu",
        guide: "Voting Guide",
        timeline: "Interactive Timeline",
        story: "Audio Story Mode",
        simulator: "Voting Simulator",
        myths: "Myths vs Facts",
        rights: "Voter Rights",
        back: "Back to Menu",
        speakNow: "Listening... speak now.",
        didNotUnderstand: "I did not understand. Try asking about voting, registration, or your rights.",
        guideSpeech: "This is the step-by-step voting guide. Step 1: Register to vote. Step 2: Check your name in the voter list. Step 3: Carry your ID to the polling booth. Step 4: Press the button on the EVM.",
        timelineSpeech: "The election timeline starts with notifications, then the campaign period, voting day, and finally the results counting day.",
        storySpeech: "Once upon a time, a young voter wanted to make a difference in their village. They registered, got their voter ID, and went to the booth on voting day. They pressed the button on the machine and proudly showed their inked finger. They had exercised their power in the democracy!",
        simulatorSpeech: "Welcome to the Voting Simulator. This screen represents an Electronic Voting Machine. Choose a candidate and press the blue button next to their name.",
        mythsSpeech: "Myth: My vote doesn't matter. Fact: Every single vote counts and can change the entire outcome of an election.",
        rightsSpeech: "You have the right to vote in secret without any fear, pressure, or bribery. Your vote is your voice.",
        votedMsg: "You have successfully voted! Beep!",
        inactivity: "Are you still there? Do you need any help? Just tap the microphone and ask."
    },
    hi: {
        welcome: "SakhiVote AI में आपका स्वागत है। कृपया अपनी भाषा चुनें।",
        modeQ: "आप सहायक का उपयोग कैसे करना चाहेंगे?",
        modeGuided: "सरल मार्गदर्शित मोड",
        modeQuick: "त्वरित मोड",
        mainMenu: "मुख्य मेनू",
        guide: "मतदान मार्गदर्शिका",
        timeline: "चुनाव टाइमलाइन",
        story: "ऑडियो कहानी",
        simulator: "वोटिंग सिम्युलेटर",
        myths: "मिथक बनाम तथ्य",
        rights: "मतदाता अधिकार",
        back: "वापस",
        speakNow: "सुन रहा हूँ... अब बोलें।",
        didNotUnderstand: "मुझे समझ नहीं आया। वोटिंग या पंजीकरण के बारे में पूछने का प्रयास करें।",
        guideSpeech: "यह चरण-दर-चरण मार्गदर्शिका है। पहले पंजीकरण करें, फिर सूची में नाम जांचें, आईडी लेकर जाएं और ईवीएम का बटन दबाएं।",
        timelineSpeech: "चुनाव की समय सीमा अधिसूचना से शुरू होती है, फिर प्रचार, मतदान का दिन और अंत में मतगणना।",
        storySpeech: "एक समय की बात है, एक युवा मतदाता बदलाव लाना चाहता था। उसने पंजीकरण कराया और मतदान के दिन अपनी उंगली पर स्याही लगवाई।",
        simulatorSpeech: "वोटिंग सिम्युलेटर में आपका स्वागत है। अपने उम्मीदवार को चुनें और उनके नाम के बगल वाला नीला बटन दबाएं।",
        mythsSpeech: "मिथक: मेरे वोट से कोई फर्क नहीं पड़ता। तथ्य: हर एक वोट मायने रखता है।",
        rightsSpeech: "आपको बिना किसी डर के गुप्त रूप से मतदान करने का अधिकार है।",
        votedMsg: "आपने सफलतापूर्वक वोट दे दिया है! बीप!",
        inactivity: "क्या आप अभी भी वहां हैं? क्या कोई मदद चाहिए? बस माइक पर टैप करें।"
    },
    te: {
        welcome: "SakhiVote AI కి స్వాగతం. దయచేసి మీ భాషను ఎంచుకోండి.",
        modeQ: "మీరు అసిస్టెంట్‌ను ఎలా ఉపయోగించాలనుకుంటున్నారు?",
        modeGuided: "సులభమైన గైడెడ్ మోడ్",
        modeQuick: "క్విక్ మోడ్",
        mainMenu: "ప్రధాన మెనూ",
        guide: "ఓటింగ్ గైడ్",
        timeline: "ఎన్నికల టైమ్‌లైన్",
        story: "ఆడియో కథ",
        simulator: "ఓటింగ్ సిమ్యులేటర్",
        myths: "అపోహలు vs వాస్తవాలు",
        rights: "ఓటరు హక్కులు",
        back: "వెనుకకు",
        speakNow: "వింటున్నాను... ఇప్పుడు మాట్లాడండి.",
        didNotUnderstand: "నాకు అర్థం కాలేదు. ఓటింగ్ లేదా రిజిస్ట్రేషన్ గురించి అడగండి.",
        guideSpeech: "ఇది దశల వారీ గైడ్. ముందుగా నమోదు చేసుకోండి. పోలింగ్ బూత్‌కు వెళ్లి బటన్ నొక్కండి.",
        timelineSpeech: "ఎన్నికల టైమ్‌లైన్ నోటిఫికేషన్‌తో మొదలవుతుంది, ప్రచారం, పోలింగ్ మరియు కౌంటింగ్.",
        storySpeech: "ఒక యువ ఓటరు మార్పు తేయాలనుకున్నాడు. అతను ఓటు వేసి సిరా గుర్తు చూపించాడు.",
        simulatorSpeech: "ఓటింగ్ సిమ్యులేటర్‌కు స్వాగతం. అభ్యర్థిని ఎంచుకుని బటన్ నొక్కండి.",
        mythsSpeech: "అపోహ: నా ఓటు ముఖ్యం కాదు. వాస్తవం: ప్రతి ఓటు ముఖ్యం.",
        rightsSpeech: "ఎలాంటి భయం లేకుండా రహస్యంగా ఓటు వేసే హక్కు మీకు ఉంది.",
        votedMsg: "మీరు విజయవంతంగా ఓటు వేశారు! బీప్!",
        inactivity: "సహాయం కావాలా? మైక్‌ని నొక్కండి."
    },
    ta: {
        welcome: "SakhiVote AI க்கு வரவேற்கிறோம். உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்.",
        modeQ: "நீங்கள் உதவியாளரை எவ்வாறு பயன்படுத்த விரும்புகிறீர்கள்?",
        modeGuided: "எளிய வழிகாட்டல் முறை",
        modeQuick: "விரைவு முறை",
        mainMenu: "முதன்மை மெனு",
        guide: "வாக்களிப்பு வழிகாட்டி",
        timeline: "தேர்தல் காலவரிசை",
        story: "ஆடியோ கதை",
        simulator: "வாக்களிப்பு சிமுலேட்டர்",
        myths: "கட்டுக்கதைகள் vs உண்மைகள்",
        rights: "வாக்காளர் உரிமைகள்",
        back: "திரும்பு",
        speakNow: "கேட்கிறேன்... இப்போது பேசுங்கள்.",
        didNotUnderstand: "எனக்கு புரியவில்லை. வாக்களிப்பு பற்றி கேட்கவும்.",
        guideSpeech: "இது படி-படி வழிகாட்டி. முதலில் பதிவு செய்யவும். சாவடிக்குச் சென்று பொத்தானை அழுத்தவும்.",
        timelineSpeech: "தேர்தல் காலவரிசை அறிவிப்புடன் தொடங்குகிறது.",
        storySpeech: "ஒரு இளம் வாக்காளர் ஒரு மாற்றத்தை உருவாக்க விரும்பினார்.",
        simulatorSpeech: "சிமுலேட்டருக்கு வரவேற்கிறோம். வேட்பாளரைத் தேர்ந்தெடுத்து பொத்தானை அழுத்தவும்.",
        mythsSpeech: "கட்டுக்கதை: என் வாக்கு முக்கியமல்ல. உண்மை: ஒவ்வொரு வாக்கும் முக்கியம்.",
        rightsSpeech: "பயமின்றி ரகசியமாக வாக்களிக்க உங்களுக்கு உரிமை உள்ளது.",
        votedMsg: "நீங்கள் வெற்றிகரமாக வாக்களித்துவிட்டீர்கள்! பீப்!",
        inactivity: "உதவி தேவையா? மைக்கை அழுத்தவும்."
    },
    kn: { welcome: "SakhiVote AI ಗೆ ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ." },
    ml: { welcome: "SakhiVote AI-ലേക്ക് സ്വാഗതം. ദയവായി നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക." },
    bn: { welcome: "SakhiVote AI এ আপনাকে স্বাগতম। অনুগ্রহ করে আপনার ভাষা নির্বাচন করুন।" },
    mr: { welcome: "SakhiVote AI मध्ये आपले स्वागत आहे. कृपया आपली भाषा निवडा." }
};

// Auto-fill missing keys in other languages with English fallback
Object.keys(i18n).forEach(lang => {
    if (lang !== 'en') {
        Object.keys(i18n.en).forEach(key => {
            if (!i18n[lang][key]) {
                i18n[lang][key] = i18n.en[key];
            }
        });
    }
});

function getText(key) {
    const langCode = appState.language.split('-')[0];
    if (i18n[langCode] && i18n[langCode][key]) return i18n[langCode][key];
    return i18n['en'][key] || key; // Fallback
}

// Elements
const appContainer = document.getElementById('app-container');
const micBtn = document.getElementById('btn-mic');
const replayBtn = document.getElementById('btn-replay');
const chatOverlay = document.getElementById('chat-overlay');
const chatMessages = document.getElementById('chat-messages');

// Accessibility Settings
document.getElementById('btn-theme').addEventListener('click', () => document.body.classList.toggle('dark-mode'));
document.getElementById('btn-text-size').addEventListener('click', () => document.body.classList.toggle('large-text'));
document.getElementById('btn-contrast').addEventListener('click', () => document.body.classList.toggle('high-contrast'));

// Speech Setup
// Native speech synthesis has been replaced by the advanced Google TTS backend.

// Render Functions
function renderLanguageScreen() {
    appState.currentScreen = 'lang-screen';
    replayBtn.classList.add('hidden');
    
    appContainer.innerHTML = `
        <h1 class="screen">SakhiVote AI</h1>
        <div class="screen">
            <i class="fas fa-language" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
            <h2>${getText('welcome')}</h2>
            <select id="lang-select" class="big-select" onchange="previewLanguage()">
                ${SUPPORTED_LANGS.map(l => `<option value="${l.code}" ${l.code === appState.language ? 'selected' : ''}>${l.name}</option>`).join('')}
            </select>
            <br>
            <button class="big-btn" onclick="setLanguage()"><i class="fas fa-arrow-right"></i></button>
        </div>
    `;
    speak(getText('welcome'));
}

window.previewLanguage = function() {
    const select = document.getElementById('lang-select');
    if(select) {
        appState.language = select.value;
        if (appState.recognition) {
            appState.recognition.lang = appState.language;
        }
        document.querySelector('h2').innerText = getText('welcome');
        speak(getText('welcome'));
    }
}

window.setLanguage = function() {
    const select = document.getElementById('lang-select');
    if(select) {
        appState.language = select.value;
        if (appState.recognition) {
            appState.recognition.lang = appState.language;
        }
    }
    renderModeScreen();
}

function renderModeScreen() {
    appState.currentScreen = 'mode-screen';
    appContainer.innerHTML = `
        <div class="screen">
            <h2>${getText('modeQ')}</h2>
            <div class="card-grid">
                <div class="card" onclick="setMode('guided')">
                    <i class="fas fa-hands-helping"></i>
                    <h3>${getText('modeGuided')}</h3>
                </div>
                <div class="card" onclick="setMode('quick')">
                    <i class="fas fa-bolt"></i>
                    <h3>${getText('modeQuick')}</h3>
                </div>
            </div>
        </div>
    `;
    speak(getText('modeQ') + ". " + getText('modeGuided') + ". " + getText('modeQuick'));
}

window.setMode = function(mode) {
    appState.mode = mode;
    renderMainMenu();
}

function renderMainMenu() {
    appState.currentScreen = 'main-menu';
    replayBtn.classList.add('hidden');
    appContainer.innerHTML = `
        <div class="screen">
            <h2>${getText('mainMenu')}</h2>
            <div class="card-grid">
                <div class="card" onclick="renderGuide()"><i class="fas fa-list-ol"></i><h3>${getText('guide')}</h3></div>
                <div class="card" onclick="renderTimeline()"><i class="fas fa-clock"></i><h3>${getText('timeline')}</h3></div>
                <div class="card" onclick="renderStory()"><i class="fas fa-book-open"></i><h3>${getText('story')}</h3></div>
                <div class="card" onclick="renderSimulator()"><i class="fas fa-person-booth"></i><h3>${getText('simulator')}</h3></div>
                <div class="card" onclick="renderMyths()"><i class="fas fa-shield-alt"></i><h3>${getText('myths')}</h3></div>
                <div class="card" onclick="renderRights()"><i class="fas fa-balance-scale"></i><h3>${getText('rights')}</h3></div>
            </div>
        </div>
    `;
    if (appState.mode === 'guided') {
        speak(getText('mainMenu') + ". Select an option from the screen.");
    }
}

// Sub Screens
window.renderGuide = function() { renderGeneric('guide', 'fa-list-ol', 'guide', 'guideSpeech'); }
window.renderTimeline = function() { renderGeneric('timeline', 'fa-clock', 'timeline', 'timelineSpeech'); }
window.renderStory = function() { renderGeneric('story', 'fa-book-open', 'story', 'storySpeech'); }
window.renderMyths = function() { renderGeneric('myths', 'fa-shield-alt', 'myths', 'mythsSpeech'); }
window.renderRights = function() { renderGeneric('rights', 'fa-balance-scale', 'rights', 'rightsSpeech'); }

function renderGeneric(id, icon, titleKey, speechKey) {
    appState.currentScreen = id;
    appContainer.innerHTML = `
        <div class="screen">
            <i class="fas ${icon}" style="font-size: 4rem; color: var(--primary-color);"></i>
            <h2>${getText(titleKey)}</h2>
            <p style="font-size: 1.2rem; margin: 2rem 0; line-height: 1.6;">${getText(speechKey)}</p>
            <button class="big-btn back-btn" onclick="renderMainMenu()">${getText('back')}</button>
        </div>
    `;
    if (appState.mode === 'guided') speak(getText(speechKey));
    replayBtn.classList.remove('hidden');
    replayBtn.onclick = () => speak(getText(speechKey));
}

window.renderSimulator = function() {
    appState.currentScreen = 'simulator';
    appContainer.innerHTML = `
        <div class="screen">
            <h2>${getText('simulator')}</h2>
            <div class="simulator-container">
                <div class="candidate-row">
                    <div class="candidate-info">
                        <span>🍎</span> Candidate A
                    </div>
                    <button class="evm-btn" onclick="voteAction()"></button>
                </div>
                <div class="candidate-row">
                    <div class="candidate-info">
                        <span>🚗</span> Candidate B
                    </div>
                    <button class="evm-btn" onclick="voteAction()"></button>
                </div>
                <div class="candidate-row">
                    <div class="candidate-info">
                        <span>⚽</span> Candidate C
                    </div>
                    <button class="evm-btn" onclick="voteAction()"></button>
                </div>
            </div>
            <button class="big-btn back-btn" onclick="renderMainMenu()">${getText('back')}</button>
        </div>
    `;
    if (appState.mode === 'guided') speak(getText('simulatorSpeech'));
    replayBtn.classList.remove('hidden');
    replayBtn.onclick = () => speak(getText('simulatorSpeech'));
}

window.voteAction = function() {
    speak(getText('votedMsg'));
    showChatBubble(getText('votedMsg'), 'assistant');
}

// TTS Setup (ADVANCED MULTILINGUAL VOICE SYSTEM - 100% FREE)
async function speak(text, overrideLang) {
    // 1. Stop previous audio
    if (appState.currentAudio) {
        appState.currentAudio.pause();
        appState.currentAudio.currentTime = 0;
    }

    const lang = overrideLang || appState.language;
    
    // Google Translate expects 'te' instead of 'te-IN' for regional languages
    const gLang = lang.split('-')[0];

    // Optional: Add loading indicator on mic
    if (micBtn) micBtn.classList.add('mic-active');

    try {
        // We use the unofficial, free Google Translate TTS endpoint
        // 'client=tw-ob' bypasses the token requirement
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${gLang}&q=${encodeURIComponent(text)}`;
        
        appState.currentAudio = new Audio(url);
        
        // Handle quick mode playback rate
        if (appState.mode === 'quick') {
            appState.currentAudio.playbackRate = 1.2;
        }

        await appState.currentAudio.play();
        
        appState.currentAudio.onended = () => {
            if (micBtn && !appState.isListening) {
                micBtn.classList.remove('mic-active');
            }
            resetInactivityTimer();
        };
    } catch (e) {
        console.error("Failed to fetch speech audio:", e);
        if (micBtn && !appState.isListening) {
            micBtn.classList.remove('mic-active');
        }
    }
}

// ASR Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    appState.recognition = new SpeechRecognition();
    appState.recognition.continuous = false;
    appState.recognition.interimResults = false;
    // Set initial lang
    appState.recognition.lang = appState.language;

    micBtn.addEventListener('click', () => {
        if (appState.isListening) {
            appState.recognition.stop();
        } else {
            // Update lang right before start just to be sure
            appState.recognition.lang = appState.language;
            appState.recognition.start();
        }
    });

    appState.recognition.onstart = () => {
        appState.isListening = true;
        micBtn.classList.add('mic-active');
        // Stop current speaking
        if (appState.currentAudio) {
            appState.currentAudio.pause();
        }
        showChatBubble(getText('speakNow'), 'assistant');
    };

    appState.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        showChatBubble(transcript, 'user');
        handleIntent(transcript);
    };

    appState.recognition.onend = () => {
        appState.isListening = false;
        micBtn.classList.remove('mic-active');
    };
    
    appState.recognition.onerror = () => {
        appState.isListening = false;
        micBtn.classList.remove('mic-active');
    };
} else {
    micBtn.style.display = 'none'; // Not supported
}

// Intent Detection (No API)
function handleIntent(text) {
    const t = text.toLowerCase();
    let responseKey = 'didNotUnderstand';
    
    const intents = {
        'vote': 'guideSpeech',
        'process': 'guideSpeech',
        'register': 'guideSpeech',
        'document': 'guideSpeech',
        'id': 'guideSpeech',
        'timeline': 'timelineSpeech',
        'when': 'timelineSpeech',
        'date': 'timelineSpeech',
        'right': 'rightsSpeech',
        'safe': 'rightsSpeech',
        'myth': 'mythsSpeech',
        'fake': 'mythsSpeech'
    };

    for (const [key, val] of Object.entries(intents)) {
        if (t.includes(key)) {
            responseKey = val;
            break;
        }
    }

    const reply = getText(responseKey);
    setTimeout(() => {
        showChatBubble(reply, 'assistant');
        speak(reply);
    }, 500);
}

// Chat UI
function showChatBubble(text, sender) {
    chatOverlay.classList.remove('hidden');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble chat-${sender}`;
    bubble.innerText = text;
    chatMessages.appendChild(bubble);
    chatOverlay.scrollTop = chatOverlay.scrollHeight;
    
    // Hide chat after 10 seconds of no new messages
    setTimeout(() => {
        if (chatMessages.lastChild === bubble) {
            chatOverlay.classList.add('hidden');
            chatMessages.innerHTML = '';
        }
    }, 10000);
}

// Auto Voice Guide (Inactivity)
function resetInactivityTimer() {
    clearTimeout(appState.inactivityTimer);
    if (appState.mode === 'guided' && appState.currentScreen !== 'lang-screen') {
        appState.inactivityTimer = setTimeout(() => {
            speak(getText('inactivity'));
            showChatBubble(getText('inactivity'), 'assistant');
        }, 20000); // 20 seconds
    }
}

['click', 'mousemove', 'keypress', 'touchstart'].forEach(evt => 
    window.addEventListener(evt, resetInactivityTimer)
);

// Init Load
setTimeout(() => {
    renderLanguageScreen();
}, 500);
