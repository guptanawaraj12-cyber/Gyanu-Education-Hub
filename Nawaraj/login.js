// Firebase configuration - REPLACE WITH YOUR ACTUAL FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_AUTH_DOMAIN_HERE",
    projectId: "YOUR_PROJECT_ID_HERE",
    storageBucket: "YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
    appId: "YOUR_APP_ID_HERE"
};

// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    FacebookAuthProvider,
    sendPasswordResetEmail,
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// DOM Elements
const authContainer = document.getElementById('authContainer');

// Check auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        showUserDashboard(user);
    } else {
        showAuthUI();
    }
});

// Show Login/Signup UI
function showAuthUI() {
    authContainer.innerHTML = `
        <div class="login-card">
            <div class="login-header">
                <div class="logo">📚</div>
                <h1>Welcome to Gyanu Notes</h1>
                <p>Login or Sign up to access study materials</p>
            </div>
            
            <div class="toggle-buttons">
                <button class="toggle-btn active" id="loginToggleBtn">Login</button>
                <button class="toggle-btn" id="signupToggleBtn">Sign Up</button>
            </div>
            
            <!-- Login Form -->
            <div id="loginForm" class="form active">
                <form id="loginFormElement">
                    <div class="input-group">
                        <label>Email Address</label>
                        <input type="email" id="loginEmail" required placeholder="Enter your email">
                    </div>
                    <div class="input-group">
                        <label>Password</label>
                        <input type="password" id="loginPassword" required placeholder="Enter your password">
                    </div>
                    <div class="forgot-password">
                        <a href="#" id="forgotPasswordLink">Forgot Password?</a>
                    </div>
                    <button type="submit" class="submit-btn">🔐 Login</button>
                </form>
            </div>
            
            <!-- Signup Form -->
            <div id="signupForm" class="form">
                <form id="signupFormElement">
                    <div class="input-group">
                        <label>Full Name</label>
                        <input type="text" id="signupName" required placeholder="Enter your full name">
                    </div>
                    <div class="input-group">
                        <label>Email Address</label>
                        <input type="email" id="signupEmail" required placeholder="Enter your email">
                    </div>
                    <div class="input-group">
                        <label>Password</label>
                        <input type="password" id="signupPassword" required placeholder="Create a password (min 6 characters)">
                    </div>
                    <div class="input-group">
                        <label>Confirm Password</label>
                        <input type="password" id="signupConfirmPassword" required placeholder="Confirm your password">
                    </div>
                    <button type="submit" class="submit-btn">📝 Sign Up</button>
                </form>
            </div>
            
            <div class="divider">
                <span>OR</span>
            </div>
            
            <button class="google-btn" id="googleSignInBtn">
                <span>G</span> Continue with Google
            </button>
            
            <button class="facebook-btn" id="facebookSignInBtn">
                <span>f</span> Continue with Facebook
            </button>
            
            <div id="authMessage" class="message"></div>
        </div>
    `;
    
    // Add event listeners
    document.getElementById('loginFormElement').addEventListener('submit', handleLogin);
    document.getElementById('signupFormElement').addEventListener('submit', handleSignup);
    document.getElementById('googleSignInBtn').addEventListener('click', signInWithGoogle);
    document.getElementById('facebookSignInBtn').addEventListener('click', signInWithFacebook);
    document.getElementById('loginToggleBtn').addEventListener('click', () => switchForm('login'));
    document.getElementById('signupToggleBtn').addEventListener('click', () => switchForm('signup'));
    document.getElementById('forgotPasswordLink').addEventListener('click', showForgotPasswordModal);
}

// Switch between Login and Signup forms
function switchForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginToggle = document.getElementById('loginToggleBtn');
    const signupToggle = document.getElementById('signupToggleBtn');
    
    if (formType === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        loginToggle.classList.add('active');
        signupToggle.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        loginToggle.classList.remove('active');
        signupToggle.classList.add('active');
    }
    
    const messageDiv = document.getElementById('authMessage');
    if (messageDiv) messageDiv.innerHTML = '';
}

