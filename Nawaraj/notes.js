let currentClass = null;
let currentSubject = null;

// ============================================
// PUT YOUR GOOGLE DRIVE FILE IDs HERE
// Replace "YOUR_FILE_ID_HERE" with actual IDs
// ============================================

const driveFiles = {
    // ========== CLASS 7 ==========
    "Class 7 - Nepali Grammar": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "45"
    },
    "Class 7 - English Grammar": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "50"
    },
    "Class 7 - Mathematics": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "40"
    },
    "Class 7 - Science": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "55"
    },
    "Class 7 - Social Studies": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "48"
    },
    
    // ========== CLASS 8 ==========
    "Class 8 - Nepali": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "52"
    },
    "Class 8 - Mathematics": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "58"
    },
    "Class 8 - Science": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "65"
    },
    
    // ========== CLASS 9 ==========
    "Class 9 - Science": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "75"
    },
    "Class 9 - Social Studies": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "62"
    },
    "Class 9 - English": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "80"
    },
    "Class 9 - Mathematics": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "90"
    },
    
    // ========== CLASS 10 (SEE) ==========
    "SEE English Guide": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "120"
    },
    "SEE Mathematics Guide": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "150"
    },
    "SEE Science Guide": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "180"
    },
    "SEE Social Guide": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "130"
    },
    "SEE Nepali Guide": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "100"
    },
    "SEE Health Guide": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "85"
    },
    
    // ========== CLASS 11 ==========
    "Class 11 English": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "95"
    },
    "Class 11 Mathematics": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "160"
    },
    "Class 11 Physics": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "140"
    },
    "Class 11 Chemistry": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "130"
    },
    "Class 11 Biology": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "120"
    },
    
    // ========== CLASS 12 ==========
    "Class 12 English": {
        fileId: "16-GdbrWP8wqjNhFuyyWXVhRgFeTzIca9",
        pages: "120"
    },
    "Class 12 Mathematics": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "200"
    },
    "Class 12 Physics": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "160"
    },
    "Class 12 Chemistry": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "150"
    },
    "Class 12 Biology": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "170"
    },
    "Class 12 Computer Science": {
        fileId: "YOUR_FILE_ID_HERE",
        pages: "110"
    }
};

