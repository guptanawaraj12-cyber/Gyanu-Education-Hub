/* ============================================
   GYANU NOTES - NOTES PAGE
   Search, filter, and display notes by class/subject
   ============================================ */

// ========== NOTES DATA STRUCTURE ==========
const notesData = {
    class8: {
        science: {
            name: "Science",
            chapters: [
                { id: "ch1", title: "Cell - Structure and Functions", pdf: true },
                { id: "ch2", title: "Microorganisms", pdf: true },
                { id: "ch3", title: "Materials in Daily Life", pdf: false },
                { id: "ch4", title: "Heat", pdf: true },
                { id: "ch5", title: "Light", pdf: false }
            ]
        },
        math: {
            name: "Mathematics",
            chapters: [
                { id: "ch1", title: "Sets", pdf: true },
                { id: "ch2", title: "Whole Numbers", pdf: true },
                { id: "ch3", title: "Fractions", pdf: false },
                { id: "ch4", title: "Ratio and Proportion", pdf: true }
            ]
        },
        english: {
            name: "English",
            chapters: [
                { id: "ch1", title: "The Rainbow", pdf: true },
                { id: "ch2", title: "The Gift", pdf: false },
                { id: "ch3", title: "Grammar - Tenses", pdf: true }
            ]
        },
        nepali: {
            name: "Nepali",
            chapters: [
                { id: "ch1", title: "बिरामी र कुकुर", pdf: true },
                { id: "ch2", title: "आमा", pdf: false }
            ]
        },
        social: {
            name: "Social Studies",
            chapters: [
                { id: "ch1", title: "Our Province", pdf: true },
                { id: "ch2", title: "Our National Heritage", pdf: false }
            ]
        },
        computer: {
            name: "Computer",
            chapters: [
                { id: "ch1", title: "Computer Fundamentals", pdf: true },
                { id: "ch2", title: "MS Word", pdf: true }
            ]
        }
    },
    class9: {
        science: {
            name: "Science",
            chapters: [
                { id: "ch1", title: "Motion", pdf: true },
                { id: "ch2", title: "Force and Laws of Motion", pdf: true },
                { id: "ch3", title: "Gravitation", pdf: false },
                { id: "ch4", title: "Work and Energy", pdf: true },
                { id: "ch5", title: "Sound", pdf: false }
            ]
        },
        math: {
            name: "Mathematics",
            chapters: [
                { id: "ch1", title: "Number System", pdf: true },
                { id: "ch2", title: "Polynomials", pdf: true },
                { id: "ch3", title: "Coordinate Geometry", pdf: false },
                { id: "ch4", title: "Linear Equations", pdf: true }
            ]
        },
        english: {
            name: "English",
            chapters: [
                { id: "ch1", title: "The Fun They Had", pdf: true },
                { id: "ch2", title: "The Sound of Music", pdf: true },
                { id: "ch3", title: "The Little Girl", pdf: false }
            ]
        },
        nepali: {
            name: "Nepali",
            chapters: [
                { id: "ch1", title: "उजेली", pdf: true },
                { id: "ch2", title: "असल मानिस", pdf: false }
            ]
        },
        social: {
            name: "Social Studies",
            chapters: [
                { id: "ch1", title: "Our Tradition", pdf: true },
                { id: "ch2", title: "World History", pdf: false }
            ]
        },
        computer: {
            name: "Computer",
            chapters: [
                { id: "ch1", title: "Computer System", pdf: true },
                { id: "ch2", title: "Internet", pdf: true }
            ]
        }
    },
    class10: {
        science: {
            name: "Science",
            chapters: [
                { id: "ch1", title: "Chemical Reactions and Equations", pdf: true, popular: true, views: 1234 },
                { id: "ch2", title: "Acids, Bases and Salts", pdf: true, popular: true, views: 987 },
                { id: "ch3", title: "Metals and Non-metals", pdf: true, views: 756 },
                { id: "ch4", title: "Carbon and Its Compounds", pdf: false, views: 654 },
                { id: "ch5", title: "Periodic Classification", pdf: true, views: 543 },
                { id: "ch6", title: "Life Processes", pdf: true, popular: true, views: 1122 },
                { id: "ch7", title: "Control and Coordination", pdf: false, views: 432 },
                { id: "ch8", title: "How do Organisms Reproduce?", pdf: true, views: 876 },
                { id: "ch9", title: "Heredity and Evolution", pdf: true, views: 654 },
                { id: "ch10", title: "Light - Reflection and Refraction", pdf: true, views: 987 },
                { id: "ch11", title: "Human Eye", pdf: false, views: 345 },
                { id: "ch12", title: "Electricity", pdf: true, views: 765 },
                { id: "ch13", title: "Magnetic Effects", pdf: true, views: 543 },
                { id: "ch14", title: "Sources of Energy", pdf: false, views: 321 },
                { id: "ch15", title: "Our Environment", pdf: true, views: 456 }
            ]
        },
        math: {
            name: "Mathematics",
            chapters: [
                { id: "ch1", title: "Real Numbers", pdf: true, popular: true, views: 987 },
                { id: "ch2", title: "Polynomials", pdf: true, views: 765 },
                { id: "ch3", title: "Pair of Linear Equations", pdf: true, views: 654 },
                { id: "ch4", title: "Quadratic Equations", pdf: false, views: 543 },
                { id: "ch5", title: "Arithmetic Progressions", pdf: true, views: 432 },
                { id: "ch6", title: "Triangles", pdf: true, views: 876 },
                { id: "ch7", title: "Coordinate Geometry", pdf: true, views: 654 },
                { id: "ch8", title: "Trigonometry", pdf: true, popular: true, views: 1098 },
                { id: "ch9", title: "Applications of Trigonometry", pdf: false, views: 432 },
                { id: "ch10", title: "Circles", pdf: true, views: 543 },
                { id: "ch11", title: "Constructions", pdf: false, views: 321 },
                { id: "ch12", title: "Areas Related to Circles", pdf: true, views: 456 },
                { id: "ch13", title: "Surface Areas and Volumes", pdf: true, views: 654 },
                { id: "ch14", title: "Statistics", pdf: true, views: 543 },
                { id: "ch15", title: "Probability", pdf: true, views: 432 }
            ]
        },
        english: {
            name: "English",
            chapters: [
                { id: "ch1", title: "A Letter to God", pdf: true, views: 567 },
                { id: "ch2", title: "Nelson Mandela", pdf: true, views: 456 },
                { id: "ch3", title: "Two Stories about Flying", pdf: false, views: 345 }
            ]
        },
        nepali: {
            name: "Nepali",
            chapters: [
                { id: "ch1", title: "जन्मभूमि", pdf: true, views: 432 },
                { id: "ch2", title: "गाउँको माया", pdf: false, views: 321 }
            ]
        },
        social: {
            name: "Social Studies",
            chapters: [
                { id: "ch1", title: "We and Our Society", pdf: true, views: 543 },
                { id: "ch2", title: "Our Infrastructure", pdf: false, views: 432 }
            ]
        },
        computer: {
            name: "Computer",
            chapters: [
                { id: "ch1", title: "Computer Networking", pdf: true, views: 654 },
                { id: "ch2", title: "HTML and CSS", pdf: true, views: 543 }
            ]
        }
    },
    class11: {
        physics: {
            name: "Physics",
            chapters: [
                { id: "ch1", title: "Physical World", pdf: true },
                { id: "ch2", title: "Units and Measurements", pdf: true },
                { id: "ch3", title: "Motion in Straight Line", pdf: false },
                { id: "ch4", title: "Motion in a Plane", pdf: true },
                { id: "ch5", title: "Laws of Motion", pdf: true }
            ]
        },
        chemistry: {
            name: "Chemistry",
            chapters: [
                { id: "ch1", title: "Some Basic Concepts", pdf: true },
                { id: "ch2", title: "Structure of Atom", pdf: true },
                { id: "ch3", title: "Classification of Elements", pdf: false }
            ]
        },
        biology: {
            name: "Biology",
            chapters: [
                { id: "ch1", title: "The Living World", pdf: true },
                { id: "ch2", title: "Biological Classification", pdf: true },
                { id: "ch3", title: "Plant Kingdom", pdf: false }
            ]
        },
        math: {
            name: "Mathematics",
            chapters: [
                { id: "ch1", title: "Sets", pdf: true },
                { id: "ch2", title: "Relations and Functions", pdf: true },
                { id: "ch3", title: "Trigonometric Functions", pdf: false }
            ]
        }
    },
    class12: {
        physics: {
            name: "Physics",
            chapters: [
                { id: "ch1", title: "Electric Charges and Fields", pdf: true },
                { id: "ch2", title: "Electrostatic Potential", pdf: true },
                { id: "ch3", title: "Current Electricity", pdf: false },
                { id: "ch4", title: "Moving Charges", pdf: true },
                { id: "ch5", title: "Magnetism and Matter", pdf: true }
            ]
        },
        chemistry: {
            name: "Chemistry",
            chapters: [
                { id: "ch1", title: "Solid State", pdf: true },
                { id: "ch2", title: "Solutions", pdf: true },
                { id: "ch3", title: "Electrochemistry", pdf: false }
            ]
        },
        biology: {
            name: "Biology",
            chapters: [
                { id: "ch1", title: "Reproduction in Organisms", pdf: true },
                { id: "ch2", title: "Sexual Reproduction", pdf: true },
                { id: "ch3", title: "Human Reproduction", pdf: false }
            ]
        },
        math: {
            name: "Mathematics",
            chapters: [
                { id: "ch1", title: "Relations and Functions", pdf: true },
                { id: "ch2", title: "Inverse Trigonometric", pdf: true },
                { id: "ch3", title: "Matrices", pdf: false }
            ]
        }
    }
};

