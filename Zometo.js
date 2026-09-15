const cards = [...document.querySelectorAll('.card')];
const categories = [...document.querySelectorAll('.category')];
const searchInput = document.querySelector('#searchInput');
const searchForm = document.querySelector('#searchForm');
const emptyState = document.querySelector('#emptyState');
const cartCount = document.querySelector('#cartCount');
let cartItems = 0;

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
}));

searchInput.addEventListener('input', filterRestaurants);
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#restaurants').scrollIntoView({ behavior: 'smooth' });
  filterRestaurants();
});

document.querySelectorAll('.save-button').forEach((button) => button.addEventListener('click', (event) => {
  event.stopPropagation();
  button.textContent = button.textContent === '♥' ? '♡' : '♥';
  button.style.color = button.textContent === '♥' ? 'var(--coral)' : '';
}));

function addToCart() {
  cartItems += 1;
  cartCount.textContent = cartItems;
  document.querySelector('#cartButton').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 300 });
}

cards.forEach((card) => card.addEventListener('click', addToCart));
document.querySelector('#cartButton').addEventListener('click', () => {
  alert(cartItems ? `${cartItems} item${cartItems > 1 ? 's' : ''} saved for checkout.` : 'Your bag is empty. Add a restaurant to get started.');
});
document.querySelector('#loginButton').addEventListener('click', () => alert('Welcome back. Login is coming soon.'));
document.querySelector('#signupButton').addEventListener('click', () => alert('Create your Zometto account soon.'));
function addToCart(restaurant) {
  alert(`Added food from ${restaurant} to your cart!`);
}