// Complete data structure with notes
const notesData = {
    class7: {
        name: "Class 7",
        subjects: {
            nepali: {
                name: "नेपाली",
                icon: "🇳🇵",
                desc: "नेपाली भाषा र साहित्य",
                notes: [
                    { title: "Class 7 - Nepali Grammar", description: "शब्द वर्गीकरण, वाक्य निर्माण, सन्धि, समास" }
                ]
            },
            english: {
                name: "English",
                icon: "📖",
                desc: "English Language & Literature",
                notes: [
                    { title: "Class 7 - English Grammar", description: "Tenses, Parts of Speech, Sentence Structure" }
                ]
            },
            math: {
                name: "Mathematics",
                icon: "📐",
                desc: "Algebra, Geometry & Arithmetic",
                notes: [
                    { title: "Class 7 - Mathematics", description: "Integers, fractions, decimals, ratio & proportion" }
                ]
            },
            science: {
                name: "Science",
                icon: "🔬",
                desc: "Physics, Chemistry & Biology",
                notes: [
                    { title: "Class 7 - Science", description: "Matter, energy, living things" }
                ]
            },
            social: {
                name: "Social Studies",
                icon: "🌍",
                desc: "History, Geography & Civics",
                notes: [
                    { title: "Class 7 - Social Studies", description: "Ancient history, map reading, citizenship" }
                ]
            }
        }
    },
    class8: {
        name: "Class 8",
        subjects: {
            nepali: { name: "नेपाली", icon: "🇳🇵", desc: "नेपाली साहित्य र व्याकरण", notes: [{ title: "Class 8 - Nepali", description: "कविता, कथा, निबन्ध, पत्र लेखन" }] },
            math: { name: "Mathematics", icon: "📐", desc: "Algebra, Geometry & Statistics", notes: [{ title: "Class 8 - Mathematics", description: "Linear equations, angles, triangles, data handling" }] },
            science: { name: "Science", icon: "🔬", desc: "Physics, Chemistry & Biology", notes: [{ title: "Class 8 - Science", description: "Complete science notes" }] }
        }
    },
    class9: {
        name: "Class 9",
        subjects: {
            english: { name: "English", icon: "📖", desc: "Literature & Language", notes: [{ title: "Class 9 - English", description: "Poems, stories, grammar" }] },
            math: { name: "Mathematics", icon: "📐", desc: "Advanced Mathematics", notes: [{ title: "Class 9 - Mathematics", description: "Set, algebra, geometry" }] },
            science: { name: "Science", icon: "🔬", desc: "Physics, Chemistry & Biology", notes: [{ title: "Class 9 - Science", description: "Motion, force, atomic structure" }] },
            social: { name: "Social Studies", icon: "🌍", desc: "History, Geography & Civics", notes: [{ title: "Class 9 - Social Studies", description: "Unification of Nepal" }] }
        }
    },
    class10: {
        name: "Class 10 (SEE)",
        subjects: {
            nepali: { name: "नेपाली", icon: "🇳🇵", desc: "SEE Nepali", notes: [{ title: "SEE Nepali Guide", description: "व्याकरण, कथा, कविता" }] },
            english: { name: "English", icon: "📖", desc: "SEE Preparation", notes: [{ title: "SEE English Guide", description: "Reading, grammar, writing" }] },
            math: { name: "Mathematics", icon: "📐", desc: "SEE Mathematics", notes: [{ title: "SEE Mathematics Guide", description: "Algebra, geometry, trigonometry" }] },
            science: { name: "Science", icon: "🔬", desc: "SEE Science", notes: [{ title: "SEE Science Guide", description: "Physics, chemistry, biology" }] },
            social: { name: "Social Studies", icon: "🌍", desc: "SEE Social", notes: [{ title: "SEE Social Guide", description: "History, geography, civics" }] },
            health: { name: "Health", icon: "💪", desc: "SEE Health", notes: [{ title: "SEE Health Guide", description: "Health education" }] }
        }
    },
    class11: {
        name: "Class 11",
        subjects: {
            english: { name: "English", icon: "📖", desc: "NEB English", notes: [{ title: "Class 11 English", description: "Poems, stories, essays" }] },
            math: { name: "Mathematics", icon: "📐", desc: "NEB Mathematics", notes: [{ title: "Class 11 Mathematics", description: "Sets, functions, limits" }] },
            physics: { name: "Physics", icon: "⚡", desc: "NEB Physics", notes: [{ title: "Class 11 Physics", description: "Mechanics, heat, waves" }] },
            chemistry: { name: "Chemistry", icon: "🧪", desc: "NEB Chemistry", notes: [{ title: "Class 11 Chemistry", description: "Atomic structure, bonding" }] },
            biology: { name: "Biology", icon: "🧬", desc: "NEB Biology", notes: [{ title: "Class 11 Biology", description: "Botany, zoology" }] }
        }
    },
    class12: {
        name: "Class 12",
        subjects: {
            english: { name: "English", icon: "📖", desc: "NEB English", notes: [{ title: "Class 12 English", description: "Short stories, poems, essays" }] },
            math: { name: "Mathematics", icon: "📐", desc: "NEB Mathematics", notes: [{ title: "Class 12 Mathematics", description: "Calculus, algebra, vectors" }] },
            physics: { name: "Physics", icon: "⚡", desc: "NEB Physics", notes: [{ title: "Class 12 Physics", description: "Electrostatics, magnetism" }] },
            chemistry: { name: "Chemistry", icon: "🧪", desc: "NEB Chemistry", notes: [{ title: "Class 12 Chemistry", description: "Physical, organic, inorganic" }] },
            biology: { name: "Biology", icon: "🧬", desc: "NEB Biology", notes: [{ title: "Class 12 Biology", description: "Genetics, ecology" }] },
            computer: { name: "Computer Science", icon: "💻", desc: "Optional Subject", notes: [{ title: "Class 12 Computer Science", description: "Programming, database, networking" }] }
        }
    }
};