// ========== INITIALIZE NOTES PAGE ==========
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const selectedClass = urlParams.get('class');
    const selectedSubject = urlParams.get('subject');
    
    // Load notes based on parameters
    if (selectedClass && notesData[selectedClass]) {
        loadClassNotes(selectedClass, selectedSubject);
    } else {
        loadAllClassesOverview();
    }
    
    // Initialize search
    initNotesSearch();
    
    // Initialize class filter buttons
    initClassFilters();
});

// ========== LOAD ALL CLASSES OVERVIEW ==========
function loadAllClassesOverview() {
    const container = document.getElementById('notesContainer');
    if (!container) return;
    
    const classes = ['class8', 'class9', 'class10', 'class11', 'class12'];
    const classNames = {
        class8: 'Class 8',
        class9: 'Class 9',
        class10: 'Class 10 (SEE)',
        class11: 'Class 11',
        class12: 'Class 12'
    };
    
    container.innerHTML = classes.map(className => {
        const classData = notesData[className];
        if (!classData) return '';
        
        const subjects = Object.keys(classData);
        
        return `
            <div class="class-section" data-class="${className}">
                <h2 class="class-title">${classNames[className]}</h2>
                <div class="subjects-grid">
                    ${subjects.map(subject => `
                        <div class="subject-card" data-class="${className}" data-subject="${subject}">
                            <i class="fas ${getSubjectIcon(subject)}"></i>
                            <h3>${classData[subject].name}</h3>
                            <p>${classData[subject].chapters.length} chapters</p>
                            <button class="view-subject-btn">View Notes →</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const className = card.getAttribute('data-class');
            const subject = card.getAttribute('data-subject');
            window.location.href = `notes.html?class=${className}&subject=${subject}`;
        });
    });
    // After rendering overview, check which subjects have missing chapters
    checkSubjectsAvailability();
}

// ========== LOAD SPECIFIC CLASS AND SUBJECT NOTES ==========
function loadClassNotes(className, subjectName) {
    const container = document.getElementById('notesContainer');
    const pageTitle = document.getElementById('pageTitle');
    if (!container) return;
    
    const classData = notesData[className];
    const classDisplayNames = {
        class8: 'Class 8',
        class9: 'Class 9',
        class10: 'Class 10',
        class11: 'Class 11',
        class12: 'Class 12'
    };
    
    if (subjectName && classData[subjectName]) {
        // Show specific subject
        const subject = classData[subjectName];
        
        if (pageTitle) {
            pageTitle.textContent = `${classDisplayNames[className]} - ${subject.name} Notes`;
        }
        
        const folderMap = {
            class8: 'class8',
            class9: 'class9',
            class10: 'class10',
            class11: 'class 11',
            class12: 'class 12'
        };
        const folder = folderMap[className] || className;

        container.innerHTML = `
            <div class="subject-header">
                <button class="back-btn" onclick="window.location.href='notes.html'">
                    <i class="fas fa-arrow-left"></i> Back to All Classes
                </button>
                <h2>${subject.name} - ${classDisplayNames[className]}</h2>
            </div>
            <div class="chapters-list">
                ${subject.chapters.map((chapter, index) => `
                    <div class="chapter-item" data-chapter-id="${chapter.id}">
                        <div class="chapter-info">
                            <span class="chapter-number">${String(index + 1).padStart(2, '0')}</span>
                            <div>
                                <h3>${chapter.title}</h3>
                                ${chapter.popular ? '<span class="popular-badge">⭐ Popular</span>' : ''}
                            </div>
                        </div>
                        <div class="chapter-stats">
                            ${chapter.views ? `<span><i class="fas fa-eye"></i> ${chapter.views} views</span>` : ''}
                            ${chapter.pdf ? '<span class="pdf-badge"><i class="fas fa-file-pdf"></i> PDF Available</span>' : ''}
                        </div>
                        <button class="view-chapter-btn" data-url="notes/${folder}/${subjectName}/${chapter.id}.html" onclick="viewChapter('${className}', '${subjectName}', '${chapter.id}')">
                            Checking... <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;

        // After rendering, check which chapter files actually exist
        checkChapterFiles().then(() => {
            // show count of coming-soon chapters in header
            const coming = document.querySelectorAll('.view-chapter-btn.coming-soon').length;
            const header = document.querySelector('.subject-header');
            if (header) {
                let marker = header.querySelector('.coming-soon-count');
                if (!marker) {
                    marker = document.createElement('span');
                    marker.className = 'coming-soon-count';
                    marker.style.marginLeft = '12px';
                    marker.style.fontSize = '14px';
                    marker.style.color = '#F57C00';
                    header.querySelector('h2').appendChild(marker);
                }
                marker.textContent = coming > 0 ? `${coming} coming soon` : '';
            }
        });
    } else {
        // Show all subjects for the class
        if (pageTitle) {
            pageTitle.textContent = `${classDisplayNames[className]} Notes`;
        }
        
        const subjects = Object.keys(classData);
        
        container.innerHTML = `
            <div class="class-header">
                <button class="back-btn" onclick="window.location.href='notes.html'">
                    <i class="fas fa-arrow-left"></i> Back to All Classes
                </button>
                <h2>${classDisplayNames[className]} - All Subjects</h2>
            </div>
            <div class="subjects-grid full">
                ${subjects.map(subject => `
                    <div class="subject-card large" data-class="${className}" data-subject="${subject}">
                        <i class="fas ${getSubjectIcon(subject)}"></i>
                        <h3>${classData[subject].name}</h3>
                        <p>${classData[subject].chapters.length} chapters available</p>
                        <div class="chapter-previews">
                            ${classData[subject].chapters.slice(0, 3).map(ch => `
                                <span>${ch.title}</span>
                            `).join('')}
                            ${classData[subject].chapters.length > 3 ? '<span class="more">+more</span>' : ''}
                        </div>
                        <button class="view-subject-btn">Browse All →</button>
                    </div>
                `).join('')}
            </div>
        `;
        
        document.querySelectorAll('.subject-card.large').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('view-subject-btn')) {
                    const className = card.getAttribute('data-class');
                    const subject = card.getAttribute('data-subject');
                    window.location.href = `notes.html?class=${className}&subject=${subject}`;
                }
            });
        });
    }
}

// Check availability of chapter files and update buttons accordingly
function checkChapterFiles() {
    const promises = Array.from(document.querySelectorAll('.view-chapter-btn')).map(btn => {
        const url = btn.getAttribute('data-url');
        if (!url) return Promise.resolve();
        // mark checking state
        btn.classList.add('checking');
        btn.innerHTML = 'Checking... <i class="fas fa-arrow-right"></i>';
        return fetch(url, { method: 'HEAD' }).then(resp => {
            btn.classList.remove('checking');
            if (resp.ok) {
                btn.disabled = false;
                btn.innerHTML = 'View Notes <i class="fas fa-arrow-right"></i>'
                btn.classList.remove('coming-soon');
            } else {
                btn.disabled = true;
                btn.innerHTML = 'Coming soon';
                btn.classList.add('coming-soon');
            }
        }).catch(() => {
            btn.classList.remove('checking');
            btn.disabled = true;
            btn.innerHTML = 'Coming soon';
            btn.classList.add('coming-soon');
        });
    });
    return Promise.all(promises);
}

// Check availability for each subject card and show how many chapters are missing
function checkSubjectsAvailability() {
    const folderMap = {
        class8: 'class8',
        class9: 'class9',
        class10: 'class10',
        class11: 'class 11',
        class12: 'class 12'
    };
    document.querySelectorAll('.subject-card').forEach(card => {
        const cls = card.getAttribute('data-class');
        const subj = card.getAttribute('data-subject');
        const classData = notesData[cls];
        if (!classData || !classData[subj]) return;
        const chapters = classData[subj].chapters || [];
        const folder = folderMap[cls] || cls;
        const checks = chapters.map(ch => {
            const url = `notes/${folder}/${subj}/${ch.id}.html`;
            return fetch(url, { method: 'HEAD' }).then(r => r.ok).catch(() => false);
        });
        Promise.all(checks).then(results => {
            const missing = results.filter(ok => !ok).length;
            let badge = card.querySelector('.coming-soon-count');
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'coming-soon-count';
                badge.style.marginTop = '8px';
                badge.style.color = '#F57C00';
                badge.style.fontSize = '13px';
                card.appendChild(badge);
            }
            badge.textContent = missing > 0 ? `${missing} coming soon` : '';
        });
    });
}

// ========== VIEW CHAPTER ==========
window.viewChapter = function(className, subject, chapterId) {
    const folderMap = {
        class8: 'class8',
        class9: 'class9',
        class10: 'class10',
        class11: 'class 11',
        class12: 'class 12'
    };
    const folder = folderMap[className] || className;
    const url = `notes/${folder}/${subject}/${chapterId}.html`;
    // Try to fetch the file first; if it exists navigate, otherwise show message
    fetch(url, { method: 'GET' }).then(resp => {
        if (resp.ok) {
            window.location.href = url;
        } else {
            alert('Notes not available yet for this chapter.');
        }
    }).catch(() => {
        alert('Unable to load notes. They may not exist on the server yet.');
    });
};

// ========== GET SUBJECT ICON ==========
function getSubjectIcon(subject) {
    const icons = {
        science: 'fa-flask',
        physics: 'fa-atom',
        chemistry: 'fa-dna',
        biology: 'fa-leaf',
        math: 'fa-calculator',
        mathematics: 'fa-calculator',
        english: 'fa-book-open',
        nepali: 'fa-flag',
        social: 'fa-globe-asia',
        computer: 'fa-laptop-code',
        health: 'fa-heartbeat',
        'opt-math': 'fa-square-root-alt'
    };
    return icons[subject] || 'fa-graduation-cap';
}

// ========== INITIALIZE NOTES SEARCH ==========
function initNotesSearch() {
    const searchInput = document.getElementById('notesSearchInput');
    const searchResults = document.getElementById('searchResultsDropdown');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim().toLowerCase();
        
        if (query.length < 2) {
            if (searchResults) searchResults.style.display = 'none';
            return;
        }
        
        const results = [];
        
        // Search through all notes
        for (const [className, classData] of Object.entries(notesData)) {
            for (const [subjectName, subject] of Object.entries(classData)) {
                subject.chapters.forEach(chapter => {
                    if (chapter.title.toLowerCase().includes(query) || 
                        subject.name.toLowerCase().includes(query)) {
                        results.push({
                            className: className,
                            subject: subjectName,
                            subjectName: subject.name,
                            chapter: chapter,
                            classDisplay: getClassDisplayName(className)
                        });
                    }
                });
            }
        }
        
        if (searchResults) {
            if (results.length > 0) {
                searchResults.style.display = 'block';
                searchResults.innerHTML = results.map(result => `
                    <div class="search-result-item" onclick="viewChapter('${result.className}', '${result.subject}', '${result.chapter.id}')">
                        <i class="fas fa-file-alt"></i>
                        <div>
                            <h4>${result.chapter.title}</h4>
                            <p>${result.classDisplay} • ${result.subjectName}</p>
                        </div>
                    </div>
                `).join('');
            } else {
                searchResults.style.display = 'block';
                searchResults.innerHTML = '<p class="no-results">No notes found. Try different keywords.</p>';
            }
        }
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', function(e) {
        if (searchResults && !searchInput.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// ========== INITIALIZE CLASS FILTERS ==========
function initClassFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const classFilter = this.getAttribute('data-class');
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter sections
            const sections = document.querySelectorAll('.class-section');
            sections.forEach(section => {
                if (classFilter === 'all' || section.getAttribute('data-class') === classFilter) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
}

// ========== GET CLASS DISPLAY NAME ==========
function getClassDisplayName(className) {
    const names = {
        class8: 'Class 8',
        class9: 'Class 9',
        class10: 'Class 10',
        class11: 'Class 11',
        class12: 'Class 12'
    };
    return names[className] || className;
}

// ========== ADD CSS STYLES FOR NOTES PAGE ==========
const notesStyles = document.createElement('style');
notesStyles.textContent = `
    .class-section {
        margin-bottom: 50px;
    }
    .class-title {
        font-size: 28px;
        margin-bottom: 25px;
        padding-bottom: 10px;
        border-bottom: 3px solid #2E7D32;
        display: inline-block;
    }
    .subjects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 25px;
    }
    .subjects-grid.full {
        grid-template-columns: 1fr;
    }
    .subject-card.large {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .chapter-previews {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 10px 0;
    }
    .chapter-previews span {
        background: #f0f0f0;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
    }
    .chapter-previews .more {
        background: #e0e0e0;
    }
    .chapters-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .chapter-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background: #f9fafb;
        border-radius: 12px;
        transition: all 0.3s ease;
        flex-wrap: wrap;
        gap: 15px;
    }
    .chapter-item:hover {
        transform: translateX(5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .chapter-info {
        display: flex;
        align-items: center;
        gap: 15px;
        flex: 2;
    }
    .chapter-number {
        font-size: 24px;
        font-weight: 700;
        color: #2E7D32;
        min-width: 50px;
    }
    .chapter-info h3 {
        font-size: 18px;
        margin-bottom: 5px;
    }
    .popular-badge, .pdf-badge {
        font-size: 11px;
        padding: 3px 8px;
        border-radius: 20px;
        margin-left: 10px;
    }
    .popular-badge {
        background: #FFF3E0;
        color: #F57C00;
    }
    .pdf-badge {
        background: #E8F5E9;
        color: #2E7D32;
    }
    .chapter-stats {
        display: flex;
        gap: 15px;
        color: #666;
        font-size: 13px;
        flex: 1;
    }
    .view-chapter-btn, .view-subject-btn {
        background: #2E7D32;
        color: white;
        border: none;
        padding: 8px 20px;
        border-radius: 25px;
        cursor: pointer;
        transition: 0.3s;
    }
    .view-chapter-btn:hover, .view-subject-btn:hover {
        background: #1B5E20;
    }
    .back-btn {
        background: none;
        border: none;
        color: #2E7D32;
        font-size: 14px;
        cursor: pointer;
        margin-bottom: 20px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }
    .class-header, .subject-header {
        margin-bottom: 30px;
    }
    .notes-search-container {
        margin-bottom: 30px;
        position: relative;
    }
    .notes-search-input {
        width: 100%;
        padding: 15px 20px;
        border: 2px solid #e0e0e0;
        border-radius: 50px;
        font-size: 16px;
        transition: 0.3s;
    }
    .notes-search-input:focus {
        border-color: #2E7D32;
        outline: none;
    }
    .search-results-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        z-index: 100;
        max-height: 400px;
        overflow-y: auto;
        display: none;
    }
    .search-result-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        cursor: pointer;
        transition: 0.3s;
    }
    .search-result-item:hover {
        background: #f5f5f5;
    }
    .filter-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 30px;
    }
    .filter-btn {
        background: #f0f0f0;
        border: none;
        padding: 8px 20px;
        border-radius: 25px;
        cursor: pointer;
        transition: 0.3s;
    }
    .filter-btn.active {
        background: #2E7D32;
        color: white;
    }
    @media (max-width: 768px) {
        .chapter-item {
            flex-direction: column;
            align-items: flex-start;
        }
        .chapter-stats {
            width: 100%;
        }
    }
`;
document.head.appendChild(notesStyles);

