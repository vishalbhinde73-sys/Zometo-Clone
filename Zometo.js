const toast = document.querySelector('#toast');
const traceList = document.getElementById('traceList');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const goldButton = document.getElementById('goldButton');
const appButton = document.getElementById('appButton');
const cartButton = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');

let cartItems = 0;
let toastTimer;

const trace = {
  events: [],
  add(eventName, payload = {}) {
    const entry = {
      time: new Date().toISOString(),
      event: eventName,
      payload,
    };

    this.events.push(entry);
    console.log('[trace]', entry);

    if (traceList) {
      const item = document.createElement('li');
      item.textContent = `${entry.time.slice(11, 19)} • ${eventName}${Object.keys(payload).length ? ` • ${JSON.stringify(payload)}` : ''}`;
      traceList.prepend(item);

      while (traceList.children.length > 8) {
        traceList.removeChild(traceList.lastChild);
      }
    }
  },
};

window.__zomatoTrace = trace;

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

trace.add('page_loaded', {
  path: window.location.pathname,
  title: document.title,
});

if (cartButton) {
  cartButton.addEventListener('click', () => {
    trace.add('cart_clicked', { cartItems });
    showToast(
      cartItems
        ? `${cartItems} item${cartItems > 1 ? 's' : ''} ready for checkout.`
        : 'Your bag is empty. Add a restaurant to get started.'
    );
  });
}

if (loginButton) {
  loginButton.addEventListener('click', () => {
    trace.add('login_clicked');
    showToast('Welcome back. Login is coming soon.');
  });
}

if (signupButton) {
  signupButton.addEventListener('click', () => {
    trace.add('signup_clicked');
    showToast('Create your Zometto account soon.');
  });
}

if (goldButton) {
  goldButton.addEventListener('click', () => {
    trace.add('gold_clicked');
    showToast('Zometto Gold benefits are coming soon.');
  });
}

if (appButton) {
  appButton.addEventListener('click', () => {
    trace.add('app_download_clicked');
    showToast('App download links are coming soon.');
  });
}

updateCartDisplay();
trace.add('page_ready', { readyState: document.readyState });
