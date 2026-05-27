function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageName);
    selectedPage.classList.add('active');
    
    // Update active link styling
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    if(event && event.target) {
        event.target.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

window.showPage = showPage;