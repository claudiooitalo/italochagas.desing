const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
const featuredProjects = projects.filter(project => project.featured !== false);

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a')];
const projectsGrid = document.getElementById('projectsGrid');

const dialog = document.getElementById('projectDialog');
const dialogClose = dialog.querySelector('.dialog-close');
const dialogTitle = document.getElementById('dialogTitle');
const dialogCategory = document.getElementById('dialogCategory');
const dialogSummary = document.getElementById('dialogSummary');
const dialogTags = document.getElementById('dialogTags');
const dialogGallery = document.getElementById('dialogGallery');
const dialogCounter = document.getElementById('dialogCounter');
const dialogBehanceLink = document.getElementById('dialogBehanceLink');
const previousProject = document.getElementById('previousProject');
const nextProject = document.getElementById('nextProject');

let lastFocusedElement = null;
let currentProjectIndex = 0;

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}


function projectMeta(project) {
  return [project.category, project.year].filter(Boolean).join(' · ');
}

function normalizedMedia(project) {
  if (Array.isArray(project.media) && project.media.length) return project.media;
  return (project.images || []).map(src => ({ type: 'image', src }));
}

function renderProjectMedia(project) {
  return normalizedMedia(project).map((item, mediaIndex) => {
    if (item.type === 'video') {
      const poster = item.poster ? ` poster="${escapeHtml(item.poster)}"` : '';
      const title = escapeHtml(item.title || `${project.title} — vídeo ${mediaIndex + 1}`);
      return `
        <figure class="dialog-media dialog-video ${mediaIndex === 0 ? 'dialog-media-lead' : ''}">
          <video controls playsinline preload="metadata"${poster} aria-label="${title}">
            <source src="${escapeHtml(item.src)}" type="video/mp4">
            Seu navegador não suporta vídeo HTML5.
          </video>
        </figure>
      `;
    }

    return `
      <figure class="dialog-media dialog-image ${mediaIndex === 0 ? 'dialog-media-lead' : ''}">
        <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || `${project.title} — visual ${mediaIndex + 1}`)}" loading="${mediaIndex === 0 ? 'eager' : 'lazy'}">
      </figure>
    `;
  }).join('');
}

function renderProjects() {
  if (!projectsGrid) return;

  if (!featuredProjects.length) {
    projectsGrid.innerHTML = '<p class="empty-projects">Nenhum projeto publicado ainda.</p>';
    return;
  }

  projectsGrid.innerHTML = featuredProjects.map((project, index) => `
    <button class="project-card reveal ${index === 0 ? 'project-card-featured' : ''}" type="button" data-project="${escapeHtml(project.id)}" aria-label="Abrir projeto ${escapeHtml(project.title)}">
      <span class="project-media">
        <img src="${escapeHtml(project.cover)}" alt="Capa do projeto ${escapeHtml(project.title)}" loading="${index < 2 ? 'eager' : 'lazy'}">
        <span class="project-overlay" aria-hidden="true"><span>${project.media?.some(item => item.type === 'video') ? 'Assistir projeto' : 'Ver projeto'}</span><strong>↗</strong></span>
      </span>
      <span class="project-footer">
        <span class="project-copy">
          <small>${escapeHtml(projectMeta(project))}</small>
          <strong>${escapeHtml(project.title)}</strong>
        </span>
        <span class="project-arrow" aria-hidden="true">↗</span>
      </span>
    </button>
  `).join('');

  document.querySelectorAll('[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const index = featuredProjects.findIndex(project => project.id === card.dataset.project);
      openProject(index >= 0 ? index : 0, card);
    });
  });

  document.querySelectorAll('.project-card.reveal').forEach(el => revealObserver.observe(el));
}

function setHeaderState() {
  header.classList.toggle('scrolled', window.scrollY > 18);
}

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
  nav.classList.toggle('open', !expanded);
});

navLinks.forEach(link => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  nav.classList.remove('open');
}));

const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function pauseDialogMedia() {
  dialog.querySelectorAll('video, audio').forEach(media => media.pause());
}

function renderDialogProject(index) {
  if (!featuredProjects.length) return;

  pauseDialogMedia();
  currentProjectIndex = (index + featuredProjects.length) % featuredProjects.length;
  const project = featuredProjects[currentProjectIndex];

  dialogTitle.textContent = project.title;
  dialogCategory.textContent = project.category;
  dialogSummary.textContent = project.summary;
  dialogCounter.textContent = `${String(currentProjectIndex + 1).padStart(2, '0')} / ${String(featuredProjects.length).padStart(2, '0')}`;
  dialogBehanceLink.href = project.behanceUrl || 'https://www.behance.net/claudiooitalo';
  dialogBehanceLink.hidden = !project.behanceUrl;

  dialogTags.innerHTML = (project.tags || []).map(tag => `<span>${escapeHtml(tag)}</span>`).join('');
  dialogGallery.innerHTML = renderProjectMedia(project);

  previousProject.disabled = featuredProjects.length < 2;
  nextProject.disabled = featuredProjects.length < 2;

  dialog.querySelector('.dialog-shell').scrollTop = 0;
}

function openProject(index, trigger) {
  if (!featuredProjects.length) return;
  lastFocusedElement = trigger || document.activeElement;
  renderDialogProject(index);
  dialog.showModal();
  document.body.classList.add('dialog-open');
  dialogClose.focus();
}

function closeProject() {
  if (!dialog.open) return;
  pauseDialogMedia();
  dialog.close();
  document.body.classList.remove('dialog-open');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
}

previousProject.addEventListener('click', () => renderDialogProject(currentProjectIndex - 1));
nextProject.addEventListener('click', () => renderDialogProject(currentProjectIndex + 1));
dialogClose.addEventListener('click', closeProject);

dialog.addEventListener('click', event => {
  if (event.target === dialog) closeProject();
});

dialog.addEventListener('cancel', event => {
  event.preventDefault();
  closeProject();
});

dialog.querySelectorAll('[data-close-dialog]').forEach(link => link.addEventListener('click', closeProject));

document.addEventListener('keydown', event => {
  if (!dialog.open) return;
  if (event.key === 'ArrowLeft') renderDialogProject(currentProjectIndex - 1);
  if (event.key === 'ArrowRight') renderDialogProject(currentProjectIndex + 1);
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const contactEmail = 'italochagas.design@gmail.com';

contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const honeypot = contactForm.querySelector('[name="company_website"]');
  if (honeypot && honeypot.value.trim()) return;

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);
  formData.delete('company_website');
  formData.set('_subject', 'Novo pedido de orçamento — site Ítalo Chagas');
  formData.set('_template', 'table');
  formData.set('_captcha', 'false');

  submitButton.disabled = true;
  submitButton.setAttribute('aria-busy', 'true');
  formStatus.textContent = 'Enviando...';

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData
    });

    if (!response.ok) throw new Error('Falha no envio');

    contactForm.reset();
    formStatus.textContent = 'Mensagem enviada. Em breve entro em contato.';
  } catch (error) {
    formStatus.innerHTML = `Não consegui enviar agora. Você pode escrever para <a href="mailto:${contactEmail}">${contactEmail}</a>.`;
  } finally {
    submitButton.disabled = false;
    submitButton.removeAttribute('aria-busy');
  }
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
renderProjects();
