/**
 * fireworks.js - Handling fireworks effects for the birthday card
 */

import { FIREWORK_TYPES, VIBRANT_COLORS } from "./config.js";
import { getHue } from "./utils.js";

// State variables
let fireworksStarted = false;
let happyBirthdayDisplayed = false;

// DOM Elements
let fireworksContainer;
let startFireworksBtn;

/**
 * Initialize fireworks functionality
 * @param {Object} elements - DOM elements
 */
export function initFireworks(elements) {
    // Store DOM elements
    fireworksContainer = elements.fireworksContainer;
    startFireworksBtn = elements.startFireworksBtn;

    // Setup event listeners
    setupFireworksEvents();
}

/**
 * Setup fireworks related event listeners
 */
function setupFireworksEvents() {
    // Start fireworks button event
    startFireworksBtn.addEventListener("click", function () {
        if (!fireworksStarted) {
            fireworksStarted = true;
            createEnhancedFireworks(fireworksContainer, 15); // Reduced initial fireworks count

            // Display Happy Birthday text with fireworks effect
            if (!happyBirthdayDisplayed) {
                displayHappyBirthdayText(fireworksContainer);
                happyBirthdayDisplayed = true;
            }

            // Change button text
            this.textContent = "Thêm Pháo Hoa";
        } else {
            // Create additional fireworks with fewer count
            createEnhancedFireworks(fireworksContainer, 12);
        }
    });
}

/**
 * Display Happy Birthday text with fireworks effect
 * @param {HTMLElement} container - Container for the text
 */
function displayHappyBirthdayText(container) {
    const text = "Happy Birthday";
    const letters = text.split("");
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    // Create a container for the text
    const textContainer = document.createElement("div");
    textContainer.className = "birthday-text-container";
    textContainer.style.position = "absolute";
    textContainer.style.top = "50%";
    textContainer.style.left = "50%";
    textContainer.style.transform = "translate(-50%, -50%)";
    textContainer.style.width = "100%";
    textContainer.style.textAlign = "center";
    textContainer.style.zIndex = "50";
    container.appendChild(textContainer);

    // Display each letter with delay and firework effect
    letters.forEach((letter, index) => {
        setTimeout(() => {
            // Create letter element
            const letterSpan = document.createElement("span");
            letterSpan.className = "birthday-letter";
            letterSpan.textContent = letter;
            letterSpan.style.display = "inline-block";
            letterSpan.style.opacity = "0";
            letterSpan.style.transform = "translateY(20px)";
            letterSpan.style.transition = "all 0.5s ease";
            letterSpan.style.color =
                VIBRANT_COLORS[index % VIBRANT_COLORS.length];
            letterSpan.style.textShadow = `0 0 10px ${
                VIBRANT_COLORS[index % VIBRANT_COLORS.length]
            }, 0 0 20px white`;
            letterSpan.style.fontSize = "3.5rem";
            letterSpan.style.fontFamily =
                "'Arial Black', 'Arial Bold', Gadget, sans-serif";
            letterSpan.style.fontWeight = "bold";
            letterSpan.style.margin = "0 2px";

            textContainer.appendChild(letterSpan);

            // Small explosion at letter position
            const letterX = centerX - (text.length * 30) / 2 + index * 30;
            createLetterFirework(
                container,
                letterX,
                centerY,
                VIBRANT_COLORS[index % VIBRANT_COLORS.length]
            );

            // Animate letter appearance
            setTimeout(() => {
                letterSpan.style.opacity = "1";
                letterSpan.style.transform = "translateY(0)";
            }, 100);
        }, index * 300); // Staggered timing for each letter
    });
}

/**
 * Create a firework effect for a letter
 * @param {HTMLElement} container - Container element
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {string} color - Color for the firework
 */
