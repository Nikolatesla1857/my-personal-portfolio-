(() => {
  const search = document.querySelector('#note-search');
  const cards = [...document.querySelectorAll('[data-note-card]')];
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const empty = document.querySelector('#empty-state');
  if (!search || !cards.length) return;
  let activeFilter = 'all';
  const update = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const category = card.dataset.category || '';
      const searchable = `${card.textContent || ''} ${card.dataset.keywords || ''}`.toLowerCase();
      const show = (activeFilter === 'all' || category === activeFilter) && (!query || searchable.includes(query));
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.style.display = visible ? 'none' : 'block';
  };
  search.addEventListener('input', update);
  buttons.forEach((button) => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    update();
  }));
  update();
})();