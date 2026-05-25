document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Accessibility & Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        const toggleMenu = () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            if (window.innerWidth <= 768) {
                document.body.style.overflow = !isExpanded ? 'hidden' : '';
            }
        };

        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // Reveal Animation on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // Scroll Progress Bar
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = docHeight > 0 ? (scrollTop / docHeight) * 100 + '%' : '0%';
        };
        window.addEventListener('scroll', updateProgress);
    }

    // Active Nav Section
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    if (sections.length && navItems.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navItems.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
                    });
                }
            });
        }, { threshold: 0.3 });
        sections.forEach(section => sectionObserver.observe(section));
    }

    // Hero Parallax
    const heroTitle = document.querySelector('.hero-title');
    const watermark = document.querySelector('.watermark');
    const header = document.querySelector('.header');
    
    if (heroTitle && header) {
        header.addEventListener('mousemove', (e) => {
            const x = ((e.clientX / window.innerWidth) - 0.5) * 30;
            const y = ((e.clientY / window.innerHeight) - 0.5) * 15;
            heroTitle.style.translate = `${x}px ${y}px`;
            if (watermark) watermark.style.translate = `${-x * 0.5}px ${-y * 0.5}px`;
        });
        header.addEventListener('mouseleave', () => {
            heroTitle.style.translate = '0px 0px';
            if (watermark) watermark.style.translate = '0px 0px';
        });
    }

    // Back to Top
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > window.innerHeight);
        });
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Smooth scroll for nav links with focus management
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus({ preventScroll: true });
            }
        });
    });
});
