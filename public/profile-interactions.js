(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const activeAnimations = new Set();
  let printing = false;

  function animate(element, values, options = {}) {
    const applyFinal = () => {
      for (const [name, value] of Object.entries(values)) {
        element.style[name] = Array.isArray(value) ? value[value.length - 1] : value;
      }
    };
    if (!window.Motion || reducedMotion.matches || printing) {
      applyFinal();
      return;
    }
    const control = Motion.animate(element, values, {
      duration: .38,
      ease: [.22, 1, .36, 1],
      ...options,
    });
    const record = { control, applyFinal };
    activeAnimations.add(record);
    Promise.resolve(control).then(() => activeAnimations.delete(record));
  }

  function finishAnimations() {
    for (const record of activeAnimations) {
      record.control.complete();
      record.applyFinal();
    }
    activeAnimations.clear();
  }

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) finishAnimations();
  });
  addEventListener('beforeprint', () => {
    printing = true;
    finishAnimations();
  });
  addEventListener('afterprint', () => { printing = false; });

  const heroItems = document.querySelectorAll('.hero-kicker, .hero h1, .hero-lede, .hero-actions, .hero-note, .portrait');
  heroItems.forEach((element, index) => {
    animate(element, { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0px)'] }, { duration: .5, delay: index * .045 });
  });
  animate(document.querySelector('.hero-underline'), {
    transform: ['rotate(-1.5deg) scaleX(0)', 'rotate(-1.5deg) scaleX(1)'],
  }, { duration: .5, delay: .15 });

  if ('IntersectionObserver' in window) {
    const reveals = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        animate(entry.target, { opacity: [0, 1], transform: ['translateY(16px)', 'translateY(0px)'] }, { duration: .45 });
        reveals.unobserve(entry.target);
      }
    }, { threshold: .08 });
    document.querySelectorAll('.section-heading, .case-mini, .process-item, .talk-photo, .personal-photo').forEach(element => reveals.observe(element));


  }

  const progress = document.querySelector('.reading-progress span');
  const navLinks = [...document.querySelectorAll('.nav-links a')];
  const navSections = [...document.querySelectorAll('header[id], main > section[id], footer[id]')];
  let activeSection;
  let progressPending = false;
  function updateProgress() {
    const range = document.documentElement.scrollHeight - innerHeight;
    const readingLine = Math.max(130, innerHeight * .28);
    let current;
    for (const section of navSections) {
      if (section.getBoundingClientRect().top <= readingLine) current = section.id;
    }
    progress.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0})`;
    if (current !== activeSection) {
      activeSection = current;
      for (const link of navLinks) {
        if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
    progressPending = false;
  }
  addEventListener('scroll', () => {
    if (progressPending) return;
    progressPending = true;
    requestAnimationFrame(updateProgress);
  }, { passive: true });
  addEventListener('resize', updateProgress);
  updateProgress();

  const explorer = document.querySelector('.workflow-explorer');
  const flow = document.querySelector('.workflow .flow');
  const tabs = [...explorer.querySelectorAll('[role="tab"]')];
  const panels = [...explorer.querySelectorAll('[role="tabpanel"]')];
  const track = explorer.querySelector('.workflow-track span');
  let stage = 0;
  function selectStage(index, focus = false) {
    stage = index;
    tabs.forEach((tab, current) => {
      tab.setAttribute('aria-selected', String(current === index));
      tab.tabIndex = current === index ? 0 : -1;
      panels[current].hidden = current !== index;
    });
    if (focus) tabs[index].focus();
    animate(track, { transform: `scaleX(${(index + 1) / tabs.length})` }, { duration: .22 });
    animate(panels[index], { opacity: [0, 1], transform: ['translateY(7px)', 'translateY(0px)'] }, { duration: .24 });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectStage(index));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (stage + 1) % tabs.length;
      if (event.key === 'ArrowLeft') target = (stage - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target === undefined) return;
      event.preventDefault();
      selectStage(target, true);
    });
  });
  explorer.hidden = false;
  flow.hidden = true;

  const interests = {
    advice: {
      title: '어디부터 바꿀지, 함께 정리합니다.',
      copy: '현재의 업무와 가장 막히는 지점을 알려 주세요. 적용 과제와 검증 기준부터 함께 이야기합니다.',
      action: 'AX 자문 이야기하기 ↗', subject: 'AX 문제 진단·자문 문의',
    },
    build: {
      title: '쓰는 도구 안에서, 작동하도록 만듭니다.',
      copy: '자동화하고 싶은 업무, 사용 중인 도구와 데이터를 알려 주세요. 작은 검증부터 구현·연동·운영 범위를 정합니다.',
      action: '구현·자동화 이야기하기 ↗', subject: 'AI 구현·자동화 문의',
    },
    learn: {
      title: '배운 뒤 직접 활용할 수 있도록.',
      copy: '교육 대상과 경험 수준, 다루고 싶은 업무를 알려 주세요. 강연·워크숍·실습의 주제와 형식을 함께 정합니다.',
      action: '교육·워크숍 이야기하기 ↗', subject: 'AX 교육·워크숍 문의',
    },
  };
  const guide = document.querySelector('.interest-guide');
  const interestButtons = [...guide.querySelectorAll('[data-interest]')];
  interestButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selected = interests[button.dataset.interest];
      interestButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      document.querySelector('#interest-title').textContent = selected.title;
      document.querySelector('#interest-copy').textContent = selected.copy;
      const contact = document.querySelector('#interest-contact');
      contact.textContent = selected.action;
      contact.href = `mailto:kojaesung@gmail.com?subject=${encodeURIComponent(selected.subject)}`;
      animate(guide.querySelector('.interest-response'), { opacity: [0, 1], transform: ['translateY(6px)', 'translateY(0px)'] }, { duration: .2 });
    });
  });
  guide.hidden = false;

  const dialog = document.querySelector('.photo-dialog');
  const modalImage = dialog.querySelector('img');
  let photoOpener;
  let previousOverflow;
  let photoLocked = false;
  function restorePhoto() {
    if (!photoLocked) return;
    photoLocked = false;
    document.documentElement.style.overflow = previousOverflow;
    photoOpener?.focus();
  }
  function closePhoto() {
    dialog.close();
    restorePhoto();
  }
  if (typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-photo]').forEach(link => {
      link.setAttribute('aria-haspopup', 'dialog');
      link.addEventListener('click', event => {
        event.preventDefault();
        photoOpener = link;
        const figure = link.closest('figure');
        document.querySelector('#photo-dialog-title').textContent = figure.querySelector('h3').textContent;
        modalImage.src = link.getAttribute('href');
        modalImage.alt = link.querySelector('img').alt;
        dialog.querySelector('.photo-dialog-caption').textContent = figure.querySelector('figcaption > p').textContent;
        previousOverflow = document.documentElement.style.overflow;
        photoLocked = true;
        document.documentElement.style.overflow = 'hidden';
        dialog.showModal();
        animate(dialog, { opacity: [0, 1], transform: ['translateY(10px)', 'translateY(0px)'] }, { duration: .24 });
      });
    });
    dialog.querySelector('.photo-close').addEventListener('click', closePhoto);
    dialog.addEventListener('click', event => { if (event.target === dialog) closePhoto(); });
    dialog.addEventListener('cancel', event => { event.preventDefault(); closePhoto(); });
    dialog.addEventListener('close', restorePhoto);
  }

  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.photo-open').forEach(link => {
      const image = link.querySelector('img');
      link.addEventListener('mouseenter', () => animate(image, { transform: 'scale(1.025)' }, { duration: .35 }));
      link.addEventListener('mouseleave', () => animate(image, { transform: 'scale(1)' }, { duration: .3 }));
    });
  }
})();
