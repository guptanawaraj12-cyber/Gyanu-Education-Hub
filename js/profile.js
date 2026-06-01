/* ============================================
   GYANU NOTES - PROFILE PAGE
   Display user profile information
   ============================================ */

import { 
    auth, 
    db, 
    onAuthStateChanged,
    getUserData,
    getBadgeInfo,
    doc,
    getDoc
} from './firebase-config.js';

let currentUser = null;
let userData = null;

document.addEventListener('DOMContentLoaded', function() {
    checkAuthAndLoadProfile();
});

async function checkAuthAndLoadProfile() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            await loadUserProfile();
            displayProfile();
        } else {
            window.location.href = 'login.html';
        }
    });
}

async function loadUserProfile() {
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
                completedChapters: [],
                savedNotes: [],
                badges: [],
                studyStreak: 0,
                totalStudyTime: 0,
                createdAt: currentUser.metadata?.creationTime || new Date().toISOString()
            };
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

function displayProfile() {
    if (!userData || !currentUser) return;
    
    // Display avatar letter
    const firstLetter = (userData.name || 'S').charAt(0).toUpperCase();
    const avatarLetter = document.getElementById('avatarLetter');
    if (avatarLetter) avatarLetter.textContent = firstLetter;
    
    // Display name and username
    const profileName = document.getElementById('profileName');
    const profileUsername = document.getElementById('profileUsername');
    if (profileName) profileName.textContent = userData.name || 'Student';
    if (profileUsername) profileUsername.textContent = `@${(userData.name || 'student').toLowerCase().replace(/\s/g, '')}`;
    
    // Display stats
    const studyStreak = document.getElementById('studyStreak');
    const totalChapters = document.getElementById('totalChapters');
    const savedNotesCount = document.getElementById('savedNotesCount');
    const studyHours = document.getElementById('studyHours');
    
    const completedCount = userData.completedChapters?.length || 0;
    const savedCount = userData.savedNotes?.length || 0;
    const streak = userData.studyStreak || 0;
    const hours = Math.floor((userData.totalStudyTime || 0) / 60);
    
    if (studyStreak) studyStreak.textContent = streak;
    if (totalChapters) totalChapters.textContent = completedCount;
    if (savedNotesCount) savedNotesCount.textContent = savedCount;
    if (studyHours) studyHours.textContent = hours;
    
    // Display details
    const fullName = document.getElementById('fullName');
    const emailAddress = document.getElementById('emailAddress');
    const userClassDisplay = document.getElementById('userClassDisplay');
    const userBoardDisplay = document.getElementById('userBoardDisplay');
    const userLanguageDisplay = document.getElementById('userLanguageDisplay');
    const memberSince = document.getElementById('memberSince');
    const streakDisplay = document.getElementById('streakDisplay');
    const badgesCount = document.getElementById('badgesCount');
    const totalStudyTimeDisplay = document.getElementById('totalStudyTimeDisplay');
    const completionRate = document.getElementById('completionRate');
    
    if (fullName) fullName.textContent = userData.name || '-';
    if (emailAddress) emailAddress.textContent = currentUser.email;
    if (userClassDisplay) userClassDisplay.textContent = userData.class || 'Class 10';
    if (userBoardDisplay) userBoardDisplay.textContent = userData.board || 'NEB';
    if (userLanguageDisplay) userLanguageDisplay.textContent = userData.language || 'English';
    
    if (memberSince) {
        const date = new Date(userData.createdAt);
        memberSince.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    
    if (streakDisplay) streakDisplay.textContent = `${streak} days`;
    
    const badges = userData.badges || [];
    if (badgesCount) badgesCount.textContent = badges.length;
    
    if (totalStudyTimeDisplay) {
        const hrs = Math.floor((userData.totalStudyTime || 0) / 60);
        const mins = (userData.totalStudyTime || 0) % 60;
        totalStudyTimeDisplay.textContent = `${hrs}h ${mins}m`;
    }
    
    const totalChaptersTotal = 50;
    const rate = Math.round((completedCount / totalChaptersTotal) * 100);
    if (completionRate) completionRate.textContent = `${rate}%`;
    
    // Display badges
    displayBadges();
}

function displayBadges() {
    const container = document.getElementById('profileBadgesContainer');
    if (!container) return;
    
    const badges = userData.badges || [];
    
    if (badges.length === 0) {
        container.innerHTML = `
            <div class="empty-badges">
                <i class="fas fa-medal"></i>
                <p>Complete chapters to earn badges!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = badges.map(badgeId => {
        const info = getBadgeInfo(badgeId);
        return `
            <div class="badge-card">
                <div class="badge-icon">${info.icon}</div>
                <div class="badge-info">
                    <h4>${info.name}</h4>
                    <p>${info.description}</p>
                </div>
            </div>
        `;
    }).join('');
}