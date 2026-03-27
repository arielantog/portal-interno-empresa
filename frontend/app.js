const cardsContainer = document.querySelector('#cards');
const searchInput = document.querySelector('#search');
const emptyState = document.querySelector('#emptyState');
const template = document.querySelector('#cardTemplate');
const themeToggle = document.querySelector('#themeToggle');
const brandLogo = document.querySelector('#brandLogo');

const THEME_KEY = 'psolutions_portal_theme';

let apps = [];

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const updateLogoByTheme = (theme) => {
  if (!brandLogo) return;

  const lightLogo = brandLogo.dataset.logoLight;
  const darkLogo = brandLogo.dataset.logoDark;
  brandLogo.src = theme === 'light' ? lightLogo : darkLogo;
};

const applyTheme = (theme) => {
  const isLight = theme === 'light';
  document.body.classList.toggle('theme-light', isLight);
  document.body.classList.toggle('theme-dark', !isLight);

  if (themeToggle) {
    themeToggle.setAttribute('aria-label', isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
    themeToggle.setAttribute('title', isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
  }

  updateLogoByTheme(theme);
};

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
};

const renderCards = (items) => {
  cardsContainer.innerHTML = '';

  if (items.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  items.forEach((app, index) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector('.card');

    fragment.querySelector('h2').textContent = app.name;
    fragment.querySelector('.description').textContent = app.description;

    const link = fragment.querySelector('.open-btn');
    link.href = app.url;
    link.setAttribute('aria-label', `Abrir ${escapeHtml(app.name)}`);

    card.style.animationDelay = `${index * 55}ms`;
    cardsContainer.appendChild(fragment);
  });
};

const filterApps = (query) => {
  const term = query.trim().toLowerCase();

  if (!term) {
    renderCards(apps);
    return;
  }

  const filtered = apps.filter((app) => {
    const target = `${app.name} ${app.description} ${app.category}`.toLowerCase();
    return target.includes(term);
  });

  renderCards(filtered);
};

const loadApps = async () => {
  try {
    const response = await fetch('/api/apps');
    if (!response.ok) {
      throw new Error('No se pudieron cargar las aplicaciones.');
    }

    apps = await response.json();
    renderCards(apps);
  } catch (error) {
    cardsContainer.innerHTML = `<p class="empty">${error.message}</p>`;
  }
};

searchInput.addEventListener('input', (event) => {
  filterApps(event.target.value);
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('theme-light') ? 'light' : 'dark';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  });
}

applyTheme(getInitialTheme());
loadApps();
