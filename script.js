// RainbowCatGGs Website Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initBackgroundMusic();
    initThemeToggle();
    createFloatingCats();
    initSliders();
    initMilestones();
    initMeowifyTweet();
    initCarousel();
    initMeowScanner();
    initEasterEgg();
    initAnimations();
});

// Background Music Control
function initBackgroundMusic() {
    const musicToggle = document.getElementById('music-toggle');
    const music = document.getElementById('background-music');
    let isPlaying = false;

    // Music is not loaded by default, we need to create a user interaction first
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            music.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            music.play().catch(error => {
                console.log('Audio playback failed:', error);
            });
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isPlaying = !isPlaying;
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });
}

// Floating Cats
function createFloatingCats() {
    const floatingCatsContainer = document.querySelector('.floating-cats');
    const catColors = ['#ff00ff', '#00ffff', '#ffff00', '#ff00aa', '#00ff99'];
    const numCats = 10;
    
    for (let i = 0; i < numCats; i++) {
        const cat = document.createElement('div');
        cat.classList.add('floating-cat');
        
        // Random position
        const xPos = Math.random() * 90; // %
        const yPos = Math.random() * 90; // %
        
        // Random size
        const size = 30 + Math.random() * 40; // px
        
        // Set cat properties
        cat.style.left = `${xPos}%`;
        cat.style.top = `${yPos}%`;
        cat.style.width = `${size}px`;
        cat.style.height = `${size}px`;
        
        // Create cat emoji with random color
        const randomColor = catColors[Math.floor(Math.random() * catColors.length)];
        cat.innerHTML = `<span style="font-size: ${size}px; color: ${randomColor};">🐱</span>`;
        
        // Add the cat to container
        floatingCatsContainer.appendChild(cat);
        
        // Add animation
        animateCat(cat);
        
        // Add meow sound on hover
        cat.addEventListener('mouseenter', function() {
            playMeowSound();
        });
    }
}

