// script.js — simulador visual de contenerización (c11n)
(function () {
  const form = document.getElementById('formContainer');
  const nameInput = document.getElementById('name');
  const imageInput = document.getElementById('image');
  const containersEl = document.getElementById('containers');

  let containers = []; // {id, name, image, status}

  function renderContainers() {
    containersEl.innerHTML = '';
    containers.forEach(c => {
      const div = document.createElement('div');
      div.className = 'container-card';
      div.innerHTML = `
        <div class="meta">
          <div><strong>${c.name}</strong> (${c.image})</div>
          <div class="status ${c.status}">${c.status.toUpperCase()}</div>
        </div>
        <div class="actions">
          ${c.status === 'stopped' ? `<button data-action="start" data-id="${c.id}">Start</button>` : ''}
          ${c.status === 'running' ? `<button data-action="stop" data-id="${c.id}">Stop</button>` : ''}
          <button data-action="remove" data-id="${c.id}">Remove</button>
        </div>
      `;
      containersEl.appendChild(div);
    });
  }

  function addContainer(name, image) {
    containers.push({
      id: Date.now().toString(),
      name,
      image,
      status: 'stopped'
    });
    renderContainers();
  }

  function updateContainer(id, action) {
    containers = containers.map(c => {
      if (c.id === id) {
        if (action === 'start') c.status = 'running';
        if (action === 'stop') c.status = 'stopped';
      }
      return c;
    });
    renderContainers();
  }

  function removeContainer(id) {
    containers = containers.filter(c => c.id !== id);
    renderContainers();
  }

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const image = imageInput.value.trim();
    if (!name || !image) return;
    addContainer(name, image);
    form.reset();
  });

  // Event delegation para botones
  containersEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    if (action === 'start' || action === 'stop') updateContainer(id, action);
    if (action === 'remove') removeContainer(id);
  });

  // Inicial
  renderContainers();
})();