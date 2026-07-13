// Easter egg system — consolidated from Base.astro inline scripts.
// Everything here is ambient personality, not functionality: it must never
// block rendering, so heavier work runs behind requestIdleCallback.

declare global {
  interface Window {
    showToast?: (message: string) => void;
    markEggFound?: (id: string, message?: string) => void;
    posthog?: { capture: (event: string, props?: Record<string, unknown>) => void };
  }
}

/* ── Toast ─────────────────────────────────────────────────────── */

let toastEl: HTMLDivElement | null = null;
let toastTimer: ReturnType<typeof setTimeout> | null = null;

function showToast(message: string) {
  // One toast at a time — eggs are ambient, skipping is fine.
  if (toastEl && toastEl.style.opacity === '1') return;

  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.setAttribute('role', 'status');
    toastEl.style.cssText = [
      'position:fixed', 'bottom:28px', 'left:50%', 'transform:translateX(-50%) translateY(8px)',
      'background:var(--color-primary)', 'color:var(--color-background)',
      "font-family:'Inter',sans-serif", 'font-size:13.5px', 'line-height:1.5',
      'padding:12px 20px', 'border-radius:6px', 'max-width:min(420px, calc(100vw - 48px))',
      'text-align:center', 'z-index:300', 'box-shadow:0 8px 32px rgba(0,0,0,0.25)',
      'opacity:0', 'transition:opacity 300ms ease, transform 300ms ease', 'cursor:pointer',
    ].join(';');
    toastEl.addEventListener('click', hideToast);
    document.body.appendChild(toastEl);
  }

  toastEl.textContent = message;
  requestAnimationFrame(() => {
    if (!toastEl) return;
    toastEl.style.opacity = '1';
    toastEl.style.transform = 'translateX(-50%) translateY(0)';
  });

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 5000);
}

function hideToast() {
  if (!toastEl) return;
  toastEl.style.opacity = '0';
  toastEl.style.transform = 'translateX(-50%) translateY(8px)';
}

window.showToast = showToast;

/* ── Egg tracking ──────────────────────────────────────────────── */

window.markEggFound = function (id: string, message?: string) {
  const found: string[] = JSON.parse(localStorage.getItem('dd-found-eggs') || '[]');
  const isNew = !found.includes(id);
  if (isNew) {
    found.push(id);
    localStorage.setItem('dd-found-eggs', JSON.stringify(found));
  }
  // Only newly found eggs with a message surface a toast.
  if (isNew && message) showToast(message);
};

/* ── Eggs ──────────────────────────────────────────────────────── */

function initConsoleMessage() {
  const isDark = document.documentElement.classList.contains('dark') ||
    localStorage.getItem('theme') === 'dark';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    console.log('%cYou opened the console on mobile.', 'font-size: 18px; font-weight: bold; color: #2D5BE3;');
    console.log("%cI don't know whether to be impressed or concerned.", 'font-size: 14px; color: #6B6B6B;');
    console.log('%cdilithdinesh007@gmail.com', 'font-size: 14px; font-weight: bold;');
  } else if (isDark) {
    console.log('%cDark mode AND the console open.', 'font-size: 20px; font-weight: bold; color: #2D5BE3;');
    console.log("%cYou're exactly the kind of person I want to work with.", 'font-size: 14px; color: #9A9A9A;');
    console.log('%cdilithdinesh007@gmail.com', 'font-size: 14px; color: #F9F7F4; font-weight: bold;');
  } else {
    console.log('%cHey.', 'font-size: 24px; font-weight: bold; color: #2D5BE3;');
    console.log("%cYou opened the console. That's exactly the kind of thing I'd do too.", 'font-size: 14px; color: #6B6B6B;');
    console.log('%cdilithdinesh007@gmail.com', 'font-size: 14px; color: #1A1A1A; font-weight: bold;');
  }
}

function initFastReader() {
  if (!sessionStorage.getItem('fast-read-pending')) return;
  sessionStorage.removeItem('fast-read-pending');
  setTimeout(() => {
    window.markEggFound?.('fast-reader', 'That was fast. Some of this deserved more time.');
  }, 800);
}

