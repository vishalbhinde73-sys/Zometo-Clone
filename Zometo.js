const toast = document.querySelector('#toast');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const goldButton = document.getElementById('goldButton');
const appButton = document.getElementById('appButton');
const cartButton = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');

let cartItems = 0;
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function updateCartDisplay() {
  if (cartCount) {
    cartCount.textContent = String(cartItems);
  }
}

if (cartButton) {
  cartButton.addEventListener('click', () => {
    showToast(
      cartItems
        ? `${cartItems} item${cartItems > 1 ? 's' : ''} ready for checkout.`
        : 'Your bag is empty. Add a restaurant to get started.'
    );
  });
}

if (loginButton) {
  loginButton.addEventListener('click', () => {
    showToast('Welcome back. Login is coming soon.');
  });
}

if (signupButton) {
  signupButton.addEventListener('click', () => {
    showToast('Create your Zometto account soon.');
  });
}

if (goldButton) {
  goldButton.addEventListener('click', () => {
    showToast('Zometto Gold benefits are coming soon.');
  });
}

if (appButton) {
  appButton.addEventListener('click', () => {
    showToast('App download links are coming soon.');
  });
}

updateCartDisplay();