function createLetterFirework(container, x, y, color) {
    // Create small explosion effect
    const explosion = document.createElement("div");
    explosion.className = "explosion-effect";
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    explosion.style.backgroundColor = color;
    explosion.style.width = "8px";
    explosion.style.height = "8px";

    container.appendChild(explosion);

    // Create rays
    const rayCount = 8;
    for (let i = 0; i < rayCount; i++) {
        const ray = document.createElement("div");
        ray.className = "explosion-ray";

        const angle = (i / rayCount) * 360;
        const length = 30 + Math.random() * 20;

        ray.style.left = `${x}px`;
        ray.style.top = `${y}px`;
        ray.style.width = `${length}px`;
        ray.style.height = `2px`;
        ray.style.backgroundColor = color;
        ray.style.transform = `rotate(${angle}deg)`;
        ray.style.transformOrigin = "0 0";

        container.appendChild(ray);

        // Animation
        ray.animate(
            [
                { opacity: 1, transform: `rotate(${angle}deg) scaleX(1)` },
                { opacity: 0, transform: `rotate(${angle}deg) scaleX(0.3)` },
            ],
            {
                duration: 500,
                easing: "ease-out",
            }
        ).onfinish = () => {
            ray.remove();
        };
    }

    // Animation for center explosion
    explosion.animate(
        [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: "scale(2)" },
        ],
        {
            duration: 600,
            easing: "ease-out",
        }
    ).onfinish = () => {
        explosion.remove();
    };
}

/**
 * Create background effects for fireworks
 * @param {HTMLElement} container - Container element for effects
 */
export function createBackgroundEffects(container) {
    // Create random light dots on background
    for (let i = 0; i < 40; i++) {
        // Increase number of stars
        const star = document.createElement("div");
        star.className = "background-star";

        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;

        // Random size and brightness
        const size = 1 + Math.random() * 3; // Increase star size
        const opacity = 0.3 + Math.random() * 0.7;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = opacity;

        // Twinkle effect
        const duration = 1 + Math.random() * 5; // More diverse twinkle time
        star.style.animation = `twinkle ${duration}s infinite alternate ${
            Math.random() * 3
        }s`;

        container.appendChild(star);
    }

    // Create shooting star effect
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createShootingStar(container);
        }, i * 3000 + Math.random() * 5000);
    }
}

/**
 * Create background light effects
 * @param {HTMLElement} container - Container element for effects
 */
export function createBackgroundLight(container) {
    // Create dim light at bottom
    const bottomLight = document.createElement("div");
    bottomLight.className = "background-light bottom-light";
    container.appendChild(bottomLight);

    // Create dim light at corners
    const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];
    const colors = [
        "rgba(255,82,82,0.2)",
        "rgba(255,213,79,0.2)",
        "rgba(100,181,246,0.2)",
        "rgba(248,165,194,0.2)",
    ];

    positions.forEach((pos, index) => {
        const cornerLight = document.createElement("div");
        cornerLight.className = `background-light ${pos}-light`;
        cornerLight.style.background = `radial-gradient(circle at ${pos.replace(
            "-",
            " "
        )}, ${colors[index]}, transparent 70%)`;
        container.appendChild(cornerLight);
    });

    // Add moving cloud effect
    const cloudCount = 3;
    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement("div");
        cloud.className = "bg-cloud";

        // Random position and size
        cloud.style.top = `${10 + Math.random() * 60}%`;
        cloud.style.left = `${-20 + Math.random() * 10}%`;
        cloud.style.width = `${150 + Math.random() * 100}px`;
        cloud.style.height = `${80 + Math.random() * 40}px`;
        cloud.style.opacity = 0.05 + Math.random() * 0.08;

        // Animation movement from left to right
        const duration = 60 + Math.random() * 40;
        cloud.style.animation = `cloudMove ${duration}s linear infinite ${
            Math.random() * 40
        }s`;

        container.appendChild(cloud);
    }
}

/**
 * Create shooting star effect
 * @param {HTMLElement} container - Container element for the star
 */
