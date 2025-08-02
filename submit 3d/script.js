
        // Animation d'entrée
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.form-section').forEach(section => {
            observer.observe(section);
        });

        // Validation et soumission du formulaire
        document.getElementById('devisForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Vérification des champs requis
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e53e3e';
                    field.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
                } else {
                    field.style.borderColor = '#e2e8f0';
                    field.style.boxShadow = 'none';
                }
            });

            // Vérification des services sélectionnés
            const services = this.querySelectorAll('input[name="services[]"]:checked');
            if (services.length === 0) {
                isValid = false;
                alert('Veuillez sélectionner au moins un service.');
                document.querySelector('input[name="services[]"]').closest('.form-group').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                return;
            }

            if (isValid) {
                // Animation de soumission
                const submitBtn = this.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = '⏳ Envoi en cours...';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                
                // Simulation d'envoi (remplacez par votre logique d'envoi)
                setTimeout(() => {
                    // Affichage du message de succès
                    showSuccessMessage();
                    
                    // Reset du formulaire
                    this.reset();
                    
                    // Restauration du bouton
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 2000);
            } else {
                // Scroll vers le premier champ invalide
                const firstInvalid = this.querySelector('input[style*="border-color: rgb(229, 62, 62)"]');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
// Message de succès
        function showSuccessMessage() {
            const successMessage = document.createElement('div');
            successMessage.innerHTML = `
                 
            `;
            document.body.appendChild(successMessage);
        }

        // Animation des éléments au focus
        document.querySelectorAll('input, select, textarea').forEach(element => {
            element.addEventListener('focus', function() {
                this.closest('.form-group').style.transform = 'translateY(-2px)';
                this.closest('.form-section').style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
            });
            
            element.addEventListener('blur', function() {
                this.closest('.form-group').style.transform = 'translateY(0)';
                this.closest('.form-section').style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
            });
        });

        // Animation des checkbox et radio
        document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
            input.addEventListener('change', function() {
                if (this.checked) {
                    this.closest('.checkbox-item, .budget-option, .timeline-option').style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        this.closest('.checkbox-item, .budget-option, .timeline-option').style.transform = 'scale(1)';
                    }, 200);
                }
            });
        });

// Effet de parallaxe subtil
        let ticking = false;
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.header');
            const formContainer = document.querySelector('.form-container');
            
            header.style.transform = `translateY(${scrolled * 0.2}px)`;
            formContainer.style.transform = `translateY(${scrolled * 0.05}px)`;
            
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);

        // Indicateur de progression du formulaire
        function updateProgress() {
            const requiredFields = document.querySelectorAll('[required]');
            const filledFields = Array.from(requiredFields).filter(field => {
                if (field.type === 'checkbox' || field.type === 'radio') {
                    return document.querySelector(`input[name="${field.name}"]:checked`);
                }
                return field.value.trim() !== '';
            });
        
        }

        // Écoute des changements pour la progression
        document.querySelectorAll('input, select, textarea').forEach(element => {
            element.addEventListener('input', updateProgress);
            element.addEventListener('change', updateProgress);
        });

        // Animation de typing pour le placeholder
        const textarea = document.getElementById('description');
        const placeholders = [
            "Décrivez votre vision du projet...",
            "Quels sont vos objectifs ?",
            "Qui est votre public cible ?",
            "Avez-vous des références visuelles ?"
        ];
        
        let placeholderIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typePlaceholder() {
            const currentPlaceholder = placeholders[placeholderIndex];
            
            if (isDeleting) {
                textarea.placeholder = currentPlaceholder.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textarea.placeholder = currentPlaceholder.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentPlaceholder.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                placeholderIndex = (placeholderIndex + 1) % placeholders.length;
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typePlaceholder, speed);
        }
        
        // Démarrer l'animation seulement si le textarea n'est pas focus
        textarea.addEventListener('focus', () => {
            textarea.placeholder = "Parlez-nous de votre vision, vos objectifs, votre public cible, vos inspirations...";
        });
        
        textarea.addEventListener('blur', () => {
            if (!textarea.value) {
                setTimeout(typePlaceholder, 1000);
            }
        });
        
        // Démarrer l'animation
        if (!textarea.value) {
            setTimeout(typePlaceholder, 2000);
        }

// Effet de survol pour les cartes
        document.querySelectorAll('.form-section').forEach(section => {
            section.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
            });
            
            section.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
            });
        });

        // Initialisation
        updateProgress();
   