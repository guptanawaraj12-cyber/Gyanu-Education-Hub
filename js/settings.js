/* ============================================
   GYANU NOTES - SETTINGS PAGE
   Profile management, preferences, account settings
   ============================================ */

import { 
    auth, 
    db, 
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    getUserData,
    updateUserData,
    doc,
    deleteDoc
} from './firebase-config.js';

let currentUser = null;
let userData = null;

document.addEventListener('DOMContentLoaded', function() {
    checkAuthAndLoadSettings();
    
    const profileForm = document.getElementById('profileForm');
    const appearanceForm = document.getElementById('appearanceForm');
    const notificationForm = document.getElementById('notificationForm');
    const securityForm = document.getElementById('securityForm');
    const saveAllBtn = document.getElementById('saveAllSettings');
    const cancelBtn = document.getElementById('cancelSettings');
    const downloadDataBtn = document.getElementById('downloadDataBtn');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const darkModeSetting = document.getElementById('darkModeSetting');
    
    if (profileForm) profileForm.addEventListener('submit', saveProfileSettings);
    if (appearanceForm) appearanceForm.addEventListener('submit', saveAppearanceSettings);
    if (notificationForm) notificationForm.addEventListener('submit', saveNotificationSettings);
    if (securityForm) securityForm.addEventListener('submit', saveSecuritySettings);
    if (saveAllBtn) saveAllBtn.addEventListener('click', saveAllSettings);
    if (cancelBtn) cancelBtn.addEventListener('click', () => window.location.href = 'dashboard.html');
    if (downloadDataBtn) downloadDataBtn.addEventListener('click', downloadUserData);
    if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', clearStudyHistory);
    if (deleteAccountBtn) deleteAccountBtn.addEventListener('click', confirmDeleteAccount);
    if (darkModeSetting) darkModeSetting.addEventListener('change', function() {
        if (this.checked) document.body.classList.add('dark-mode');
        else document.body.classList.remove('dark-mode');
    });
});

async function checkAuthAndLoadSettings() {
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
            userData = { name: currentUser.displayName || 'Student', email: currentUser.email, class: 'Class 10', board: 'NEB', language: 'English', preferences: { theme: 'light', fontSize: 'medium', animations: true, compactView: false }, notifications: { email: true, newNotes: true, weeklyReport: false, examReminders: true } };
        }
    } catch (error) { console.error('Error loading settings:', error); }
}

function populateSettingsForms() {
    if (!userData) return;
    const userNameInput = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userClass = document.getElementById('userClass');
    const userBoard = document.getElementById('userBoard');
    const userLanguage = document.getElementById('userLanguage');
    const darkModeSetting = document.getElementById('darkModeSetting');
    const animationsToggle = document.getElementById('animationsToggle');
    const compactViewToggle = document.getElementById('compactViewToggle');
    const emailNotifications = document.getElementById('emailNotifications');
    const newNotesAlert = document.getElementById('newNotesAlert');
    const weeklyReport = document.getElementById('weeklyReport');
    const examReminders = document.getElementById('examReminders');
    
    if (userNameInput) userNameInput.value = userData.name || '';
    if (userEmail) userEmail.value = currentUser.email;
    if (userClass) userClass.value = userData.class || 'Class 10';
    if (userBoard) userBoard.value = userData.board || 'NEB';
    if (userLanguage) userLanguage.value = userData.language || 'English';
    if (darkModeSetting) darkModeSetting.checked = document.body.classList.contains('dark-mode');
    if (animationsToggle) animationsToggle.checked = userData.preferences?.animations !== false;
    if (compactViewToggle) compactViewToggle.checked = userData.preferences?.compactView || false;
    if (emailNotifications) emailNotifications.checked = userData.notifications?.email !== false;
    if (newNotesAlert) newNotesAlert.checked = userData.notifications?.newNotes !== false;
    if (weeklyReport) weeklyReport.checked = userData.notifications?.weeklyReport || false;
    if (examReminders) examReminders.checked = userData.notifications?.examReminders !== false;
    
    const fontSizeRadios = document.querySelectorAll('input[name="fontSize"]');
    fontSizeRadios.forEach(radio => {
        if (radio.value === (userData.preferences?.fontSize || 'medium')) radio.checked = true;
    });
}

async function saveProfileSettings(e) {
    e.preventDefault();
    showLoading('Saving profile...');
    try {
        const name = document.getElementById('userName').value;
        await updateProfile(currentUser, { displayName: name });
        await updateUserData(currentUser.uid, { name: name, class: document.getElementById('userClass').value, board: document.getElementById('userBoard').value, language: document.getElementById('userLanguage').value });
        showSuccess('Profile updated successfully!');
    } catch (error) { showError('Failed to update profile'); } finally { hideLoading(); }
}

