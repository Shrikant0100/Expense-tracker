const noteText = document.getElementById('note-text');
const message = document.getElementById('message');
const goBtn = document.getElementById('go-button');

// Function to show desktop message & button
function showMessageAndButton() {
  noteText.style.display = 'none';
  message.style.display = 'block';
  goBtn.style.display = 'inline-block';
}

// Button click navigates to tracker page
goBtn.addEventListener('click', () => {
  window.location.href = 'tracker.html'; // adjust filename if needed
});

// Check if user is already on desktop width (min-width 900px)
function checkDesktop() {
  if (window.screen.width >= 900) {
    showMessageAndButton();
  }
}

// Initially check
checkDesktop();

// Optional: add a manual "Switch to desktop site" button
if (!goBtn.style.display || goBtn.style.display === 'none') {
  const switchBtn = document.createElement('button');
  switchBtn.textContent = 'Switch to Desktop Site';
  switchBtn.style.marginTop = '15px';
  document.querySelector('.container').appendChild(switchBtn);

  switchBtn.addEventListener('click', () => {
    showMessageAndButton();
    switchBtn.style.display = 'none';
  });
}
