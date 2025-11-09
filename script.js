// ==============================
// Green Lies Detector - Script
// Author: Param Shelke
// Updated with random AI-like analyzer results
// ==============================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- YEAR AUTO-UPDATE ----------
  const years = ['year', 'year2', 'year3', 'year4', 'year5', 'year6', 'year7'];
  years.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  });

  // ---------- NAV TOGGLE (for small screens) ----------
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      if (!nav) return;
      nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
    });
  }

  // ---------- THEME TOGGLE ----------
  const themeBtns = document.querySelectorAll('#themeToggle');
  themeBtns.forEach(btn =>
    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('light-mode');
      btn.textContent = document.documentElement.classList.contains('light-mode')
        ? '🌙'
        : '☀️';
    })
  );

  // ---------- SAMPLE CLAIM BUTTON ----------
  document.querySelectorAll('.sample').forEach(btn => {
    btn.addEventListener('click', () => {
      const ta = document.getElementById('claimText') || document.getElementById('demoClaim');
      if (!ta) return;
      ta.value = "We are 100% carbon neutral across all operations by 2025.";
    });
  });

  // ---------- DEMO / ANALYZE FORM ----------
  const demoForm = document.getElementById('demoForm') || document.getElementById('analyzeForm');
  const demoReport = document.getElementById('demoReport') || document.getElementById('analyzeResult');

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ta = demoForm.querySelector('textarea');
      const text = ta.value.trim();

      if (!text) {
        alert('Please enter a claim to analyze.');
        return;
      }

      // Show loading text
      if (demoReport) {
        demoReport.hidden = false;
        demoReport.innerHTML = "<p class='loading'>Analyzing environmental claims...</p>";
      }

      // Simulate delay for "AI-like" behavior
      setTimeout(() => {
        // ---------- RANDOMIZED FAKE RESULTS ----------
        const aiResults = [
          "⚠️ The company's environmental claims appear exaggerated. Possible greenwashing detected.",
          "✅ The data suggests the company’s sustainability efforts are genuine and transparent.",
          "🟡 Partial compliance found — some claims are supported by evidence, others lack clarity.",
          "🚫 Inconsistencies observed between public sustainability statements and real operational data.",
          "♻️ The company shows moderate environmental responsibility but requires stronger data-backed claims."
        ];

        // Generate simulated score
        const keywords = ["100%", "net zero", "carbon neutral", "sustainable", "eco-friendly", "green"];
        let score = 80;
        keywords.forEach(k => { if (text.toLowerCase().includes(k)) score -= 8; });
        if (text.length < 40) score -= 10;
        if (text.length > 160) score += 3;
        score = Math.max(2, Math.min(98, Math.round(score)));

        // Choose a random summary
        const randomSummary = aiResults[Math.floor(Math.random() * aiResults.length)];

        // Display result content
        if (demoReport) {
          demoReport.innerHTML = `
            <div class="analysis-result">
              <h3>AI-Generated Analysis Summary</h3>
              <p>${randomSummary}</p>
              <h4>Transparency Score: <span id="score">${score}/100</span></h4>
              <p id="reportText">Lower scores indicate a higher risk of greenwashing.</p>
              <ul id="flags"></ul>
            </div>
          `;

          // Add buzzword flags
          const flags = document.getElementById('flags');
          if (flags) {
            keywords.forEach(k => {
              if (text.toLowerCase().includes(k)) {
                const li = document.createElement('li');
                li.textContent = `Buzzword: "${k}" — may be used for marketing emphasis.`;
                flags.appendChild(li);
              }
            });
            if (flags.children.length === 0) {
              const li = document.createElement('li');
              li.textContent = 'No suspicious buzzwords detected.';
              flags.appendChild(li);
            }
          }

          // Smooth scroll to result
          if (typeof demoReport.scrollIntoView === 'function') {
            demoReport.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 2000); // 2-second delay
    });
  }

  // ---------- CLOSE NAV ON LINK CLICK (MOBILE) ----------
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      if (window.innerWidth < 900 && nav) nav.style.display = '';
    });
  });
});
