// Function to load content dynamically into the dynamic content section
function loadContent(file) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            document.getElementById('dynamic-content').innerHTML = xhr.responseText; // Only replace the dynamic content section
        } else {
            console.error('Error loading content:', xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Network error');
    };
    xhr.send();
}

// Load default content on page load
document.addEventListener('DOMContentLoaded', function() {
    loadContent('overview.html'); // Load default content on page load
});

// Toggle sidebar visibility
document.getElementById('toggle-sidebar-icon').addEventListener('click', function() {
    var sidebar = document.querySelector('.sidebar');
    var mainContent = document.querySelector('.main-content');

    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('expanded');
});
