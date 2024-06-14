function checkScreenWidth() {
    if (window.innerWidth < 900) {
        document.getElementById('error-message').style.display = 'flex';
        document.getElementById('main-content').style.display = 'none';
    } else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }
}

// Check screen width on initial load
checkScreenWidth();

// Add event listener to check screen width on resize
window.addEventListener('resize', checkScreenWidth);