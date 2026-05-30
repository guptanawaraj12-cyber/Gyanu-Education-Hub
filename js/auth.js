/* ============================================
   GYANU NOTES - AUTHENTICATION (with Profile Dropdown)
   ============================================ */

import { 
    auth, 
    db, 
    googleProvider,
    facebookProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
    updateProfile,
    doc,
    updateDoc,
    saveUserToFirestore
} from './firebase-config.js';

let loginForm, signupForm, forgotPasswordForm;
let errorMessage, successMessage;

document.addEventListener('DOMContentLoaded', function() {
    loginForm = document.getElementById('loginForm');
    signupForm = document.getElementById('signupForm');
    forgotPasswordForm = document.getElementById('forgotPasswordForm');
    errorMessage = document.getElementById('errorMessage');
    successMessage = document.getElementById('successMessage');
    
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignup);
    if (forgotPasswordForm) forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    
    const googleBtns = document.querySelectorAll('#googleSignInBtn, #googleSignUpBtn');
    googleBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', () => handleSocialLogin('google'));
    });
    
    const facebookBtns = document.querySelectorAll('#facebookSignInBtn, #facebookSignUpBtn');
    facebookBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', () => handleSocialLogin('facebook'));
    });
    
    checkAuthState();
    initTabSwitching();
});

function checkAuthState() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            updateUIForLoggedInUser(user);
            const currentPage = window.location.pathname.split('/').pop();
            if (currentPage === 'login.html' || currentPage === 'signup.html') {
                window.location.href = 'dashboard.html';
            }
        } else {
            updateUIForLoggedOutUser();
            const currentPage = window.location.pathname.split('/').pop();
            const protectedPages = ['dashboard.html', 'settings.html'];
            if (protectedPages.includes(currentPage)) {
                window.location.href = 'login.html';
            }
        }
    });
}

function updateUIForLoggedInUser(user) {
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        const displayName = user.displayName || user.email.split('@')[0];
        loginLink.innerHTML = `<i class="fas fa-user-circle"></i> ${displayName} <i class="fas fa-chevron-down"></i>`;
        loginLink.href = '#';
    }
    initProfileDropdown();
}

function updateUIForLoggedOutUser() {
    const loginLink = document.getElementById('loginLink');
    const dropdownContent = document.getElementById('dropdownContent');
    if (loginLink) {
        loginLink.innerHTML = `<i class="fas fa-sign-in-alt"></i> Login`;
        loginLink.href = 'login.html';
    }
    if (dropdownContent) {
        dropdownContent.style.display = 'none';
    }
}

function initProfileDropdown() {
    const loginLink = document.getElementById('loginLink');
    const dropdownContent = document.getElementById('dropdownContent');
    
    if (!loginLink || !dropdownContent) return;
    
    // Remove old listener to prevent duplicates
    const newLoginLink = loginLink.cloneNode(true);
    loginLink.parentNode.replaceChild(newLoginLink, loginLink);
    
    newLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        const isVisible = dropdownContent.style.display === 'block';
        dropdownContent.style.display = isVisible ? 'none' : 'block';
    });
    
    document.addEventListener('click', (e) => {
        if (!newLoginLink.contains(e.target) && !dropdownContent.contains(e.target)) {
            dropdownContent.style.display = 'none';
        }
    });
    
    const logoutBtn = document.getElementById('logoutDropdownBtn');
    if (logoutBtn) {
        const newLogoutBtn = logoutBtn.cloneNode(true);
        logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
        newLogoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await handleLogout();
        });
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;
    
    if (!email || !password) {
        showError('Please enter email and password');
        return;
    }
    
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Logging in...';
    submitBtn.disabled = true;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await updateDoc(doc(db, 'users', userCredential.user.uid), {
            lastLoginDate: new Date().toISOString()
        });
        showSuccess('Login successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } catch (error) {
        let errorMsg = 'Login failed. Please try again.';
        switch (error.code) {
            case 'auth/user-not-found': errorMsg = 'No account found with this email.'; break;
            case 'auth/wrong-password': errorMsg = 'Incorrect password.'; break;
            case 'auth/invalid-email': errorMsg = 'Invalid email address.'; break;
            case 'auth/too-many-requests': errorMsg = 'Too many attempts. Try again later.'; break;
        }
        showError(errorMsg);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName')?.value;
    const email = document.getElementById('signupEmail')?.value;
    const password = document.getElementById('signupPassword')?.value;
    const confirmPassword = document.getElementById('signupConfirmPassword')?.value;
    const classSelect = document.getElementById('signupClass')?.value;
    
    if (!name || !email || !password) {
        showError('Please fill in all fields');
        return;
    }
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    const submitBtn = signupForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Creating account...';
    submitBtn.disabled = true;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await saveUserToFirestore(userCredential.user, { name: name, class: classSelect || 'Class 10' });
        showSuccess('Account created successfully! Redirecting...');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } catch (error) {
        let errorMsg = 'Signup failed.';
        switch (error.code) {
            case 'auth/email-already-in-use': errorMsg = 'Email already registered. Please login.'; break;
            case 'auth/invalid-email': errorMsg = 'Invalid email address.'; break;
            case 'auth/weak-password': errorMsg = 'Password is too weak.'; break;
        }
        showError(errorMsg);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handleSocialLogin(providerType) {
    const provider = providerType === 'google' ? googleProvider : facebookProvider;
    const btn = document.querySelector(providerType === 'google' ? '.google-btn' : '.facebook-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="spinner"></span> Connecting...`;
    btn.disabled = true;
    
    try {
        const result = await signInWithPopup(auth, provider);
        await saveUserToFirestore(result.user);
        showSuccess(`${providerType} sign-in successful! Redirecting...`);
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } catch (error) {
        showError(`${providerType} sign-in failed. Please try again.`);
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

async function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('forgotEmail')?.value;
    if (!email) {
        showError('Please enter your email address');
        return;
    }
    
    const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    submitBtn.disabled = true;
    
    try {
        await sendPasswordResetEmail(auth, email);
        showSuccess('Password reset email sent! Check your inbox.');
        forgotPasswordForm.reset();
    } catch (error) {
        showError('Failed to send reset email.');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handleLogout() {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (error) {
        showError('Logout failed. Please try again.');
    }
}

function initTabSwitching() {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginPanel = document.getElementById('loginPanel');
    const signupPanel = document.getElementById('signupPanel');
    const forgotPanel = document.getElementById('forgotPanel');
    const forgotLink = document.getElementById('forgotLink');
    const backToLogin = document.getElementById('backToLogin');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    
    if (loginTab && signupTab) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginPanel.style.display = 'block';
            signupPanel.style.display = 'none';
            if (forgotPanel) forgotPanel.style.display = 'none';
        });
        signupTab.addEventListener('click', () => {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupPanel.style.display = 'block';
            loginPanel.style.display = 'none';
            if (forgotPanel) forgotPanel.style.display = 'none';
        });
    }
    
    if (forgotLink && loginPanel && forgotPanel) {
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginPanel.style.display = 'none';
            forgotPanel.style.display = 'block';
        });
    }
    
    if (backToLogin && loginPanel && forgotPanel) {
        backToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            forgotPanel.style.display = 'none';
            loginPanel.style.display = 'block';
        });
    }
    
    if (switchToSignup && signupTab) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            signupTab.click();
        });
    }
    
    if (switchToLogin && loginTab) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            loginTab.click();
        });
    }
}

function showError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 4000);
    } else {
        alert(message);
    }
}

function showSuccess(message) {
    if (successMessage) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}