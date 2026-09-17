const toast = document.querySelector('#toast');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const goldButton = document.getElementById('goldButton');
const appButton = document.getElementById('appButton');
const heroPlayButton = document.getElementById('heroPlayButton');
const heroAppStoreButton = document.getElementById('heroAppStoreButton');

let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

if (loginButton) {
  loginButton.addEventListener('click', () => {
    showToast('Welcome back. Login is coming soon.');
  });
}

if (signupButton) {
  signupButton.addEventListener('click', () => {
    showToast('Create your Zomato account soon.');
  });
}

if (goldButton) {
  goldButton.addEventListener('click', () => {
    showToast('Zomato Gold benefits are coming soon.');
  });
}

if (heroPlayButton) {
  heroPlayButton.addEventListener('click', () => {
    showToast('Google Play download link is coming soon.');
  });
}

if (heroAppStoreButton) {
  heroAppStoreButton.addEventListener('click', () => {
    showToast('App Store download link is coming soon.');
  });
}

if (appButton) {
  appButton.addEventListener('click', () => {
    showToast('Zomato app download links are coming soon.');
  });
}
