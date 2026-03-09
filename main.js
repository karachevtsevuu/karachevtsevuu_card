// main.js

// Расчёт стажа (с 2006 года)
function calculateExperience() {
    const startYear = 2006;
    const currentYear = new Date().getFullYear();
    const experience = currentYear - startYear;
    document.getElementById('experience-year').textContent = experience;
}

// Копирование email
function setupCopyButton() {
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = 'karachevtsevuu@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                alert('Email скопирован!');
            }).catch(() => {
                // fallback
                const textarea = document.createElement('textarea');
                textarea.value = email;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                alert('Email скопирован!');
            });
        });
    }
}

// Навигация (подсветка активного пункта)
function setupNavHighlight() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Плавный скролл при клике на навигацию
function setupSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Закрыть мобильное меню
                document.getElementById('navMenu').classList.remove('active');
            }
        });
    });
}

// Кнопка "Наверх"
function setupScrollTop() {
    const scrollBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Анимация появления при скролле (Intersection Observer)
function setupFadeInOnScroll() {
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    faders.forEach(fader => observer.observe(fader));
}

// Мобильное меню (бургер)
function setupMobileMenu() {
    const toggler = document.getElementById('navToggler');
    const menu = document.getElementById('navMenu');
    if (toggler && menu) {
        toggler.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
}

// Инициализация всего при загрузке
document.addEventListener('DOMContentLoaded', () => {
    calculateExperience();
    setupCopyButton();
    // setupReadMore(); // удалено, так как кнопка больше не нужна
    setupNavHighlight();
    setupSmoothScroll();
    setupScrollTop();
    setupFadeInOnScroll();
    setupMobileMenu();
});