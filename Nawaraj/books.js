let currentClass = null;
let currentSubject = null;

// ============================================
// GOOGLE DRIVE FILE IDs FOR BOOKS
// Replace "YOUR_FILE_ID_HERE" with actual IDs
// ============================================

const driveFiles = {
    // ========== CLASS 7 BOOKS ==========
    "Class 7 English Book": { fileId: "YOUR_FILE_ID_HERE", pages: "120", author: "CDC Nepal" },
    "Class 7 Math Book": { fileId: "YOUR_FILE_ID_HERE", pages: "150", author: "CDC Nepal" },
    "Class 7 Science Book": { fileId: "YOUR_FILE_ID_HERE", pages: "140", author: "CDC Nepal" },
    
    // ========== CLASS 8 BOOKS ==========
    "Class 8 English Book": { fileId: "YOUR_FILE_ID_HERE", pages: "135", author: "CDC Nepal" },
    "Class 8 Math Book": { fileId: "YOUR_FILE_ID_HERE", pages: "160", author: "CDC Nepal" },
    
    // ========== CLASS 9 BOOKS ==========
    "Class 9 English Book": { fileId: "YOUR_FILE_ID_HERE", pages: "145", author: "CDC Nepal" },
    "Class 9 Math Book": { fileId: "YOUR_FILE_ID_HERE", pages: "170", author: "CDC Nepal" },
    "Class 9 Science Book": { fileId: "YOUR_FILE_ID_HERE", pages: "165", author: "CDC Nepal" },
    
    // ========== CLASS 10 (SEE) BOOKS ==========
    "SEE English Reference Book": { fileId: "YOUR_FILE_ID_HERE", pages: "200", author: "Asmita Publication" },
    "SEE Math Reference Book": { fileId: "YOUR_FILE_ID_HERE", pages: "250", author: "Asmita Publication" },
    "SEE Science Reference Book": { fileId: "YOUR_FILE_ID_HERE", pages: "220", author: "Asmita Publication" },
    "SEE Social Reference Book": { fileId: "YOUR_FILE_ID_HERE", pages: "180", author: "Asmita Publication" },
    "SEE Nepali Reference Book": { fileId: "YOUR_FILE_ID_HERE", pages: "160", author: "Asmita Publication" },
    "SEE Health Book": { fileId: "YOUR_FILE_ID_HERE", pages: "140", author: "CDC Nepal" },
    
    // ========== CLASS 11 BOOKS ==========
    "Class 11 English Book": { fileId: "YOUR_FILE_ID_HERE", pages: "180", author: "NEB" },
    "Class 11 Math Book": { fileId: "YOUR_FILE_ID_HERE", pages: "280", author: "NEB" },
    "Class 11 Physics Book": { fileId: "YOUR_FILE_ID_HERE", pages: "250", author: "NEB" },
    "Class 11 Chemistry Book": { fileId: "YOUR_FILE_ID_HERE", pages: "240", author: "NEB" },
    "Class 11 Biology Book": { fileId: "YOUR_FILE_ID_HERE", pages: "230", author: "NEB" },
    
    // ========== CLASS 12 BOOKS ==========
    "Class 12 English Book": { fileId: "YOUR_FILE_ID_HERE", pages: "200", author: "NEB" },
    "Class 12 Math Book": { fileId: "YOUR_FILE_ID_HERE", pages: "320", author: "NEB" },
    "Class 12 Physics Book": { fileId: "YOUR_FILE_ID_HERE", pages: "280", author: "NEB" },
    "Class 12 Chemistry Book": { fileId: "YOUR_FILE_ID_HERE", pages: "260", author: "NEB" },
    "Class 12 Biology Book": { fileId: "YOUR_FILE_ID_HERE", pages: "250", author: "NEB" },
    "Class 12 Computer Science Book": { fileId: "YOUR_FILE_ID_HERE", pages: "200", author: "NEB" }
};