function createShootingStar(container) {
    const star = document.createElement("div");
    star.className = "shooting-star";

    // Starting position (from top left)
    const startX = Math.random() * 30;
    const startY = Math.random() * 30;

    star.style.left = `${startX}%`;
    star.style.top = `${startY}%`;

    container.appendChild(star);

    // Shooting star animation
    star.animate(
        [
            {
                left: `${startX}%`,
                top: `${startY}%`,
                opacity: 1,
                width: "3px",
                height: "3px",
                boxShadow:
                    "0 0 10px 2px white, 0 0 20px 5px rgba(255, 255, 255, 0.5)",
            },
            {
                left: `${startX + 70}%`,
                top: `${startY + 40}%`,
                opacity: 0,
                width: "1px",
                height: "1px",
                boxShadow:
                    "0 0 5px 1px white, 0 0 10px 2px rgba(255, 255, 255, 0.2)",
            },
        ],
        {
            duration: 2000,
            easing: "cubic-bezier(0.1, 0.3, 0.1, 1)",
        }
    ).onfinish = () => {
        star.remove();
        // Create new shooting star after completion
        setTimeout(() => {
            createShootingStar(container);
        }, Math.random() * 8000 + 5000);
    };
}

/**
 * Create enhanced fireworks
 * @param {HTMLElement} container - Container for fireworks
 * @param {number} count - Number of fireworks
 * @param {number} interval - Time interval between fireworks
 */
export function createEnhancedFireworks(container, count = 10, interval = 300) {
    // Define container size for better positioning
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Add water reflection effect (optional)
    if (!container.querySelector(".water-reflection")) {
        const reflection = document.createElement("div");
        reflection.className = "water-reflection";
        container.appendChild(reflection);
    }

    // Create each firework with delay
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            // Choose random firework type
            const typeIndex = Math.floor(Math.random() * FIREWORK_TYPES.length);
            const fireworkType = FIREWORK_TYPES[typeIndex];

            // Choose primary and secondary colors
            const primaryColorIndex = Math.floor(
                Math.random() * VIBRANT_COLORS.length
            );
            const secondaryColorIndex =
                (primaryColorIndex + Math.floor(Math.random() * 10) + 1) %
                VIBRANT_COLORS.length;
            const tertiaryColorIndex =
                (secondaryColorIndex + Math.floor(Math.random() * 10) + 1) %
                VIBRANT_COLORS.length;

            const primaryColor = VIBRANT_COLORS[primaryColorIndex];
            const secondaryColor = VIBRANT_COLORS[secondaryColorIndex];
            const tertiaryColor = VIBRANT_COLORS[tertiaryColorIndex];

            // Random position (but avoid too close to edges)
            const padding = 50;
            const posX =
                padding + Math.random() * (containerWidth - padding * 2);
            const posY =
                padding + Math.random() * (containerHeight - padding * 2);

            // Random size
            const size = 5 + Math.random() * 3;

            // Create rise up spark effect (optional)
            if (Math.random() > 0.3) {
                // Increased ratio of rising effect
                createRiseEffect(container, posX, posY, primaryColor);
            }

            // Create firework
            const firework = createFireworkElement(
                container,
                posX,
                posY,
                size,
                primaryColor,
                fireworkType
            );

            // Create particles for firework
            createParticlesForFirework(
                firework,
                fireworkType,
                primaryColor,
                secondaryColor,
                tertiaryColor
            );

            // Create light effect
            createFireworkLight(firework, primaryColor);

            // Create sound (visual effect)
            createAudioVisualEffect(container, posX, posY);

            // Add 3D explosion effect (new)
            if (Math.random() > 0.7) {
                createExplosionEffect(container, posX, posY, primaryColor);
            }

            // Remove firework after completion
            setTimeout(() => {
                firework.remove();
            }, 2500);
        }, i * (interval - Math.random() * 100)); // Randomize delay time between fireworks
    }
}

/**
 * Create firework element
 * @param {HTMLElement} container - Container for firework
 * @param {number} posX - X position
 * @param {number} posY - Y position
 * @param {number} size - Size of firework
 * @param {string} color - Color of firework
 * @param {string} type - Type of firework
 * @returns {HTMLElement} - Created firework element
 */
