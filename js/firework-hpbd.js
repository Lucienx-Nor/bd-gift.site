/**
 * fireworks-enhanced.js - Controlador optimizado para fuegos artificiales
 * Esta versión integra y mejora firework-hpbd.js para proporcionar una experiencia más realista
 * sin causar problemas de rendimiento
 */

// Variables globales
let fireworksStarted = false;
let fireworksContainer;
let startFireworksBtn;
let fireworkMessage;
let canvas;
let customFireworks = [];
let lastClick = 0;

// Mensajes de celebración para fuegos artificiales personalizados
const celebrationMessages = [
    "Happy Birthday!",
    "Chúc Mừng Sinh Nhật!",
    "Mừng Ngày Của Bạn!",
    "Chúc Mừng!",
    "✨ Happy Day ✨",
    "Tuyệt Vời!",
    "Bùng Nổ!",
    "Amazing!",
    "Rực Rỡ!",
];

// Colores vibrantes para fuegos artificiales
const vibrantColors = [
    "#FF5252",
    "#FFD54F",
    "#64B5F6",
    "#f8a5c2",
    "#a29bfe",
    "#74b9ff",
    "#ff9ff3",
    "#55efc4",
    "#fdcb6e",
    "#fab1a0",
    "#ff6b6b",
    "#48dbfb",
    "#1dd1a1",
    "#00d2d3",
    "#54a0ff",
];

/**
 * Inicialización cuando el DOM está cargado
 */
document.addEventListener("DOMContentLoaded", function () {
    // Obtener elementos del DOM
    fireworksContainer = document.getElementById("fireworks-container");
    startFireworksBtn = document.getElementById("start-fireworks");
    fireworkMessage = document.getElementById("firework-message");
    canvas = document.getElementById("c");

    // Configurar el evento click en el contenedor para añadir fuegos artificiales personalizados
    if (fireworksContainer) {
        fireworksContainer.addEventListener("click", handleContainerClick);
    }

    // Configurar el botón de inicio de fuegos artificiales
    if (startFireworksBtn) {
        startFireworksBtn.addEventListener("click", handleStartFireworks);
    }

    // Observar cuando la página 3 está activa
    setupPageObserver();
});

/**
 * Configura un observador para detectar cuando la página 3 está activa
 */
function setupPageObserver() {
    const page3 = document.getElementById("page-3");

    if (!page3) return;

    // Usar IntersectionObserver para detectar cuando la página es visible
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // La página 3 es visible, inicializar canvas
                    initializeCanvas();
                }
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(page3);
}

/**
 * Inicializa el canvas para los fuegos artificiales
 */
function initializeCanvas() {
    if (!canvas || !fireworksContainer) return;

    // Asegurarse de que el canvas tenga las dimensiones correctas
    resizeCanvas();

    // Configurar eventos de redimensión
    window.addEventListener("resize", resizeCanvas);

    // Comprobar si firework-hpbd.js está cargado y disponible
    if (typeof window.anim === "function") {
        console.log("firework-hpbd.js está disponible");
    } else {
        console.log(
            "firework-hpbd.js no está disponible, utilizando implementación alternativa"
        );
        // En este caso, podríamos implementar una versión alternativa de fuegos artificiales
    }
}

/**
 * Redimensiona el canvas para que coincida con el contenedor
 */
function resizeCanvas() {
    if (!canvas || !fireworksContainer) return;

    const rect = fireworksContainer.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Actualizar variables globales que usa firework-hpbd.js
    if (typeof window.w !== "undefined") {
        window.w = canvas.width;
        window.h = canvas.height;
        window.hw = w / 2;
        window.hh = h / 2;

        // Actualizar posición de fuegos artificiales
        if (window.opts) {
            window.opts.cx = w / 2;
            window.opts.cy = h / 2;
        }
    }
}

/**
 * Maneja el click en el botón de inicio de fuegos artificiales
 */
function handleStartFireworks() {
    if (!fireworksStarted) {
        fireworksStarted = true;

        // Cambiar texto del botón
        startFireworksBtn.textContent = "Thêm Pháo Hoa";
        startFireworksBtn.classList.add("active");

        // Mostrar mensaje adicional
        fireworkMessage.style.opacity = "1";

        // Iniciar animación de fuegos artificiales
        startFireworksAnimation();

        // Añadir efectos de sonido (opcional)
        playSoftFireworkSound();
    } else {
        // Si ya están iniciados, añadir más fuegos artificiales
        addMoreFireworks();
    }
}

/**
 * Inicia la animación de fuegos artificiales utilizando firework-hpbd.js
 */
