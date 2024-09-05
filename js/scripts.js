// Function to load content dynamically into the dynamic content section
function loadContent(file) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            document.getElementById('dynamic-content').innerHTML = xhr.responseText; // Only replace the dynamic content section
            initializeTooltips(); // Reinitialize tooltips after loading content
        } else {
            console.error('Error loading content:', xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Network error');
    };
    xhr.send();
}

// Function to initialize Bootstrap tooltips
function initializeTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Load default content on page load
document.addEventListener('DOMContentLoaded', function() {
    loadContent('content/text/main.html'); // Load default content on page load
    initializeTooltips(); // Initialize tooltips on initial load
});

// Toggle sidebar visibility
document.getElementById('toggle-sidebar-icon').addEventListener('click', function() {
    var sidebar = document.querySelector('.sidebar');
    var mainContent = document.querySelector('.main-content');

    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('expanded');
});
