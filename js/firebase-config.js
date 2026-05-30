/* ============================================
   GYANU NOTES - FIREBASE CONFIGURATION
   Replace with your own Firebase project keys
   ============================================ */

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    arrayUnion,
    arrayRemove
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ========== FIREBASE CONFIGURATION ==========
// REPLACE THESE WITH YOUR OWN FIREBASE PROJECT KEYS
// Get them from: https://console.firebase.google.com/
  const firebaseConfig = {
  apiKey: "AIzaSyA-QLb54wT2y-k4W3GUrsxB9SA-WFZ_03w",
  authDomain: "gyanu-notes-6f6d8.firebaseapp.com",
  projectId: "gyanu-notes-6f6d8",
  storageBucket: "gyanu-notes-6f6d8.firebasestorage.app",
  messagingSenderId: "149239448624",
  appId: "1:149239448624:web:4e4695a7d557dce234d9f5",
  measurementId: "G-WM3DLZTBPN"
};

// ========== INITIALIZE FIREBASE ==========
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// ========== EXPORT FOR USE IN OTHER FILES ==========
export { 
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
    setDoc, 
    getDoc, 
    updateDoc,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    arrayUnion,
    arrayRemove
};

// ========== HELPER FUNCTIONS ==========

// Save user data to Firestore after signup/login
export async function saveUserToFirestore(user, additionalData = {}) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
        await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName || additionalData.name || "Student",
            email: user.email,
            photoURL: user.photoURL || null,
            createdAt: new Date().toISOString(),
            class: additionalData.class || "Class 10",
            board: additionalData.board || "NEB",
            language: additionalData.language || "English",
            dailyGoal: 2,
            studyStreak: 0,
            lastLoginDate: new Date().toISOString(),
            totalStudyTime: 0,
            completedChapters: [],
            savedNotes: [],
            badges: [],
            preferences: {
                theme: "light",
                fontSize: "medium",
                animations: true,
                compactView: false
            },
            notifications: {
                email: true,
                newNotes: true,
                weeklyReport: false,
                examReminders: true
            }
        });
    } else {
        await updateDoc(userRef, {
            lastLoginDate: new Date().toISOString()
        });
    }
    return userRef;
}

// Get user data from Firestore
export async function getUserData(uid) {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        return userDoc.data();
    }
    return null;
}

// Update user data
export async function updateUserData(uid, data) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
}

// Save a note to user's favorites
export async function saveNote(uid, noteId, noteData) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        savedNotes: arrayUnion({
            id: noteId,
            title: noteData.title,
            subject: noteData.subject,
            class: noteData.class,
            savedAt: new Date().toISOString()
        })
    });
}

// Remove a note from favorites
export async function removeSavedNote(uid, noteId) {
    const userRef = doc(db, "users", uid);
    const userData = await getUserData(uid);
    const noteToRemove = userData.savedNotes?.find(n => n.id === noteId);
    if (noteToRemove) {
        await updateDoc(userRef, {
            savedNotes: arrayRemove(noteToRemove)
        });
    }
}

// Mark chapter as completed
export async function markChapterComplete(uid, chapterId, chapterData) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        completedChapters: arrayUnion({
            id: chapterId,
            title: chapterData.title,
            subject: chapterData.subject,
            class: chapterData.class,
            completedAt: new Date().toISOString()
        })
    });
    await updateStudyStreak(uid);
}

// Update study streak
export async function updateStudyStreak(uid) {
    const userData = await getUserData(uid);
    if (!userData) return;
    
    const lastLogin = new Date(userData.lastLoginDate);
    const today = new Date();
    const diffDays = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));
    
    let newStreak = userData.studyStreak || 0;
    if (diffDays === 1) {
        newStreak++;
    } else if (diffDays > 1) {
        newStreak = 1;
    }
    
    await updateUserData(uid, {
        studyStreak: newStreak,
        lastLoginDate: today.toISOString()
    });
    
    await checkBadges(uid, newStreak);
}

// Check and award badges
export async function checkBadges(uid, streak) {
    const userData = await getUserData(uid);
    const currentBadges = userData.badges || [];
    const newBadges = [];
    
    if (streak >= 7 && !currentBadges.includes("7_day_streak")) {
        newBadges.push("7_day_streak");
    }
    if (streak >= 30 && !currentBadges.includes("30_day_streak")) {
        newBadges.push("30_day_streak");
    }
    
    const completedCount = userData.completedChapters?.length || 0;
    if (completedCount >= 5 && !currentBadges.includes("5_chapters")) {
        newBadges.push("5_chapters");
    }
    if (completedCount >= 25 && !currentBadges.includes("25_chapters")) {
        newBadges.push("25_chapters");
    }
    if (completedCount >= 50 && !currentBadges.includes("50_chapters")) {
        newBadges.push("50_chapters");
    }
    
    if (newBadges.length > 0) {
        await updateUserData(uid, {
            badges: [...currentBadges, ...newBadges]
        });
    }
}

// Get badge display info
export function getBadgeInfo(badgeId) {
    const badges = {
        "7_day_streak": { name: "🔥 7 Day Streak", icon: "🔥", description: "Studied for 7 days in a row" },
        "30_day_streak": { name: "⭐ 30 Day Streak", icon: "⭐", description: "Studied for 30 days in a row" },
        "5_chapters": { name: "📚 5 Chapters", icon: "📚", description: "Completed 5 chapters" },
        "25_chapters": { name: "🎓 25 Chapters", icon: "🎓", description: "Completed 25 chapters" },
        "50_chapters": { name: "🏆 50 Chapters", icon: "🏆", description: "Completed 50 chapters" }
    };
    return badges[badgeId] || { name: badgeId, icon: "🏅", description: "" };
}

// Logout function
export async function logoutUser() {
    try {
        await signOut(auth);
        window.location.href = "index.html";
    } catch (error) {
        console.error("Logout error:", error);
    }
}