function createFireworkElement(container, posX, posY, size, color, type) {
    const firework = document.createElement("div");
    firework.className = `firework ${type}-firework`;

    firework.style.left = `${posX}px`;
    firework.style.top = `${posY}px`;
    firework.style.backgroundColor = color;
    firework.style.width = `${size}px`;
    firework.style.height = `${size}px`;

    // Add custom properties for each firework type
    switch (type) {
        case "ring":
            firework.style.borderRadius = "50%";
            firework.style.border = `2px solid ${color}`;
            firework.style.backgroundColor = "transparent";
            break;
        case "star":
            firework.style.clip =
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
            break;
        case "heart":
            firework.style.transform = "rotate(45deg)";
            break;
        case "willow":
            firework.style.borderRadius = "50% 50% 0 0";
            break;
        case "cascade":
            firework.style.borderRadius = "50%";
            firework.style.clipPath = "polygon(0 0, 100% 0, 100% 50%, 0 100%)";
            break;
        case "peony":
            firework.style.borderRadius = "30% 70% 70% 30% / 30% 30% 70% 70%";
            break;
        case "galaxy":
            firework.style.clipPath = "circle(50% at 50% 50%)";
            firework.style.background = `radial-gradient(circle, ${color} 10%, transparent 70%)`;
            break;
        case "crown":
            firework.style.clipPath =
                "polygon(50% 0%, 90% 20%, 100% 60%, 75% 90%, 25% 90%, 0% 60%, 10% 20%)";
            break;
        case "glitter":
            firework.style.borderRadius = "50%";
            firework.style.background = `radial-gradient(circle, white 10%, ${color} 30%, transparent 70%)`;
            firework.style.boxShadow = `0 0 20px ${color}, 0 0 40px white`;
            break;
    }

    container.appendChild(firework);
    return firework;
}

/**
 * Create rise effect for firework
 * @param {HTMLElement} container - Container for effect
 * @param {number} targetX - Target X position
 * @param {number} targetY - Target Y position
 * @param {string} color - Color of effect
 */
function createRiseEffect(container, targetX, targetY, color) {
    const startY = container.offsetHeight;
    const trail = document.createElement("div");
    trail.className = "firework-trail";

    trail.style.left = `${targetX}px`;
    trail.style.bottom = "0px";
    trail.style.backgroundColor = color;

    container.appendChild(trail);

    // Rise up animation effect
    trail.animate(
        [
            { bottom: "0px", opacity: 0.7, height: "5px" },
            { bottom: `${startY - targetY}px`, opacity: 0, height: "2px" },
        ],
        {
            duration: 700,
            easing: "cubic-bezier(0.5, 0, 0.75, 0)",
        }
    ).onfinish = () => {
        trail.remove();
    };

    // Create small sparks along the trail
    for (let i = 0; i < 5; i++) {
        // Increase number of small sparks
        setTimeout(() => {
            const sparkY = startY - ((startY - targetY) * (i + 1)) / 6;

            for (let j = 0; j < 6; j++) {
                // Increase number of small sparks at each position
                const spark = document.createElement("div");
                spark.className = "firework-spark";

                const angle = Math.random() * 360;
                const distance = 5 + Math.random() * 15; // Increase distance

                spark.style.left = `${targetX + Math.cos(angle) * distance}px`;
                spark.style.bottom = `${sparkY + Math.sin(angle) * distance}px`;
                spark.style.backgroundColor = color;
                spark.style.width = `${1 + Math.random() * 2}px`; // Random size
                spark.style.height = `${1 + Math.random() * 2}px`;

                container.appendChild(spark);

                spark.animate(
                    [
                        { transform: "scale(1)", opacity: 1 },
                        { transform: "scale(0)", opacity: 0 },
                    ],
                    {
                        duration: 300 + Math.random() * 200,
                        easing: "ease-out",
                    }
                ).onfinish = () => {
                    spark.remove();
                };
            }
        }, i * 120);
    }
}

/**
 * Create particles for firework
 * @param {HTMLElement} firework - Firework element
 * @param {string} type - Type of firework
 * @param {string} primaryColor - Primary color
 * @param {string} secondaryColor - Secondary color
 * @param {string} tertiaryColor - Tertiary color
 */
