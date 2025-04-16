const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const navItems = document.querySelectorAll('.nav-item:not(.search-container)');
const searchContainer = document.getElementById('searchContainer');
const searchIcon = document.getElementById('searchIcon');

var searchActive = false;

function toggleSearchBar(val) {
    searchActive = val;

    if (searchActive === true) {
        searchForm.style.display = 'flex';
        navItems.forEach(item => {
            item.style.display = 'none';
        });
        searchInput.focus();
        searchIcon.style.display = 'none'
    } else {
        searchForm.style.display = 'none';
        searchIcon.style.display = 'flex'
        navItems.forEach(item => {
            item.style.display = 'inline-block';
        });
    }
}

function submitSearch(event) {
    if (event.type === 'click' || event.key === 'Enter') {
        event.preventDefault();
        var searchValue = document.getElementById('searchInput').value;

        // Update the form's action URL to include "search?q=<input_value>"
        var form = document.getElementById('searchForm');
        form.action = '/search.html?q=' + encodeURIComponent(searchValue);

        form.submit();
    }
}

// document.addEventListener('click', function (event) {
//     if (searchContainer.contains(event.target)) {
//         if (!searchActive) {
//             toggleSearchBar(true);
//         }
//     } else {
//         toggleSearchBar(false);
//     }
// });

// Define the page order for determining navigation direction
const pageOrder = ['home', 'projects', 'articles'];

// Track current page and handle transitions
document.addEventListener('DOMContentLoaded', function () {

    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        // Get current page path
        const path = window.location.pathname;
        let currentPage = 'home';

        // Determine current page based on path
        if (path.includes('projects')) {
            currentPage = 'projects';
        } else if (path.includes('articles')) {
            currentPage = 'articles';
        }

        // Get previous page from localStorage
        const previousPage = localStorage.getItem('previousPage');

        // Determine direction and apply animation
        if (previousPage && previousPage !== currentPage) {
            const direction = determineDirection(previousPage, currentPage);

            if (direction === 'right') {
                pageContent.classList.add('slide-in-right');
            } else if (direction === 'left') {
                pageContent.classList.add('slide-in-left');
            }
        }

        // Store current page for next navigation
        localStorage.setItem('previousPage', currentPage);
    }

    // Add click listeners to navigation links for exit animations
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only handle internal links
            if (this.getAttribute('href').startsWith('/') ||
                this.getAttribute('href').startsWith('./') ||
                this.getAttribute('href') === '#') {

                e.preventDefault();
                const href = this.getAttribute('href');
                const pageContent = document.querySelector('.page-content');

                // Get current and target pages
                const path = window.location.pathname;
                let currentPage = 'home';
                let targetPage = 'home';

                if (path.includes('projects')) {
                    currentPage = 'projects';
                } else if (path.includes('articles')) {
                    currentPage = 'articles';
                }

                if (href.includes('projects')) {
                    targetPage = 'projects';
                } else if (href.includes('articles')) {
                    targetPage = 'articles';
                }

                // Apply exit animation
                const direction = determineDirection(currentPage, targetPage);

                if (pageContent) {
                    if (direction === 'right') {
                        pageContent.classList.add('slide-out-left');
                    } else if (direction === 'left') {
                        pageContent.classList.add('slide-out-right');
                    }
                } else {
                    console.log("Page content not found");
                }

                // Navigate after animation completes
                setTimeout(() => {
                    window.location.href = href;
                }, 400); // Match this to your animation duration
            }
        });
    });

    document.querySelector(".home-content").classList.add("fade-in");
});

// Helper function to determine direction based on page order
function determineDirection(fromPage, toPage) {
    const fromIndex = pageOrder.indexOf(fromPage);
    const toIndex = pageOrder.indexOf(toPage);

    // Going right in navigation
    if (fromIndex < toIndex) {
        return 'right';
    }
    // Going left in navigation
    else if (fromIndex > toIndex) {
        return 'left';
    }
    // Same page
    return 'none';
}