function initProductType() {
  let typed = '';
  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    typed += e.key.toLowerCase();
    if (typed.length > 7) typed = typed.slice(-7);
    if (typed.includes('product')) {
      const hero = document.querySelector<HTMLElement>('.hero-tagline');
      if (hero) {
        hero.style.transition = 'color 200ms ease';
        hero.style.color = '#2D5BE3';
        setTimeout(() => { hero.style.color = ''; }, 2000);
      }
      window.markEggFound?.('product-type');
      typed = '';
    }
  });
}

function initIdleTimer() {
  if (sessionStorage.getItem('idle-shown')) return;
  let timer: ReturnType<typeof setTimeout>;
  function fireIdle() {
    if (sessionStorage.getItem('idle-shown')) return;
    sessionStorage.setItem('idle-shown', 'true');
    window.markEggFound?.('idle-5min', "Still reading? Good. Most people don't get this far.");
  }
  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(fireIdle, 5 * 60 * 1000);
  }
  ['scroll', 'click', 'keypress', 'mousemove', 'touchstart'].forEach((e) =>
    document.addEventListener(e, resetTimer, { passive: true })
  );
  resetTimer();
}

function initClipboard() {
  document.addEventListener('copy', () => {
    const selection = window.getSelection()?.toString();
    if (!selection || selection.length < 10) return;
    window.markEggFound?.('clipboard');
  });
}

function initViewport420() {
  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth === 420) {
        window.markEggFound?.('viewport-420', 'Nice. You resize browser windows too.');
      }
    }, 200);
  });
}

function initRightClick() {
  document.addEventListener('contextmenu', () => {
    window.markEggFound?.('right-click', 'Looking for the source? github.com/Dilith-D/portfolio-website');
  });
}

function initDeepReader() {
  // Must run before the return-visitor egg sets dd-visited.
  const isHome = window.location.pathname === '/';
  const alreadyVisited = localStorage.getItem('dd-visited');
  if (!isHome || alreadyVisited) return;
  const arrival = Date.now();
  let shown = false;
  setInterval(() => {
    if (shown) return;
    if (Date.now() - arrival >= 4 * 60 * 1000) {
      shown = true;
      window.markEggFound?.('deep-reader', "Four minutes on a first visit. You're a deep reader. I write for people like you.");
    }
  }, 10000);
}

function initReturnVisitor() {
  const isHome = window.location.pathname === '/';
  const visited = localStorage.getItem('dd-visited');
  if (isHome && visited) {
    setTimeout(() => {
      window.markEggFound?.('return-visitor', 'You came back. Something must have stuck.');
    }, 3000);
  }
  if (isHome) localStorage.setItem('dd-visited', 'true');
}

function initTimeBased() {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  const isHome = window.location.pathname === '/';

  if (hour >= 0 && hour < 5 && !sessionStorage.getItem('dd-night')) {
    sessionStorage.setItem('dd-night', 'true');
    setTimeout(() => { window.markEggFound?.('night-owl', "It's late. Whatever you're working on — good luck."); }, 2000);
    return;
  }
  if (day === 1 && hour >= 8 && hour < 10 && isHome && !sessionStorage.getItem('dd-monday')) {
    sessionStorage.setItem('dd-monday', 'true');
    setTimeout(() => { window.markEggFound?.('monday-morning', 'Monday morning. Evaluating options? So am I.'); }, 2000);
    return;
  }
  if (day === 5 && hour >= 17 && hour < 21 && isHome && !sessionStorage.getItem('dd-friday')) {
    sessionStorage.setItem('dd-friday', 'true');
    setTimeout(() => { window.markEggFound?.('friday-evening', 'Hiring decisions on a Friday? Respect the dedication.'); }, 2000);
  }
}

