// Small site-wide script: show current user and provide a logout button (demo)
(function(){
  function getCurrent(){
    try{ return JSON.parse(localStorage.getItem('school_current_user')||'null') }catch(e){ return null }
  }

  function logout(){
    localStorage.removeItem('school_current_user');
    // redirect to login for demo
    location.href = 'login.html';
  }

  document.addEventListener('DOMContentLoaded', function(){
    const user = getCurrent();

    // If logged-in, populate header status
    if(user){
      // Find header area
      const headerInner = document.querySelector('.header-inner') || document.querySelector('header');
      if(headerInner){
        const status = document.createElement('div');
        status.className = 'user-status';
        status.style.display = 'flex';
        status.style.alignItems = 'center';
        status.style.gap = '10px';

        const span = document.createElement('span');
        span.textContent = `Hi, ${user.name || user.email}`;
        span.style.color = 'white';
        span.style.fontWeight = '600';

        const out = document.createElement('button');
        out.className = 'btn btn-ghost';
        out.textContent = 'Log out';
        out.addEventListener('click', logout);

        status.appendChild(span);
        status.appendChild(out);
        headerInner.appendChild(status);
      }
    }

    // Populate welcome card on the homepage
    const welcome = document.getElementById('welcome-card');
    if(welcome){
      welcome.innerHTML = '';
      if(user){
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.alignItems = 'center';

        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = (user.name||user.email).split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();

        const meta = document.createElement('div');
        const name = document.createElement('div');
        name.textContent = user.name || user.email;
        name.style.fontWeight = '700';
        const email = document.createElement('div');
        email.textContent = user.email;
        email.className = 'muted';

        meta.appendChild(name);
        meta.appendChild(email);
        row.appendChild(avatar);
        row.appendChild(meta);

        const btnRow = document.createElement('div');
        btnRow.style.marginTop = '10px';
        const dashboard = document.createElement('a');
        dashboard.className = 'btn btn-primary';
        dashboard.href = 'index.html';
        dashboard.textContent = 'View dashboard';
        const out2 = document.createElement('button');
        out2.className = 'btn btn-ghost';
        out2.style.marginLeft = '8px';
        out2.textContent = 'Log out';
        out2.addEventListener('click', logout);
        btnRow.appendChild(dashboard);
        btnRow.appendChild(out2);

        welcome.appendChild(row);
        welcome.appendChild(btnRow);
      }else{
        welcome.innerHTML = '<div class="center muted">Not signed in — <a href="signup.html">Sign up</a> or <a href="login.html">log in</a></div>';
      }
    }

    // Setup accordions with accessibility (toggle aria-expanded)
    document.querySelectorAll('.accordion .acc-toggle').forEach(btn=>{
      btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') || 'false');
      btn.addEventListener('click', function(){
        const panel = this.nextElementSibling;
        if(!panel) return;
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        panel.style.display = expanded ? 'none' : 'block';
      });
      // allow keyboard enter/space to toggle
      btn.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); this.click(); }
      });
    });
  });
})();