function startFireworksAnimation() {
    // Si firework-hpbd.js está disponible, reiniciar la animación
    if (window.letters && window.letters.length > 0) {
        for (let l = 0; l < window.letters.length; ++l) {
            if (window.letters[l].reset) {
                window.letters[l].reset();
            }
        }

        // Personalizar mensajes si es necesario
        window.opts.strings = ["HAPPY", "BIRTHDAY!", "to You"];
    }

    // Añadir efecto de destello inicial
    addInitialFlash();
}

/**
 * Añade un efecto de destello inicial cuando comienzan los fuegos artificiales
 */
function addInitialFlash() {
    const flash = document.createElement("div");
    flash.className = "initial-flash";
    flash.style.position = "absolute";
    flash.style.top = "0";
    flash.style.left = "0";
    flash.style.width = "100%";
    flash.style.height = "100%";
    flash.style.background = "rgba(255, 255, 255, 0.3)";
    flash.style.zIndex = "10";
    flash.style.pointerEvents = "none";

    fireworksContainer.appendChild(flash);

    // Animación de desvanecimiento
    flash.animate([{ opacity: 0.5 }, { opacity: 0 }], {
        duration: 600,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
    }).onfinish = () => {
        flash.remove();
    };
}

/**
 * Añade más fuegos artificiales al espectáculo
 */
function addMoreFireworks() {
    // Si firework-hpbd.js está disponible, reiniciar algunas letras para crear nuevos fuegos artificiales
    if (window.letters && window.letters.length > 0) {
        // Seleccionar algunas letras al azar para reiniciar
        const count = Math.min(6, window.letters.length);
        const indices = [];

        while (indices.length < count) {
            const idx = Math.floor(Math.random() * window.letters.length);
            if (!indices.includes(idx)) {
                indices.push(idx);
            }
        }

        // Reiniciar las letras seleccionadas
        indices.forEach((idx) => {
            if (window.letters[idx].reset) {
                window.letters[idx].reset();
            }
        });
    }

    // Añadir efecto de destello más pequeño
    const flash = document.createElement("div");
    flash.className = "additional-flash";
    flash.style.position = "absolute";
    flash.style.top = "0";
    flash.style.left = "0";
    flash.style.width = "100%";
    flash.style.height = "100%";
    flash.style.background = "rgba(255, 255, 255, 0.15)";
    flash.style.zIndex = "10";
    flash.style.pointerEvents = "none";

    fireworksContainer.appendChild(flash);

    // Animación de desvanecimiento
    flash.animate([{ opacity: 0.2 }, { opacity: 0 }], {
        duration: 400,
        easing: "ease-out",
    }).onfinish = () => {
        flash.remove();
    };
}

/**
 * Maneja el click en el contenedor para añadir fuegos artificiales personalizados
 * @param {MouseEvent} event - Evento de click
 */
function handleContainerClick(event) {
    // Limitar la frecuencia de clicks para evitar lag
    const now = Date.now();
    if (now - lastClick < 200) return; // Limitar a un fuego artificial cada 200ms
    lastClick = now;

    // Sólo permitir clicks si los fuegos artificiales ya han comenzado
    if (!fireworksStarted) return;

    // Obtener posición del click relativa al contenedor
    const rect = fireworksContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Crear un fuego artificial personalizado en esa posición
    createCustomFirework(x, y);

    // Reproducir sonido suave (opcional)
    playPopSound();
}

/**
 * Crea un fuego artificial personalizado en la posición especificada
 * @param {number} x - Posición X
 * @param {number} y - Posición Y
 */
