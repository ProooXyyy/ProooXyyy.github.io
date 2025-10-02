// =====================================================
// PORTFOLIO INTERACTIVE JAVASCRIPT
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // =====================================================
    // CURSOR ANIMATION
    // =====================================================
    
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.borderColor = '#ec4899';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = '#6366f1';
        });
    });
    
    // =====================================================
    // NAVBAR SCROLL EFFECT
    // =====================================================
    
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // =====================================================
    // THEME SWITCHER
    // =====================================================
    
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // =====================================================
    // TYPING ANIMATION
    // =====================================================
    
// =====================================================
// TYPING ANIMATION
// =====================================================

    const roles = ['Data Analyst', 'Full Stack Developer', 'ML Enthusiast', 'Problem Solver', 'Tech Innovator'];
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    /**
     * Creates a typing animation for a given element.
     * @param {string} elementId The ID of the element to animate.
     */
    function createTypingAnimation(elementId) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typedTextElement = document.getElementById(elementId);

        // Failsafe if the element doesn't exist
        if (!typedTextElement) {
            console.error(`Typing animation target with id "${elementId}" not found.`);
            return;
        }

        function type() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at the end of the word
                isDeleting = true;
                setTimeout(type, pauseTime);
            } else if (isDeleting && charIndex === 0) {
                // Move to the next word
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500);
            } else {
                // Continue typing or deleting
                setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
            }
        }

        // Start the animation
        type();
    }

    // Initialize both typing animations
    createTypingAnimation('typed-text'); // For the main hero section title
    createTypingAnimation('profile-typed-text'); // For the title under your profile photo
    // =====================================================
    // COUNTER ANIMATION
    // =====================================================
    
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const countUp = (counter) => {
        const target = +counter.getAttribute('data-count');
        const increment = target / speed;
        let count = 0;
        
        const updateCount = () => {
            count += increment;
            
            if (count < target) {
                counter.innerText = Math.ceil(count) + '+';
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target + '+';
            }
        };
        
        updateCount();
    };
    
    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                countUp(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // =====================================================
    // SKILL BARS ANIMATION
    // =====================================================
    
    const skillBars = document.querySelectorAll('.level-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = level + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // =====================================================
    // PROJECT FILTER
    // =====================================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // =====================================================
    // PARTICLES.JS CONFIGURATION
    // =====================================================
    
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#6366f1'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // =====================================================
    // BACK TO TOP BUTTON
    // =====================================================
    
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // =====================================================
    // AOS INITIALIZATION
    // =====================================================
    
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out'
        });
    }
    
    // =====================================================
    // FORM SUBMISSION
    // =====================================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the form data to a server
            // For now, we'll just show an alert
            alert(`Thank you for your message, ${name}! I'll get back to you soon at ${email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // =====================================================
    // PARALLAX EFFECTS
    // =====================================================
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // =====================================================
    // LOADING ANIMATION
    // =====================================================
    
    window.addEventListener('load', () => {
        // Add a small delay to show loading animation
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 500);
    });
    
    // =====================================================
    // MAGNETIC BUTTONS
    // =====================================================
    
    const magneticButtons = document.querySelectorAll('.btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
    
    // =====================================================
    // SMOOTH REVEAL ANIMATIONS
    // =====================================================
    
    const revealElements = document.querySelectorAll('.section-title, .project-card, .timeline-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // =====================================================
    // 3D TILT EFFECT FOR CARDS
    // =====================================================
    
    const tiltCards = document.querySelectorAll('.project-card, .skill-category');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // =====================================================
    // GLITCH EFFECT ON HOVER
    // =====================================================
    
    const glitchElements = document.querySelectorAll('.hero-title');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('glitch');
            setTimeout(() => {
                element.classList.remove('glitch');
            }, 1000);
        });
    });
    
    // =====================================================
    // DYNAMIC BACKGROUND GRADIENT
    // =====================================================
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        const gradient = `radial-gradient(600px at ${mouseX * 100}% ${mouseY * 100}%, rgba(99, 102, 241, 0.15), transparent 80%)`;
        document.querySelector('.hero-section').style.background = gradient;
    });
    
    // =====================================================
    // KEYBOARD SHORTCUTS
    // =====================================================
    
    document.addEventListener('keydown', (e) => {
        // Press 'T' to toggle theme
        if (e.key === 't' || e.key === 'T') {
            themeToggle.click();
        }
        
        // Press 'ESC' to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
});


// Console Easter Egg
console.log('%c🎨 Welcome to My Portfolio!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%c👋 Looking for something? Feel free to reach out!', 'font-size: 16px; color: #8b5cf6;');
console.log('%c📧 Email: hello@portfolio.com', 'font-size: 14px; color: #ec4899;');
console.log('%c🚀 Let\'s build something amazing together!', 'font-size: 14px; color: #10b981;');