function initAllPages() {
  if (sessionStorage.getItem('dd-all-pages')) return;
  const pages = ['/', '/work', '/writing', '/projects', '/about'];
  const current = window.location.pathname.replace(/\/$/, '') || '/';
  const seen: string[] = JSON.parse(sessionStorage.getItem('dd-pages-seen') || '[]');
  const match = pages.find((p) => current === p || current.startsWith(p + '/'));
  if (match && !seen.includes(match)) {
    seen.push(match);
    sessionStorage.setItem('dd-pages-seen', JSON.stringify(seen));
  }
  if (pages.every((p) => seen.includes(p))) {
    sessionStorage.setItem('dd-all-pages', 'true');
    setTimeout(() => { window.markEggFound?.('all-pages', "You've seen everything. Most people don't. I hope something was worth it."); }, 1500);
  }
}

function initLogoClicks() {
  let logoClicks = 0;
  const logo = document.querySelector('a[href="/"]');
  if (!logo) return;
  logo.addEventListener('click', () => {
    logoClicks++;
    if (logoClicks === 3) {
      logoClicks = 0;
      window.markEggFound?.('logo-clicks', 'Three times home. Looking for something specific? dilithdinesh007@gmail.com');
    }
  });
}

function initKeyboardNav() {
  if (sessionStorage.getItem('dd-keyboard')) return;
  let tabCount = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      tabCount++;
      if (tabCount === 3) {
        sessionStorage.setItem('dd-keyboard', 'true');
        window.markEggFound?.('keyboard-nav', 'Keyboard navigation. Accessibility-first thinking. Respect.');
      }
    }
  });
}

function initTextSelection() {
  document.addEventListener('mouseup', () => {
    if (sessionStorage.getItem('dd-selection')) return;
    const selection = window.getSelection()?.toString().trim();
    if (selection && selection.length >= 80) {
      sessionStorage.setItem('dd-selection', 'true');
      window.markEggFound?.('text-selection', "Found something worth keeping? I'd love to know what. dilithdinesh007@gmail.com");
    }
  });
}

function initHonestTooltip() {
  // Walks text nodes to wrap the word "honest" — deferred to idle time
  // so it never competes with rendering or interaction.
  function wrapHonest(node: Node) {
    if (node.nodeType === 3) {
      const text = node.textContent ?? '';
      if (/\bhonest\b/i.test(text)) {
        const span = document.createElement('span');
        span.innerHTML = text.replace(/\b(honest)\b/gi,
          `<span class="honest-egg" style="position:relative;cursor:help;text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px;">$1<span class="honest-tip" style="display:none;position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);background:#1A1A1A;color:#F9F7F4;font-size:13px;font-family:'Inter',sans-serif;white-space:nowrap;padding:6px 12px;border-radius:4px;pointer-events:none;z-index:100;">This word does a lot of work on this site.</span></span>`
        );
        node.parentNode?.replaceChild(span, node);
      }
    } else if (node.nodeType === 1 && !['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes((node as Element).tagName)) {
      Array.from(node.childNodes).forEach(wrapHonest);
    }
  }

  wrapHonest(document.body);
  document.querySelectorAll<HTMLElement>('.honest-egg').forEach((egg) => {
    const tip = egg.querySelector<HTMLElement>('.honest-tip');
    egg.addEventListener('mouseenter', () => { if (tip) tip.style.display = 'block'; window.markEggFound?.('honest-hover'); });
    egg.addEventListener('mouseleave', () => { if (tip) tip.style.display = 'none'; });
  });
}

/* ── Init ──────────────────────────────────────────────────────── */

export function initEggs() {
  initConsoleMessage();
  initFastReader();
  initProductType();
  initClipboard();
  initViewport420();
  initRightClick();
  initDeepReader();
  initReturnVisitor();
  initTimeBased();
  initAllPages();
  initLogoClicks();
  initKeyboardNav();
  initTextSelection();

  const idle = (cb: () => void) =>
    'requestIdleCallback' in window ? requestIdleCallback(cb) : setTimeout(cb, 200);

  idle(() => {
    initIdleTimer();
    initHonestTooltip();
  });
}
