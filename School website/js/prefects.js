(function(){
  async function loadPrefects(){
    try{
      const resp = await fetch('data/prefects.json');
      if(!resp.ok) throw new Error('Failed to load');
      const list = await resp.json();
      render(list);
    }catch(e){
      console.warn('Could not load prefects data', e);
      // leave existing static content if any
    }
  }

  function render(list){
    const container = document.getElementById('prefect-container');
    if(!container) return;
    container.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'prefect-grid';

    list.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'prefect-card';

      const img = document.createElement('img');
      img.src = p.image || '';
      img.alt = p.alt || p.name;
      img.onerror = function(){ this.style.opacity = 0.4; this.src = ''; }

      const meta = document.createElement('div');
      meta.className = 'pc-meta';

      const h4 = document.createElement('h4');
      h4.textContent = p.name;
      const role = document.createElement('div');
      role.className = 'role';
      role.textContent = p.role;
      const bio = document.createElement('p');
      bio.textContent = p.bio;

      meta.appendChild(h4);
      meta.appendChild(role);
      meta.appendChild(bio);

      card.appendChild(img);
      card.appendChild(meta);
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  document.addEventListener('DOMContentLoaded', loadPrefects);
})();
