// Define the page order for determining navigation direction
const pageOrder = ['home', 'projects', 'articles'];

// Track current page and handle transitions
document.addEventListener('DOMContentLoaded', function () {

    const pageContent = document.querySelector('.page-content');
    const homeContent = document.querySelector(".home-content");

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
        } else {
            pageContent.classList.add('show-immediately');
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

    if (homeContent) {
        homeContent.classList.add("fade-in");
    }

    const eventCards = document.querySelectorAll('.event-card');

    eventCards.forEach((element) => {
        element.addEventListener('click', function () {
            let expandedContent = element.querySelector(".expanded-content");
            const currentVisibility = window.getComputedStyle(expandedContent).visibility;

            if (currentVisibility === "hidden") {
                expandedContent.style.visibility = "visible";
                expandedContent.style.height = "auto";
            } else {
                expandedContent.style.visibility = "hidden";
                expandedContent.style.height = "0";
            }
        });
    });

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