function createParticlesForFirework(
    firework,
    type,
    primaryColor,
    secondaryColor,
    tertiaryColor
) {
    let particleCount;

    // Adjust the number of particles depending on firework type
    switch (type) {
        case "circular":
            particleCount = 24;
            break;
        case "spiral":
            particleCount = 30;
            break;
        case "heart":
            particleCount = 24;
            break;
        case "star":
            particleCount = 20;
            break;
        case "burst":
            particleCount = 36;
            break;
        case "palm":
            particleCount = 16;
            break;
        case "ring":
            particleCount = 30;
            break;
        case "chrysanthemum":
            particleCount = 48;
            break;
        case "crossette":
            particleCount = 20;
            break;
        case "willow":
            particleCount = 28;
            break;
        case "cascade":
            particleCount = 42;
            break;
        case "peony":
            particleCount = 60;
            break;
        case "galaxy":
            particleCount = 70;
            break;
        case "crown":
            particleCount = 36;
            break;
        case "glitter":
            particleCount = 80;
            break;
        default:
            particleCount = 32;
    }

    const useSecondaryParticles = Math.random() > 0.3; // Increase probability of using second particle
    const useTertiaryParticles = Math.random() > 0.6; // Add probability of using third layer of particles

    // Create main particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = `particle ${type}-particle`;

        // Set properties according to type
        setupParticleByType(particle, type, i, particleCount, primaryColor);

        // Add sparkle effect for some particles
        if (i % 3 === 0 || Math.random() > 0.6) {
            // Increase sparkle ratio
            const particleInner = particle.firstChild;
            if (particleInner) {
                particleInner.classList.add("sparkle");
            }
        }

        firework.appendChild(particle);
    }

    // Create second layer of particles (optional) with different color
    if (useSecondaryParticles) {
        const secondaryParticleCount = Math.floor(particleCount * 0.7); // Increase ratio of second particles

        for (let i = 0; i < secondaryParticleCount; i++) {
            const particle = document.createElement("div");
            particle.className = `particle ${type}-particle secondary`;

            // Set properties according to type
            setupParticleByType(
                particle,
                type,
                i,
                secondaryParticleCount,
                secondaryColor
            );

            // Add sparkle effect for some particles
            if (i % 3 === 0 || Math.random() > 0.6) {
                const particleInner = particle.firstChild;
                if (particleInner) {
                    particleInner.classList.add("sparkle");
                }
            }

            firework.appendChild(particle);
        }
    }

    // Create third layer of particles (new)
    if (useTertiaryParticles) {
        const tertiaryParticleCount = Math.floor(particleCount * 0.5);

        for (let i = 0; i < tertiaryParticleCount; i++) {
            const particle = document.createElement("div");
            particle.className = `particle ${type}-particle tertiary`;

            // Set properties according to type
            setupParticleByType(
                particle,
                type,
                i,
                tertiaryParticleCount,
                tertiaryColor
            );

            // Add special effect (small particles, different orbit)
            particle.style.animationDelay = `${Math.random() * 0.2}s`;
            particle.style.animationDuration = `${1.2 + Math.random()}s`;

            firework.appendChild(particle);
        }
    }
}

/**
 * Setup particle by type
 * @param {HTMLElement} particle - Particle element
 * @param {string} type - Type of firework
 * @param {number} index - Index of particle
 * @param {number} total - Total number of particles
 * @param {string} color - Color of particle
 */