// Books Data Structure
const booksData = {
    class7: {
        name: "Class 7",
        subjects: {
            english: { name: "English", icon: "📖", desc: "Nepali Curriculum", books: [{ title: "Class 7 English Book", description: "CDC Nepal English Textbook for Class 7" }] },
            math: { name: "Mathematics", icon: "📐", desc: "Nepali Curriculum", books: [{ title: "Class 7 Math Book", description: "CDC Nepal Mathematics Textbook" }] },
            science: { name: "Science", icon: "🔬", desc: "Nepali Curriculum", books: [{ title: "Class 7 Science Book", description: "CDC Nepal Science Textbook" }] }
        }
    },
    class8: {
        name: "Class 8",
        subjects: {
            english: { name: "English", icon: "📖", desc: "Nepali Curriculum", books: [{ title: "Class 8 English Book", description: "CDC Nepal English Textbook" }] },
            math: { name: "Mathematics", icon: "📐", desc: "Nepali Curriculum", books: [{ title: "Class 8 Math Book", description: "CDC Nepal Mathematics Textbook" }] }
        }
    },
    class9: {
        name: "Class 9",
        subjects: {
            english: { name: "English", icon: "📖", desc: "Nepali Curriculum", books: [{ title: "Class 9 English Book", description: "CDC Nepal English Textbook" }] },
            math: { name: "Mathematics", icon: "📐", desc: "Nepali Curriculum", books: [{ title: "Class 9 Math Book", description: "CDC Nepal Mathematics Textbook" }] },
            science: { name: "Science", icon: "🔬", desc: "Nepali Curriculum", books: [{ title: "Class 9 Science Book", description: "CDC Nepal Science Textbook" }] }
        }
    },
    class10: {
        name: "Class 10 (SEE)",
        subjects: {
            english: { name: "English", icon: "📖", desc: "SEE Reference", books: [{ title: "SEE English Reference Book", description: "Complete SEE English preparation" }] },
            math: { name: "Mathematics", icon: "📐", desc: "SEE Reference", books: [{ title: "SEE Math Reference Book", description: "Complete SEE Math preparation" }] },
            science: { name: "Science", icon: "🔬", desc: "SEE Reference", books: [{ title: "SEE Science Reference Book", description: "Complete SEE Science preparation" }] },
            social: { name: "Social Studies", icon: "🌍", desc: "SEE Reference", books: [{ title: "SEE Social Reference Book", description: "Complete SEE Social preparation" }] },
            nepali: { name: "नेपाली", icon: "🇳🇵", desc: "SEE Reference", books: [{ title: "SEE Nepali Reference Book", description: "Complete SEE Nepali preparation" }] },
            health: { name: "Health", icon: "💪", desc: "SEE Health", books: [{ title: "SEE Health Book", description: "Health and Physical Education" }] }
        }
    },
    class11: {
        name: "Class 11",
        subjects: {
            english: { name: "English", icon: "📖", desc: "NEB Curriculum", books: [{ title: "Class 11 English Book", description: "NEB English Textbook" }] },
            math: { name: "Mathematics", icon: "📐", desc: "NEB Curriculum", books: [{ title: "Class 11 Math Book", description: "NEB Mathematics Textbook" }] },
            physics: { name: "Physics", icon: "⚡", desc: "NEB Curriculum", books: [{ title: "Class 11 Physics Book", description: "NEB Physics Textbook" }] },
            chemistry: { name: "Chemistry", icon: "🧪", desc: "NEB Curriculum", books: [{ title: "Class 11 Chemistry Book", description: "NEB Chemistry Textbook" }] },
            biology: { name: "Biology", icon: "🧬", desc: "NEB Curriculum", books: [{ title: "Class 11 Biology Book", description: "NEB Biology Textbook" }] }
        }
    },
    class12: {
        name: "Class 12",
        subjects: {
            english: { name: "English", icon: "📖", desc: "NEB Curriculum", books: [{ title: "Class 12 English Book", description: "NEB English Textbook" }] },
            math: { name: "Mathematics", icon: "📐", desc: "NEB Curriculum", books: [{ title: "Class 12 Math Book", description: "NEB Mathematics Textbook" }] },
            physics: { name: "Physics", icon: "⚡", desc: "NEB Curriculum", books: [{ title: "Class 12 Physics Book", description: "NEB Physics Textbook" }] },
            chemistry: { name: "Chemistry", icon: "🧪", desc: "NEB Curriculum", books: [{ title: "Class 12 Chemistry Book", description: "NEB Chemistry Textbook" }] },
            biology: { name: "Biology", icon: "🧬", desc: "NEB Curriculum", books: [{ title: "Class 12 Biology Book", description: "NEB Biology Textbook" }] },
            computer: { name: "Computer Science", icon: "💻", desc: "Optional Subject", books: [{ title: "Class 12 Computer Science Book", description: "NEB Computer Science Textbook" }] }
        }
    }
};

// ============================================
// FUNCTIONS
// ============================================