function animateCat(cat) {
    // Create random animation properties
    const duration = 10 + Math.random() * 20; // seconds
    const xMove = -20 + Math.random() * 40; // px
    const yMove = -20 + Math.random() * 40; // px
    const rotation = -30 + Math.random() * 60; // degrees
    
    // Apply animation
    cat.style.transition = `transform ${duration}s ease-in-out`;
    cat.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${rotation}deg)`;
    
    // Reset and restart animation after completion
    setTimeout(() => {
        cat.style.transition = 'none';
        cat.style.transform = 'translate(0, 0) rotate(0)';
        
        setTimeout(() => {
            animateCat(cat);
        }, 50);
    }, duration * 1000);
}

function playMeowSound() {
    // Create meow sound
    const meow = new Audio();
    const meowSounds = ['meow1.mp3', 'meow2.mp3', 'meow3.mp3', 'meow4.mp3'];
    const randomMeow = meowSounds[Math.floor(Math.random() * meowSounds.length)];
    
    // Using a placeholder - in a real app we'd have actual sound files
    // meow.src = randomMeow;
    
    // For now just use console.log for demonstration
    console.log(`Cat says: ${randomMeow}`);
    
    // Play a simple beep instead as a placeholder
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 800 + Math.random() * 600;
    oscillator.connect(context.destination);
    oscillator.start();
    setTimeout(function() {
        oscillator.stop();
    }, 200);
}

// Interactive Sliders
function initSliders() {
    const catTaxSlider = document.getElementById('cat-tax-slider');
    const catTaxValue = catTaxSlider.parentElement.querySelector('.slider-value');
    
    const ggRewardSlider = document.getElementById('gg-reward-slider');
    const ggRewardValue = ggRewardSlider.parentElement.querySelector('.slider-value');
    
    // Update Cat Tax slider value
    catTaxSlider.addEventListener('input', function() {
        catTaxValue.textContent = `${this.value}%`;
        updateSliderBackground(this);
    });
    
    // Update GG Reward slider value
    ggRewardSlider.addEventListener('input', function() {
        ggRewardValue.textContent = `${this.value}%`;
        updateSliderBackground(this);
    });
    
    // Initialize slider backgrounds
    updateSliderBackground(catTaxSlider);
    updateSliderBackground(ggRewardSlider);
}

function updateSliderBackground(slider) {
    // Calculate gradient percentage based on slider value
    const percentage = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    
    // Create a gradient background to show progress
    slider.style.background = `linear-gradient(90deg, 
        var(--gradient-1) 0%, 
        var(--gradient-2) ${percentage}%, 
        rgba(255, 255, 255, 0.2) ${percentage}%, 
        rgba(255, 255, 255, 0.2) 100%)`;
}

// Meowmap Milestones
function initMilestones() {
    const milestones = document.querySelectorAll('.milestone');
    
    milestones.forEach(milestone => {
        milestone.addEventListener('click', function() {
            // Play sound associated with milestone
            const soundFile = this.getAttribute('data-sound');
            console.log(`Playing milestone sound: ${soundFile}`);
            
            // Visual indication of clicking
            const cloud = this.querySelector('.milestone-cloud');
            cloud.style.transform = 'scale(1.1)';
            cloud.style.boxShadow = '0 0 30px var(--glow-color)';
            
            setTimeout(() => {
                cloud.style.transform = '';
                cloud.style.boxShadow = '';
            }, 300);
            
            // Play a simple beep as a placeholder
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = context.createOscillator();
            oscillator.type = "sine";
            oscillator.frequency.value = 500 + Math.random() * 500;
            oscillator.connect(context.destination);
            oscillator.start();
            setTimeout(function() {
                oscillator.stop();
            }, 300);
        });
    });
}

// Meowify Tweet Generator
function initMeowifyTweet() {
    const tweetInput = document.getElementById('tweet-input');
    const meowifyBtn = document.getElementById('meowify-btn');
    const meowifiedOutput = document.getElementById('meowified-output');
    
    meowifyBtn.addEventListener('click', function() {
        const originalText = tweetInput.value;
        if (originalText.trim() === '') {
            meowifiedOutput.textContent = 'Purrlease enter some text first!';
            return;
        }
        
        // Meowify the text with cat puns
        const meowifiedText = meowifyText(originalText);
        meowifiedOutput.textContent = meowifiedText;
        
        // Add animation
        meowifiedOutput.style.animation = 'pulse 1s';
        setTimeout(() => {
            meowifiedOutput.style.animation = '';
        }, 1000);
    });
}

function meowifyText(text) {
    // Cat pun replacements
    const replacements = [
        { original: /\bhi\b/gi, replacement: 'meow' },
        { original: /\bhello\b/gi, replacement: 'hellmeow' },
        { original: /\bgood\b/gi, replacement: 'purrfect' },
        { original: /\byes\b/gi, replacement: 'meow' },
        { original: /\bno\b/gi, replacement: 'hiss' },
        { original: /\bamazing\b/gi, replacement: 'a-meow-zing' },
        { original: /\bgreat\b/gi, replacement: 'great meow' },
        { original: /\bawesome\b/gi, replacement: 'paw-some' },
        { original: /\blove\b/gi, replacement: 'purr for' },
        { original: /\blike\b/gi, replacement: 'purr at' },
        { original: /\bhate\b/gi, replacement: 'hiss at' },
        { original: /\bfriend\b/gi, replacement: 'furriend' },
        { original: /\bnow\b/gi, replacement: 'meow' },
        { original: /\bperfect\b/gi, replacement: 'purr-fect' },
        { original: /\bhappy\b/gi, replacement: 'happy-paws' },
        { original: /\bexcited\b/gi, replacement: 'purr-cited' }
    ];
    
    // Apply replacements
    let meowified = text;
    replacements.forEach(({ original, replacement }) => {
        meowified = meowified.replace(original, replacement);
    });
    
    // Add random cat emojis
    const catEmojis = ['😺', '😸', '😻', '😽', '🐱'];
    const randomEmoji = catEmojis[Math.floor(Math.random() * catEmojis.length)];
    
    // Add meow ending
    if (!meowified.endsWith('!') && !meowified.endsWith('.') && !meowified.endsWith('?')) {
        meowified += '!';
    }
    
    return `${meowified} ${randomEmoji}`;
}

// Gallery Carousel
function initCarousel() {
    const carousel = document.querySelector('.cosmic-carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentIndex = 0;
    const itemWidth = 270; // item width + gap
    
    function updateCarousel() {
        carousel.style.transition = 'transform 0.5s ease';
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    // Auto scroll carousel
    let autoScroll = setInterval(() => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000);
    
    // Manual controls
    nextBtn.addEventListener('click', function() {
        clearInterval(autoScroll);
        if (currentIndex < items.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
            carousel.style.transition = 'none';
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 50);
        }
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', function() {
        clearInterval(autoScroll);
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - 1;
            carousel.style.transition = 'none';
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 50);
        }
        updateCarousel();
    });
    
    // Reset auto scroll when manually controlling
    carousel.addEventListener('mouseleave', function() {
        clearInterval(autoScroll);
        autoScroll = setInterval(() => {
            if (currentIndex < items.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
    });
}

// Meow Scanner (Token Checker Parody)
function initMeowScanner() {
    const tokenInput = document.getElementById('token-address');
    const scanBtn = document.getElementById('scan-btn');
    const scannerResult = document.getElementById('scanner-result');
    
    scanBtn.addEventListener('click', function() {
        const tokenAddress = tokenInput.value.trim();
        if (tokenAddress === '') {
            scannerResult.innerHTML = '<p style="color: orange">Please enter a token address!</p>';
            return;
        }
        
        // Show loading animation
        scannerResult.innerHTML = '<p>Scanning meow network... <span class="scanning">🔍</span></p>';
        scannerResult.querySelector('.scanning').style.animation = 'pulse 1s infinite';
        
        // Simulate scanning delay
        setTimeout(() => {
            const result = generateScannerResult(tokenAddress);
            scannerResult.innerHTML = result;
        }, 1500);
    });
}

function generateScannerResult(address) {
    // Generate fun random result
    const results = [
        {
            positive: true,
            message: 'Token has passed the Meow Audit with flying cat colors! Purrfectly safe!',
            emoji: '😻'
        },
        {
            positive: true,
            message: 'This token is certified Catnip Quality! Approved by Meowster Cat.',
            emoji: '🐱👍'
        },
        {
            positive: false,
            message: 'HISSS! Scam detected! This token will steal your yarn and catnip!',
            emoji: '🙀'
        },
        {
            positive: Math.random() > 0.5,
            message: 'Token liquidity is a bit fishy... but cats like fish, so maybe it\'s okay?',
            emoji: '🐟'
        },
        {
            positive: Math.random() > 0.5,
            message: 'Contract has 9 lives! Low risk, high reward potential.',
            emoji: '🐱✨'
        }
    ];
    
    // Choose random result
    const result = results[Math.floor(Math.random() * results.length)];
    
    // Build HTML response with fun styling
    return `
        <div class="${result.positive ? 'positive-result' : 'negative-result'}" style="padding: 10px; border-radius: 10px; background: ${result.positive ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'};">
            <p style="margin: 0; font-size: 20px;">${result.emoji}</p>
            <p style="margin: 5px 0;">${result.message}</p>
            <p style="margin: 0; font-size: 12px; opacity: 0.7;">Address: ${address.substring(0, 6)}...${address.substring(address.length - 4)}</p>
            <p style="margin: 5px 0; font-size: 14px;">${result.positive ? 'Meow-meter: Purrrfect!' : 'Meow-meter: Catastrophe!'}</p>
        </div>
    `;
}

// Easter Egg - Type "gg" for dancing cat
function initEasterEgg() {
    let eggBuffer = '';
    let dancingCat = null;
    
    document.addEventListener('keydown', function(event) {
        // Add key to buffer
        eggBuffer += event.key.toLowerCase();
        
        // Keep buffer at max 2 chars
        if (eggBuffer.length > 2) {
            eggBuffer = eggBuffer.substring(eggBuffer.length - 2);
        }
        
        // Check for "gg" combo
        if (eggBuffer === 'gg') {
            // Reset buffer
            eggBuffer = '';
            
            // Show dancing cat
            if (!dancingCat) {
                createDancingCat();
            } else {
                // If already exists, move it to a new location
                dancingCat.style.left = `${Math.random() * 80 + 10}%`;
                dancingCat.style.top = `${Math.random() * 80 + 10}%`;
            }
            
            // Play sound
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = context.createOscillator();
            oscillator.type = "square";
            oscillator.frequency.value = 800;
            oscillator.connect(context.destination);
            oscillator.start();
            setTimeout(function() {
                oscillator.stop();
            }, 200);
        }
    });
}

function createDancingCat() {
    // Create element
    dancingCat = document.createElement('div');
    dancingCat.style.position = 'fixed';
    dancingCat.style.left = `${Math.random() * 80 + 10}%`;
    dancingCat.style.top = `${Math.random() * 80 + 10}%`;
    dancingCat.style.fontSize = '50px';
    dancingCat.style.zIndex = '9999';
    dancingCat.textContent = '🐱';
    
    // Add dancing animation
    dancingCat.style.animation = 'dance 0.5s infinite alternate';
    
    // Add style for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dance {
            0% { transform: rotate(-20deg) scale(1); }
            100% { transform: rotate(20deg) scale(1.2); }
        }
    `;
    
    // Add to body
    document.head.appendChild(style);
    document.body.appendChild(dancingCat);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (dancingCat) {
            document.body.removeChild(dancingCat);
            dancingCat = null;
        }
    }, 5000);
}

// GSAP Animations
function initAnimations() {
    // If GSAP library is available, use it for animations
    if (typeof gsap !== 'undefined') {
        // Banner parallax effect
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
            
            gsap.to('.banner', {
                x: moveX,
                y: moveY,
                duration: 1
            });
        });
        
        // Scroll animations
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            gsap.fromTo(section, 
                { y: 50, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
        
        // Title animation
        gsap.to('.title', {
            textShadow: '0 0 20px rgba(255, 0, 255, 0.8)',
            repeat: -1,
            yoyo: true,
            duration: 2
        });
    }
} 