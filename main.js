// main.js

// Расчёт стажа (с 2006 года)
function calculateExperience() {
    const startYear = 2006;
    const currentYear = new Date().getFullYear();
    const experience = currentYear - startYear;
    document.getElementById('experience-year').textContent = String(experience);
}

// Универсальная функция копирования с визуальным откликом
function setupCopyButton(buttonId, textToCopy) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');

        // Основная функция копирования с проверкой API
        const copy = () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                // Пробуем современный API
                navigator.clipboard.writeText(textToCopy).catch(fallbackCopy);
            } else {
                // Если API нет, сразу fallback
                fallbackCopy();
            }
        };

        // Запасной метод через textarea
        const fallbackCopy = () => {
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed'; // чтобы не прокручивать страницу
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Не удалось скопировать:', err);
            }
            document.body.removeChild(textarea);
        };

        copy();

        // Визуальный отклик (смена иконки)
        if (icon) {
            icon.classList.remove('fa-copy');
            icon.classList.add('fa-check');
        }

        setTimeout(() => {
            if (icon) {
                icon.classList.remove('fa-check');
                icon.classList.add('fa-copy');
            }
        }, 2000);
    });
}
// Обработчик клика на логотип (nav-brand) — скролл наверх
function setupBrandScroll() {
    const brand = document.querySelector('.nav-brand');
    if (brand) {
        brand.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Закрыть мобильное меню, если открыто
            document.getElementById('navMenu')?.classList.remove('active');
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

// Плавный скролл при клике на пункты навигации
function setupSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Закрыть мобильное меню
                document.getElementById('navMenu')?.classList.remove('active');
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

// Анимация появления при скролле
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

// Мобильное меню
function setupMobileMenu() {
    const toggler = document.getElementById('navToggler');
    const menu = document.getElementById('navMenu');
    if (toggler && menu) {
        toggler.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    calculateExperience();
    setupCopyButton('copyEmailBtn', 'karachevtsevuu@gmail.com');
    setupCopyButton('copyTelegramBtn', '@grammidin');
    setupBrandScroll();
    setupNavHighlight();
    setupSmoothScroll();
    setupScrollTop();
    setupFadeInOnScroll();
    setupMobileMenu();
});