/* ============================================================================
   timer.js: "Practice under exam conditions" countdown.
   ----------------------------------------------------------------------------
   Opens a past paper AND starts a floating countdown matching that standard's
   real exam length, so practice sessions are properly timed.

   ⚠️ DURATIONS: NCEA Level 3 externals are typically 3 hours for a full
   subject paper covering several standards. Because this site opens ONE
   standard's paper at a time, the defaults below are the per-standard reading
   of that (roughly proportional to the credits). Adjust in EXAM_MINUTES if
   your teacher gives you a different figure.
   ========================================================================== */

/* Minutes allowed per standard's paper. Most L3 single-standard papers run
   about 60 minutes; larger 6-credit papers get a bit longer. */
export const EXAM_MINUTES = {
  // Chemistry
  '91390': 60, '91391': 70, '91392': 70,
  // Physics
  '91523': 60, '91524': 75, '91526': 75,
  // Calculus
  '91577': 60, '91578': 70, '91579': 70,
  // Statistics
  '91584': 60, '91585': 60, '91586': 60,
  // Biology
  '91603': 70, '91605': 60, '91606': 60,
  // English (essay papers)
  '91472': 60, '91473': 60,
};

const DEFAULT_MINUTES = 60;
let active = null;   // { el, interval, endsAt }

export function examMinutesFor(num) {
  return EXAM_MINUTES[String(num)] || DEFAULT_MINUTES;
}

/** Start (or restart) a floating exam timer. */
export function startExamTimer({ label, minutes }) {
  stopExamTimer();

  const total = minutes * 60 * 1000;
  const endsAt = Date.now() + total;

  const el = document.createElement('div');
  el.className = 'exam-timer';
  el.innerHTML = `
    <div class="et-head">
      <span class="et-dot"></span>
      <span class="et-label">${label}</span>
      <button class="et-close" title="Stop timer" aria-label="Stop timer">✕</button>
    </div>
    <div class="et-time" id="et-time">--:--</div>
    <div class="et-bar"><span id="et-bar-fill"></span></div>
    <div class="et-foot"><span id="et-note">${minutes} min · exam conditions</span></div>`;
  document.body.appendChild(el);

  el.querySelector('.et-close').addEventListener('click', stopExamTimer);

  const timeEl = el.querySelector('#et-time');
  const fillEl = el.querySelector('#et-bar-fill');
  const noteEl = el.querySelector('#et-note');

  const tick = () => {
    const left = endsAt - Date.now();
    if (left <= 0) {
      timeEl.textContent = '00:00';
      fillEl.style.width = '100%';
      el.classList.add('is-done');
      noteEl.textContent = '⏰ Time is up: pens down!';
      clearInterval(active.interval);
      try {  // a gentle two-tone chime; silently ignored if audio is blocked
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        [660, 880].forEach((f, i) => {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.frequency.value = f; o.connect(g); g.connect(ctx.destination);
          g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.35);
          g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + i * 0.35 + 0.05);
          g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.35 + 0.3);
          o.start(ctx.currentTime + i * 0.35); o.stop(ctx.currentTime + i * 0.35 + 0.35);
        });
      } catch (e) {}
      return;
    }
    const mins = Math.floor(left / 60000);
    const secs = Math.floor((left % 60000) / 1000);
    timeEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    fillEl.style.width = `${((total - left) / total) * 100}%`;
    el.classList.toggle('is-warning', left <= 5 * 60 * 1000);   // last 5 minutes
    if (left <= 5 * 60 * 1000) noteEl.textContent = 'Under 5 minutes left';
  };

  active = { el, interval: setInterval(tick, 250), endsAt };
  tick();
}

export function stopExamTimer() {
  if (!active) return;
  clearInterval(active.interval);
  active.el.remove();
  active = null;
}
