// script.js

// Check for browser support
if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;
    const speakButton = document.getElementById('speakButton');
    const pauseButton = document.getElementById('pauseButton');
    const resumeButton = document.getElementById('resumeButton');
    const stopButton = document.getElementById('stopButton');
    const textArea = document.getElementById('text');
    const voiceSelect = document.getElementById('voiceSelect');
    const rate = document.getElementById('rate');
    const rateValue = document.getElementById('rateValue');
    const pitch = document.getElementById('pitch');
    const pitchValue = document.getElementById('pitchValue');

    let voices = [];

    // Populate the voice options
    const populateVoiceList = () => {
        voices = synth.getVoices();
        voiceSelect.innerHTML = '';
        voices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = index;
            voiceSelect.appendChild(option);
        });
    };

    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoiceList;
    }

    const updateRate = () => {
        rateValue.textContent = rate.value;
    };

    const updatePitch = () => {
        pitchValue.textContent = pitch.value;
    };

    rate.addEventListener('change', updateRate);
    pitch.addEventListener('change', updatePitch);

    let utterance;

    // Speak the text
    const speak = () => {
        if (synth.speaking) {
            console.error('SpeechSynthesis.speaking');
            return;
        }
        if (textArea.value !== '') {
            utterance = new SpeechSynthesisUtterance(textArea.value);
            const selectedVoice = voices[voiceSelect.value];
            utterance.voice = selectedVoice;
            utterance.rate = rate.value;
            utterance.pitch = pitch.value;
            synth.speak(utterance);
        }
    };

    // Pause the speech
    const pause = () => {
        if (synth.speaking && !synth.paused) {
            synth.pause();
        }
    };

    // Resume the speech
    const resume = () => {
        if (synth.speaking && synth.paused) {
            synth.resume();
        }
    };

    // Stop the speech
    const stop = () => {
        if (synth.speaking) {
            synth.cancel();
        }
    };

    speakButton.addEventListener('click', speak);
    pauseButton.addEventListener('click', pause);
    resumeButton.addEventListener('click', resume);
    stopButton.addEventListener('click', stop);
} else {
    alert('Sorry, your browser does not support text-to-speech!');
}
