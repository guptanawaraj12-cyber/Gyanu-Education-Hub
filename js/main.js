/* ============================================
   GYANU NOTES - MAIN JAVASCRIPT
   Core functionality: Search, FAQ, Mobile Menu, Dark Mode, Counters
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSearchModal();
    initFAQAccordion();
    initDarkMode();
    initCounterAnimation();
    initScrollReveal();
    initNewsletterForm();
    initSubjectCards();
    initClassCards();
});

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// AI Search Modal
function initSearchModal() {
    const searchBtn = document.getElementById('aiSearchBtn');
    const searchModal = document.getElementById('searchModal');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    const searchSubmit = document.getElementById('searchSubmit');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchBtn || !searchModal) return;
    
    searchBtn.addEventListener('click', function() {
        searchModal.style.display = 'flex';
        searchModal.classList.add('show');
        setTimeout(() => {
            if (searchInput) searchInput.focus();
        }, 100);
    });
    
    function closeModal() {
        searchModal.style.display = 'none';
        searchModal.classList.remove('show');
        if (searchResults) searchResults.innerHTML = '';
        if (searchInput) searchInput.value = '';
    }
    
    if (closeSearch) closeSearch.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.style.display === 'flex') {
            closeModal();
        }
    });
    
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) closeModal();
    });
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query || !searchResults) return;
        
        const searchableContent = [
            { title: "Class 10 Science - Chemical Reactions", type: "note", url: "notes/class10/science/ch1.html", class: "10", subject: "science" },
            { title: "Class 10 Math - Real Numbers", type: "note", url: "notes/class10/math/ch1.html", class: "10", subject: "math" },
            { title: "Class 9 English - The Fun They Had", type: "note", url: "notes/class9/english/ch1.html", class: "9", subject: "english" },
            { title: "Class 11 Physics - Motion", type: "note", url: "notes/class11/physics/ch1.html", class: "11", subject: "physics" },
            { title: "Class 12 Chemistry - Organic", type: "note", url: "notes/class12/chemistry/ch1.html", class: "12", subject: "chemistry" },
            { title: "SEE Preparation Guide", type: "guide", url: "#", class: "10", subject: "exam" }
        ];
        
        const results = searchableContent.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.subject.toLowerCase().includes(query) ||
            item.class.includes(query)
        );
        
        if (results.length > 0) {
            searchResults.innerHTML = results.map(result => `
                <div class="search-result-item" onclick="window.location.href='${result.url}'">
                    <i class="fas ${result.type === 'note' ? 'fa-file-alt' : 'fa-graduation-cap'}"></i>
                    <div>
                        <h4>${result.title}</h4>
                        <p>Class ${result.class} • ${result.subject.charAt(0).toUpperCase() + result.subject.slice(1)}</p>
                    </div>
                </div>
            `).join('');
        } else {
            searchResults.innerHTML = '<p class="no-results">No results found. Try different keywords.</p>';
        }
    }
    
    if (searchSubmit) searchSubmit.addEventListener('click', performSearch);
    if (searchInput) searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
}

// Dark Mode
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('gyanu_theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('gyanu_theme', isDark ? 'dark' : 'light');
            updateDarkModeIcon(isDark);
            
            darkModeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                darkModeToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

function updateDarkModeIcon(isDark) {
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) {
        const icon = toggle.querySelector('i');
        if (isDark) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50;
        const updateCounter = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.innerText = target;
                clearInterval(updateCounter);
            } else {
                counter.innerText = Math.floor(current);
            }
        }, 30);
    }
    
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight - 100;
    }
    
    function checkCounters() {
        counters.forEach(counter => {
            if (!counter.classList.contains('animated') && isInViewport(counter)) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }
    
    window.addEventListener('scroll', checkCounters);
    checkCounters();
}

// Scroll Reveal
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.subject-card, .featured-card, .update-card, .testimonial-card, .tip-card, .stat-card');
    
    function checkReveal() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight - 100) {
                el.classList.add('revealed');
            }
        });
    }
    
    revealElements.forEach(el => el.classList.add('scroll-reveal'));
    window.addEventListener('scroll', checkReveal);
    checkReveal();
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                let subscribers = JSON.parse(localStorage.getItem('gyanu_subscribers') || '[]');
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    localStorage.setItem('gyanu_subscribers', JSON.stringify(subscribers));
                }
                
                const btn = this.querySelector('button');
                const originalText = btn.innerHTML;
                btn.innerHTML = '✓ Subscribed!';
                btn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 2000);
                
                this.reset();
            }
        });
    }
}

// Subject Cards
function initSubjectCards() {
    const subjectCards = document.querySelectorAll('.subject-card');
    subjectCards.forEach(card => {
        card.addEventListener('click', function() {
            const subject = this.getAttribute('data-subject');
            if (subject) {
                window.location.href = `notes.html?subject=${subject}`;
            }
        });
    });
}

// Class Cards
function initClassCards() {
    const classCards = document.querySelectorAll('.class-card');
    classCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
}

// Active Nav Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNavLink();