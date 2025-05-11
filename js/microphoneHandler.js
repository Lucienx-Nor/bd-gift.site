/**
 * microphoneHandler.js - Được tối ưu dựa trên mã hoạt động tốt
 */

// Biến cơ bản
let audioContext;
let microphone;
let analyser;
let microphoneActive = false;
let blowCheckInterval;

// Phần tử UI
let micButton;
let micStatus;
let blowCallback;

// Ngưỡng rất thấp - giống với mã hoạt động tốt
const BLOW_THRESHOLD = 40;

/**
 * Khởi tạo chức năng microphone
 */
export function initMicrophone(elements, onBlowDetected) {
    // Lưu các phần tử UI và callback
    micButton = elements.micButton;
    micStatus = elements.micStatus;
    blowCallback = onBlowDetected;

    // Kiểm tra phần tử UI
    if (!micButton || !micStatus) {
        console.error("Thiếu phần tử UI microphone");
        return;
    }

    // Kiểm tra hỗ trợ microphone
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        micStatus.textContent = "Trình duyệt không hỗ trợ microphone";
        micButton.disabled = true;
        return;
    }

    // Thiết lập sự kiện click
    micButton.addEventListener("click", toggleMicrophone);
}

/**
 * Bật/tắt microphone
 */
function toggleMicrophone() {
    if (microphoneActive) {
        stopMicrophone();
    } else {
        startMicrophone();
    }
}

/**
 * Bắt đầu lắng nghe microphone
 */
function startMicrophone() {
    // Yêu cầu quyền truy cập microphone
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
            // Tạo các thành phần audio - GIỐNG với mã hoạt động tốt
            audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);

            // Cài đặt FFT size - GIỐNG với mã hoạt động tốt
            analyser.fftSize = 256;

            // Cập nhật UI
            microphoneActive = true;
            micButton.classList.add("active");
            micButton.textContent = "Đang lắng nghe...";
            micStatus.textContent = "Hãy thổi vào mic để tắt nến!";

            // Bắt đầu kiểm tra thổi - GIỐNG với mã hoạt động tốt
            blowCheckInterval = setInterval(checkForBlowing, 200);
        })
        .catch(function (error) {
            console.error("Lỗi truy cập microphone:", error);
            micStatus.textContent =
                "Không thể truy cập microphone. Kiểm tra quyền truy cập.";
        });
}

/**
 * Kiểm tra có đang thổi hay không - GIỐNG CHÍNH XÁC với mã hoạt động tốt
 */
function isBlowing() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
    }

    let average = sum / bufferLength;

    // Debug (bỏ comment nếu cần)
    // console.log("Âm lượng:", average);
    // micStatus.textContent = `Âm lượng: ${Math.round(average)} | Ngưỡng: ${BLOW_THRESHOLD}`;

    return average > BLOW_THRESHOLD; // GIỐNG MÃ HOẠT ĐỘNG TỐT
}

/**
 * Kiểm tra thổi và thực hiện tắt nến - TƯƠNG TỰ mã hoạt động tốt
 */
function checkForBlowing() {
    if (isBlowing()) {
        // Phát hiện thổi - gọi callback ngay lập tức
        console.log("Phát hiện thổi!");
        micStatus.textContent = "Đã phát hiện tiếng thổi!";

        // Gọi callback giống như "blowOutCandles" trong mã hoạt động tốt
        if (blowCallback && typeof blowCallback === "function") {
            blowCallback();
        }

        // Cập nhật UI sau khi thổi
        micButton.textContent = "Đã thổi tắt nến";
        micButton.disabled = true;

        // Dừng kiểm tra và microphone sau một chút
        setTimeout(stopMicrophone, 1000);
    }
}

/**
 * Dừng microphone
 */
function stopMicrophone() {
    // Dừng kiểm tra
    if (blowCheckInterval) {
        clearInterval(blowCheckInterval);
        blowCheckInterval = null;
    }

    // Dừng microphone
    if (microphone && audioContext) {
        microphone.disconnect();

        // Dừng các track
        if (microphone.mediaStream) {
            microphone.mediaStream.getTracks().forEach((track) => track.stop());
        }

        // Đóng context
        if (audioContext.state !== "closed") {
            try {
                audioContext.close();
            } catch (e) {
                console.error("Lỗi khi đóng audio context:", e);
            }
        }
    }

    // Đặt lại các biến
    microphone = null;
    audioContext = null;
    analyser = null;
    microphoneActive = false;

    // Đặt lại UI
    if (micButton && !micButton.disabled) {
        micButton.classList.remove("active");
        micButton.textContent = "Thổi Nến Bằng Mic";

        if (micStatus) {
            micStatus.textContent = "Microphone chưa kích hoạt";
        }
    }
}

/**
 * Kiểm tra microphone có đang hoạt động không
 */
export function isMicrophoneActive() {
    return microphoneActive;
}