function setupParticleByType(particle, type, index, total, color) {
    const particle_inner = document.createElement("div");
    particle_inner.style.backgroundColor = color;

    switch (type) {
        case "circular":
            // Particles distributed evenly in a circle
            const angle = (index / total) * 360;
            particle.style.transform = `rotate(${angle}deg)`;
            break;

        case "spiral":
            // Particles in spiral shape
            const spiralAngle = (index / total) * 720; // 2 rounds
            const distance = 50 + (index / total) * 50;
            particle.style.transform = `rotate(${spiralAngle}deg)`;
            particle.style.width = `${distance}px`;
            break;

        case "heart":
            // Particles in heart shape
            const heartT = (index / total) * 2 * Math.PI;
            const x = 16 * Math.pow(Math.sin(heartT), 3);
            const y =
                13 * Math.cos(heartT) -
                5 * Math.cos(2 * heartT) -
                2 * Math.cos(3 * heartT) -
                Math.cos(4 * heartT);
            const heartAngle = (Math.atan2(y, x) * 180) / Math.PI;
            particle.style.transform = `rotate(${heartAngle}deg)`;
            particle.style.setProperty("--tx", `${x * 3}px`);
            particle.style.setProperty("--ty", `${-y * 3}px`);
            break;

        case "star":
            // Particles in 5-pointed star shape
            const step = Math.floor(index / (total / 5));
            const starAngle =
                ((index % (total / 5)) / (total / 5)) * 72 + step * 144;
            particle.style.transform = `rotate(${starAngle}deg)`;
            break;

        case "burst":
            // Random burst
            const burstAngle = Math.random() * 360;
            const burstDist = 50 + Math.random() * 50;
            particle.style.transform = `rotate(${burstAngle}deg)`;
            particle.style.setProperty(
                "--tx",
                `${Math.cos((burstAngle * Math.PI) / 180) * burstDist}px`
            );
            particle.style.setProperty(
                "--ty",
                `${Math.sin((burstAngle * Math.PI) / 180) * burstDist}px`
            );
            break;

        case "palm":
            // Particles in palm tree shape
            const palmAngle = (index / total) * 210 - 15;
            particle.style.transform = `rotate(${palmAngle}deg)`;
            particle.style.width = `${110 + Math.random() * 20}px`;
            break;

        case "ring":
            // Particles in concentric rings
            const ringIndex = Math.floor(index / 10);
            const ringAngle = ((index % 10) / 10) * 360;
            const ringDist = 30 + ringIndex * 30;
            particle.style.transform = `rotate(${ringAngle}deg)`;
            particle.style.width = `${ringDist}px`;
            break;

        case "chrysanthemum":
            // Particles in chrysanthemum shape (multiple layers)
            const layer = Math.floor(index / 12);
            const chrysAngle = ((index % 12) / 12) * 360;
            particle.style.transform = `rotate(${chrysAngle}deg)`;
            particle.style.width = `${60 + layer * 30}px`;
            break;

        case "crossette":
            // Particles in crossette shape
            if (index < 4) {
                const crossAngle = index * 90;
                particle.style.transform = `rotate(${crossAngle}deg)`;

                // Create additional rays
                if (index % 2 === 0) {
                    setTimeout(() => {
                        createCrossetteChildren(particle, color);
                    }, 200);
                }
            } else {
                const crossAngle = ((index - 4) / (total - 4)) * 360;
                particle.style.transform = `rotate(${crossAngle}deg)`;
            }
            break;

        case "willow":
            // Particles in willow shape
            const willowAngle = (index / total) * 270 - 45;
            particle.style.transform = `rotate(${willowAngle}deg)`;
            particle.classList.add("willow-particle");
            break;

        case "cascade":
            // Create waterfall effect (new)
            const cascadeAngle = (index / total) * 180 - 90;
            particle.style.transform = `rotate(${cascadeAngle}deg)`;
            particle.classList.add("cascade-particle");
            particle.style.width = `${80 + Math.random() * 40}px`;
            break;

        case "peony":
            // Peony (multiple round layers)
            const peonyLayer = Math.floor(index / 15);
            const peonyAngle = ((index % 15) / 15) * 360;
            particle.style.transform = `rotate(${peonyAngle}deg)`;
            particle.style.width = `${40 + peonyLayer * 25}px`;
            particle.classList.add("peony-particle");
            break;

        case "galaxy":
            // Galaxy effect (special spiral)
            const galaxyAngle = (index / total) * 1080; // 3 rounds
            const galaxyDistance = 20 + (index / total) * 100;
            particle.style.transform = `rotate(${galaxyAngle}deg)`;
            particle.style.width = `${galaxyDistance}px`;
            particle.classList.add("galaxy-particle");
            break;

        case "crown":
            // Crown effect
            const crownAngle = (index / total) * 360;
            const crownDist = 60 + Math.sin((index / total) * Math.PI * 6) * 20;
            particle.style.transform = `rotate(${crownAngle}deg)`;
            particle.style.width = `${crownDist}px`;
            particle.classList.add("crown-particle");
            break;

        case "glitter":
            // Glitter effect (many small bright points)
            const glitterAngle = Math.random() * 360;
            const glitterDist = 20 + Math.random() * 80;
            particle.style.transform = `rotate(${glitterAngle}deg)`;
            particle.style.width = `${Math.random() * 40 + 20}px`;
            particle.classList.add("glitter-particle");
            break;

        default:
            const defaultAngle = (index / total) * 360;
            particle.style.transform = `rotate(${defaultAngle}deg)`;
    }

    // Add child element for particle
    particle.appendChild(particle_inner);
}

