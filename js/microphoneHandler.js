/**
 * microphoneHandler.js - Handle microphone input for candle blowing
 */

// Audio processing variables
let audioContext;
let microphone;
let analyser;
let microphoneActive = false;
let blowDetected = false;
let blowTimeout;

// DOM Elements
let micButton;
let micStatus;

// Configuration for blow detection
const BLOW_THRESHOLD = 130; // Adjust this value based on testing
const BLOW_DURATION = 500; // Duration in ms required for a valid blow
const FREQUENCY_RANGE = { min: 50, max: 500 }; // Frequency range for blow detection
const SAMPLING_INTERVAL = 100; // How often to check the mic levels (ms)

/**
 * Initialize microphone functionality
 * @param {Object} elements - DOM elements including mic button and status
 * @param {Function} onBlowDetected - Callback function when blow is detected
 */
export function initMicrophone(elements, onBlowDetected) {
    micButton = elements.micButton;
    micStatus = elements.micStatus;

    if (!micButton || !micStatus) {
        console.error("Microphone UI elements not provided");
        return;
    }

    // Check if browser supports audio API
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        micStatus.textContent = "Microphone not supported by your browser";
        micButton.disabled = true;
        return;
    }

    // Setup mic button
    micButton.addEventListener("click", () => {
        if (microphoneActive) {
            stopMicrophone();
        } else {
            startMicrophone(onBlowDetected);
        }
    });
}

/**
 * Start microphone listening
 * @param {Function} onBlowDetected - Callback function when blow is detected
 */
async function startMicrophone(onBlowDetected) {
    try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });

        // Create audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();

        // Connect microphone to analyzer
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        // Configure analyzer
        analyser.fftSize = 1024;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // Update UI
        microphoneActive = true;
        micButton.classList.add("active");
        micStatus.textContent =
            "Microphone active - blow to extinguish the candle!";

        // Start listening for blowing sounds
        const checkMicrophoneLevel = () => {
            if (!microphoneActive) return;

            // Get audio data
            analyser.getByteFrequencyData(dataArray);

            // Calculate average volume in the blow frequency range
            let sum = 0;
            let count = 0;

            for (let i = 0; i < bufferLength; i++) {
                // Calculate frequency for this bin
                const frequency =
                    (i * audioContext.sampleRate) / analyser.fftSize;

                // Only consider frequencies in our target range for blowing
                if (
                    frequency >= FREQUENCY_RANGE.min &&
                    frequency <= FREQUENCY_RANGE.max
                ) {
                    sum += dataArray[i];
                    count++;
                }
            }

            const average = count > 0 ? sum / count : 0;

            // Detect if blowing (sudden loud noise in the right frequency range)
            if (average > BLOW_THRESHOLD && !blowDetected) {
                blowDetected = true;
                micStatus.textContent = "Blow detected!";

                // Clear any existing timeout
                if (blowTimeout) clearTimeout(blowTimeout);

                // If the loud sound continues for enough time, it's likely a blow
                blowTimeout = setTimeout(() => {
                    if (blowDetected) {
                        // Call the provided callback function
                        onBlowDetected();
                        micStatus.textContent =
                            "Candle blown out successfully!";

                        // Optional: Stop microphone after successful blow
                        stopMicrophone();
                    }
                }, BLOW_DURATION);
            } else if (average <= BLOW_THRESHOLD && blowDetected) {
                blowDetected = false;
                if (blowTimeout) {
                    clearTimeout(blowTimeout);
                    blowTimeout = null;
                }
                micStatus.textContent = "Microphone active - blow harder!";
            }

            // Continue checking if microphone is still active
            if (microphoneActive) {
                setTimeout(checkMicrophoneLevel, SAMPLING_INTERVAL);
            }
        };

        // Start the checking process
        checkMicrophoneLevel();
    } catch (error) {
        console.error("Error accessing microphone:", error);
        micStatus.textContent =
            "Could not access microphone. Please check permissions.";
        micButton.classList.remove("active");
        microphoneActive = false;
    }
}

/**
 * Stop microphone listening
 */
function stopMicrophone() {
    if (microphone && audioContext) {
        microphone.disconnect();
        audioContext.close();
        microphone = null;
        audioContext = null;
    }

    microphoneActive = false;
    blowDetected = false;
    if (blowTimeout) {
        clearTimeout(blowTimeout);
        blowTimeout = null;
    }

    micButton.classList.remove("active");
    micStatus.textContent = "Microphone inactive";
}

/**
 * Check if microphone is currently active
 * @returns {boolean} - Whether microphone is active
 */
export function isMicrophoneActive() {
    return microphoneActive;
}