// Show Forgot Password Modal
function showForgotPasswordModal(e) {
    e.preventDefault();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'resetModal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeResetModal()">&times;</span>
            <h3>🔐 Reset Password</h3>
            <p style="margin-bottom: 15px;">Enter your email address and we'll send you a link to reset your password.</p>
            <input type="email" id="resetEmail" placeholder="Enter your email address">
            <div class="modal-buttons">
                <button class="send-reset-btn" onclick="sendResetEmail()">Send Reset Link</button>
                <button class="cancel-reset-btn" onclick="closeResetModal()">Cancel</button>
            </div>
            <div id="resetMessage" style="margin-top: 15px; font-size: 0.85rem;"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Close Reset Modal
window.closeResetModal = function() {
    const modal = document.getElementById('resetModal');
    if (modal) {
        modal.remove();
    }
}

// Send Password Reset Email
window.sendResetEmail = async function() {
    const email = document.getElementById('resetEmail').value;
    const resetMessage = document.getElementById('resetMessage');
    
    if (!email) {
        resetMessage.innerHTML = '<span style="color: red;">❌ Please enter your email address</span>';
        return;
    }
    
    resetMessage.innerHTML = '<span style="color: blue;">⏳ Sending reset link...</span>';
    
    try {
        await sendPasswordResetEmail(auth, email);
        resetMessage.innerHTML = '<span style="color: green;">✅ Password reset link sent! Check your email.</span>';
        setTimeout(() => {
            closeResetModal();
        }, 3000);
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = '❌ No account found with this email';
                break;
            case 'auth/invalid-email':
                errorMessage = '❌ Invalid email format';
                break;
            default:
                errorMessage = '❌ Failed to send reset link. Try again.';
        }
        resetMessage.innerHTML = `<span style="color: red;">${errorMessage}</span>`;
    }
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showMessage('Please fill all fields', 'error');
        return;
    }
    
    showMessage('Logging in...', 'info');
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Invalid email format';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many failed attempts. Try again later.';
                break;
            default:
                errorMessage = 'Login failed. Try again.';
        }
        showMessage(errorMessage, 'error');
    }
}

// Handle Signup
async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (!name || !email || !password || !confirmPassword) {
        showMessage('Please fill all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    showMessage('Creating account...', 'info');
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        showMessage('Account created successfully! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Email already registered';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email format';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak';
                break;
            default:
                errorMessage = 'Signup failed. Try again.';
        }
        showMessage(errorMessage, 'error');
    }
}

// Sign in with Google
async function signInWithGoogle() {
    showMessage('Redirecting to Google...', 'info');
    
    try {
        const result = await signInWithPopup(auth, googleProvider);
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                errorMessage = 'Popup closed before completing sign in';
                break;
            case 'auth/popup-blocked':
                errorMessage = 'Popup blocked by browser. Please allow popups.';
                break;
            default:
                errorMessage = 'Google sign in failed. Try again.';
        }
        showMessage(errorMessage, 'error');
    }
}

// Sign in with Facebook
async function signInWithFacebook() {
    showMessage('Redirecting to Facebook...', 'info');
    
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                errorMessage = 'Popup closed before completing sign in';
                break;
            case 'auth/popup-blocked':
                errorMessage = 'Popup blocked by browser. Please allow popups.';
                break;
            case 'auth/account-exists-with-different-credential':
                errorMessage = 'An account already exists with the same email using different sign-in method';
                break;
            default:
                errorMessage = 'Facebook sign in failed. Try again.';
        }
        showMessage(errorMessage, 'error');
    }
}

// Show User Dashboard after login
function showUserDashboard(user) {
    const displayName = user.displayName || user.email.split('@')[0];
    const email = user.email;
    const photoURL = user.photoURL;
    
    authContainer.innerHTML = `
        <div class="user-card">
            <div class="user-avatar">
                ${photoURL ? `<img src="${photoURL}" style="width:80px;height:80px;border-radius:50%;">` : '👨‍🎓'}
            </div>
            <h2>Welcome, ${displayName}!</h2>
            <p>You are now logged in to Gyanu Notes</p>
            <p class="user-email">${email}</p>
            <button class="logout-btn" id="logoutBtn">🚪 Logout</button>
        </div>
    `;
    
    document.getElementById('logoutBtn').addEventListener('click', logoutUser);
}

// Logout function
async function logoutUser() {
    try {
        await signOut(auth);
        showMessage('Logged out successfully', 'success');
    } catch (error) {
        showMessage('Logout failed', 'error');
    }
}

// Helper function to show messages
function showMessage(msg, type) {
    const messageDiv = document.getElementById('authMessage');
    if (messageDiv) {
        messageDiv.innerHTML = msg;
        messageDiv.className = `message ${type}`;
        setTimeout(() => {
            messageDiv.innerHTML = '';
            messageDiv.className = 'message';
        }, 5000);
    }
}