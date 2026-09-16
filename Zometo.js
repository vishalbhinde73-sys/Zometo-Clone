const cards = [...document.querySelectorAll('.card')];
const categories = [...document.querySelectorAll('.category')];
const searchInput = document.querySelector('#searchInput');
const searchForm = document.querySelector('#searchForm');
const emptyState = document.querySelector('#emptyState');
const cartCount = document.querySelector('#cartCount');
const toast = document.querySelector('#toast');
let cartItems = 0;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function filterRestaurants() {
  const activeCategory = document.querySelector('.category.active')?.dataset.filter || 'all';
  const query = searchInput.value.trim().toLowerCase();
  let visibleCards = 0;
  cards.forEach((card) => {
    const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
    const matchesSearch = !query || card.dataset.name.toLowerCase().includes(query) || card.textContent.toLowerCase().includes(query);
    const isVisible = matchesCategory && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCards += 1;
  });
  emptyState.style.display = visibleCards ? 'none' : 'block';
}

categories.forEach((category) => category.addEventListener('click', () => {
  categories.forEach((item) => item.classList.remove('active'));
  category.classList.add('active');
  filterRestaurants();
  document.querySelector('#restaurants').scrollIntoView({ behavior: 'smooth', block: 'start' });
}));
searchInput.addEventListener('input', filterRestaurants);
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#restaurants').scrollIntoView({ behavior: 'smooth' });
  filterRestaurants();
});

document.querySelectorAll('.save-button').forEach((button) => button.addEventListener('click', (event) => {
  event.stopPropagation();
  const saved = button.textContent === '♥';
  button.textContent = saved ? '♡' : '♥';
  button.style.color = saved ? '' : 'var(--coral)';
  showToast(saved ? 'Removed from your saved places.' : 'Saved to your favourites.');
}));

function addToCart(restaurant) {
  cartItems += 1;
  cartCount.textContent = cartItems;
  document.querySelector('#cartButton').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 300 });
  showToast(`${restaurant} added to your bag.`);
}

cards.forEach((card) => card.addEventListener('click', (event) => {
  if (event.target.closest('.save-button')) return;
  addToCart(card.querySelector('h3').textContent);
}));
document.querySelector('#cartButton').addEventListener('click', () => showToast(cartItems ? `${cartItems} item${cartItems > 1 ? 's' : ''} ready for checkout.` : 'Your bag is empty. Add a restaurant to get started.'));
document.querySelector('#loginButton').addEventListener('click', () => showToast('Welcome back. Login is coming soon.'));
document.querySelector('#signupButton').addEventListener('click', () => showToast('Create your Zometto account soon.'));
document.querySelector('#locationButton').addEventListener('click', () => showToast('Location picker is coming soon.'));
document.querySelector('#goldButton').addEventListener('click', () => showToast('Zometto Gold benefits are coming soon.'));
document.querySelector('#appButton').addEventListener('click', () => showToast('App download links are coming soon.'));
