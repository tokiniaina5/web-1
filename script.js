
        // Menu mobile toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Three.js Scene
        let scene, camera, renderer, particles;

        function initThree() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('three-canvas'),
                alpha: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);

            // Create particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 1000;
            const posArray = new Float32Array(particlesCount * 3);

            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 10;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.005,
                color: 0x40E0D0,
                transparent: true,
                opacity: 0.8
            });

            particles = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particles);

            // Add floating geometric shapes
            const shapes = [];
            for (let i = 0; i < 20; i++) {
                const geometry = Math.random() > 0.5 
                    ? new THREE.BoxGeometry(0.1, 0.1, 0.1)
                    : new THREE.SphereGeometry(0.05, 8, 8);
                
                const material = new THREE.MeshBasicMaterial({
                    color: Math.random() > 0.5 ? 0x40E0D0 : 0x4a2c7a,
                    transparent: true,
                    opacity: 0.6
                });
                
                const shape = new THREE.Mesh(geometry, material);
                shape.position.set(
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                );
                
                shapes.push(shape);
                scene.add(shape);
            }

            camera.position.z = 5;

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);

                // Rotate particles
                particles.rotation.x += 0.0005;
                particles.rotation.y += 0.0005;

                // Animate shapes
                shapes.forEach((shape, index) => {
                    shape.rotation.x += 0.01;
                    shape.rotation.y += 0.01;
                    shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.0005;
                });

                renderer.render(scene, camera);
            }

            animate();
        }

        // Initialize Three.js when page loads
        window.addEventListener('load', initThree);

        // Handle window resize
        window.addEventListener('resize', () => {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                // Close mobile menu after click
                navLinks.classList.remove('active');
            });
        });

        // Portfolio cards hover effect
        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) rotateX(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0deg)';
            });
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });

        //image fond

         class NatureSlideshow {
            constructor() {
                this.currentSlide = 0;
                this.slides = document.querySelectorAll('.slide');
                this.thumbnails = document.querySelectorAll('.thumbnail');
                this.totalSlides = this.slides.length;
                this.isPlaying = true;
                this.slideInterval = null;
                this.slideDuration = 5000; // 5 seconds per slide
                this.startTime = Date.now();
                this.totalDuration = 15 * 60 + 17; // 15:17 in seconds
                
                this.init();
            }

            init() {
                this.setupEventListeners();
                this.startSlideshow();
                this.updateTimer();
                this.updateProgressBar();
            }

            setupEventListeners() {
                // Navigation controls
                document.getElementById('prevBtn').addEventListener('click', () => this.previousSlide());
                document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());
                
                // Play/Pause control
                document.getElementById('playBtn').addEventListener('click', () => this.togglePlayPause());
                
                // Thumbnail clicks
                this.thumbnails.forEach((thumb, index) => {
                    thumb.addEventListener('click', () => this.goToSlide(index));
                });

                // Media controls (decorative)
                document.getElementById('muteBtn').addEventListener('click', (e) => {
                    const btn = e.target;
                    btn.textContent = btn.textContent === '🔇' ? '🔊' : '🔇';
                });

                document.getElementById('ccBtn').addEventListener('click', (e) => {
                    e.target.style.opacity = e.target.style.opacity === '0.5' ? '1' : '0.5';
                });
            }

            showSlide(index) {
                // Hide all slides
                this.slides.forEach(slide => slide.classList.remove('active'));
                this.thumbnails.forEach(thumb => thumb.classList.remove('active'));
                
                // Show current slide
                this.slides[index].classList.add('active');
                this.thumbnails[index].classList.add('active');
                
                this.currentSlide = index;
            }

            nextSlide() {
                const next = (this.currentSlide + 1) % this.totalSlides;
                this.showSlide(next);
            }

            previousSlide() {
                const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.showSlide(prev);
            }

            goToSlide(index) {
                this.showSlide(index);
            }

            startSlideshow() {
                if (this.slideInterval) {
                    clearInterval(this.slideInterval);
                }
                
                this.slideInterval = setInterval(() => {
                    if (this.isPlaying) {
                        this.nextSlide();
                    }
                }, this.slideDuration);
            }

            togglePlayPause() {
                const playBtn = document.getElementById('playBtn');
                
                if (this.isPlaying) {
                    this.isPlaying = false;
                    playBtn.textContent = '▶️';
                    clearInterval(this.slideInterval);
                } else {
                    this.isPlaying = true;
                    playBtn.textContent = '⏸️';
                    this.startSlideshow();
                }
            }

            updateTimer() {
                setInterval(() => {
                    const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
                    const remaining = Math.max(0, this.totalDuration - elapsed);
                    
                    const minutes = Math.floor(remaining / 60);
                    const seconds = remaining % 60;
                    
                    document.getElementById('timer').textContent = 
                        `${minutes}:${seconds.toString().padStart(2, '0')}`;
                }, 1000);
            }

            updateProgressBar() {
                setInterval(() => {
                    const elapsed = (Date.now() - this.startTime) / 1000;
                    const progress = Math.min(100, (elapsed / this.totalDuration) * 100);
                    
                    document.getElementById('progressBar').style.width = `${progress}%`;
                }, 100);
            }
        }

        // Initialize slideshow when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new NatureSlideshow();
        });

        // Add some interactive hover effects
        document.addEventListener('DOMContentLoaded', () => {
            const container = document.querySelector('.slideshow-container');
            
            container.addEventListener('mouseenter', () => {
                document.querySelectorAll('.control-btn, .media-btn').forEach(btn => {
                    btn.style.opacity = '1';
                });
            });
            
            container.addEventListener('mouseleave', () => {
                document.querySelectorAll('.control-btn, .media-btn').forEach(btn => {
                    btn.style.opacity = '0.7';
                });
            });
        });
   