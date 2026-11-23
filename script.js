/**
 * NexusAI Labs - Interactive Client Script
 * Topic: Group 3, #7 - AI Technology Website (Activity 3)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-item');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const demoInput = document.getElementById('demoInput');
  const runDemoBtn = document.getElementById('runDemoBtn');
  const outputText = document.getElementById('outputText');
  const latencyDisplay = document.getElementById('latencyDisplay');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  // --- 1. Mobile Menu Drawer Toggle ---
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // --- 2. Interactive AI Playground Presets & Responses ---
  const mockResponses = {
    "Analyze biochemical binding affinity for kinase inhibitor targets.":
      "Computing molecular dynamics simulations... Target: Tyrosine Kinase receptor pocket (PDB: 6VXX). Ligand binding affinity estimated at -11.4 kcal/mol with favorable hydrogen bonding at residues Met793 and Thr854. Zero off-target toxicity predicted across secondary cardiac receptors. Ready for in-vitro validation.",
    "Synthesize a distributed microservices architecture in Go with Raft consensus.":
      "Architectural synthesis complete: Generated 4-node Raft consensus cluster with monotonic log replication and lease read optimizations. Partition tolerance verified across simulated 200ms network jitter. Emitting protobuf service definitions and Docker Compose orchestrations.",
    "Formulate multi-agent arbitrage hedge for high-frequency volatility.":
      "Market regime analysis complete: Detected triangular cross-exchange discrepancy on CME / Eurex spread. Deployed delta-neutral hedging swarm across order book micro-structure with estimated Sharpe ratio of 3.82 and maximum calculated drawdown of 0.4%."
  };

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const promptText = btn.getAttribute('data-prompt');
      if (demoInput) demoInput.value = promptText;
      triggerSimulation(promptText);
    });
  });

  if (runDemoBtn) {
    runDemoBtn.addEventListener('click', () => {
      const text = demoInput?.value || "Default Prompt";
      triggerSimulation(text);
    });
  }

  function triggerSimulation(query) {
    if (!outputText) return;
    
    outputText.textContent = "Analyzing tokens and routing through 64 MoE neural clusters...";
    outputText.style.opacity = "0.6";

    // Random fast latency between 11.4ms and 16.8ms
    const randomLatency = (Math.random() * (16.8 - 11.4) + 11.4).toFixed(1);

    setTimeout(() => {
      outputText.style.opacity = "1";
      if (latencyDisplay) {
        latencyDisplay.innerHTML = `<i class="fa-solid fa-bolt"></i> ${randomLatency} ms`;
      }
      outputText.textContent = mockResponses[query] || 
        `Inference completed for prompt: "${escapeHtml(query)}". Synthesized multimodal output with recursive tree-of-thought verification. 100% compliance checked with zero policy deviations.`;
    }, 450);
  }

  // --- 3. Contact Form Submission ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName')?.value || 'Guest';
      const company = document.getElementById('companyName')?.value || 'Your Enterprise';

      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        formSuccess.innerHTML = `
          <i class="fa-solid fa-circle-check"></i>
          <div>
            <strong>Access Request Dispatched for ${escapeHtml(name)}!</strong>
            <p>Our solutions architecture team has received your inquiry for <em>${escapeHtml(company)}</em> and will deliver sandbox credentials shortly.</p>
          </div>
        `;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      contactForm.reset();
    });
  }

  // --- 4. ScrollSpy Active Link ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }
});