function createCustomFirework(x, y) {
    // Si firework-hpbd.js está disponible, podemos intentar modificar su comportamiento
    // Este es un enfoque alternativo para crear fuegos artificiales personalizados

    // Crear un elemento de texto para mostrar un mensaje celebratorio
    const message =
        celebrationMessages[
            Math.floor(Math.random() * celebrationMessages.length)
        ];
    const textElement = document.createElement("div");
    textElement.className = "firework-text";
    textElement.textContent = message;
    textElement.style.position = "absolute";
    textElement.style.left = `${x}px`;
    textElement.style.top = `${y}px`;
    textElement.style.transform = "translate(-50%, -50%) scale(0)";
    textElement.style.color =
        vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
    textElement.style.fontSize = "24px";
    textElement.style.fontFamily =
        "Arial Black, Arial Bold, Gadget, sans-serif";
    textElement.style.fontWeight = "bold";
    textElement.style.whiteSpace = "nowrap";
    textElement.style.textShadow = `0 0 10px ${textElement.style.color}, 0 0 20px white`;
    textElement.style.zIndex = "30";
    textElement.style.pointerEvents = "none";

    fireworksContainer.appendChild(textElement);

    // Crear efecto de explosión
    const explosion = document.createElement("div");
    explosion.className = "custom-explosion";
    explosion.style.position = "absolute";
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    explosion.style.width = "4px";
    explosion.style.height = "4px";
    explosion.style.borderRadius = "50%";
    explosion.style.backgroundColor = textElement.style.color;
    explosion.style.boxShadow = `0 0 30px 10px ${textElement.style.color}, 0 0 60px 15px rgba(255,255,255,0.5)`;
    explosion.style.transform = "translate(-50%, -50%)";
    explosion.style.zIndex = "20";
    explosion.style.pointerEvents = "none";

    fireworksContainer.appendChild(explosion);

    // Animar la explosión
    explosion.animate(
        [
            { transform: "translate(-50%, -50%) scale(0.2)", opacity: 1 },
            { transform: "translate(-50%, -50%) scale(15)", opacity: 0 },
        ],
        {
            duration: 1000,
            easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
        }
    ).onfinish = () => {
        explosion.remove();
    };

    // Animar el texto
    textElement.animate(
        [
            { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
            {
                transform: "translate(-50%, -50%) scale(1.2)",
                opacity: 1,
                offset: 0.3,
            },
            {
                transform: "translate(-50%, -50%) scale(1)",
                opacity: 1,
                offset: 0.4,
            },
            {
                transform: "translate(-50%, -50%) scale(1)",
                opacity: 1,
                offset: 0.8,
            },
            { transform: "translate(-50%, -50%) scale(1.1)", opacity: 0 },
        ],
        {
            duration: 2000,
            easing: "ease-out",
        }
    ).onfinish = () => {
        textElement.remove();
    };

    // Crear partículas adicionales para el efecto de explosión
    createExplosionParticles(x, y, textElement.style.color);
}

/**
 * Crea partículas para el efecto de explosión
 * @param {number} x - Posición X del centro
 * @param {number} y - Posición Y del centro
 * @param {string} color - Color de las partículas
 */
function createExplosionParticles(x, y, color) {
    const particleCount = 20 + Math.floor(Math.random() * 20);

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "explosion-particle";
        particle.style.position = "absolute";
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${2 + Math.random() * 3}px`;
        particle.style.height = `${2 + Math.random() * 3}px`;
        particle.style.borderRadius = "50%";
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 6px 2px ${color}`;
        particle.style.transform = "translate(-50%, -50%)";
        particle.style.zIndex = "15";
        particle.style.pointerEvents = "none";

        fireworksContainer.appendChild(particle);

        // Calcular dirección aleatoria
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;

        // Animar la partícula
        particle.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(1)",
                    opacity: 1,
                },
                {
                    transform: `translate(${
                        endX - x - particle.offsetWidth / 2
                    }px, ${endY - y - particle.offsetHeight / 2}px) scale(0.2)`,
                    opacity: 0,
                },
            ],
            {
                duration: 800 + Math.random() * 400,
                easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }
        ).onfinish = () => {
            particle.remove();
        };
    }
}

/**
 * Reproduce un sonido suave de pop para el click en fuegos artificiales (opcional)
 */
function playPopSound() {
    // Esta función es opcional y sólo debe usarse si está permitido reproducir sonidos
    try {
        const context = new (window.AudioContext ||
            window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = 450 + Math.random() * 350;
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        // Configurar volumen (mantenerlo bajo)
        gainNode.gain.value = 0.05;
        gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            context.currentTime + 0.2
        );

        // Reproducir brevemente
        oscillator.start();
        oscillator.stop(context.currentTime + 0.2);
    } catch (e) {
        // Ignorar errores - la reproducción de audio es opcional
        console.log("Audio no disponible o desactivado");
    }
}

/**
 * Reproduce un sonido suave para el inicio de fuegos artificiales (opcional)
 */
function playSoftFireworkSound() {
    // Esta función es opcional y sólo debe usarse si está permitido reproducir sonidos
    try {
        const context = new (window.AudioContext ||
            window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = 250;
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        // Configurar volumen (mantenerlo bajo)
        gainNode.gain.value = 0.05;
        gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            context.currentTime + 0.5
        );

        // Reproducir brevemente
        oscillator.start();
        oscillator.stop(context.currentTime + 0.5);
    } catch (e) {
        // Ignorar errores - la reproducción de audio es opcional
        console.log("Audio no disponible o desactivado");
    }
}
