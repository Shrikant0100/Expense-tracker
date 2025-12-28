const noteText = document.getElementById('note-text');
const message = document.getElementById('message');
const goBtn = document.getElementById('go-button');

function showMessageAndButton() {
  noteText.style.display = 'none';
  message.style.display = 'block';
  goBtn.style.display = 'inline-block';
}

goBtn.addEventListener('click', () => {
  window.location.href = 'tracker.html'; // Change to your actual expense tracker filename
});

const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

if (isDesktop) {
  // Show message & button immediately on desktop
  showMessageAndButton();
} else {
  // On mobile, wait until user switches to desktop view
  window.matchMedia("(min-width: 1024px)").addEventListener('change', e => {
    if (e.matches) {
      showMessageAndButton();
    }
  });
}
