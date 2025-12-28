// Force desktop layout on page visit
function requestDesktopSite() {
  const viewport = document.querySelector("meta[name=viewport]");
  if (viewport) {
    viewport.setAttribute('content', 'width=1024'); // Fixed width to trigger desktop CSS
  }
}

// Call on page load
requestDesktopSite();

// Go to expense tracker page on button click
document.getElementById('go-button').addEventListener('click', () => {
  window.location.href = 'tracker.html?v=2'; // Replace with your actual tracker page filename
});