function selectClass(className) {
    currentClass = className;
    const classData = booksData[className];
    
    document.getElementById('classesView').style.display = 'none';
    document.getElementById('subjectsView').style.display = 'block';
    document.getElementById('booksView').style.display = 'none';
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
            <div class="subject-count">${subjects[subjectKey].books.length} books</div>
        </div>
    `).join('');
}

function selectSubject(subjectKey) {
    currentSubject = subjectKey;
    const classData = booksData[currentClass];
    const subjectData = classData.subjects[subjectKey];
    
    document.getElementById('subjectsView').style.display = 'none';
    document.getElementById('booksView').style.display = 'block';
    
    document.getElementById('selectedSubjectTitle').innerHTML = `${subjectData.icon} ${classData.name} - ${subjectData.name} Books`;
    
    const booksList = document.getElementById('booksList');
    const books = subjectData.books;
    
    booksList.innerHTML = books.map((book, index) => {
        const fileInfo = driveFiles[book.title];
        const pages = fileInfo ? fileInfo.pages : "?";
        const author = fileInfo ? fileInfo.author : "CDC/NEB";
        return `
            <div class="book-row">
                <div class="book-cover">
                    <div class="book-icon">📚</div>
                </div>
                <div class="book-info">
                    <div class="book-title">${index + 1}. ${book.title}</div>
                    <div class="book-author">✍️ ${author}</div>
                    <div class="book-meta">
                        <span>📄 ${pages} pages</span>
                        <span>📚 Curriculum: CDC/NEB</span>
                    </div>
                    <div class="book-desc" style="font-size: 0.85rem; color: #888; margin-top: 8px;">${book.description}</div>
                </div>
                <div class="book-actions">
                    <button class="download-btn" onclick="downloadBook('${book.title}')">📥 Download</button>
                    <button class="preview-btn" onclick="previewBook('${book.title}')">👁️ Preview</button>
                    <button class="share-btn" onclick="shareBook('${book.title}')">🔗 Share</button>
                </div>
            </div>
        `;
    }).join('');
}

function showClasses() {
    document.getElementById('classesView').style.display = 'block';
    document.getElementById('subjectsView').style.display = 'none';
    document.getElementById('booksView').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
    currentClass = null;
    currentSubject = null;
}

function showSubjects() {
    document.getElementById('subjectsView').style.display = 'block';
    document.getElementById('booksView').style.display = 'none';
}

function downloadBook(bookName) {
    const book = driveFiles[bookName];
    if (book && book.fileId) {
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${book.fileId}`;
        window.open(downloadUrl, '_blank');
    } else {
        alert(`📢 "${bookName}" will be available soon! We're adding more books daily.`);
    }
}

function previewBook(bookName) {
    const book = driveFiles[bookName];
    const modal = document.getElementById('previewModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (book && book.fileId) {
        const embedUrl = `https://drive.google.com/file/d/${book.fileId}/preview`;
        
        modalTitle.innerText = `📖 ${bookName}`;
        modalBody.innerHTML = `
            <div style="padding: 10px;">
                <div style="background: #f0fff4; padding: 12px; border-radius: 8px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <span>📄 ${book.pages} pages</span>
                        <span style="margin-left: 15px;">✍️ ${book.author}</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="copyBookLink('${bookName}')" 
                                style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer;">
                            🔗 Copy Link
                        </button>
                    </div>
                </div>
                <iframe 
                    src="${embedUrl}"
                    width="100%" 
                    height="500px" 
                    style="border: none; border-radius: 8px;">
                </iframe>
                <div style="margin-top: 20px; text-align: center; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="downloadBook('${bookName}')" 
                            style="background: #11998e; color: white; border: none; padding: 12px 28px; border-radius: 30px; cursor: pointer;">
                        📥 Download Full PDF
                    </button>
                    <button onclick="closeModal()" 
                            style="background: #6c757d; color: white; border: none; padding: 12px 28px; border-radius: 30px; cursor: pointer;">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    } else {
        modalTitle.innerText = `📖 ${bookName}`;
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 64px; margin-bottom: 20px;">📚</div>
                <h3>Coming Soon!</h3>
                <p>This book is being added to our library.</p>
                <button onclick="closeModal()" 
                        style="background: #11998e; color: white; border: none; padding: 10px 24px; border-radius: 25px; cursor: pointer; margin-top: 20px;">
                    Close
                </button>
            </div>
        `;
        modal.style.display = 'block';
    }
}

function shareBook(bookName) {
    const book = driveFiles[bookName];
    if (book && book.fileId) {
        const directLink = `https://drive.google.com/uc?export=download&id=${book.fileId}`;
        const shareText = `📚 *${bookName}* - Free reference book from Gyanu Notes\n\nDownload: ${directLink}\n\nVisit Gyanu Notes for more educational resources! 📖`;
        
        if (navigator.share) {
            navigator.share({
                title: `Gyanu Notes - ${bookName}`,
                text: `Check out "${bookName}" on Gyanu Notes! Free educational book.`,
                url: directLink
            }).catch(() => {
                copyBookLink(bookName);
            });
        } else {
            copyBookLink(bookName);
        }
    } else {
        alert(`Share link for "${bookName}" will be available soon!`);
    }
}

function copyBookLink(bookName) {
    const book = driveFiles[bookName];
    if (book && book.fileId) {
        const link = `https://drive.google.com/uc?export=download&id=${book.fileId}`;
        navigator.clipboard.writeText(link).then(() => {
            alert('✓ Link copied to clipboard! Share it with your friends 📚');
        });
    }
}

function closeModal() {
    document.getElementById('previewModal').style.display = 'none';
}

function downloadFromModal() {
    const modalTitle = document.getElementById('modalTitle').innerText.replace('📖 ', '');
    closeModal();
    downloadBook(modalTitle);
}

window.onclick = function(event) {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        closeModal();
    }
}