/**
 * Create children particles for crossette effect
 * @param {HTMLElement} parentParticle - Parent particle
 * @param {string} color - Color of children
 */
function createCrossetteChildren(parentParticle, color) {
    if (!parentParticle || !parentParticle.parentElement) return;

    for (let i = 0; i < 3; i++) {
        const childParticle = document.createElement("div");
        childParticle.className = "particle-child";

        const angle = i * 30 - 30;
        childParticle.style.transform = `rotate(${angle}deg)`;
        childParticle.style.backgroundColor = color;

        parentParticle.appendChild(childParticle);
    }
}

/**
 * Create light effect for firework
 * @param {HTMLElement} firework - Firework element
 * @param {string} color - Color of light
 */
function createFireworkLight(firework, color) {
    const light = document.createElement("div");
    light.className = "firework-glow";
    light.style.backgroundColor = color;
    firework.appendChild(light);
}

/**
 * Create audio visual effect
 * @param {HTMLElement} container - Container element
 * @param {number} x - X position
 * @param {number} y - Y position
 */
function createAudioVisualEffect(container, x, y) {
    const ripple = document.createElement("div");
    ripple.className = "audio-ripple";

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    container.appendChild(ripple);

    // Remove effect after completion
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Create 3D explosion effect
 * @param {HTMLElement} container - Container element
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {string} color - Color of explosion
 */
function createExplosionEffect(container, x, y, color) {
    // Create center bright dot
    const explosion = document.createElement("div");
    explosion.className = "explosion-effect";
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    explosion.style.backgroundColor = color;

    container.appendChild(explosion);

    // Create shooting rays
    const rayCount = 12;
    for (let i = 0; i < rayCount; i++) {
        const ray = document.createElement("div");
        ray.className = "explosion-ray";

        const angle = (i / rayCount) * 360;
        const length = 40 + Math.random() * 30;

        ray.style.left = `${x}px`;
        ray.style.top = `${y}px`;
        ray.style.width = `${length}px`;
        ray.style.height = `2px`;
        ray.style.backgroundColor = color;
        ray.style.transform = `rotate(${angle}deg)`;
        ray.style.transformOrigin = "0 0";

        container.appendChild(ray);

        // Fade out animation
        ray.animate(
            [
                { opacity: 1, transform: `rotate(${angle}deg) scaleX(1)` },
                { opacity: 0, transform: `rotate(${angle}deg) scaleX(0.3)` },
            ],
            {
                duration: 700,
                easing: "ease-out",
            }
        ).onfinish = () => {
            ray.remove();
        };
    }

    // Fade out animation for center bright dot
    explosion.animate(
        [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: "scale(2)" },
        ],
        {
            duration: 800,
            easing: "ease-out",
        }
    ).onfinish = () => {
        explosion.remove();
    };
}

/**
 * Check if fireworks have been started
 * @returns {boolean} - Whether fireworks have been started
 */
export function isFireworksStarted() {
    return fireworksStarted;
}
