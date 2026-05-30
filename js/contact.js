/* ============================================
   GYANU NOTES - CONTACT PAGE
   Web3Forms integration, form validation
   ============================================ */

const WEB3FORMS_ACCESS_KEY = "1faf2630-a720-4238-b659-b8d1dc4a541b";

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFaqAccordion();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value;
        const email = document.getElementById('contactEmail')?.value;
        const subject = document.getElementById('contactSubject')?.value;
        const message = document.getElementById('contactMessage')?.value;
        
        if (!validateForm(name, email, subject, message)) return;
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, name: name, email: email, subject: subject, message: message })
            });
            const result = await response.json();
            if (result.success) { showSuccessMessage('Message sent successfully! We\'ll get back to you soon.'); contactForm.reset(); }
            else throw new Error(result.message);
        } catch (error) { showErrorMessage('Failed to send message. Please email us directly at gyanunotes@gmail.com'); }
        finally { submitBtn.innerHTML = originalText; submitBtn.disabled = false; }
    });
}

function validateForm(name, email, subject, message) {
    clearErrors();
    let isValid = true;
    if (!name || name.trim().length < 2) { showFieldError('contactName', 'Please enter your full name'); isValid = false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) { showFieldError('contactEmail', 'Please enter a valid email address'); isValid = false; }
    if (!subject || subject.trim().length < 3) { showFieldError('contactSubject', 'Please enter a subject'); isValid = false; }
    if (!message || message.trim().length < 10) { showFieldError('contactMessage', 'Please enter your message (at least 10 characters)'); isValid = false; }
    return isValid;
}

function showFieldError(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
        const existingError = field.parentElement?.querySelector('.field-error');
        if (existingError) existingError.remove();
        const errorSpan = document.createElement('span');
        errorSpan.className = 'field-error';
        errorSpan.textContent = errorMessage;
        field.parentElement?.appendChild(errorSpan);
        field.classList.add('error-shake');
        setTimeout(() => field.classList.remove('error-shake'), 500);
    }
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    document.querySelectorAll('.field-error').forEach(error => error.remove());
}

function showSuccessMessage(message) {
    const successDiv = document.getElementById('formSuccessMessage');
    if (successDiv) { successDiv.textContent = message; successDiv.style.display = 'block'; setTimeout(() => successDiv.style.display = 'none', 5000); }
    else showToast(message, 'success');
}

function showErrorMessage(message) {
    const errorDiv = document.getElementById('formErrorMessage');
    if (errorDiv) { errorDiv.textContent = message; errorDiv.style.display = 'block'; setTimeout(() => errorDiv.style.display = 'none', 5000); }
    else showToast(message, 'error');
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `contact-toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 4000);
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) question.addEventListener('click', () => { faqItems.forEach(other => { if (other !== item && other.classList.contains('active')) other.classList.remove('active'); }); item.classList.toggle('active'); });
    });
}

const contactStyles = document.createElement('style');
contactStyles.textContent = `.contact-toast { position: fixed; bottom: 30px; right: 30px; background: #2E7D32; color: white; padding: 12px 24px; border-radius: 8px; display: flex; align-items: center; gap: 10px; z-index: 1000; transform: translateX(400px); transition: transform 0.3s ease; } .contact-toast.show { transform: translateX(0); } .contact-toast.error { background: #f44336; } .field-error { color: #f44336; font-size: 12px; margin-top: 5px; display: block; } .error-shake { animation: shake 0.5s ease; } @keyframes shake { 0%,100% { transform: translateX(0); } 10%,30%,50%,70%,90% { transform: translateX(-5px); } 20%,40%,60%,80% { transform: translateX(5px); } }`;
document.head.appendChild(contactStyles);