// ============================================
// DOWNLOAD FUNCTION - Opens Google Drive direct download
// ============================================
function downloadNote(noteName) {
    const note = driveFiles[noteName];
    if (note && note.fileId) {
        // Direct download from Google Drive
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${note.fileId}`;
        window.open(downloadUrl, '_blank');
    } else {
        alert(`📢 "${noteName}" will be available soon! We're adding more notes daily.`);
    }
}

// ============================================
// PREVIEW FUNCTION with SHARE OPTION
// ============================================
function previewNote(noteName) {
    const note = driveFiles[noteName];
    const modal = document.getElementById('previewModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    // Get current page URL for sharing
    const currentUrl = window.location.href;
    const shareText = `Check out "${noteName}" on Gyanu Notes - Free educational resource for Nepali students! 📚`;
    
    if (note && note.fileId) {
        const embedUrl = `https://drive.google.com/file/d/${note.fileId}/preview`;
        const directLink = `https://drive.google.com/uc?export=download&id=${note.fileId}`;
        
        modalTitle.innerText = `📖 ${noteName}`;
        modalBody.innerHTML = `
            <div style="padding: 10px;">
                <!-- Note Info Bar -->
                <div style="background: #f0f7ff; padding: 12px; border-radius: 8px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <span>📄 ${note.pages} pages</span>
                        <span style="margin-left: 15px;">📚 CDC/NEB Curriculum</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="copyShareLink('${noteName}', '${directLink}')" 
                                style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; font-size: 0.85rem;">
                            🔗 Copy Link
                        </button>
                        <button onclick="shareViaWhatsApp('${noteName}', '${directLink}')" 
                                style="background: #25D366; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; font-size: 0.85rem;">
                            📱 WhatsApp
                        </button>
                    </div>
                </div>
                
                <!-- PDF Embed -->
                <iframe 
                    src="${embedUrl}"
                    width="100%" 
                    height="500px" 
                    style="border: none; border-radius: 8px; background: white;">
                </iframe>
                
                <!-- Action Buttons -->
                <div style="margin-top: 20px; text-align: center; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="downloadNote('${noteName}')" 
                            style="background: #0077b6; color: white; border: none; padding: 12px 28px; border-radius: 30px; cursor: pointer; font-size: 1rem;">
                        📥 Download Full PDF
                    </button>
                    <button onclick="shareNote('${noteName}', '${directLink}')" 
                            style="background: #17a2b8; color: white; border: none; padding: 12px 28px; border-radius: 30px; cursor: pointer; font-size: 1rem;">
                        🔗 Share this Note
                    </button>
                    <button onclick="closeModal()" 
                            style="background: #6c757d; color: white; border: none; padding: 12px 28px; border-radius: 30px; cursor: pointer; font-size: 1rem;">
                        Close
                    </button>
                </div>
                
                <!-- Share Toast Message -->
                <div id="shareToast" style="display: none; position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #28a745; color: white; padding: 12px 24px; border-radius: 30px; z-index: 1000; animation: fadeInOut 2s;">
                    ✓ Link copied to clipboard!
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    } else {
        modalTitle.innerText = `📖 ${noteName}`;
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 64px; margin-bottom: 20px;">📚</div>
                <h3>Coming Soon!</h3>
                <p>This note is being prepared and will be available soon.</p>
                <button onclick="closeModal()" 
                        style="background: #0077b6; color: white; border: none; padding: 10px 24px; border-radius: 25px; cursor: pointer; margin-top: 20px;">
                    Close
                </button>
            </div>
        `;
        modal.style.display = 'block';
    }
}

// ============================================
// SHARE FUNCTIONS
// ============================================

// Copy link to clipboard
function copyShareLink(noteName, directLink) {
    const shareUrl = directLink;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('✓ Link copied to clipboard! Share it with your friends 📚');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('✓ Link copied to clipboard! Share it with your friends 📚');
    });
}

// Share via WhatsApp
function shareViaWhatsApp(noteName, directLink) {
    const text = `📚 *${noteName}* - Free educational note from Gyanu Notes\n\nDownload link: ${directLink}\n\nVisit Gyanu Notes for more study materials! 📖`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}

