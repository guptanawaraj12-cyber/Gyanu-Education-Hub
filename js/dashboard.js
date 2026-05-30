/* ============================================
   GYANU NOTES - DASHBOARD
   Student progress, saved notes, badges, streaks
   ============================================ */

import { 
    auth, 
    db, 
    onAuthStateChanged,
    getUserData,
    updateUserData,
    saveNote,
    removeSavedNote,
    markChapterComplete,
    getBadgeInfo,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from './firebase-config.js';

let currentUser = null;
let userData = null;

document.addEventListener('DOMContentLoaded', function() {
    checkAuthAndLoadData();
});

async function checkAuthAndLoadData() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            await loadUserData();
            updateDashboard();
        } else {
            window.location.href = 'login.html';
        }
    });
}

async function loadUserData() {
    if (!currentUser) return;
    try {
        userData = await getUserData(currentUser.uid);
        if (!userData) {
            userData = {
                name: currentUser.displayName || 'Student',
                email: currentUser.email,
                class: 'Class 10',
                completedChapters: [],
                savedNotes: [],
                badges: [],
                studyStreak: 0,
                totalStudyTime: 0
            };
            await updateUserData(currentUser.uid, userData);
        }
        const userNameSpan = document.getElementById('userName');
        if (userNameSpan) userNameSpan.textContent = userData.name || 'Student';
        const userClassSpan = document.getElementById('userClass');
        if (userClassSpan) userClassSpan.textContent = userData.class || 'Class 10';
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

function updateDashboard() {
    if (!userData) return;
    
    const completedCount = userData.completedChapters?.length || 0;
    const savedCount = userData.savedNotes?.length || 0;
    const streak = userData.studyStreak || 0;
    const studyHours = Math.floor((userData.totalStudyTime || 0) / 60);
    
    document.getElementById('completedCount').innerText = completedCount;
    document.getElementById('savedCount').innerText = savedCount;
    document.getElementById('streakCount').innerText = streak;
    document.getElementById('studyTime').innerText = studyHours;
    
    const totalChapters = 50;
    const progress = (completedCount / totalChapters) * 100;
    document.getElementById('progressPercent').innerText = `${Math.round(progress)}%`;
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    updateDailyGoal();
    loadSavedNotes();
    loadBadges();
    loadContinueLearning();
    loadRecommendations();
    loadUpcomingExams();
}

function updateDailyGoal() {
    const dailyGoal = 2;
    const todayCompleted = getTodayCompletedChapters();
    const goalProgress = (todayCompleted / dailyGoal) * 100;
    document.getElementById('goalProgressBar').style.width = `${Math.min(goalProgress, 100)}%`;
    document.getElementById('goalProgressText').innerText = `${todayCompleted}/${dailyGoal} chapters`;
    const goalStatus = document.getElementById('goalStatus');
    if (todayCompleted >= dailyGoal) {
        goalStatus.innerHTML = '<i class="fas fa-trophy"></i> 🎉 Goal achieved! Great job!';
    } else {
        goalStatus.innerHTML = `<i class="fas fa-info-circle"></i> ${dailyGoal - todayCompleted} more chapter${dailyGoal - todayCompleted > 1 ? 's' : ''} to go!`;
    }
}

function getTodayCompletedChapters() {
    const today = new Date().toDateString();
    return userData.completedChapters?.filter(chapter => {
        return new Date(chapter.completedAt).toDateString() === today;
    }).length || 0;
}

function loadSavedNotes() {
    const container = document.getElementById('savedNotesContainer');
    const savedNotes = userData.savedNotes || [];
    if (savedNotes.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="fas fa-bookmark"></i><p>No saved notes yet. Browse notes and click ❤️ to save them!</p><a href="notes.html" class="view-btn">Browse Notes →</a></div>`;
        return;
    }
    container.innerHTML = savedNotes.map(note => `
        <div class="saved-note-card">
            <div class="note-info"><h4>${note.title}</h4><p>${note.class} • ${note.subject}</p></div>
            <div class="note-actions"><button class="view-note-btn" onclick="window.location.href='notes/${note.class.toLowerCase().replace(' ', '')}/${note.subject.toLowerCase()}/${note.id}.html'"><i class="fas fa-eye"></i> View</button><button class="remove-note-btn" data-id="${note.id}"><i class="fas fa-trash"></i></button></div>
        </div>
    `).join('');
    document.querySelectorAll('.remove-note-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            await removeSavedNote(currentUser.uid, btn.getAttribute('data-id'));
            await loadUserData();
            updateDashboard();
        });
    });
}

function loadBadges() {
    const container = document.getElementById('badgesContainer');
    const badges = userData.badges || [];
    if (badges.length === 0) {
        container.innerHTML = `<div class="empty-state small"><p>Complete chapters to earn badges!</p></div>`;
        return;
    }
    container.innerHTML = badges.map(badgeId => {
        const info = getBadgeInfo(badgeId);
        return `<div class="badge-card"><div class="badge-icon">${info.icon}</div><div class="badge-info"><h4>${info.name}</h4><p>${info.description}</p></div></div>`;
    }).join('');
}

function loadContinueLearning() {
    const container = document.getElementById('continueLearningContainer');
    const continueLearning = [
        { class: "Class 10", subject: "Science", chapter: "Chemical Reactions", chapterId: "ch1", progress: 75 },
        { class: "Class 10", subject: "Math", chapter: "Real Numbers", chapterId: "ch1", progress: 60 },
        { class: "Class 9", subject: "English", chapter: "The Fun They Had", chapterId: "ch1", progress: 40 }
    ];
    container.innerHTML = continueLearning.map(item => `
        <div class="continue-card" onclick="window.location.href='notes/${item.class.toLowerCase().replace(' ', '')}/${item.subject.toLowerCase()}/${item.chapterId}.html'">
            <div class="continue-header"><span class="class-badge">${item.class}</span><span class="subject-badge">${item.subject}</span></div>
            <h4>${item.chapter}</h4>
            <div class="progress-wrapper-small"><div class="progress-label-small"><span>Progress</span><span>${item.progress}%</span></div><div class="progress-bar-small"><div class="progress-fill-small" style="width: ${item.progress}%"></div></div></div>
            <button class="continue-btn">Continue →</button>
        </div>
    `).join('');
}

function loadRecommendations() {
    const container = document.getElementById('recommendationsContainer');
    const userClass = userData?.class || "Class 10";
    const recommendations = {
        "Class 8": [{ title: "Science - Cell Structure", url: "#", views: 234 }, { title: "Math - Fractions", url: "#", views: 189 }],
        "Class 9": [{ title: "Science - Motion", url: "#", views: 567 }, { title: "Math - Polynomials", url: "#", views: 432 }],
        "Class 10": [{ title: "Science - Chemical Reactions", url: "notes/class10/science/ch1.html", views: 1234 }, { title: "Math - Real Numbers", url: "notes/class10/math/ch1.html", views: 987 }],
        "Class 11": [{ title: "Physics - Laws of Motion", url: "#", views: 876 }, { title: "Chemistry - Atomic Structure", url: "#", views: 654 }],
        "Class 12": [{ title: "Physics - Electromagnetism", url: "#", views: 1122 }, { title: "Chemistry - Organic", url: "#", views: 987 }]
    };
    const userRecs = recommendations[userClass] || recommendations["Class 10"];
    container.innerHTML = userRecs.map(rec => `
        <div class="recommendation-card" onclick="window.location.href='${rec.url}'"><i class="fas fa-star"></i><div><h4>${rec.title}</h4><p><i class="fas fa-eye"></i> ${rec.views} views</p></div></div>
    `).join('');
}

function loadUpcomingExams() {
    const container = document.getElementById('upcomingExamsContainer');
    const exams = [{ name: "SEE 2082", daysLeft: 45, date: "2026-06-15" }, { name: "Class 11 Final", daysLeft: 60, date: "2026-07-30" }, { name: "Class 12 Board", daysLeft: 75, date: "2026-08-15" }];
    container.innerHTML = exams.map(exam => `<div class="exam-card"><div><div class="exam-name">${exam.name}</div><div class="exam-date">📅 ${exam.date}</div></div><div class="exam-days ${exam.daysLeft < 30 ? 'urgent' : ''}">${exam.daysLeft} days left</div></div>`).join('');
}

window.generateStudyPlan = function() {
    const modal = document.getElementById('studyPlanModal');
    const content = document.getElementById('planContent');
    const daysLeft = 45;
    const chaptersPerDay = Math.ceil(50 / daysLeft);
    content.innerHTML = `<div><h3>📚 Your Personalized Study Plan</h3><p>Class: ${userData?.class || "Class 10"} | Days until exam: ${daysLeft}</p><div style="display:flex;gap:15px;margin:20px 0;"><div>📖 50 Chapters</div><div>📅 ${daysLeft} Days</div><div>⭐ ${chaptersPerDay}/day</div></div><div style="background:#e8f5e9;padding:15px;border-radius:12px;"><i class="fas fa-lightbulb"></i> <strong>Tip:</strong> Study ${chaptersPerDay} chapters daily to complete syllabus on time!</div><button class="plan-btn" style="margin-top:20px;" onclick="closeStudyPlan()">Close</button></div>`;
    modal.style.display = 'flex';
};

window.closeStudyPlan = function() {
    document.getElementById('studyPlanModal').style.display = 'none';
};