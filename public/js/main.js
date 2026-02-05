document.addEventListener('DOMContentLoaded', () => {
     initTheme();
     initNavigation();
     initScrollEffects();
     initAnimations();
});

function initTheme() {
     const themeToggle = document.getElementById('theme-toggle');
     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

     const savedTheme = localStorage.getItem('theme');
     if (savedTheme) {
          document.documentElement.setAttribute('data-theme', savedTheme);
          updateThemeIcon(savedTheme === 'dark');
     } else if (prefersDark.matches) {
          document.documentElement.setAttribute('data-theme', 'dark');
          updateThemeIcon(true);
     }

     if (themeToggle) {
          themeToggle.addEventListener('click', () => {
               const currentTheme = document.documentElement.getAttribute('data-theme');
               const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

               document.documentElement.setAttribute('data-theme', newTheme);
               localStorage.setItem('theme', newTheme);
               updateThemeIcon(newTheme === 'dark');
          });
     }

     prefersDark.addEventListener('change', (e) => {
          if (!localStorage.getItem('theme')) {
               const newTheme = e.matches ? 'dark' : 'light';
               document.documentElement.setAttribute('data-theme', newTheme);
               updateThemeIcon(e.matches);
          }
     });
}

function updateThemeIcon(isDark) {
     const themeToggle = document.getElementById('theme-toggle');
     if (themeToggle) {
          const icon = themeToggle.querySelector('i');
          if (icon) {
               icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
          }
     }
}

function initNavigation() {
     const mobileMenuBtn = document.getElementById('mobile-menu-btn');
     const navLinks = document.querySelector('.nav-links');

     if (mobileMenuBtn && navLinks) {
          mobileMenuBtn.addEventListener('click', () => {
               navLinks.classList.toggle('active');
               mobileMenuBtn.classList.toggle('active');
          });

          navLinks.querySelectorAll('a').forEach(link => {
               link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
               });
          });
     }

     const currentPath = window.location.pathname;
     document.querySelectorAll('.nav-links a').forEach(link => {
          const linkPath = link.getAttribute('href');
          if (linkPath === currentPath ||
               (currentPath === '/' && linkPath === '/home') ||
               (currentPath.startsWith('/projects') && linkPath === '/projects' && !link.classList.contains('child-link'))) {
               link.classList.add('active');
          }
     });
}

function initScrollEffects() {
     const navbar = document.querySelector('.navbar');

     if (navbar) {
          window.addEventListener('scroll', () => {
               if (window.scrollY > 10) {
                    navbar.classList.add('scrolled');
               } else {
                    navbar.classList.remove('scrolled');
               }
          });
     }
}

function initAnimations() {
     const animatedElements = document.querySelectorAll('.animate-on-scroll');

     if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
               entries.forEach(entry => {
                    if (entry.isIntersecting) {
                         entry.target.classList.add('animate-in');
                         observer.unobserve(entry.target);
                    }
               });
          }, {
               threshold: 0.1,
               rootMargin: '0px 0px -50px 0px'
          });

          animatedElements.forEach(el => observer.observe(el));
     } else {
          animatedElements.forEach(el => el.classList.add('animate-in'));
     }
}

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
     });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
     contactForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const formData = new FormData(contactForm);
          const data = Object.fromEntries(formData.entries());

          console.log('Form submitted:', data);

          const submitBtn = contactForm.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Message Sent!';
          submitBtn.disabled = true;

          setTimeout(() => {
               submitBtn.textContent = originalText;
               submitBtn.disabled = false;
               contactForm.reset();
          }, 3000);
     });
}
