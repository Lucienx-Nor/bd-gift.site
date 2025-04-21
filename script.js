// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Các biến và phần tử hiện có
    const introScreen = document.getElementById('intro-screen');
    const letterScreen = document.getElementById('letter-screen');
    const cakeScreen = document.getElementById('cake-screen');
    const giftScreen = document.getElementById('gift-screen');
    const finalScreen = document.getElementById('final-screen');
    
    const startBtn = document.getElementById('start-btn');
    const letterNextBtn = document.getElementById('letter-next-btn');
    const blowCandlesBtn = document.getElementById('blow-candles-btn');
    const cakeNextBtn = document.getElementById('cake-next-btn');
    const giftNextBtn = document.getElementById('gift-next-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    const envelope = document.querySelector('.envelope');
    const typingText = document.getElementById('typing-text');
    const envelopeInstructions = document.querySelector('.envelope-instructions');
    const candles = document.querySelectorAll('.candle-flame');
    const gift = document.querySelector('.pixel-gift');
    const fireworksCanvas = document.getElementById('fireworks-canvas');
    const fireworksCtx = fireworksCanvas.getContext('2d');
    const heartContainer = document.querySelector('.heart-container');
    
    // Các phần tử mới
    const weatherContainer = document.getElementById('weather-container');
    const dancingCharacter = document.getElementById('dancing-character');
    const pixelPet = document.getElementById('pixel-pet');
    const konamiEffect = document.getElementById('konami-effect');
    const secretCharacter = document.getElementById('secret-character');
    const hiddenMessage = document.getElementById('hidden-message');
    
    // Các biến theo dõi trạng thái
    let completedSteps = 0;
    const TOTAL_STEPS = 3; // Thư, bánh, quà
    let petPathActive = false;
    let konamiActivated = false;
    
    // Âm thanh
    const clickSound = createAudio('data:audio/wav;base64,UklGRiQDAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQADAACBhYqFbF1fdJivrJBhNjFNf7nYyJ55XHOMo6yikHNodYmPloV0aXSHmKGej4JwbHuJlJmSf3BveISQlpOGdG10g4yRkYh8cHF+iY+Pg3dydX6FjI6KeXR2fYSJjIl/d3Z8g4iJhX54eH+DhoeDeXh6f4KFhIB6eXt+gIOCgHt6e3+AgIB+e3p7fn9/f357ent8ff19fHt7e3x8fHx7e3t7e3x7fHt7e3t7e3t7e3t7e3t7fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx7fHx7fHx7fHx7fHx7fHx7fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHt8e3x7fHt8e3x7fHt8e3x7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7eA==');
    const openSound = createAudio('data:audio/wav;base64,UklGRmQEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YVAIAAB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+foB/gn+DgISDhoeHiImIiYqLi4uMjY2Ojo+Oj42OjY6Njo2NjIyLi4qKiYmIiYmJiYmIiYiHiIeIh4eGhYSEg4GBgH9+fXx7e3p6enl5eHh4d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3eHh4eHh4eHl5eXl6e3t7e3t8fHx8fHx8fHx9fX19fX19fn9/f4CAgICAgICAgIB/f39/fn5+fn5+fn5+fn5+fn5+fXx8fHx8e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fH19fX19fX19fX19fX19fX19fX19fX19fX19fX19fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn4=');
    const blowSound = createAudio('data:audio/wav;base64,UklGRiwDAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQgDAAB5eXl5eXl5eXh5eHl5eHl4eXh5eHl4eXh5eHl4eXh5eHl4eHh4eHh4eHh4eHh3d3d3d3d3d3d2dnZ2dnZ2dnZ1dXV1dXV1dXV0dHV0dHR0dHRzc3NzcnJzcnJycnJycnFxcXFxcXFxcHBwcHBwcHBwcG9vb29vb25vbm9ub25vbm9ubm5ubm5ubm5ubm1tbm1tbW1tbW1tbW1tbWxsbGxsbGxsbGxsbGxsbGxsbGxsa2xrbGtsa2trbGtsa2trbGtsa2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2trampqampqamlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpamlqaWpqampqampqampqampqampqampqampqamlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWloaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWloaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGg=');
    const fireworkSound = createAudio('data:audio/wav;base64,UklGRiwDAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQgDAAB+g4qRl5yfpKepqaejnpmUjoiBe3Vwamtvcnh8gIWMkpidoqWnqauuraujmY+FeG5jV01ETlNaYWt1foeTnaWss7a1s7CroZeMgHBlWEk8MzE1OkFKVF9sdYOQnKawt7q7ubWupZuQhHhtYVNHOjAtLjM5QURMV2Vxfo2YpK+3vL68uLCon5SJfXFkWEtANS0qKzA2PUVOWGZyf46ZprG5vb68t7Gon5SIfG9iVkg+NCwpKi41PEVOWGZyf46ZprG5vb27trCnn5OHe29hVUc+NCwpKi41PEVPWWdygI+ap7K5vr+8t7Con5OHe29hVUc+NCwpKi41PEVPWWdygI+ap7K5vr+8t7GpoJSIfW9iVkg+NCwpKi41PEVPWWdygI+ap7K5vr+8t7GpoJSIfXBiVkg+NCwpKi41PEVPWWdygI+ap7K5vr+8t7GpoJSIfXBiVkg+NCwpKi41PEVPWWdygI+ap7K5vr+8t7GpoJSIfXBiVkg+NCwpKi41PEVPWWdygI+ap7K5vr+8t7GpoJSIfXBiVkg+NCwpKi41PEVPWWdygI+ap7K5vr+8t7GpoJSIfXBiVkg+NCwpKi41PEVPWWdygI+ap7K5vr+8t7GpoJSIfXBiVkg+NCwpKi41PEVPWWdygI+ap7K5vr+8t7GpoJSIfXBiVkg+NCwpKi41PEVPWWdygI+ap7K5vr+8t7GpoJSIfXBiVkg+NCwpKi41PEVPWWdygI+ap7K5vr+8t7GpoJSIfXBiVkg+NCwpKi41PEVPWWdygI+ap7K5vr+8t7GpoJSIfXBiVkg+NCwpKi41PEVPWWdygI+ap7K5vr+8t7GpoJSIfXBiVkg+NCwpKi41PA==');
    
    // Âm thanh hiệu ứng mới
    const magicSound = createAudio('data:audio/wav;base64,UklGRiQDAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQADAACBhYqFbF1fdJivrJBhNjFNf7nYyJ55XHOMo6yikHNodYmPloV0aXSHmKGej4JwbHuJlJmSf3BveISQlpOGdG10g4yRkYh8cHF+iY+Pg3dydX6FjI6KeXR2fYSJjIl/d3Z8g4iJhX54eH+DhoeDeXh6f4KFhIB6eXt+gIOCgHt6e3+AgIB+e3p7fn9/f357ent8ff19fHt7e3x8fHx7e3t7e3x7fHt7e3t7e3t7e3t7e3t7fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx7fHx7fHx7fHx7fHx7fHx7fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHt8e3x7fHt8e3x7fHt8e3x7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7eA==');
    const secretSound = createAudio('data:audio/wav;base64,UklGRmQEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YVAIAAB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+foB/gn+DgISDhoeHiImIiYqLi4uMjY2Ojo+Oj42OjY6Njo2NjIyLi4qKiYmIiYmJiYmIiYiHiIeIh4eGhYSEg4GBgH9+fXx7e3p6enl5eHh4d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3eHh4eHh4eHl5eXl6e3t7e3t8fHx8fHx8fHx9fX19fX19fn9/f4CAgICAgICAgIB/f39/fn5+fn5+fn5+fn5+fn5+fXx8fHx8e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fH19fX19fX19fX19fX19fX19fX19fX19fX19fX19fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn4=');
    
    // Hàm tạo âm thanh
    function createAudio(src) {
        const audio = new Audio();
        audio.src = src;
        return audio;
    }
    
    // Setup canvas pháo hoa
    function setupFireworksCanvas() {
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', setupFireworksCanvas);
    setupFireworksCanvas();
    
    // Thông báo sinh nhật
    const birthdayMessage = "Dear Friend,\n\nOn this special day, I wanted to take a moment to celebrate YOU!\n\nYour friendship lights up my life like pixels on a screen, creating a beautiful, unforgettable image.\n\nMay your next level be filled with power-ups, extra lives, and all the happiness in the world!\n\nHappy Birthday!";
    
    // Tên người nhận
    const recipientName = "TO YOU";
    document.querySelector('.recipient-name').textContent = recipientName;
    
    // Chức năng chuyển màn hình
    function showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active');
        });
        screen.classList.add('active');
    }
    
    // Hiệu ứng đánh máy
    function typeWriter(text, element, speed = 50, callback) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        
        type();
    }
    
    // Lớp pháo hoa
    class Firework {
        constructor(canvas, ctx) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.particles = [];
            this.isActive = false;
        }
        
        createBurst(x, y, options = {}) {
            const defaults = {
                particleCount: 60,
                burstType: 'circle',
                colors: ['#ff004d', '#ff77a8', '#ffec27', '#29adff', '#83769c', '#ffffff'],
                baseSize: 5,
                gravity: 0.03,
                friction: 0.995,
                fadeSpeed: 0.01,
                scale: 1.5,
                isGlowing: true,
                velocityMultiplier: 1.5
            };
            
            const config = {...defaults, ...options};
            const burstTypes = ['circle', 'ring', 'sparkle', 'star'];
            
            if (!config.burstType || burstTypes.indexOf(config.burstType) === -1) {
                config.burstType = burstTypes[Math.floor(Math.random() * burstTypes.length)];
            }
            
            this.isActive = true;
            
            for (let i = 0; i < config.particleCount; i++) {
                let angle, speed;
                
                if (config.burstType === 'circle') {
                    angle = (i / config.particleCount) * Math.PI * 2;
                    speed = (2 + Math.random() * 2) * config.velocityMultiplier * config.scale;
                } else if (config.burstType === 'ring') {
                    angle = (i / config.particleCount) * Math.PI * 2;
                    speed = (3 + Math.random()) * config.velocityMultiplier * config.scale;
                } else if (config.burstType === 'sparkle') {
                    angle = Math.random() * Math.PI * 2;
                    speed = (1 + Math.random() * 4) * config.velocityMultiplier * config.scale;
                } else if (config.burstType === 'star') {
                    const arms = 5;
                    const armIndex = i % arms;
                    angle = (armIndex / arms) * Math.PI * 2;
                    speed = (1.5 + (Math.floor(i / arms) / (config.particleCount / arms)) * 3) * config.velocityMultiplier * config.scale;
                }
                
                const colorIndex = Math.floor(Math.random() * (config.colors.length - 1));
                const color = config.colors[colorIndex];
                
                const isWhite = Math.random() > 0.85;
                const finalColor = isWhite ? config.colors[config.colors.length - 1] : color;
                
                const isSquare = Math.random() > 0.4;
                const size = (config.baseSize * (0.6 + Math.random() * 1.2)) * config.scale;
                
                this.particles.push({
                    x,
                    y,
                    size,
                    color: finalColor,
                    velocityX: Math.cos(angle) * speed,
                    velocityY: Math.sin(angle) * speed,
                    gravity: config.gravity,
                    friction: config.friction,
                    fadeSpeed: config.fadeSpeed * (0.7 + Math.random() * 0.5),
                    opacity: 1,
                    isSquare,
                    isGlowing: config.isGlowing && (Math.random() > 0.2),
                    glowSize: size * 4,
                    glitterChance: Math.random() > 0.6 ? 0.15 : 0
                });
            }
        }
        
        createFireworkEffect(x, y, options = {}) {
            const defaults = {
                scale: 1.5,
                particleMultiplier: 1.0
            };
            
            const config = {...defaults, ...options};
            
            const burstTypes = ['circle', 'ring', 'sparkle', 'star'];
            const burstType = burstTypes[Math.floor(Math.random() * burstTypes.length)];
            
            const colorSets = [
                ['#ff004d', '#ff77a8', '#ffccaa', '#ffffff'],
                ['#ffec27', '#fdff6b', '#ffda03', '#ffffff'],
                ['#29adff', '#83769c', '#00e756', '#ffffff'],
                ['#ff6600', '#ffda03', '#ff9900', '#ffffff'],
                ['#fdff6b', '#ff77a8', '#bf4fff', '#ffffff'],
            ];
            
            const colors = colorSets[Math.floor(Math.random() * colorSets.length)];
            
            this.createBurst(x, y, {
                particleCount: Math.floor(60 * config.particleMultiplier),
                burstType: burstType,
                colors: colors,
                baseSize: 5,
                scale: config.scale,
                velocityMultiplier: 1.5
            });
            
            if (Math.random() > 0.5) {
                setTimeout(() => {
                    const offsetX = x + (Math.random() * 200 - 100) * config.scale;
                    const offsetY = y + (Math.random() * 200 - 100) * config.scale;
                    this.createBurst(offsetX, offsetY, {
                        particleCount: Math.floor(40 * config.particleMultiplier),
                        burstType: burstTypes[Math.floor(Math.random() * burstTypes.length)],
                        colors: colors,
                        baseSize: 4,
                        scale: config.scale * 0.8,
                        velocityMultiplier: 1.3
                    });
                }, 200);
            }
            
            if (Math.random() > 0.7) {
                setTimeout(() => {
                    const offsetX = x + (Math.random() * 300 - 150) * config.scale;
                    const offsetY = y + (Math.random() * 300 - 150) * config.scale;
                    this.createBurst(offsetX, offsetY, {
                        particleCount: Math.floor(30 * config.particleMultiplier),
                        burstType: 'sparkle',
                        colors: colors,
                        baseSize: 3,
                        scale: config.scale * 0.6,
                        velocityMultiplier: 1.2,
                        fadeSpeed: 0.015
                    });
                }, 400);
            }
        }
        
        update() {
            this.ctx.fillStyle = 'rgba(15, 15, 27, 0.2)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                
                p.velocityX *= p.friction;
                p.velocityY *= p.friction;
                p.velocityY += p.gravity;
                
                p.x += p.velocityX;
                p.y += p.velocityY;
                p.opacity -= p.fadeSpeed;
                
                if (p.glitterChance > 0 && Math.random() < p.glitterChance) {
                    p.opacity = Math.min(1, p.opacity + 0.3);
                }
                
                if (p.opacity > 0) {
                    this.ctx.save();
                    this.ctx.globalAlpha = p.opacity;
                    
                    if (p.isGlowing) {
                        this.ctx.shadowColor = p.color;
                        this.ctx.shadowBlur = p.size * 3;
                    }
                    
                    this.ctx.fillStyle = p.color;
                    if (p.isSquare) {
                        this.ctx.fillRect(
                            Math.floor(p.x - p.size / 2), 
                            Math.floor(p.y - p.size / 2), 
                            Math.ceil(p.size), 
                            Math.ceil(p.size)
                        );
                    } else {
                        this.ctx.beginPath();
                        this.ctx.arc(
                            Math.floor(p.x), 
                            Math.floor(p.y), 
                            Math.ceil(p.size / 2), 
                            0, 
                            Math.PI * 2
                        );
                        this.ctx.fill();
                    }
                    this.ctx.restore();
                } else {
                    this.particles.splice(i, 1);
                }
            }
            
            if (this.particles.length === 0) {
                this.isActive = false;
            }
            
            return this.isActive;
        }
    }
    
    // Hiệu ứng hoa giấy
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.classList.add('confetti-container');
        document.body.appendChild(confettiContainer);
        
        const colors = ['#ff004d', '#ff77a8', '#ffec27', '#29adff', '#83769c', '#7e2553'];
        const shapes = ['circle', 'square', 'triangle', 'rect', 'heart'];
        const confettiCount = 150;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const size = 5 + Math.random() * 10;
            const left = Math.random() * 100;
            const animationDelay = Math.random() * 2;
            const animationDuration = 2 + Math.random() * 3;
            
            confetti.style.backgroundColor = color;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${left}%`;
            confetti.style.animationDelay = `${animationDelay}s`;
            confetti.style.animationDuration = `${animationDuration}s`;
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.backgroundColor = 'transparent';
                confetti.style.borderLeft = `${size/2}px solid transparent`;
                confetti.style.borderRight = `${size/2}px solid transparent`;
                confetti.style.borderBottom = `${size}px solid ${color}`;
            } else if (shape === 'heart') {
                confetti.style.backgroundColor = 'transparent';
                confetti.style.boxShadow = `${size/2}px -${size/2}px 0 ${color}, -${size/2}px -${size/2}px 0 ${color}, 0px 0px 0 ${color}, 0px -${size}px 0 ${color}`;
                confetti.style.transform = 'rotate(45deg)';
            }
            
            confettiContainer.appendChild(confetti);
            
            confetti.addEventListener('animationend', function() {
                confetti.remove();
            });
        }
        
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }
    
    // Hiệu ứng trái tim
    function createHearts() {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.classList.add('pixel-heart');
            
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 5 + Math.random() * 5;
            
            heart.style.left = `${left}%`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.animationDuration = `${duration}s`;
            
            heartContainer.appendChild(heart);
        }
    }
    
    // Định nghĩa animation cho trái tim
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0% { opacity: 0; transform: translateY(100px); }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; transform: translateY(-100px); }
        }
    `;
    document.head.appendChild(floatStyle);
    
    // ===== CHỨC NĂNG MỚI =====
    
    // 1. Hiệu ứng tương tác với con trỏ chuột
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    // Hạt lấp lánh theo sau con trỏ
    function createCursorParticle(x, y) {
        const colors = ['#ff004d', '#ff77a8', '#ffec27', '#29adff', '#83769c'];
        const particle = document.createElement('div');
        particle.classList.add('cursor-particle');
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const size = 3 + Math.random() * 4;
        
        particle.style.backgroundColor = randomColor;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Tạo hướng bay ngẫu nhiên cho hạt
        const xDistance = -20 + Math.random() * 40;
        const yDistance = -20 + Math.random() * 40;
        
        particle.style.setProperty('--x-distance', `${xDistance}px`);
        particle.style.setProperty('--y-distance', `${yDistance}px`);
        
        document.body.appendChild(particle);
        
        // Tự xóa sau khi animation kết thúc
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
    
    // Mini fireworks khi click
    function createClickFirework(x, y) {
        const colors = ['#ff004d', '#ff77a8', '#ffec27', '#29adff', '#83769c'];
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('click-firework');
            
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = 20 + Math.random() * 20;
            const xDistance = Math.cos(angle) * distance;
            const yDistance = Math.sin(angle) * distance;
            
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.backgroundColor = randomColor;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.setProperty('--x-distance', `${xDistance}px`);
            particle.style.setProperty('--y-distance', `${yDistance}px`);
            
            document.body.appendChild(particle);
            
            // Tự xóa sau khi animation kết thúc
            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }
    
    // Sự kiện di chuyển chuột
    document.addEventListener('mousemove', function(e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        
        // Tạo hạt theo sau con trỏ với xác suất nhất định
        if (Math.random() > 0.7) {
            createCursorParticle(e.clientX, e.clientY);
        }
    });
    
    // Sự kiện nhấp chuột
    document.addEventListener('click', function(e) {
        // Bỏ qua clicks trên các nút để tránh hiệu ứng không mong muốn
        if (!e.target.closest('.pixel-btn') && !e.target.closest('.envelope') && !e.target.closest('.pixel-gift')) {
            createClickFirework(e.clientX, e.clientY);
        }
    });
    
    // 2. Hiệu ứng thời tiết pixel
    // Mưa confetti pixelated
    function createRainEffect() {
        const rainColors = ['#ff004d', '#ffec27', '#29adff', '#83769c'];
        const rainCount = 50;
        const minDuration = 5;
        const maxDuration = 10;
        
        for (let i = 0; i < rainCount; i++) {
            const rain = document.createElement('div');
            rain.classList.add('pixel-rain');
            
            const color = rainColors[Math.floor(Math.random() * rainColors.length)];
            const left = Math.random() * 100;
            const duration = minDuration + Math.random() * (maxDuration - minDuration);
            const delay = Math.random() * 5;
            
            rain.style.color = color;
            rain.style.left = `${left}%`;
            rain.style.animationDuration = `${duration}s`;
            rain.style.animationDelay = `${delay}s`;
            
            weatherContainer.appendChild(rain);
            
            // Tái tạo hạt mưa khi rơi hết
            rain.addEventListener('animationend', function() {
                rain.style.left = `${Math.random() * 100}%`;
                rain.style.animationDuration = `${minDuration + Math.random() * (maxDuration - minDuration)}s`;
                rain.style.animationDelay = '0s';
                void rain.offsetWidth; // Trigger reflow
                rain.style.animation = 'none';
                setTimeout(() => {
                    rain.style.animation = `rain-fall ${rain.style.animationDuration} linear forwards`;
                }, 10);
            });
        }
    }
    
    // Bong bóng pixel bay lên
    function createBubbleEffect() {
        const bubbleColors = ['#29adff', '#83769c', '#ffec27'];
        const bubbleCount = 20;
        const minDuration = 8;
        const maxDuration = 15;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('pixel-bubble');
            
            const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
            const left = Math.random() * 100;
            const duration = minDuration + Math.random() * (maxDuration - minDuration);
            const delay = Math.random() * 5;
            const xOffset = -50 + Math.random() * 100;
            
            bubble.style.color = color;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.setProperty('--x-offset', `${xOffset}px`);
            
            weatherContainer.appendChild(bubble);
            
            // Tái tạo bong bóng khi bay hết
            bubble.addEventListener('animationend', function() {
                bubble.style.left = `${Math.random() * 100}%`;
                bubble.style.animationDuration = `${minDuration + Math.random() * (maxDuration - minDuration)}s`;
                bubble.style.setProperty('--x-offset', `${-50 + Math.random() * 100}px`);
                bubble.style.animationDelay = '0s';
                void bubble.offsetWidth; // Trigger reflow
                bubble.style.animation = 'none';
                setTimeout(() => {
                    bubble.style.animation = `bubble-rise ${bubble.style.animationDuration} ease-in-out forwards`;
                }, 10);
            });
        }
    }
    
    // 3. Nhân vật pixel art
    // Thú cưng pixel chạy xung quanh
    function animatePixelPet() {
        const petSpeed = 2;
        let petX = 0;
        let petY = window.innerHeight - 50;
        let petDirection = 1; // 1: phải, -1: trái
        
        pixelPet.style.opacity = '1';
        pixelPet.classList.add('visible');
        
        function updatePetPosition() {
            // Cập nhật vị trí
            petX += petSpeed * petDirection;
            
            // Đổi hướng khi chạm cạnh màn hình
            if (petX > window.innerWidth - 30 || petX < 0) {
                petDirection *= -1;
                pixelPet.style.transform = `scaleX(${petDirection})`;
            }
            
            // Cập nhật CSS
            pixelPet.style.left = `${petX}px`;
            pixelPet.style.top = `${petY}px`;
            
            // Tiếp tục animation nếu đang active
            if (petPathActive) {
                requestAnimationFrame(updatePetPosition);
            }
        }
        
        petPathActive = true;
        requestAnimationFrame(updatePetPosition);
    }
    
    // 4. Easter eggs thú vị
    // Konami code Easter egg (Up, Up, Down, Down, Left, Right, Left, Right, B, A)
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiCodePosition = 0;
    
    // Tạo trình lắng nghe phím
    document.addEventListener('keydown', function(e) {
        // Xử lý Konami code
        const key = e.key.toLowerCase();
        const requiredKey = konamiCode[konamiCodePosition].toLowerCase();
        
        if (key === requiredKey) {
            konamiCodePosition++;
            
            if (konamiCodePosition === konamiCode.length) {
                activateKonamiCode();
                konamiCodePosition = 0;
            }
        } else {
            konamiCodePosition = 0;
        }
        
        // Chế độ bí mật khi nhấn B (hiện sau khi hoàn thành tất cả các bước)
        if (key === 'b' && completedSteps >= TOTAL_STEPS) {
            toggleSecretCharacter();
        }
        
        // Đóng Konami code khi nhấn ESC
        if (key === 'escape' && konamiActivated) {
            konamiEffect.classList.remove('active');
            konamiActivated = false;
        }
    });
    
    // Kích hoạt Konami code
    function activateKonamiCode() {
        magicSound.play();
        konamiEffect.classList.add('active');
        konamiActivated = true;
        
        // Tạo pháo hoa pháo hoa mừng Konami code
        const fireworks = new Firework(fireworksCanvas, fireworksCtx);
        let animationFrameId;
        
        function createRandomFirework() {
            const x = Math.random() * window.innerWidth;
            const y = 100 + Math.random() * (window.innerHeight / 2);
            fireworks.createFireworkEffect(x, y, {
                scale: 1.5 + Math.random(),
                particleMultiplier: 1.5
            });
        }
        
        // Tạo pháo hoa ngẫu nhiên
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createRandomFirework();
            }, i * 300);
        }
        
        // Animation loop
        function animate() {
            if (!konamiActivated) {
                cancelAnimationFrame(animationFrameId);
                fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
                return;
            }
            
            const isStillActive = fireworks.update();
            animationFrameId = requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // Kích hoạt nhân vật bí mật
    function toggleSecretCharacter() {
        secretSound.play();
        secretCharacter.style.left = `${lastMouseX}px`;
        secretCharacter.style.top = `${lastMouseY}px`;
        
        if (secretCharacter.classList.contains('visible')) {
            secretCharacter.classList.remove('visible');
        } else {
            secretCharacter.classList.add('visible');
            
            // Tự ẩn sau một thời gian
            setTimeout(() => {
                secretCharacter.classList.remove('visible');
            }, 5000);
        }
    }
    
    // Kiểm tra hoàn thành tất cả bước
    function checkCompletion() {
        completedSteps++;
        
        if (completedSteps >= TOTAL_STEPS) {
            // Hiển thị message ẩn
            setTimeout(() => {
                hiddenMessage.classList.add('visible');
            }, 2000);
        }
    }
    
    // Khởi tạo hiệu ứng thời tiết
    function initWeatherEffects() {
        createRainEffect();
        createBubbleEffect();
    }
    
    // ===== SỰ KIỆN TRANG WEB =====
    
    // Khởi tạo hiệu ứng thời tiết khi trang tải
    initWeatherEffects();
    
    // Sự kiện nút Start
    startBtn.addEventListener('click', function() {
        clickSound.play();
        showScreen(letterScreen);
    });
    
    // Sự kiện mở phong bì
    envelope.addEventListener('click', function() {
        if (!envelope.classList.contains('open')) {
            openSound.play();
            envelope.classList.add('open');
            envelopeInstructions.style.display = 'none';
            
            // Bắt đầu animation đánh máy sau khi mở phong bì
            setTimeout(() => {
                typeWriter(birthdayMessage, typingText, 50, function() {
                    letterNextBtn.classList.remove('hidden');
                });
            }, 1000);
        }
    });
    
    // Sự kiện chuyển từ thư sang bánh
    letterNextBtn.addEventListener('click', function() {
        clickSound.play();
        showScreen(cakeScreen);
        checkCompletion(); // Hoàn thành bước 1
    });
    
    // Sự kiện thổi nến
    blowCandlesBtn.addEventListener('click', function() {
        blowSound.play();
        candles.forEach(candle => {
            candle.classList.add('blown');
        });
        
        // Tạo hiệu ứng hoa giấy
        createConfetti();
        
        cakeNextBtn.classList.remove('hidden');
        blowCandlesBtn.style.display = 'none';
    });
    
    // Sự kiện chuyển từ bánh sang quà
    cakeNextBtn.addEventListener('click', function() {
        clickSound.play();
        showScreen(giftScreen);
        checkCompletion(); // Hoàn thành bước 2
    });
    
    // Sự kiện mở hộp quà
    gift.addEventListener('click', function() {
        if (!gift.classList.contains('opened')) {
            gift.classList.add('opened');
            
            // Phát âm thanh
            fireworkSound.play();
            
            // Đảm bảo canvas có kích thước đúng
            setupFireworksCanvas();
            
            // Hiện nhân vật nhảy múa
            dancingCharacter.classList.add('visible');
            
            // Khởi tạo hệ thống pháo hoa
            const fireworks = new Firework(fireworksCanvas, fireworksCtx);
            let animationFrameId;
            let isAnimating = true;
            
            // Tạo pháo hoa ban đầu ở giữa
            setTimeout(() => {
                fireworks.createFireworkEffect(window.innerWidth / 2, window.innerHeight / 3, {
                    scale: 2.0,
                    particleMultiplier: 1.5
                });
            }, 100);
            
            // Tạo pháo hoa định kỳ
            let fireworkInterval = setInterval(() => {
                const x = window.innerWidth * (0.1 + Math.random() * 0.8);
                const y = window.innerHeight * (0.1 + Math.random() * 0.5);
                
                // Kích thước ngẫu nhiên để đa dạng
                const scale = 1.2 + Math.random() * 0.8;
                fireworks.createFireworkEffect(x, y, {
                    scale: scale,
                    particleMultiplier: 1.0
                });
            }, 800);
            
            // Pháo hoa kiểu sóng
            setTimeout(() => {
                const positions = [0.2, 0.8];
                
                for (let i = 0; i < positions.length; i++) {
                    setTimeout(() => {
                        const x = window.innerWidth * positions[i];
                        const y = window.innerHeight * 0.3;
                        fireworks.createFireworkEffect(x, y, {
                            scale: 1.8,
                            particleMultiplier: 1.3
                        });
                    }, i * 400);
                }
            }, 1800);
            
            // Pháo hoa kiểu lưới
            setTimeout(() => {
                const rows = 2;
                const cols = 3;
                
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        setTimeout(() => {
                            const x = window.innerWidth * (0.25 + c * 0.25);
                            const y = window.innerHeight * (0.2 + r * 0.3);
                            
                            fireworks.createFireworkEffect(x, y, {
                                scale: 1.5,
                                particleMultiplier: 1.2
                            });
                        }, (r * cols + c) * 200);
                    }
                }
            }, 3800);
            
            // Pháo hoa finale
            setTimeout(() => {
                // Pháo hoa lớn ở giữa
                fireworks.createFireworkEffect(window.innerWidth / 2, window.innerHeight / 3, {
                    scale: 2.5,
                    particleMultiplier: 1.8
                });
                
                // Thêm một quả pháo hoa nữa sau đó
                setTimeout(() => {
                    fireworks.createFireworkEffect(window.innerWidth * 0.5, window.innerHeight * 0.4, {
                        scale: 2.0,
                        particleMultiplier: 1.5
                    });
                }, 500);
            }, 5500);
            
            // Animation loop cho pháo hoa
            function animate() {
                if (!isAnimating) return;
                
                const isStillActive = fireworks.update();
                
                if (isStillActive) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    // Chỉ dừng animation nếu fireworkInterval đã được xóa
                    if (!fireworkInterval) {
                        cancelAnimationFrame(animationFrameId);
                        fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
                    } else {
                        animationFrameId = requestAnimationFrame(animate);
                    }
                }
            }
            
            // Bắt đầu animation
            animate();
            
            // Dừng pháo hoa và hiện nút tiếp theo sau một vài giây
            setTimeout(() => {
                clearInterval(fireworkInterval);
                fireworkInterval = null;
                
                // Để animation tắt dần tự nhiên
                setTimeout(() => {
                    isAnimating = false;
                    cancelAnimationFrame(animationFrameId);
                    giftNextBtn.classList.remove('hidden');
                }, 3000);
            }, 7000);
        }
    });
    
    // Sự kiện chuyển từ quà sang màn hình cuối
    giftNextBtn.addEventListener('click', function() {
        clickSound.play();
        showScreen(finalScreen);
        createHearts();
        checkCompletion(); // Hoàn thành bước 3
        
        // Bắt đầu animation thú cưng chạy
        animatePixelPet();
    });
    
    // Sự kiện nút Restart
    restartBtn.addEventListener('click', function() {
        clickSound.play();
        // Reset tất cả trạng thái
        envelope.classList.remove('open');
        candles.forEach(candle => candle.classList.remove('blown'));
        gift.classList.remove('opened');
        envelopeInstructions.style.display = 'block';
        blowCandlesBtn.style.display = 'block';
        letterNextBtn.classList.add('hidden');
        cakeNextBtn.classList.add('hidden');
        giftNextBtn.classList.add('hidden');
        dancingCharacter.classList.remove('visible');
        hiddenMessage.classList.remove('visible');
        
        // Xóa pháo hoa canvas
        if (fireworksCtx) {
            fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        }
        
        // Xóa trái tim
        heartContainer.innerHTML = '';
        
        // Dừng thú cưng
        petPathActive = false;
        pixelPet.classList.remove('visible');
        
        // Xóa containers hoa giấy còn sót lại
        const confettiContainers = document.querySelectorAll('.confetti-container');
        confettiContainers.forEach(container => container.remove());
        
        // Bắt đầu từ màn hình đầu tiên
        showScreen(introScreen);
    });
});