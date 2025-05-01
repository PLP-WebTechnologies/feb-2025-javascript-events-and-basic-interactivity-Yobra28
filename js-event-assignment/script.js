// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling Section ========== //
    
    // Button Click Event
    const clickButton = document.getElementById('clickButton');
    const clickCounter = document.getElementById('clickCounter');
    let clickCount = 0;
    
    clickButton.addEventListener('click', function() {
        clickCount++;
        clickCounter.textContent = `Clicked ${clickCount} times`;
        
        // Change button color randomly
        const randomColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
        clickButton.style.backgroundColor = randomColor;
    });
    
    // Hover Effect
    const hoverBox = document.getElementById('hoverBox');
    hoverBox.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });
    
    hoverBox.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    });
    
    // Keypress Detection
    const keypressDisplay = document.getElementById('keypressDisplay');
    document.addEventListener('keydown', function(event) {
        keypressDisplay.textContent = `You pressed: ${event.key} (Code: ${event.code})`;
        keypressDisplay.style.color = '#3498db';
        
        // Reset after 2 seconds
        setTimeout(() => {
            keypressDisplay.textContent = 'Press another key...';
            keypressDisplay.style.color = '';
        }, 2000);
    });
    
    // Secret Double Click
    const secretBox = document.getElementById('secretBox');
    secretBox.addEventListener('dblclick', function() {
        this.classList.add('revealed');
        this.innerHTML = '<p>🎉 Secret unlocked! You found the double-click action!</p>';
        
        // Add confetti effect (simple version)
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.borderRadius = '50%';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '0';
            confetti.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
            
            document.head.insertAdjacentHTML('beforeend', `
                <style>
                    @keyframes fall {
                        to {
                            transform: translateY(100px) rotate(${Math.random() * 360}deg);
                            opacity: 0;
                        }
                    }
                </style>
            `);
            
            this.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 1000);
        }
    });
    
    // ========== Interactive Elements Section ========== //
    
    // Color Changing Button
    const colorButton = document.getElementById('colorButton');
    colorButton.addEventListener('click', function() {
        const randomColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
        this.style.backgroundColor = randomColor;
        this.style.color = 'white';
        this.textContent = `Color: ${randomColor}`;
    });
    
    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 3000);
    
    // Accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            accordionItem.classList.toggle('active');
            
            // Close other accordion items
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // ========== Form Validation Section ========== //
    
    const form = document.getElementById('validationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const togglePasswordBtn = document.getElementById('togglePassword');
    
    // Real-time validation
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.textContent = '👁️ Hide Password';
        } else {
            passwordInput.type = 'password';
            this.textContent = '👁️ Show Password';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(event) {
        // Validate all fields
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
            event.preventDefault();
            
            // Add shake animation to invalid fields
            if (!isUsernameValid) usernameInput.classList.add('shake');
            if (!isEmailValid) emailInput.classList.add('shake');
            if (!isPasswordValid) passwordInput.classList.add('shake');
            
            // Remove shake class after animation
            setTimeout(() => {
                usernameInput.classList.remove('shake');
                emailInput.classList.remove('shake');
                passwordInput.classList.remove('shake');
            }, 500);
        }
    });
    
    // Validation functions
    function validateUsername() {
        const value = usernameInput.value.trim();
        if (value === '') {
            usernameError.textContent = 'Username is required';
            usernameInput.classList.add('error');
            usernameInput.classList.remove('valid');
            return false;
        } else if (value.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            usernameInput.classList.add('error');
            usernameInput.classList.remove('valid');
            return false;
        } else {
            usernameError.textContent = '';
            usernameInput.classList.remove('error');
            usernameInput.classList.add('valid');
            return true;
        }
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            emailInput.classList.remove('valid');
            return true; // Email is optional in this example
        } else if (!emailRegex.test(value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('error');
            emailInput.classList.remove('valid');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            emailInput.classList.add('valid');
            return true;
        }
    }
    
    function validatePassword() {
        const value = passwordInput.value;
        if (value === '') {
            passwordError.textContent = 'Password is required';
            passwordInput.classList.add('error');
            passwordInput.classList.remove('valid');
            return false;
        } else if (value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.classList.add('error');
            passwordInput.classList.remove('valid');
            return false;
        } else {
            passwordError.textContent = '';
            passwordInput.classList.remove('error');
            passwordInput.classList.add('valid');
            return true;
        }
    }
});