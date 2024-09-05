// List of content files in order
const contentFiles = [
    'content/overview.html', // Default page to load first and for the home button
    'content/framework.html',
    'content/create.html',
    'content/format.html',
    'content/store.html',
    'content/query_concretise.html',
    'content/allocate.html',
    'content/execute.html',
    'content/coverage.html',
    'content/test_evaluate.html',
    'content/decide.html',
    'content/monitoring.html',
    'content/odd_requirements.html',
    'content/audit.html'
];

let currentIndex = 0; // Start with the overview page

// Function to load content dynamically into the dynamic content section
function loadContent(file) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            document.getElementById('dynamic-content').innerHTML = xhr.responseText;
            initializeTooltips();
            attachImageLoadEvent(); // Attach event to wait for image to load, if it exists
            attachHoverEvents(); // Attach hover events to image map areas
            updateNavigationButtons();
        } else {
            console.error('Error loading content:', xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Network error');
    };
    xhr.send();
}

// Function to navigate between content files
function navigateContent(direction) {
    currentIndex += direction;

    // Check bounds
    if (currentIndex < 0) {
        currentIndex = 0; // Stay at the first page
    } else if (currentIndex >= contentFiles.length) {
        currentIndex = contentFiles.length - 1; // Stay at the last page
    }

    loadContent(contentFiles[currentIndex]);
}

// Update navigation buttons based on current index
function updateNavigationButtons() {
    document.getElementById('prev-btn').disabled = currentIndex === 0;
    document.getElementById('next-btn').disabled = currentIndex === contentFiles.length - 1;
}

// Initialize content on page load
document.addEventListener('DOMContentLoaded', function() {
    loadContent(contentFiles[currentIndex]); // Load initial content
    initializeTooltips();
    window.addEventListener('resize', function() {
        var img = document.getElementById('map-image');
        if (img) adjustImageMapToRelativeCoordinates(); // Only adjust if the image exists
    });
});

// Function to initialize Bootstrap tooltips
function initializeTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Function to attach load event to image to ensure it is fully loaded
function attachImageLoadEvent() {
    var img = document.getElementById('map-image');
    if (img) { // Only proceed if the image exists
        if (img.complete) {
            adjustImageMapToRelativeCoordinates();
        } else {
            img.addEventListener('load', adjustImageMapToRelativeCoordinates);
        }
    }
}

// Function to attach hover events to image map areas
function attachHoverEvents() {
    var areas = document.querySelectorAll('#image-map area');
    var infoBox = document.getElementById('info-box');

    areas.forEach(function(area) {
        area.addEventListener('mouseover', function() {
            var infoText = area.getAttribute('data-info');
            infoBox.textContent = infoText;
        });
        area.addEventListener('mouseout', function() {
            infoBox.textContent = "Hover over an area on the image to see more information here.";
        });
    });
}

// Function to adjust image map coordinates using relative percentages
function adjustImageMapToRelativeCoordinates() {
    var img = document.getElementById('map-image');
    if (!img) return; // Exit if the image does not exist

    var originalWidth = img.naturalWidth;
    var originalHeight = img.naturalHeight;
    var currentWidth = img.width;
    var currentHeight = img.height;

    // Log the original and current dimensions of the image
    console.log('Original Width:', originalWidth);
    console.log('Original Height:', originalHeight);
    console.log('Current Width:', currentWidth);
    console.log('Current Height:', currentHeight);

    var areas = document.querySelectorAll('#image-map area');

    areas.forEach(function(area) {
        var originalCoords = area.getAttribute('data-original-coords').split(',');
        var newCoords = originalCoords.map(function(coord, index) {
            if (index % 2 === 0) { // X coordinate
                return ((coord / originalWidth) * currentWidth).toFixed(0);
            } else { // Y coordinate
                return ((coord / originalHeight) * currentHeight).toFixed(0);
            }
        });
        area.setAttribute('coords', newCoords.join(','));
    });
}

// Toggle sidebar visibility
document.getElementById('toggle-sidebar-icon').addEventListener('click', function() {
    var sidebar = document.querySelector('.sidebar');
    var mainContent = document.querySelector('.main-content');

    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('expanded');
});
