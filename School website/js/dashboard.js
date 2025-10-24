(function(){
  function getCurrent(){
    try{ return JSON.parse(localStorage.getItem('school_current_user')||'null') }catch(e){ return null }
  }

  function loadAnnouncements(){
    try{ return JSON.parse(localStorage.getItem('school_announcements')||'[]') }catch(e){ return [] }
  }

  function saveAnnouncements(list){
    localStorage.setItem('school_announcements', JSON.stringify(list));
  }

  function renderProfile(){
    const profileCard = document.getElementById('profile-card');
    const user = getCurrent();
    profileCard.innerHTML = '';
    if(!user){
      const div = document.createElement('div');
      div.className = 'center muted';
      div.innerHTML = 'You are not signed in. <a href="login.html">Log in</a> or <a href="signup.html">create an account</a>.';
      profileCard.appendChild(div);
      return;
    }

    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.gap = '12px';
    wrap.style.alignItems = 'center';

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = (user.name||user.email).split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();

    const meta = document.createElement('div');
    const name = document.createElement('div'); name.style.fontWeight='700'; name.textContent = user.name || user.email;
    const email = document.createElement('div'); email.className='muted'; email.textContent = user.email;
    meta.appendChild(name); meta.appendChild(email);

    const actions = document.createElement('div');
    actions.style.marginLeft = 'auto';
    const out = document.createElement('button'); out.className='btn btn-ghost'; out.textContent='Log out';
    out.addEventListener('click', function(){ localStorage.removeItem('school_current_user'); location.reload(); });
    actions.appendChild(out);

    wrap.appendChild(avatar); wrap.appendChild(meta); wrap.appendChild(actions);
    profileCard.appendChild(wrap);
  }

  function renderAnnouncements(){
    const container = document.getElementById('announcements');
    const list = loadAnnouncements();
    if(list.length===0){ container.textContent = 'No announcements yet.'; return }
    container.innerHTML = '';
    list.slice().reverse().forEach(a=>{
      const el = document.createElement('div');
      el.style.padding = '8px 0';
      el.textContent = a;
      container.appendChild(el);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderProfile();
    renderAnnouncements();

    const form = document.getElementById('announce-form');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const input = document.getElementById('announce-text');
      const val = input.value && input.value.trim();
      if(!val) return;
      const list = loadAnnouncements();
      list.push(val);
      saveAnnouncements(list);
      input.value = '';
      renderAnnouncements();
    });
  });
})();
