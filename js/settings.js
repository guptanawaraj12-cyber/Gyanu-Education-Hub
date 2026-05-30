/* ============================================
   GYANU NOTES - SETTINGS PAGE
   Profile management, preferences, account settings
   ============================================ */

import { 
    auth, 
    db, 
    onAuthStateChanged,
    updateProfile,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    signOut,
    getUserData,
    updateUserData,
    doc,
    deleteDoc
} from './firebase-config.js';

let currentUser = null;
let userData = null;

// DOM Elements
let userNameInput, userEmail, userClassSelect, userBoardSelect, userLanguageSelect;
let darkModeSetting, fontSizeRadios, animationsToggle, compactViewToggle;
let emailNotifications, newNotesAlert, weeklyReport, examReminders;
let currentPasswordInput, newPasswordInput, confirmPasswordInput;
let downloadDataBtn, clearHistoryBtn, deleteAccountBtn;
let saveAllBtn, cancelBtn;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    userNameInput = document.getElementById('userName');
    userEmail = document.getElementById('userEmail');
    userClassSelect = document.getElementById('userClass');
    userBoardSelect = document.getElementById('userBoard');
    userLanguageSelect = document.getElementById('userLanguage');
    
    darkModeSetting = document.getElementById('darkModeSetting');
    fontSizeRadios = document.querySelectorAll('input[name="fontSize"]');
    animationsToggle = document.getElementById('animationsToggle');
    compactViewToggle = document.getElementById('compactViewToggle');
    
    emailNotifications = document.getElementById('emailNotifications');
    newNotesAlert = document.getElementById('newNotesAlert');
    weeklyReport = document.getElementById('weeklyReport');
    examReminders = document.getElementById('examReminders');
    
    currentPasswordInput = document.getElementById('currentPassword');
    newPasswordInput = document.getElementById('newPassword');
    confirmPasswordInput = document.getElementById('confirmPassword');
    
    downloadDataBtn = document.getElementById('downloadDataBtn');
    clearHistoryBtn = document.getElementById('clearHistoryBtn');
    deleteAccountBtn = document.getElementById('deleteAccountBtn');
    
    saveAllBtn = document.getElementById('saveAllSettings');
    cancelBtn = document.getElementById('cancelSettings');
    
    // Add event listeners
    const profileForm = document.getElementById('profileForm');
    const appearanceForm = document.getElementById('appearanceForm');
    const notificationForm = document.getElementById('notificationForm');
    const securityForm = document.getElementById('securityForm');
    
    if (profileForm) profileForm.addEventListener('submit', saveProfileSettings);
    if (appearanceForm) appearanceForm.addEventListener('submit', saveAppearanceSettings);
    if (notificationForm) notificationForm.addEventListener('submit', saveNotificationSettings);
    if (securityForm) securityForm.addEventListener('submit', saveSecuritySettings);
    if (saveAllBtn) saveAllBtn.addEventListener('click', saveAllSettings);
    if (cancelBtn) cancelBtn.addEventListener('click', () => window.location.href = 'dashboard.html');
    if (downloadDataBtn) downloadDataBtn.addEventListener('click', downloadUserData);
    if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', clearStudyHistory);
    if (deleteAccountBtn) deleteAccountBtn.addEventListener('click', confirmDeleteAccount);
    if (darkModeSetting) darkModeSetting.addEventListener('change', applyDarkMode);
    
    // Check authentication
    checkAuthAndLoadSettings();
});

function checkAuthAndLoadSettings() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            await loadUserSettings();
            populateSettingsForms();
        } else {
            window.location.href = 'login.html';
        }
    });
}

