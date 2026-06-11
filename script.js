// ============== PORTFOLIO SCRIPT (data-driven via JSON) ==============

// ---------- THEME ----------
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
const savedTheme = localStorage.getItem('theme');
if (savedTheme) html.setAttribute('data-theme', savedTheme);

// ---------- LANG (placeholder) ----------
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ---------- MOBILE MENU ----------
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) sidebar.classList.remove('open');
  });
});

// ---------- ACTIVE NAV ON SCROLL ----------
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');
const setActiveNav = () => {
  const y = window.scrollY + 100;
  sections.forEach(s => {
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      const id = s.getAttribute('id');
      navItems.forEach(n => {
        n.classList.toggle('active', n.getAttribute('href') === `#${id}`);
      });
    }
  });
};
window.addEventListener('scroll', setActiveNav);

// ---------- DATA-DRIVEN RENDERING ----------
document.addEventListener('data-ready', () => {
  const D = window.__DATA__;
  renderProfile(D.profile);
  renderSkills(D.skills);
  renderAchievements(D.achievements);
  renderProjects(D.projects);
  renderCareer(D.career);
  renderEducation(D.education);
  renderResearch(D.research);
  renderAbout(D.profile);
  initSkillFilter();
  initFadeIn();
});

function renderProfile(p) {
  if (!p) return;
  const avatar = document.querySelector('.avatar img');
  if (avatar) avatar.alt = p.name;
  const name = document.querySelector('.profile-name');
  if (name) {
    name.innerHTML = `${p.name} ${p.verified
      ? '<svg class="verified" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.39 2.39L18 3l.61 3.61L22 7l-1 3.39L22 14l-3 1-1 3.61-3.61.61L12 22l-2.39-1.39L6 21l-.61-3.61L2 17l1-3.39L2 10l3-1L6 5.39 9.61 5 12 2.61 12 1zm-1 13l5-5-1.41-1.41L11 11.17l-2.59-2.58L7 10l4 4z"/></svg>'
      : ''}`;
  }
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.innerHTML = `Halo, saya <span class="hl">${p.name}</span>`;
  const heroMeta = document.querySelector('.hero-meta');
  if (heroMeta) {
    heroMeta.innerHTML = `
      <li><span class="dot">•</span> Berdomisili di ${p.location} <span class="flag">ID</span></li>
      <li><span class="dot">•</span> ${p.status}</li>`;
  }
  const heroText = document.querySelectorAll('.hero-text');
  if (heroText[0]) heroText[0].innerHTML = p.bio_id;
  if (heroText[1]) heroText[1].innerHTML = p.bio_id_2;
  // contact
  const contactEmail = document.querySelector('.contact-card[href^="mailto:"]');
  if (contactEmail) {
    contactEmail.href = `mailto:${p.email}`;
    const ps = contactEmail.querySelectorAll('p');
    if (ps[0]) ps[0].textContent = p.email;
  }
}

function renderAbout(p) {
  if (!p) return;
  const about = document.querySelector('.about-card');
  if (!about) return;
  about.innerHTML = `
    <p>${p.about_id}</p>
    <p>${p.about_id_2}</p>
    <blockquote class="quote">${p.quote}</blockquote>`;
}

function renderSkills(s) {
  if (!s) return;
  const filters = document.getElementById('skillFilters');
  const grid = document.getElementById('skillsGrid');
  if (filters) {
    const cats = s.categories.map(c => `<button class="chip" data-filter="${c.id}">${c.label} <span class="count">${countByCat(s.skills, c.id)}</span></button>`).join('');
    filters.innerHTML = `<button class="chip active" data-filter="all">Semua <span class="count">${s.skills.length}</span></button>` + cats;
  }
  if (grid) {
    grid.innerHTML = s.skills.map(sk => `<div class="skill-card" data-cat="${sk.category}"><span class="skill-icon">${sk.icon}</span><span>${sk.name}</span></div>`).join('');
  }
}
function countByCat(skills, cat) { return skills.filter(s => s.category === cat).length; }

function initSkillFilter() {
  const filters = document.getElementById('skillFilters');
  if (!filters) return;
  filters.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    filters.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    document.querySelectorAll('.skill-card').forEach(card => {
      card.classList.toggle('hidden', !(filter === 'all' || card.dataset.cat === filter));
    });
  });
}

