        // Main JavaScript file for Labib Almubarok Personal Portfolio
        // Using Anime.js, GSAP, and TSParticles for animations

        class LabibPortfolio {
            constructor() {
                this.isLoaded = false;
                this.projects = [
                    {
                        title: "E-Learning Platform",
                        category: "Web Development",
                        description: "Platform pembelajaran online dengan fitur live class, kuis interaktif, dan sistem penilaian otomatis menggunakan Laravel dan Livewire untuk performa yang optimal.",
                        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                        technologies: ["Laravel", "Livewire", "MySQL"],
                        features: ["User Authentication", "Course Management", "Progress Tracking"],
                        demo: "#",
                        code: "#"
                    },
                    {
                        title: "Dashboard Analytics",
                        category: "Frontend Development",
                        description: "Dashboard manajemen data dengan visualisasi real-time, chart interaktif, dan UI yang user-friendly. Dibuat dengan React dan Tailwind CSS untuk tampilan yang modern.",
                        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                        technologies: ["React", "Tailwind", "Chart.js"],
                        features: ["Real-time Data", "Interactive Charts", "Export Report"],
                        demo: "#",
                        code: "#"
                    },
                    {
                        title: "Personal Portfolio",
                        category: "Frontend Development",
                        description: "Portofolio personal dengan animasi menarik, responsive design, dan optimasi SEO. Showcase dari kemampuan frontend development dengan vanilla JavaScript.",
                        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                        technologies: ["HTML5", "CSS3", "JavaScript"],
                        features: ["Animation", "Responsive", "SEO Ready"],
                        demo: "#",
                        code: "#"
                    },
                    {
                        title: "E-Commerce System",
                        category: "Full Stack Development",
                        description: "Sistem toko online lengkap dengan payment gateway, inventory management, dan admin dashboard. Mengintegrasikan Laravel backend dengan React frontend.",
                        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                        technologies: ["Laravel", "React", "Stripe"],
                        features: ["Payment Gateway", "Admin Panel", "Inventory"],
                        demo: "#",
                        code: "#"
                    }
                ];

                this.init();
            }

            init() {
                this.setupEventListeners();
                this.initParticles();
                this.initScrollAnimations();
                this.initNavigation();
                this.initCounters();
                this.initHeroAnimations();
                this.initSkillBars();
                
                // Remove loading class
                document.body.classList.remove('js-loading');
                
                // Start animations when DOM is loaded
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => this.startAnimations());
                } else {
                    this.startAnimations();
                }
            }

            setupEventListeners() {
                // Window events
                window.addEventListener('scroll', this.handleScroll.bind(this));
                window.addEventListener('resize', this.handleResize.bind(this));
                
                // Mobile navigation toggle
                const mobileToggle = document.querySelector('.mobile-nav-toggle');
                const navLinks = document.querySelector('.nav-links');
                
                if (mobileToggle && navLinks) {
                    mobileToggle.addEventListener('click', () => {
                        navLinks.classList.toggle('active');
                        mobileToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
                    });
                }
                
                // Portfolio item interactions
                document.querySelectorAll('.portfolio-item').forEach(item => {
                    item.addEventListener('mouseenter', () => this.animatePortfolioItem(item, true));
                    item.addEventListener('mouseleave', () => this.animatePortfolioItem(item, false));
                    
                    // Action buttons
                    const viewBtn = item.querySelector('.btn-secondary');
                    const demoBtn = item.querySelector('.btn-ghost');
                    
                    if (viewBtn) {
                        viewBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            const projectIndex = parseInt(item.dataset.project);
                            this.showProjectDetails(projectIndex);
                        });
                    }
                    
                    if (demoBtn) {
                        demoBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            const projectIndex = parseInt(item.dataset.project);
                            this.openProjectDemo(projectIndex);
                        });
                    }
                });

                // Form submission

                // Navigation CTA


                // Social links animation
                document.querySelectorAll('.social-link').forEach(link => {
                    link.addEventListener('mouseenter', () => {
                        anime({
                            targets: link,
                            scale: 1.05,
                            duration: 200,
                            easing: 'easeOutQuad'
                        });
                    });
                    
                    link.addEventListener('mouseleave', () => {
                        anime({
                            targets: link,
                            scale: 1,
                            duration: 200,
                            easing: 'easeOutQuad'
                        });
                    });
                });
            }

            initParticles() {
                if (typeof tsParticles !== 'undefined') {
                    tsParticles.load('tsparticles', {
                        particles: {
                            number: {
                                value: 80,
                                density: {
                                    enable: true,
                                    value_area: 800
                                }
                            },
                            color: {
                                value: ["#3B82F6", "#06B6D4", "#00FFFF"]
                            },
                            shape: {
                                type: "circle"
                            },
                            opacity: {
                                value: 0.5,
                                random: true
                            },
                            size: {
                                value: 3,
                                random: true
                            },
                            line_linked: {
                                enable: true,
                                distance: 150,
                                color: "#3B82F6",
                                opacity: 0.2,
                                width: 1
                            },
                            move: {
                                enable: true,
                                speed: 2,
                                direction: "none",
                                random: true,
                                straight: false,
                                out_mode: "out",
                                bounce: false
                            }
                        },
                        interactivity: {
                            detect_on: "canvas",
                            events: {
                                onhover: {
                                    enable: true,
                                    mode: "grab"
                                },
                                onclick: {
                                    enable: true,
                                    mode: "push"
                                },
                                resize: true
                            }
                        },
                        retina_detect: true
                    });
                }
            }

            initNavigation() {
                const navLinks = document.querySelectorAll('.nav-link');
                
                // Smooth scrolling for navigation links - FIXED VERSION
                navLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetId = link.getAttribute('href').substring(1);
                        this.scrollToSection(targetId);
                        
                        // Update active nav link
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                        
                        // Close mobile menu if open
                        const mobileNav = document.querySelector('.nav-links');
                        const mobileToggle = document.querySelector('.mobile-nav-toggle');
                        if (mobileNav && mobileNav.classList.contains('active')) {
                            mobileNav.classList.remove('active');
                            mobileToggle.textContent = '☰';
                        }
                    });
                });

                // Update navigation on scroll
                this.updateNavigationOnScroll();
            }

            updateNavigationOnScroll() {
                const sections = document.querySelectorAll('section[id]');
                const navLinks = document.querySelectorAll('.nav-link');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const id = entry.target.getAttribute('id');
                            navLinks.forEach(link => {
                                link.classList.remove('active');
                                if (link.getAttribute('href') === `#${id}`) {
                                    link.classList.add('active');
                                }
                            });
                        }
                    });
                }, {
                    threshold: 0.3
                });

                sections.forEach(section => observer.observe(section));
            }

            initHeroAnimations() {
                // Animate hero title
                const heroTitle = document.querySelector('.hero-title');
                const heroTagline = document.querySelector('.hero-tagline');
                const heroDescription = document.querySelector('.hero-description');
                const heroStats = document.querySelectorAll('.hero-stat');
                const heroCTA = document.querySelector('.hero-cta');

                // Set initial states
                anime.set(heroTitle, { opacity: 0, translateY: 50 });
                anime.set(heroTagline, { opacity: 0, translateY: 30 });
                anime.set(heroDescription, { opacity: 0, translateY: 30 });
                anime.set(heroStats, { opacity: 0, translateY: 20, scale: 0.8 });
                anime.set(heroCTA, { opacity: 0, scale: 0.8 });

                // Animate in sequence
                anime.timeline()
                    .add({
                        targets: heroTitle,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 1000,
                        easing: 'easeOutQuart'
                    })
                    .add({
                        targets: heroTagline,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutQuart'
                    })
                    .add({
                        targets: heroDescription,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        easing: 'easeOutQuart'
                    })
                    .add({
                        targets: heroStats,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        scale: [0.8, 1],
                        delay: anime.stagger(100),
                        duration: 500,
                        easing: 'easeOutQuart'
                    })
                    .add({
                        targets: heroCTA,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 500,
                        easing: 'easeOutQuart'
                    });
            }

            initScrollAnimations() {
                // Initialize GSAP ScrollTrigger
                if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                    gsap.registerPlugin(ScrollTrigger);
                    
                    // Animate sections on scroll
                    gsap.utils.toArray('section').forEach(section => {
                        gsap.fromTo(section, 
                            { 
                                opacity: 0, 
                                y: 50 
                            }, 
                            { 
                                opacity: 1, 
                                y: 0, 
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
                    
                    // Parallax effect for hero background
                    gsap.to('.hero-background', {
                        yPercent: 30,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".hero",
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    });
                    
                    // Animate skill bars on scroll
                    gsap.utils.toArray('.skill-bar').forEach(bar => {
                        const level = bar.dataset.level;
                        gsap.fromTo(bar, 
                            { width: 0 }, 
                            { 
                                width: `${level}%`, 
                                duration: 1.5, 
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: bar,
                                    start: 'top 80%',
                                    toggleActions: 'play none none reverse'
                                }
                            }
                        );
                    });
                }
            }

            initSkillBars() {
                const skillBars = document.querySelectorAll('.skill-bar');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const skillBar = entry.target;
                            const level = skillBar.dataset.level;
                            
                            anime({
                                targets: skillBar,
                                width: [0, `${level}%`],
                                duration: 2000,
                                easing: 'easeOutQuart',
                                delay: 500
                            });
                            
                            observer.unobserve(skillBar);
                        }
                    });
                }, {
                    threshold: 0.5
                });

                skillBars.forEach(bar => observer.observe(bar));
            }

            initCounters() {
                const heroStats = document.querySelectorAll('.hero-stat');
                
                heroStats.forEach(stat => {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const numberElement = entry.target.querySelector('.stat-number');
                                const number = numberElement.textContent;
                                
                                if (!isNaN(number)) {
                                    anime({
                                        targets: numberElement,
                                        innerHTML: [0, parseInt(number)],
                                        duration: 2000,
                                        easing: 'easeOutQuart',
                                        round: 1
                                    });
                                }
                                
                                observer.unobserve(entry.target);
                            }
                        });
                    }, {
                        threshold: 0.5
                    });
                    
                    observer.observe(stat);
                });
            }

            animatePortfolioItem(item, isHover) {
                const image = item.querySelector('.portfolio-image img');
                const title = item.querySelector('.portfolio-title');
                
                if (isHover) {
                    anime({
                        targets: item,
                        scale: 1.02,
                        duration: 300,
                        easing: 'easeOutQuart'
                    });
                    
                    anime({
                        targets: image,
                        scale: 1.05,
                        duration: 300,
                        easing: 'easeOutQuart'
                    });
                    
                    anime({
                        targets: title,
                        translateX: 5,
                        duration: 300,
                        easing: 'easeOutQuart'
                    });
                } else {
                    anime({
                        targets: item,
                        scale: 1,
                        duration: 300,
                        easing: 'easeOutQuart'
                    });
                    
                    anime({
                        targets: image,
                        scale: 1,
                        duration: 300,
                        easing: 'easeOutQuart'
                    });
                    
                    anime({
                        targets: title,
                        translateX: 0,
                        duration: 300,
                        easing: 'easeOutQuart'
                    });
                }
            }

            handleScroll() {
                const nav = document.querySelector('.nav');
                const scrollY = window.scrollY;
                
                // Update navigation background
                if (scrollY > 100) {
                    nav.style.background = 'rgba(15, 23, 42, 0.98)';
                    nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    nav.style.background = 'rgba(15, 23, 42, 0.95)';
                    nav.style.boxShadow = 'none';
                }
                
                this.updateNavigationOnScroll();
            }

            handleResize() {
                // Handle resize events if needed
            }

            showProjectDetails(index) {
                const project = this.projects[index];
                if (!project) return;

                // Create modal or navigate to project details
                const modal = this.createProjectModal(project);
                document.body.appendChild(modal);
                
                // Animate modal in
                anime({
                    targets: modal,
                    opacity: [0, 1],
                    duration: 300,
                    easing: 'easeOutQuart'
                });
                
                anime({
                    targets: modal.querySelector('.modal-content'),
                    scale: [0.8, 1],
                    duration: 400,
                    easing: 'easeOutQuart'
                });
            }

            createProjectModal(project) {
                const modal = document.createElement('div');
                modal.className = 'project-modal';
                
                modal.innerHTML = `
                    <div class="modal-content">
                        <button class="modal-close">&times;</button>
                        <img src="${project.image}" alt="${project.title}">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div>
                            <h4 style="color: var(--primary-300); margin-bottom: 0.5rem;">Technologies:</h4>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                ${project.technologies.map(tech => `
                                    <span class="tech-tag">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="color: var(--secondary-300); margin-bottom: 0.5rem;">Key Features:</h4>
                            <ul style="
                                color: var(--neutral-500);
                                padding-left: 1.5rem;
                                line-height: 1.6;
                            ">
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <a href="${project.demo}" target="_blank" class="btn-secondary">View Demo</a>
                            <a href="${project.code}" target="_blank" class="btn-ghost">View Code</a>
                        </div>
                    </div>
                `;
                
                // Close modal functionality
                modal.addEventListener('click', (e) => {
                    if (e.target === modal || e.target.classList.contains('modal-close')) {
                        anime({
                            targets: modal,
                            opacity: [1, 0],
                            duration: 300,
                            easing: 'easeOutQuart',
                            complete: () => modal.remove()
                        });
                    }
                });
                
                return modal;
            }

            openProjectDemo(index) {
                const project = this.projects[index];
                if (project && project.demo !== '#') {
                    window.open(project.demo, '_blank');
                }
            }

            handleFormSubmit(e) {
                e.preventDefault();
                const form = e.target;
                const formData = new FormData(form);
                
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Show success message
                    this.showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    form.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }

            showNotification(message, type = 'info') {
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.textContent = message;
                document.body.appendChild(notification);
                
                // Auto remove after 5 seconds
                setTimeout(() => {
                    anime({
                        targets: notification,
                        translateX: [0, 100],
                        opacity: [1, 0],
                        duration: 300,
                        easing: 'easeInQuart',
                        complete: () => notification.remove()
                    });
                }, 5000);
            }

            scrollToSection(sectionId) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = section.offsetTop - navHeight;
                    
                    // Use native smooth scroll behavior
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }

            startAnimations() {
                this.isLoaded = true;
                
                // Animate navigation
                const nav = document.querySelector('.nav');
                anime({
                    targets: nav,
                    translateY: [-100, 0],
                    duration: 800,
                    easing: 'easeOutQuart'
                });
                
                // Animate scroll indicator
                const scrollIndicator = document.querySelector('.scroll-indicator');
                if (scrollIndicator) {
                    anime({
                        targets: scrollIndicator,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 1000,
                        delay: 1500,
                        easing: 'easeOutQuart'
                    });
                }
            }
        }

        // Initialize portfolio when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            new LabibPortfolio();
        });
   