async function saveAppearanceSettings(e) {
    e.preventDefault();
    try {
        const isDark = document.getElementById('darkModeSetting').checked;
        const fontSize = document.querySelector('input[name="fontSize"]:checked')?.value || 'medium';
        const animations = document.getElementById('animationsToggle').checked;
        const compactView = document.getElementById('compactViewToggle').checked;
        if (isDark) document.body.classList.add('dark-mode');
        else document.body.classList.remove('dark-mode');
        localStorage.setItem('gyanu_theme', isDark ? 'dark' : 'light');
        document.body.style.fontSize = fontSize === 'small' ? '14px' : fontSize === 'large' ? '18px' : '16px';
        if (!animations) document.body.classList.add('disable-animations');
        else document.body.classList.remove('disable-animations');
        await updateUserData(currentUser.uid, { preferences: { theme: isDark ? 'dark' : 'light', fontSize: fontSize, animations: animations, compactView: compactView } });
        showSuccess('Appearance settings saved!');
    } catch (error) { showError('Failed to save appearance settings'); }
}

async function saveNotificationSettings(e) {
    e.preventDefault();
    try {
        await updateUserData(currentUser.uid, { notifications: { email: document.getElementById('emailNotifications').checked, newNotes: document.getElementById('newNotesAlert').checked, weeklyReport: document.getElementById('weeklyReport').checked, examReminders: document.getElementById('examReminders').checked } });
        showSuccess('Notification settings saved!');
    } catch (error) { showError('Failed to save notification settings'); }
}

async function saveSecuritySettings(e) {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPassword')?.value;
    const newPassword = document.getElementById('newPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    if (!currentPassword || !newPassword) { showError('Please enter current and new password'); return; }
    if (newPassword !== confirmPassword) { showError('New passwords do not match'); return; }
    if (newPassword.length < 6) { showError('Password must be at least 6 characters'); return; }
    showLoading('Changing password...');
    try {
        const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);
        showSuccess('Password changed successfully!');
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    } catch (error) { showError(error.code === 'auth/wrong-password' ? 'Current password is incorrect' : 'Failed to change password'); } finally { hideLoading(); }
}

async function saveAllSettings() {
    showLoading('Saving all settings...');
    try {
        await updateProfile(currentUser, { displayName: document.getElementById('userName').value });
        await updateUserData(currentUser.uid, { name: document.getElementById('userName').value, class: document.getElementById('userClass').value, board: document.getElementById('userBoard').value, language: document.getElementById('userLanguage').value, preferences: { theme: document.getElementById('darkModeSetting').checked ? 'dark' : 'light', fontSize: document.querySelector('input[name="fontSize"]:checked')?.value || 'medium', animations: document.getElementById('animationsToggle').checked, compactView: document.getElementById('compactViewToggle').checked }, notifications: { email: document.getElementById('emailNotifications').checked, newNotes: document.getElementById('newNotesAlert').checked, weeklyReport: document.getElementById('weeklyReport').checked, examReminders: document.getElementById('examReminders').checked } });
        if (document.getElementById('darkModeSetting').checked) document.body.classList.add('dark-mode');
        else document.body.classList.remove('dark-mode');
        showSuccess('All settings saved successfully!');
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
    } catch (error) { showError('Failed to save settings'); } finally { hideLoading(); }
}

async function downloadUserData() {
    showLoading('Preparing your data...');
    try {
        const userDataComplete = { user: { uid: currentUser.uid, email: currentUser.email, displayName: currentUser.displayName }, settings: userData, exportDate: new Date().toISOString() };
        const dataStr = JSON.stringify(userDataComplete, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `gyanu_notes_data_${currentUser.uid}.json`;
        link.click();
        URL.revokeObjectURL(url);
        showSuccess('Your data has been downloaded!');
    } catch (error) { showError('Failed to download data'); } finally { hideLoading(); }
}

async function clearStudyHistory() {
    if (!confirm('⚠️ Are you sure? This will clear all your study progress. This action cannot be undone.')) return;
    showLoading('Clearing history...');
    try {
        await updateUserData(currentUser.uid, { completedChapters: [], savedNotes: [], totalStudyTime: 0, studyStreak: 0 });
        showSuccess('Study history cleared!');
        setTimeout(() => window.location.reload(), 1500);
    } catch (error) { showError('Failed to clear history'); } finally { hideLoading(); }
}

function confirmDeleteAccount() {
    if (confirm('⚠️ DANGER: This will permanently delete your account. This cannot be undone. Are you sure?') && prompt('Type "DELETE" to confirm') === 'DELETE') deleteAccount();
}

async function deleteAccount() {
    showLoading('Deleting account...');
    try {
        await deleteDoc(doc(db, 'users', currentUser.uid));
        await currentUser.delete();
        showSuccess('Account deleted successfully');
        setTimeout(() => window.location.href = 'index.html', 1500);
    } catch (error) { showError('Failed to delete account'); } finally { hideLoading(); }
}

function showLoading(message) { const loader = document.getElementById('globalLoader'); if (loader) { loader.querySelector('p').textContent = message; loader.style.display = 'flex'; } }
function hideLoading() { const loader = document.getElementById('globalLoader'); if (loader) loader.style.display = 'none'; }
function showSuccess(message) { showToast(message, 'success'); }
function showError(message) { showToast(message, 'error'); }

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `settings-toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

const loaderHTML = `<div id="globalLoader" class="global-loader" style="display: none;"><div class="spinner"></div><p>Loading...</p></div>`;
if (!document.getElementById('globalLoader')) document.body.insertAdjacentHTML('beforeend', loaderHTML);