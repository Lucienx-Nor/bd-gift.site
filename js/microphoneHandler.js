/**
 * microphoneHandler.js - Handle microphone input for candle blowing
 */

// Audio processing variables
let audioContext;
let microphone;
let analyser;
let dataArray;
let microphoneActive = false;
let blowDetected = false;
let blowTimeout;
let microphoneStream; // Store the stream to properly close it later

// DOM Elements
let micButton;
let micStatus;

// Configuration for blow detection
const BLOW_THRESHOLD = 130; // Giảm ngưỡng để dễ phát hiện hơn (điều chỉnh nếu cần)
const BLOW_DURATION = 200; // Giảm thời gian xuống để phản hồi nhanh hơn
const FREQUENCY_RANGE = { min: 50, max: 700 }; // Mở rộng dải tần số để phát hiện tốt hơn
const SAMPLING_INTERVAL = 50; // Kiểm tra thường xuyên hơn

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
        micStatus.textContent =
            "Microphone không được hỗ trợ bởi trình duyệt của bạn";
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

    // Log initial state
    console.log("Microphone handler initialized");
}

/**
 * Start microphone listening
 * @param {Function} onBlowDetected - Callback function when blow is detected
 */
async function startMicrophone(onBlowDetected) {
    try {
        // Reset state
        blowDetected = false;
        if (blowTimeout) {
            clearTimeout(blowTimeout);
            blowTimeout = null;
        }

        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });

        // Store the stream for later cleanup
        microphoneStream = stream;

        // Create audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();

        // Connect microphone to analyzer
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        // Configure analyzer
        analyser.fftSize = 1024;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        // Update UI
        microphoneActive = true;
        micButton.classList.add("active");
        micButton.textContent = "Đang lắng nghe...";
        micStatus.textContent = "Hãy thổi mạnh vào mic để tắt nến!";

        // Debug info
        console.log("Microphone started, listening for blowing...");

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

            // Debug sound level
            // console.log("Sound level:", average);

            // Detect if blowing (sudden loud noise in the right frequency range)
            if (average > BLOW_THRESHOLD && !blowDetected) {
                console.log("Potential blow detected! Level:", average);
                blowDetected = true;
                micStatus.textContent = "Đã phát hiện tiếng thổi!";

                // Clear any existing timeout
                if (blowTimeout) clearTimeout(blowTimeout);

                // If the loud sound continues for enough time, it's likely a blow
                blowTimeout = setTimeout(() => {
                    if (blowDetected) {
                        console.log("Confirmed blow! Extinguishing candle...");

                        // Call the provided callback function
                        if (
                            onBlowDetected &&
                            typeof onBlowDetected === "function"
                        ) {
                            onBlowDetected();
                        } else {
                            console.error("Invalid blow callback");
                        }

                        micStatus.textContent = "Đã thổi tắt nến thành công!";
                        micButton.textContent = "Đã thổi tắt nến";
                        micButton.disabled = true;

                        // Stop microphone after successful blow
                        setTimeout(() => {
                            stopMicrophone();
                        }, 1000);
                    }
                }, BLOW_DURATION);
            } else if (average <= BLOW_THRESHOLD * 0.7 && blowDetected) {
                // Reset if sound level drops significantly
                blowDetected = false;
                if (blowTimeout) {
                    clearTimeout(blowTimeout);
                    blowTimeout = null;
                }
                micStatus.textContent = "Thổi mạnh hơn để tắt nến!";
            }

            // Display current level (optional, helpful for debugging)
            // micStatus.textContent = `Âm lượng: ${Math.round(average)} | Ngưỡng: ${BLOW_THRESHOLD}`;

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
            "Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.";
        micButton.classList.remove("active");
        microphoneActive = false;
    }
}

/**
 * Stop microphone listening
 */
function stopMicrophone() {
    // Stop microphone stream
    if (microphoneStream) {
        microphoneStream.getTracks().forEach((track) => track.stop());
        microphoneStream = null;
    }

    // Disconnect audio components
    if (microphone && audioContext) {
        microphone.disconnect();
        microphone = null;
    }

    if (audioContext) {
        if (audioContext.state !== "closed") {
            try {
                audioContext.close();
            } catch (e) {
                console.error("Error closing audio context:", e);
            }
        }
        audioContext = null;
    }

    // Reset state
    microphoneActive = false;
    blowDetected = false;

    if (blowTimeout) {
        clearTimeout(blowTimeout);
        blowTimeout = null;
    }

    // Reset UI if button not disabled
    if (micButton && !micButton.disabled) {
        micButton.classList.remove("active");
        micButton.textContent = "Thổi Nến Bằng Mic";
        if (micStatus) {
            micStatus.textContent = "Microphone chưa kích hoạt";
        }
    }

    console.log("Microphone stopped");
}

/**
 * Check if microphone is currently active
 * @returns {boolean} - Whether microphone is active
 */
export function isMicrophoneActive() {
    return microphoneActive;
}
