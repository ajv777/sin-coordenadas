// Recupera la preferencia guardada y aplica el tema a toda la página.
const root = document.documentElement;
const themeButton = document.querySelector('#theme');
function applyTheme(theme) {
  root.setAttribute('data-bs-theme', theme);
  themeButton.textContent = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
}
let savedTheme = 'light';
try { savedTheme = localStorage.getItem('blog-theme') === 'dark' ? 'dark' : 'light'; } catch (error) { /* El almacenamiento puede estar bloqueado. */ }
applyTheme(savedTheme);
themeButton.addEventListener('click', () => {
  const next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('blog-theme', next); } catch (error) { /* El tema sigue funcionando sin persistencia. */ }
});
// Filtra las tarjetas solo en la página principal.
const search = document.querySelector('#search');
const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
if (search) {
  search.addEventListener('input', () => {
    let visible = 0;
    document.querySelectorAll('.entry').forEach(entry => {
      entry.hidden = !normalize(entry.dataset.search).includes(normalize(search.value.trim()));
      if (!entry.hidden) visible++;
    });
    document.querySelector('#empty').hidden = visible !== 0;
  });
}
// Regresa al principio de la página.
document.querySelector('#top').addEventListener('click', () => window.scrollTo({top: 0}));