// Share Note (Native share if available)
function shareNote(noteName, directLink) {
    const shareData = {
        title: `Gyanu Notes - ${noteName}`,
        text: `Check out "${noteName}" on Gyanu Notes! Free educational notes for Nepali students following CDC/NEB curriculum. 📚`,
        url: directLink
    };
    
    // Check if Web Share API is available (mobile devices)
    if (navigator.share) {
        navigator.share(shareData).catch(() => {
            // User cancelled or error
            copyShareLink(noteName, directLink);
        });
    } else {
        // Fallback to copy link
        copyShareLink(noteName, directLink);
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('shareToast');
    if (toast) {
        toast.style.display = 'block';
        toast.innerText = message;
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
    } else {
        alert(message);
    }
}

// Share from download button (alternative)
function shareNoteFromList(noteName) {
    const note = driveFiles[noteName];
    if (note && note.fileId) {
        const directLink = `https://drive.google.com/uc?export=download&id=${note.fileId}`;
        shareNote(noteName, directLink);
    }
}
// ============================================
// NAVIGATION FUNCTIONS
// ============================================
function selectClass(className) {
    currentClass = className;
    const classData = notesData[className];
    
    document.getElementById('classesView').style.display = 'none';
    document.getElementById('subjectsView').style.display = 'block';
    document.getElementById('notesView').style.display = 'none';
    document.getElementById('backButton').style.display = 'block';
    
    document.getElementById('selectedClassTitle').innerHTML = `📚 ${classData.name} - Select Subject`;
    
    const subjectsList = document.getElementById('subjectsList');
    const subjects = classData.subjects;
    
    subjectsList.innerHTML = Object.keys(subjects).map(subjectKey => `
        <div class="subject-item" onclick="selectSubject('${subjectKey}')">
            <div style="display: flex; align-items: center;">
                <div class="subject-icon">${subjects[subjectKey].icon}</div>
                <div class="subject-info">
                    <div class="subject-name">${subjects[subjectKey].name}</div>
                    <div class="subject-desc">${subjects[subjectKey].desc}</div>
                </div>
            </div>
            <div class="subject-count">${subjects[subjectKey].notes.length} notes</div>
        </div>
    `).join('');
}

function selectSubject(subjectKey) {
    currentSubject = subjectKey;
    const classData = notesData[currentClass];
    const subjectData = classData.subjects[subjectKey];
    
    document.getElementById('subjectsView').style.display = 'none';
    document.getElementById('notesView').style.display = 'block';
    
    document.getElementById('selectedSubjectTitle').innerHTML = `${subjectData.icon} ${classData.name} - ${subjectData.name} Notes`;
    
    const notesList = document.getElementById('notesList');
    const notes = subjectData.notes;
    
    notesList.innerHTML = notes.map((note, index) => {
        const fileInfo = driveFiles[note.title];
        const pages = fileInfo ? fileInfo.pages : "?";
        return `
            <div class="note-row">
                <div class="note-info">
                    <div class="note-title">${index + 1}. ${note.title}</div>
                    <div class="note-meta">
                        <span>📄 ${pages} pages</span>
                        <span>📚 CDC/NEB Curriculum</span>
                    </div>
                    <div class="note-desc" style="font-size: 0.85rem; color: #888; margin-top: 5px;">${note.description}</div>
                </div>
                <div class="note-actions">
                    <button class="download-btn" onclick="downloadNote('${note.title}')">📥 Download</button>
                    <button class="preview-btn" onclick="previewNote('${note.title}')">👁️ Preview</button>
                    <button class="share-btn" onclick="shareNoteFromList('${note.title}')">🔗 Share</button>
                </div>
            </div>
        `;
    }).join('');
}

function showClasses() {
    document.getElementById('classesView').style.display = 'block';
    document.getElementById('subjectsView').style.display = 'none';
    document.getElementById('notesView').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
    currentClass = null;
    currentSubject = null;
}

function showSubjects() {
    document.getElementById('subjectsView').style.display = 'block';
    document.getElementById('notesView').style.display = 'none';
}

function closeModal() {
    document.getElementById('previewModal').style.display = 'none';
}

function downloadFromModal() {
    const modalTitle = document.getElementById('modalTitle').innerText.replace('📖 ', '');
    closeModal();
    downloadNote(modalTitle);
}

window.onclick = function(event) {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        closeModal();
    }
}