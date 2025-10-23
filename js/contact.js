// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validate form
        const validationError = validateForm(formData);
        if (validationError) {
            showMessage(validationError, 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';

        try {
            // Option 1: Using FormSubmit.co (free email service)
            // Replace 'YOUR_EMAIL' with your actual email
            const response = await fetch('https://formsubmit.co/ajax/gaby.kappai@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showMessage('Message envoyé avec succès ! Je vous répondrai bientôt.', 'success');
                form.reset();
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            // If fetch fails, try mailto fallback
            console.log('Envoi par email client...');
            const mailtoLink = `mailto:contact@gabrielcappai.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
            window.location.href = mailtoLink;
            showMessage('Ouverture de votre client email...', 'success');
            form.reset();
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    });

    function validateForm(data) {
        // Validate name (minimum 2 characters, only letters, spaces, hyphens)
        if (!data.name) {
            return 'Veuillez entrer votre nom.';
        }
        if (data.name.length < 2) {
            return 'Le nom doit contenir au moins 2 caractères.';
        }
        if (data.name.length > 50) {
            return 'Le nom ne peut pas dépasser 50 caractères.';
        }
        const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
        if (!nameRegex.test(data.name)) {
            return 'Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets.';
        }

        // Validate email
        if (!data.email) {
            return 'Veuillez entrer votre adresse email.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return 'Veuillez entrer une adresse email valide.';
        }
        if (data.email.length > 100) {
            return 'L\'adresse email ne peut pas dépasser 100 caractères.';
        }

        // Validate subject
        if (!data.subject) {
            return 'Veuillez entrer le sujet de votre message.';
        }
        if (data.subject.length < 3) {
            return 'Le sujet doit contenir au moins 3 caractères.';
        }
        if (data.subject.length > 100) {
            return 'Le sujet ne peut pas dépasser 100 caractères.';
        }

        // Validate message
        if (!data.message) {
            return 'Veuillez entrer votre message.';
        }
        if (data.message.length < 10) {
            return 'Le message doit contenir au moins 10 caractères.';
        }
        if (data.message.length > 2000) {
            return 'Le message ne peut pas dépasser 2000 caractères.';
        }

        // Check for potential spam patterns
        const spamKeywords = ['viagra', 'casino', 'lottery', 'prize', 'winner'];
        const messageContent = (data.subject + ' ' + data.message).toLowerCase();
        for (let keyword of spamKeywords) {
            if (messageContent.includes(keyword)) {
                return 'Votre message contient du contenu inapproprié.';
            }
        }

        // Check for excessive URLs (potential spam)
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const urls = messageContent.match(urlRegex);
        if (urls && urls.length > 3) {
            return 'Votre message contient trop de liens.';
        }

        return null; // No errors
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    // Add input animations and real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            // Remove error styling on focus
            this.style.borderColor = '';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            // Validate on blur
            validateFieldOnBlur(this);
        });

        // Clear error message when user starts typing
        input.addEventListener('input', function() {
            if (formMessage.style.display === 'block') {
                formMessage.style.display = 'none';
            }
            this.style.borderColor = '';
        });
    });

    function validateFieldOnBlur(field) {
        const value = field.value.trim();
        let isValid = true;

        switch(field.id) {
            case 'name':
                if (value && (value.length < 2 || value.length > 50)) {
                    isValid = false;
                }
                if (value && !/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
                    isValid = false;
                }
                break;
            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    isValid = false;
                }
                break;
            case 'subject':
                if (value && (value.length < 3 || value.length > 100)) {
                    isValid = false;
                }
                break;
            case 'message':
                if (value && (value.length < 10 || value.length > 2000)) {
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            field.style.borderColor = '#ff4444';
        }
    }

    // Prevent form submission with Enter key (except in textarea)
    form.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});
