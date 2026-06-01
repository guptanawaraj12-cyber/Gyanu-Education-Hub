/* ============================================
   GYANU NOTES - AUTHENTICATION (FIXED)
   Shows avatar only when logged in, hides dropdown when logged out
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
            localStorage.setItem('gyanu_logged_in', 'true');
            updateUIForLoggedInUser(user);
            const currentPage = window.location.pathname.split('/').pop();
            if (currentPage === 'login.html' || currentPage === 'signup.html') {
                window.location.href = 'dashboard.html';
            }
        } else {
            localStorage.removeItem('gyanu_logged_in');
            updateUIForLoggedOutUser();
            const currentPage = window.location.pathname.split('/').pop();
            const protectedPages = ['dashboard.html', 'settings.html', 'profile.html'];
            if (protectedPages.includes(currentPage)) {
                window.location.href = 'login.html';
            }
        }
    });
}

function updateUIForLoggedInUser(user) {
    const loginLink = document.getElementById('loginLink');
    const dropdownContent = document.getElementById('dropdownContent');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (loginLink) {
        const displayName = user.displayName || user.email.split('@')[0];
        const firstLetter = displayName.charAt(0).toUpperCase();
        
        loginLink.innerHTML = `
            <div class="user-avatar">
                <span class="avatar-letter">${firstLetter}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
        `;
        loginLink.href = '#';
        loginLink.classList.add('has-avatar');
    }
    
    // Show dropdown when logged in
    if (dropdownContent) {
        dropdownContent.style.display = '';
        dropdownContent.style.opacity = '';
        dropdownContent.style.visibility = '';
        dropdownContent.style.pointerEvents = 'auto';
    }
    
    // Enable hover effect
    if (profileDropdown) {
        profileDropdown.classList.add('logged-in');
    }
}

function updateUIForLoggedOutUser() {
    const loginLink = document.getElementById('loginLink');
    const dropdownContent = document.getElementById('dropdownContent');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (loginLink) {
        loginLink.innerHTML = `<i class="fas fa-sign-in-alt"></i> Login`;
        loginLink.href = 'login.html';
        loginLink.classList.remove('has-avatar');
    }
    
    // HIDE dropdown when logged out - IMPORTANT!
    if (dropdownContent) {
        dropdownContent.style.display = 'none';
        dropdownContent.style.opacity = '0';
        dropdownContent.style.visibility = 'hidden';
        dropdownContent.style.pointerEvents = 'none';
    }
    
    // Disable hover effect
    if (profileDropdown) {
        profileDropdown.classList.remove('logged-in');
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
        localStorage.setItem('gyanu_logged_in', 'true');
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
        localStorage.setItem('gyanu_logged_in', 'true');
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
        localStorage.setItem('gyanu_logged_in', 'true');
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
        localStorage.removeItem('gyanu_logged_in');
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
