
        
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
  
