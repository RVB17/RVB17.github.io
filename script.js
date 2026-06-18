// ===== Code Snippet Tab Switching =====
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching for code snippets
    document.querySelectorAll('.snippet-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;
            const card = tab.closest('.project-card');

            // Deactivate all tabs in this card
            card.querySelectorAll('.snippet-tab').forEach(t => t.classList.remove('active'));
            // Hide all snippet contents in this card
            card.querySelectorAll('.snippet-content').forEach(c => c.classList.add('hidden'));

            // Activate clicked tab and show target content
            tab.classList.add('active');
            document.getElementById(targetId).classList.remove('hidden');
        });
    });

    // ===== Scroll-triggered fade-in =====
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    // ===== Navbar background on scroll =====
    const nav = document.getElementById('main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            nav.style.boxShadow = '0 1px 12px rgba(15, 23, 42, 0.06)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ===== Smooth scroll for nav links =====
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
});