async function loadUserSettings() {
    if (!currentUser) return;
    try {
        userData = await getUserData(currentUser.uid);
        if (!userData) {
            userData = {
                name: currentUser.displayName || 'Student',
                email: currentUser.email,
                class: 'Class 10',
                board: 'NEB',
                language: 'English',
                preferences: {
                    theme: 'light',
                    fontSize: 'medium',
                    animations: true,
                    compactView: false
                },
                notifications: {
                    email: true,
                    newNotes: true,
                    weeklyReport: false,
                    examReminders: true
                }
            };
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

function populateSettingsForms() {
    if (!userData) return;
    
    if (userNameInput) userNameInput.value = userData.name || '';
    if (userEmail) userEmail.value = currentUser.email;
    if (userClassSelect) userClassSelect.value = userData.class || 'Class 10';
    if (userBoardSelect) userBoardSelect.value = userData.board || 'NEB';
    if (userLanguageSelect) userLanguageSelect.value = userData.language || 'English';
    
    if (darkModeSetting) darkModeSetting.checked = document.body.classList.contains('dark-mode');
    if (animationsToggle) animationsToggle.checked = userData.preferences?.animations !== false;
    if (compactViewToggle) compactViewToggle.checked = userData.preferences?.compactView || false;
    
    if (emailNotifications) emailNotifications.checked = userData.notifications?.email !== false;
    if (newNotesAlert) newNotesAlert.checked = userData.notifications?.newNotes !== false;
    if (weeklyReport) weeklyReport.checked = userData.notifications?.weeklyReport || false;
    if (examReminders) examReminders.checked = userData.notifications?.examReminders !== false;
    
    if (fontSizeRadios) {
        const savedFontSize = userData.preferences?.fontSize || 'medium';
        fontSizeRadios.forEach(radio => {
            if (radio.value === savedFontSize) radio.checked = true;
        });
    }
}

function applyDarkMode() {
    if (darkModeSetting.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('gyanu_theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('gyanu_theme', 'light');
    }
}

async function saveProfileSettings(e) {
    e.preventDefault();
    showLoading('Saving profile...');
    try {
        const newName = userNameInput.value;
        await updateProfile(currentUser, { displayName: newName });
        await updateUserData(currentUser.uid, {
            name: newName,
            class: userClassSelect.value,
            board: userBoardSelect.value,
            language: userLanguageSelect.value
        });
        showSuccess('Profile updated successfully!');
    } catch (error) {
        console.error('Profile update error:', error);
        showError('Failed to update profile');
    } finally {
        hideLoading();
    }
}

async function saveAppearanceSettings(e) {
    e.preventDefault();
    try {
        let fontSize = 'medium';
        fontSizeRadios.forEach(radio => {
            if (radio.checked) fontSize = radio.value;
        });
        
        const animations = animationsToggle.checked;
        const compactView = compactViewToggle.checked;
        
        // Apply font size
        if (fontSize === 'small') document.body.style.fontSize = '14px';
        else if (fontSize === 'large') document.body.style.fontSize = '18px';
        else document.body.style.fontSize = '16px';
        
        // Apply animations
        if (!animations) document.body.classList.add('disable-animations');
        else document.body.classList.remove('disable-animations');
        
        await updateUserData(currentUser.uid, {
            preferences: {
                theme: darkModeSetting.checked ? 'dark' : 'light',
                fontSize: fontSize,
                animations: animations,
                compactView: compactView
            }
        });
        showSuccess('Appearance settings saved!');
    } catch (error) {
        console.error('Appearance update error:', error);
        showError('Failed to save appearance settings');
    }
}

async function saveNotificationSettings(e) {
    e.preventDefault();
    try {
        await updateUserData(currentUser.uid, {
            notifications: {
                email: emailNotifications.checked,
                newNotes: newNotesAlert.checked,
                weeklyReport: weeklyReport.checked,
                examReminders: examReminders.checked
            }
        });
        showSuccess('Notification settings saved!');
    } catch (error) {
        console.error('Notification update error:', error);
        showError('Failed to save notification settings');
    }
}

async function saveSecuritySettings(e) {
    e.preventDefault();
    const currentPassword = currentPasswordInput?.value;
    const newPassword = newPasswordInput?.value;
    const confirmPassword = confirmPasswordInput?.value;
    
    if (!currentPassword || !newPassword) {
        showError('Please enter current and new password');
        return;
    }
    if (newPassword !== confirmPassword) {
        showError('New passwords do not match');
        return;
    }
    if (newPassword.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    showLoading('Changing password...');
    try {
        const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);
        showSuccess('Password changed successfully!');
        currentPasswordInput.value = '';
        newPasswordInput.value = '';
        confirmPasswordInput.value = '';
    } catch (error) {
        console.error('Password change error:', error);
        if (error.code === 'auth/wrong-password') {
            showError('Current password is incorrect');
        } else {
            showError('Failed to change password. Please try again.');
        }
    } finally {
        hideLoading();
    }
}

async function saveAllSettings() {
    showLoading('Saving all settings...');
    try {
        // Save profile
        await updateProfile(currentUser, { displayName: userNameInput.value });
        
        let fontSize = 'medium';
        fontSizeRadios.forEach(radio => {
            if (radio.checked) fontSize = radio.value;
        });
        
        await updateUserData(currentUser.uid, {
            name: userNameInput.value,
            class: userClassSelect.value,
            board: userBoardSelect.value,
            language: userLanguageSelect.value,
            preferences: {
                theme: darkModeSetting.checked ? 'dark' : 'light',
                fontSize: fontSize,
                animations: animationsToggle.checked,
                compactView: compactViewToggle.checked
            },
            notifications: {
                email: emailNotifications.checked,
                newNotes: newNotesAlert.checked,
                weeklyReport: weeklyReport.checked,
                examReminders: examReminders.checked
            }
        });
        
        // Apply theme
        if (darkModeSetting.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('gyanu_theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('gyanu_theme', 'light');
        }
        
        showSuccess('All settings saved successfully!');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } catch (error) {
        console.error('Save all error:', error);
        showError('Failed to save some settings. Please try again.');
    } finally {
        hideLoading();
    }
}

async function downloadUserData() {
    showLoading('Preparing your data...');
    try {
        const userDataComplete = {
            user: {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                createdAt: currentUser.metadata?.creationTime
            },
            settings: userData,
            exportDate: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(userDataComplete, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `gyanu_notes_data_${currentUser.uid}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showSuccess('Your data has been downloaded!');
    } catch (error) {
        console.error('Download error:', error);
        showError('Failed to download data');
    } finally {
        hideLoading();
    }
}

async function clearStudyHistory() {
    const confirmed = confirm('⚠️ Are you sure? This will clear all your study progress, completed chapters, and saved notes. This action cannot be undone.');
    if (!confirmed) return;
    
    showLoading('Clearing history...');
    try {
        await updateUserData(currentUser.uid, {
            completedChapters: [],
            savedNotes: [],
            totalStudyTime: 0,
            studyStreak: 0
        });
        showSuccess('Study history cleared!');
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    } catch (error) {
        console.error('Clear history error:', error);
        showError('Failed to clear history');
    } finally {
        hideLoading();
    }
}

function confirmDeleteAccount() {
    const confirmed = confirm('⚠️ DANGER: This will permanently delete your account and all your data. This action cannot be undone. Are you absolutely sure?');
    if (!confirmed) return;
    
    const userInput = prompt('Type "DELETE" to confirm account deletion');
    if (userInput === 'DELETE') {
        deleteAccount();
    } else {
        showError('Account deletion cancelled');
    }
}

async function deleteAccount() {
    showLoading('Deleting account...');
    try {
        await deleteDoc(doc(db, 'users', currentUser.uid));
        await currentUser.delete();
        await signOut(auth);
        showSuccess('Account deleted successfully');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        console.error('Delete account error:', error);
        showError('Failed to delete account. Please try again.');
    } finally {
        hideLoading();
    }
}

function showLoading(message) {
    let loader = document.getElementById('globalLoader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'globalLoader';
        loader.className = 'global-loader';
        loader.innerHTML = '<div class="spinner"></div><p>' + message + '</p>';
        document.body.appendChild(loader);
    } else {
        loader.querySelector('p').textContent = message;
        loader.style.display = 'flex';
    }
}

function hideLoading() {
    const loader = document.getElementById('globalLoader');
    if (loader) {
        loader.style.display = 'none';
    }
}

function showSuccess(message) {
    showToast(message, 'success');
}

function showError(message) {
    showToast(message, 'error');
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `settings-toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add global loader styles if not present
if (!document.querySelector('#loader-styles')) {
    const style = document.createElement('style');
    style.id = 'loader-styles';
    style.textContent = `
        .global-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            flex-direction: column;
            gap: 15px;
        }
        .global-loader .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        .global-loader p {
            color: white;
            font-size: 16px;
        }
        .settings-toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #2E7D32;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .settings-toast.show { transform: translateX(0); }
        .settings-toast.error { background: #f44336; }
        .disable-animations * { animation: none !important; transition: none !important; }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}