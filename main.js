/* Main Application Logic */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initCountdown();
    initNavbarScroll();
    initActiveNav();
    initPricingToggle();
    initFAQ();
});

// Theme Management (Dark/Light Mode)
// Theme Management (Dark/Light Mode)
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');

    // Check for saved theme preference or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    const toggle = (e) => {
        e.preventDefault(); // Prevent any default behavior
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', toggle);
    }

    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggle);
    }
}

// Mobile Menu Toggle Logic
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('visible');
    };

    mobileMenuToggle?.addEventListener('click', toggleMenu);
    closeMobileMenu?.addEventListener('click', toggleMenu);
    mobileMenuOverlay?.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('visible');
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-xl', 'bg-white/95', 'dark:bg-slate-950/95');
            navbar.classList.remove('bg-white/80', 'dark:bg-slate-950/80');
        } else {
            navbar.classList.remove('shadow-xl', 'bg-white/95', 'dark:bg-slate-950/95');
            navbar.classList.add('bg-white/80', 'dark:bg-slate-950/80');
        }
    });
}

// Active Navigation Highlight
// Active Navigation Highlight
function initActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    const updateActiveNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    // Call once on load to set initial state
    updateActiveNav();
}

// Launch Countdown Timer
function initCountdown() {
    const daysEl = document.getElementById('days');
    if (!daysEl) return;

    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = launchDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const hoursEl = document.getElementById('hours');
        const minsEl = document.getElementById('minutes');
        const secsEl = document.getElementById('seconds');

        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minsEl) minsEl.innerText = minutes.toString().padStart(2, '0');
        if (secsEl) secsEl.innerText = seconds.toString().padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
}

// Pricing Toggle
function initPricingToggle() {
    const toggleBtn = document.getElementById('pricingToggle');
    const dot = document.getElementById('pricingDot');
    const priceValues = document.querySelectorAll('.price-value');
    if (!toggleBtn) return;

    let isYearly = false;

    toggleBtn.addEventListener('click', () => {
        isYearly = !isYearly;
        if (isYearly) {
            dot.classList.add('translate-x-7');
            priceValues.forEach(el => {
                el.innerText = '$' + el.getAttribute('data-yearly');
            });
        } else {
            dot.classList.remove('translate-x-7');
            priceValues.forEach(el => {
                el.innerText = '$' + el.getAttribute('data-monthly');
            });
        }
    });
}

// FAQ Accordion
function initFAQ() {
    const toggles = document.querySelectorAll('.faq-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');

            // Close others
            document.querySelectorAll('.faq-content').forEach(el => {
                if (el !== content) el.classList.add('hidden');
            });
            document.querySelectorAll('.faq-toggle i').forEach(el => {
                if (el !== icon) el.classList.remove('rotate-180');
            });

            content.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });
}