function renderAchievements(a) {
  if (!a) return;
  const list = document.querySelector('.achievement-list');
  if (!list) return;
  const medalEmoji = { gold: '🥇', silver: '🥈', bronze: '🥉', cert: '📜' };
  list.innerHTML = a.achievements.map(x => `
    <div class="ach-item">
      <div class="ach-medal ${x.medal}">${medalEmoji[x.medal] || '🏆'}</div>
      <div class="ach-body">
        <h4>${x.title}</h4>
        <p>${x.level}${x.year ? ' · ' + x.year : ''}</p>
      </div>
    </div>`).join('');
}

function renderProjects(p) {
  if (!p) return;
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;
  grid.innerHTML = p.projects.map(pr => `
    <article class="project-card">
      <div class="project-head">
        <div class="project-icon" style="--c:${pr.color}">${pr.icon}</div>
        <div>
          <h4>${pr.title}</h4>
          <p class="project-tag">${pr.tag}</p>
        </div>
      </div>
      <p>${pr.description}</p>
      <div class="project-tags">${(pr.tags || []).map(t => `<span>${t}</span>`).join('')}</div>
    </article>`).join('');
}

function renderCareer(c) {
  if (!c) return;
  const list = document.querySelector('.career-list');
  if (list) {
    list.innerHTML = c.career.map(j => `
      <article class="career-card">
        <div class="career-logo">${j.icon || '🏫'}</div>
        <div class="career-body">
          <h4>${j.role}</h4>
          <p class="career-org">${j.org}</p>
          <ul class="career-meta">
            <li>${j.period}</li><li>·</li><li>${j.type}</li>
          </ul>
          <button class="career-toggle">Tampilkan detail</button>
        </div>
      </article>`).join('');
  }
  const orgs = document.querySelector('.org-list');
  if (orgs) {
    orgs.innerHTML = c.organizations.map(o => `
      <div class="org-item">
        <div class="org-year">${o.year}</div>
        <div class="org-body">
          <h4>${o.role}</h4>
          <p>${o.org}</p>
        </div>
      </div>`).join('');
  }
  // Re-bind toggle
  document.querySelectorAll('.career-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = btn.textContent === 'Tampilkan detail' ? 'Sembunyikan detail' : 'Tampilkan detail';
    });
  });
}

function renderEducation(e) {
  if (!e) return;
  const list = document.querySelector('.edu-list');
  if (!list) return;
  list.innerHTML = e.education.map(x => `
    <article class="edu-card">
      <div class="edu-year">${x.year}</div>
      <div class="edu-body">
        <h4>${x.degree}</h4>
        <p>${x.school}</p>
        <ul class="edu-meta">
          ${x.gpa ? `<li>IPK: ${x.gpa}</li>` : ''}
          ${x.nim ? `<li>NIM: ${x.nim}</li>` : ''}
          <li class="status lulus">${x.status}</li>
        </ul>
      </div>
    </article>`).join('');
}

function renderResearch(r) {
  if (!r) return;
  const rl = document.querySelector('.research-list');
  if (rl) {
    rl.innerHTML = r.research.map(x => `
      <div class="research-item">
        <div class="research-year">${x.year}</div>
        <div class="research-body">
          <h4>${x.title}</h4>
          <p>${x.source}</p>
        </div>
      </div>`).join('');
  }
  const cl = document.querySelector('.conf-list');
  if (cl) {
    cl.innerHTML = r.conferences.map(x => `
      <div class="conf-item ${x.speaker ? 'speaker' : ''}">
        <div class="conf-year">${x.year}</div>
        <div class="conf-body">
          <h4>${x.title}</h4>
          <p>${x.org} · ${x.speaker ? '<strong>' + x.role + '</strong>' : x.role}</p>
        </div>
      </div>`).join('');
  }
  const tl = document.querySelector('.training-list');
  if (tl) {
    tl.innerHTML = r.trainings.map(x => `
      <div class="training-item">
        <span>${x.date}</span>
        <span>${x.name}</span>
      </div>`).join('');
  }
}

// ---------- BACK TO TOP ----------
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- FADE IN ----------
function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.skill-card, .creation-card, .ach-item, .project-card, .career-card, .org-item, .edu-card, .contact-card, .research-item, .conf-item, .training-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}
