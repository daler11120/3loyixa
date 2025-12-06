// NFT Marketplace JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Functionality
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update aria-expanded for accessibility
            const isExpanded = hamburgerBtn.classList.contains('active');
            hamburgerBtn.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnButton = hamburgerBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && navMenu.classList.contains('active')) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Newsletter Form Submission
    const newsletterForms = document.querySelectorAll('.subscribe-form, .subscribe-form-2, .newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = form.querySelector('.enter-your-email, .newsletter-input');
            if (emailInput && emailInput.value) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            }
        });
    });
    
    // Search Functionality (Marketplace page)
    const searchInput = document.querySelector('.rank-artist');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // Filter NFT cards based on search input
            const searchTerm = this.value.toLowerCase();
            const nftCards = document.querySelectorAll('.NFT-card, .table-row');
            
            nftCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Tab Functionality (Rankings page)
    const tabButtons = document.querySelectorAll('.tab-item, .tab, .tab-2');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            const allTabs = this.parentElement.querySelectorAll('.tab-item, .tab, .tab-2');
            allTabs.forEach(tab => {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Update content based on selected tab (if needed)
            const selectedTab = this.dataset.tab || this.textContent.trim().toLowerCase();
            updateRankingsContent(selectedTab);
        });
    });
    
    // NFT Card Interactions
    const nftCards = document.querySelectorAll('.NFT-card, .collection-card, .category-card');
    nftCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You can add navigation logic here
            console.log('Card clicked:', this);
        });
    });
    
    // Button Hover Effects
    const buttons = document.querySelectorAll('.button, .button-2, .button-3, .button-4, .button-6, .create-account-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Form Validation (Register page)
    const registerForm = document.querySelector('.input-group');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = this.querySelector('input[type="text"]')?.value;
            const email = this.querySelector('input[type="email"]')?.value;
            const password = this.querySelector('input[type="password"]')?.value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1]?.value;
            
            if (!validateForm(username, email, password, confirmPassword)) {
                return;
            }
            
            showNotification('Account created successfully! Welcome to NFT Marketplace!', 'success');
            this.reset();
        });
    }
    
    // Connect Wallet Button
    const walletButtons = document.querySelectorAll('a[href="#connect-wallet"]');
    walletButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Wallet connection feature coming soon!', 'info');
        });
    });
    
    // Smooth Scroll for Internal Links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy Loading for Images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Utility Functions
function validateForm(username, email, password, confirmPassword) {
    let isValid = true;
    let message = '';
    
    if (!username || username.length < 3) {
        message = 'Username must be at least 3 characters long.';
        isValid = false;
    } else if (!email || !isValidEmail(email)) {
        message = 'Please enter a valid email address.';
        isValid = false;
    } else if (!password || password.length < 6) {
        message = 'Password must be at least 6 characters long.';
        isValue = false;
    } else if (password !== confirmPassword) {
        message = 'Passwords do not match.';
        isValid = false;
    }
    
    if (!isValid) {
        showNotification(message, 'error');
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ac4f' : type === 'error' ? '#ff4444' : '#a259ff'};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function updateRankingsContent(period) {
    // This function can be extended to filter rankings by different time periods
    console.log('Updating rankings for period:', period);
    
    // You could add logic here to show different data based on selected period
    // For now, we'll just add a visual indicator
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.style.opacity = '0.7';
        setTimeout(() => {
            row.style.opacity = '1';
        }, 200);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);