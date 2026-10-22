/* ==========================================================
   TERMINAL CLI PARSER & INTERACTIONS (terminal-script.js)
   For Devendra Raj Singh's Portfolio
   ========================================================== */

// Store commands history per pane
const history = {};
const historyIndex = {};

// Active pane pointer
let activePaneId = 'pane-1';

// Help commands list
const COMMANDS = {
  help: 'Display all available commands',
  about: 'Learn about Devendra Raj Singh',
  education: 'View my academic background',
  experience: 'View my professional & volunteer experience',
  skills: 'List my technical skill set',
  projects: 'View details of my developed projects',
  theme: 'Switch theme: theme [dracula|nord|solarized|default]',
  split: 'Split the screen: split [horizontal|vertical]',
  snake: 'Play the retro Snake game',
  clear: 'Clear the terminal output',
  gui: 'Return to the graphical neo-brutalist portfolio'
};

// Extracted Profile Details for terminal output
const PROFILE_DETAILS = {
  about: `
<span class="text-accent">DEVENDRA RAJ SINGH</span>
--------------------------------------------------
Role: B.Tech Computer Science & Engineering Student
Specialization: AI & Machine Learning
Location: Bhubaneswar, Odisha, India
Headline: AI & IoT Enthusiast | Full-Stack Learner | Building Real-World Projects
Email: devendrarajsingh2005@gmail.com
GitHub: https://github.com/devendrarajsingh07
LinkedIn: https://www.linkedin.com/in/devendra-raj-singh-b118b3212/

Summary:
I am a B.Tech Computer Science student at KIIT University, passionate about training
computer vision models (YOLOv8, OpenCV), developing responsive web architectures,
and experimenting with IoT hardware sensors. I build and deploy production-ready applications.
  `,
  education: `
<span class="text-accent">ACADEMIC BACKGROUND</span>
--------------------------------------------------
🎓 <span class="text-success">KIIT - Kalinga Institute of Industrial Technology</span>
   Degree: Bachelor of Technology (B.Tech), Computer Science & Engineering
   Duration: Aug 2024 - Apr 2028 (Expected)
   Details: Practicing specialization in Artificial Intelligence and Machine Learning.

🏫 <span class="text-success">Birla School, Pilani</span>
   Grade: 10th CBSE
   Duration: 2018 - 2022

🏫 <span class="text-success">LBPS, Aurangabad, Bihar</span>
   Grade: 12th CBSE
   Duration: 2022 - 2024
  `,
  experience: `
<span class="text-accent">PROFESSIONAL & VOLUNTEER HISTORY</span>
--------------------------------------------------
⚡ <span class="text-success">Software Development Intern</span>
   Organization: NoonRay Energy Pvt. Ltd. | Jun 1, 2026 - Jun 30, 2026
   Contributions:
   - Developed web frontend portals, energy analytics interfaces, and dashboards.

🏢 <span class="text-success">Software Development Intern</span>
   Organization: Black and White Marketing Solutions | May 2026
   Contributions:
   - Developed frontend and backend systems using Java, Python, and C.
   - Applied Data Structures & Algorithms (DSA) to optimize code performance.
   - Refactored legacy routines, solved debugging issues.

⚓ <span class="text-success">NCC Cadet (B Graded)</span>
   Organization: 3 Raj Naval Unit (National Cadet Corps) | Jan 2020 - Apr 2022
   Details: Trained in seamanship, naval operations, leadership, and community service.

🤝 <span class="text-success">Leadership & Volunteer Work</span>
   - <span class="text-blue">Operations Lead</span> @ KIIT Animal and Environment Welfare Society (KAEWS) (Current role; member since Dec 2024)
   - <span class="text-blue">Administration</span> @ Keurig The Food Society (Current role)
   - <span class="text-blue">General Volunteer</span> @ National Service Scheme (Sep 2025 - Present)
  `,
  skills: `
<span class="text-accent">TECHNICAL SKILL SET</span>
--------------------------------------------------
Languages : Python, Java, JavaScript, TypeScript, C, SQL
Frontend & Visualization : React, Next.js, HTML5, CSS3, Tailwind CSS, Three.js, Chart.js, D3
Backend & APIs : Node.js, Express, FastAPI, JWT Authentication
AI & Data Processing : YOLOv8, OpenCV, PyTorch, scikit-learn, Gymnasium, SAC / RL, OCR &amp; RAG, pandas
Databases & Infrastructure : PostgreSQL, MySQL, SQLite, Redis, Qdrant, Docker
Tools & Hardware : Git / GitHub, Streamlit, Java Swing, IoT &amp; Sensors
Leadership & Operations : Team Coordination, Event Operations, Problem Solving, Communication
  `, 
  projects: `
<span class="text-accent">PUBLIC GITHUB PROJECTS</span>
--------------------------------------------------
1. <span class="text-success">BillingPro</span>
   A multi-tenant billing and operations platform for GST-aware invoices, payments, inventory, purchase orders, and customer management. Includes role-based access, recurring invoices, PDF generation, and Razorpay integration.
   Stack: React, Node.js, Express, SQLite, Docker
   Code: <a href="https://github.com/devendrarajsingh07/billingpro-saas" target="_blank" rel="noopener noreferrer">billingpro-saas</a>

2. <span class="text-success">DocuMind</span>
   An authenticated PDF workspace with structured OCR, per-page analysis, and document chat with source citations. Combines document extraction, vector search, and reranking to ground answers in selected PDFs.
   Stack: Next.js, TypeScript, FastAPI, PostgreSQL, Qdrant, RAG
   Code: <a href="https://github.com/devendrarajsingh07/Pdf-with-Ai-Rag" target="_blank" rel="noopener noreferrer">Pdf-with-Ai-Rag</a>

3. <span class="text-success">Traceable Impact</span>
   A reporting platform for nonprofits that turns inconsistent program files into source-linked metrics. Features human-reviewed column mappings and duplicate matches, privacy safeguards, audit trails, and PDF or HTML reports.
   Stack: React, FastAPI, PostgreSQL, pandas, D3
   Code: <a href="https://github.com/devendrarajsingh07/Traceable-impact-reporting-" target="_blank" rel="noopener noreferrer">Traceable-impact-reporting-</a>

4. <span class="text-success">SubTrack</span>
   An AI-assisted subscription and recurring-payment manager for INR spending. Imports CSV, PDF, or image bank statements, detects subscriptions and fixed bills, tracks renewals and budgets, and answers questions with an assistant whose every figure is verified against the user's data.
   Stack: React, TypeScript, FastAPI, PostgreSQL, Gemini, Docker
   Code: <a href="https://github.com/devendrarajsingh07/AI-Powered-Subscription-Recurring-Payment-Manager" target="_blank" rel="noopener noreferrer">AI-Powered-Subscription-Recurring-Payment-Manager</a>
   Demo: <a href="https://ai-powered-subscription-recurring-p.vercel.app" target="_blank" rel="noopener noreferrer">ai-powered-subscription-recurring-p.vercel.app</a>

5. <span class="text-success">Human Digital Twin</span>
   A student wellness platform with an interactive 3D twin, daily observations, nine wellness dimensions, and personalized forecasts. Supports Random Forest models, what-if lifestyle simulations, and prediction-versus-actual tracking.
   Stack: Next.js, Three.js, FastAPI, scikit-learn, PostgreSQL
   Code: <a href="https://github.com/devendrarajsingh07/Human-Digital-Twin0.1" target="_blank" rel="noopener noreferrer">Human-Digital-Twin0.1</a>

6. <span class="text-success">CrowdSense AI</span>
   A crowd monitoring platform using YOLOv8 for person detection and crowd counting. Includes occupancy monitoring, risk classification, historical analytics, video upload analysis, and PDF reports.
   Stack: YOLOv8, OpenCV, FastAPI, SQLite, Chart.js
   Code: <a href="https://github.com/devendrarajsingh07/CrowdSense-AI" target="_blank" rel="noopener noreferrer">CrowdSense-AI</a>

7. <span class="text-success">MGHSIS</span>
   A mass-gathering safety prototype combining wearable telemetry, CCTV crowd analytics, and gate events in a venue digital twin. Provides zone-level risk prediction, scenario simulation, and human-authorized intervention workflows.
   Stack: Next.js, TypeScript, FastAPI, Redis, PostgreSQL, scikit-learn
   Code: <a href="https://github.com/devendrarajsingh07/SIH2026-MGHSIS." target="_blank" rel="noopener noreferrer">SIH2026-MGHSIS.</a>

8. <span class="text-success">AI Battery Fast Charging</span>
   A Soft Actor-Critic reinforcement learning agent for adaptive lithium-ion battery charging. Uses a simplified Single Particle Model with temperature, voltage, and aging penalties, plus a Streamlit simulation dashboard.
   Stack: Python, SAC / RL, Gymnasium, PyTorch, Streamlit
   Code: <a href="https://github.com/devendrarajsingh07/AI_Battery_Fast_Charging" target="_blank" rel="noopener noreferrer">AI_Battery_Fast_Charging</a>
   Demo: https://devrajsingh07.streamlit.app

9. <span class="text-success">Trading Log — Web App</span>
   A browser-based trading journal with JWT authentication, trade management, profit/loss analytics, search, filters, and CSV export. Integrates Alpha Vantage market prices and converts the original desktop workflow into a responsive web app.
   Stack: React, Node.js, Express, MySQL, Chart.js
   Code: <a href="https://github.com/devendrarajsingh07/Trading-Log-Management-System-using-JS" target="_blank" rel="noopener noreferrer">Trading-Log-Management-System-using-JS</a>

10. <span class="text-success">Trading Log — Desktop App</span>
   A Java Swing desktop application for recording and analyzing trades. Provides login authentication, trade management, market price integration, profit/loss analysis, reporting, and CSV export.
   Stack: Java, Swing
   Code: <a href="https://github.com/devendrarajsingh07/Trading-Log-Management-System" target="_blank" rel="noopener noreferrer">Trading-Log-Management-System</a>
  `
};

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
  setupPane('pane-1');
});

// Setup input listeners for a pane
function setupPane(paneId) {
  history[paneId] = [];
  historyIndex[paneId] = -1;
  
  const pane = document.getElementById(paneId);
  if (pane) {
    pane.addEventListener('click', () => {
      focusInput(pane);
    });
  }
}

// Focus input of the clicked/active pane
function focusInput(pane) {
  document.querySelectorAll('.terminal-pane').forEach(p => p.classList.remove('active-pane'));
  pane.classList.add('active-pane');
  activePaneId = pane.id;
  
  const input = pane.querySelector('.terminal-input');
  if (input) input.focus();
}

// Input key listeners
function handleInput(event, inputEl) {
  const paneId = inputEl.closest('.terminal-pane').id;
  const paneHistory = history[paneId];
  
  if (event.key === 'Enter') {
    const value = inputEl.value.trim();
    if (value) {
      paneHistory.push(value);
      historyIndex[paneId] = paneHistory.length;
      runCommand(value, paneId);
    }
    inputEl.value = '';
  } else if (event.key === 'ArrowUp') {
    if (historyIndex[paneId] > 0) {
      historyIndex[paneId]--;
      inputEl.value = paneHistory[historyIndex[paneId]];
    }
    event.preventDefault();
  } else if (event.key === 'ArrowDown') {
    if (historyIndex[paneId] < paneHistory.length - 1) {
      historyIndex[paneId]++;
      inputEl.value = paneHistory[historyIndex[paneId]];
    } else {
      historyIndex[paneId] = paneHistory.length;
      inputEl.value = '';
    }
    event.preventDefault();
  }
}

// CLI Processor
function runCommand(cmdLine, paneId) {
  const parts = cmdLine.split(' ');
  const cmd = parts[0].toLowerCase();
  const arg = parts.slice(1).join(' ').trim().toLowerCase();

  const outputEl = document.getElementById(`output-${paneId.split('-')[1]}`);
  if (!outputEl) return;

  // Print command query
  const query = document.createElement('div');
  query.className = 'input-line';
  query.innerHTML = '<span class="prompt">drs@kiit-pc:~$</span> <span class="text-cmd"></span>';
  query.querySelector('.text-cmd').textContent = cmdLine;
  outputEl.appendChild(query);

  let response = '';

  switch (cmd) {
    case 'help':
      response = '<span class="text-accent">Available Commands:</span>\n';
      for (const [name, desc] of Object.entries(COMMANDS)) {
        response += `  <span class="text-success">${name.padEnd(12)}</span> - ${desc}\n`;
      }
      break;

    case 'about':
      response = PROFILE_DETAILS.about;
      break;

    case 'education':
      response = PROFILE_DETAILS.education;
      break;

    case 'experience':
      response = PROFILE_DETAILS.experience;
      break;

    case 'skills':
      response = PROFILE_DETAILS.skills;
      break;

    case 'projects':
      response = PROFILE_DETAILS.projects;
      break;

    case 'theme':
      if (['dracula', 'nord', 'solarized', 'default'].includes(arg)) {
        document.body.className = `theme-${arg}`;
        response = `Theme switched to <span class="text-success">${arg}</span>`;
      } else {
        response = 'Invalid theme. Choose from: dracula, nord, solarized, default';
      }
      break;

    case 'split':
      if (['horizontal', 'vertical'].includes(arg)) {
        splitPane(arg);
        response = `Terminal split <span class="text-success">${arg}</span>`;
      } else {
        response = 'Usage: split [horizontal|vertical]';
      }
      break;

    case 'clear':
      outputEl.innerHTML = '';
      return;

    case 'gui':
      window.location.href = 'index.html';
      return;

    case 'snake':
      response = 'Launching Snake game...\nUse Arrow keys or WASD to control. Press Escape to exit game.';
      appendSnakeGame(outputEl, paneId);
      break;

    default:
      const unknown = document.createElement('div');
      unknown.textContent = `drs-shell: command not found: ${cmd}. Type 'help' for suggestions.`;
      outputEl.appendChild(unknown);
      break;
  }

  if (response) {
    outputEl.insertAdjacentHTML('beforeend', `<div>${response.trim().replace(/\n/g, '<br>')}</div>`);
  }

  // Scroll to bottom
  const pane = document.getElementById(paneId);
  if (pane) pane.scrollTop = pane.scrollHeight;
}

// Split Panes handler
let paneCount = 1;
function splitPane(orientation) {
  const container = document.getElementById('terminal-container');
  if (!container) return;

  // Apply split layouts
  container.className = 'terminal-container';
  if (orientation === 'horizontal') {
    container.classList.add('split-horizontal');
  } else {
    container.classList.add('split-vertical');
  }

  // Add pane if we only have 1 pane right now
  const existingPanes = container.querySelectorAll('.terminal-pane');
  if (existingPanes.length === 1) {
    paneCount++;
    const newPaneId = `pane-${paneCount}`;
    const newOutputId = `output-${paneCount}`;
    const newInputId = `input-${paneCount}`;

    const newPaneHtml = `
      <div class="terminal-pane" id="${newPaneId}">
          <div class="terminal-output" id="${newOutputId}">
              <div class="system-msg">Pane ${paneCount} active. Type 'help' for commands.</div>
          </div>
          <div class="input-line">
              <span class="prompt">drs@kiit-pc:~$</span>
              <input type="text" class="terminal-input" id="${newInputId}" autocomplete="off" spellcheck="false" onkeydown="handleInput(event, this)">
          </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', newPaneHtml);
    
    // Bind listeners to new items
    setupPane(newPaneId);
    const newPane = document.getElementById(newPaneId);
    if (newPane) focusInput(newPane);
  }
}

// Retro Snake Game Implementation (Canvas-based)
function appendSnakeGame(outputEl, paneId) {
  const gameId = `snake-${Date.now()}`;
  const gameWrapper = document.createElement('div');
  gameWrapper.className = 'snake-game-wrapper';
  gameWrapper.innerHTML = `<canvas id="${gameId}" width="400" height="300"></canvas>`;
  outputEl.appendChild(gameWrapper);

  const canvas = document.getElementById(gameId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const gridSize = 10;
  const w = canvas.width;
  const h = canvas.height;

  let snake = [{x: 100, y: 150}, {x: 90, y: 150}, {x: 80, y: 150}];
  let dx = gridSize;
  let dy = 0;
  let food = {x: 0, y: 0};
  let score = 0;
  let gameRunning = true;

  generateFood();

  // Listen to keyboard controls
  const handleKeys = (e) => {
    if (!gameRunning) return;
    
    const key = e.key;
    if ((key === 'ArrowLeft' || key === 'a') && dx === 0) { dx = -gridSize; dy = 0; }
    if ((key === 'ArrowRight' || key === 'd') && dx === 0) { dx = gridSize; dy = 0; }
    if ((key === 'ArrowUp' || key === 'w') && dy === 0) { dx = 0; dy = -gridSize; }
    if ((key === 'ArrowDown' || key === 's') && dy === 0) { dx = 0; dy = gridSize; }
    
    if (key === 'Escape') {
      endGame('Game terminated by user.');
    }

    // Prevent default scrolling keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(key)) {
      e.preventDefault();
    }
  };

  window.addEventListener('keydown', handleKeys);

  // Generate food coordinates
  function generateFood() {
    food.x = Math.floor(Math.random() * (w / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (h / gridSize)) * gridSize;
  }

  // Draw snake segments
  function drawSnake() {
    ctx.fillStyle = '#50fa7b'; // Neon green
    ctx.strokeStyle = '#000';
    snake.forEach(part => {
      ctx.fillRect(part.x, part.y, gridSize, gridSize);
      ctx.strokeRect(part.x, part.y, gridSize, gridSize);
    });
  }

  // Draw food block
  function drawFood() {
    ctx.fillStyle = '#ff79c6'; // Pink food
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
  }

  // End conditions
  function endGame(reason = 'Game Over!') {
    gameRunning = false;
    window.removeEventListener('keydown', handleKeys);
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillRect(0, 0, w, h);
    
    ctx.fillStyle = '#ff5555';
    ctx.font = 'bold 20px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(reason, w/2, h/2 - 10);
    
    ctx.fillStyle = '#fff';
    ctx.font = '14px "Space Mono", monospace';
    ctx.fillText(`Final Score: ${score}`, w/2, h/2 + 20);
    
    outputEl.insertAdjacentHTML('beforeend', `<div class="text-accent">Snake session closed. Final Score: ${score}</div>`);
    
    const pane = document.getElementById(paneId);
    if (pane) {
      pane.scrollTop = pane.scrollHeight;
      const input = pane.querySelector('.terminal-input');
      if (input) input.focus();
    }
  }

  // Main game loop
  function loop() {
    if (!gameRunning) return;

    // Clear board
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    // Calculate next coordinates
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    // Collision detection with borders
    if (head.x < 0 || head.x >= w || head.y < 0 || head.y >= h) {
      return endGame();
    }

    // Self-collision detection
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return endGame();
      }
    }

    snake.unshift(head);

    // Eating food detection
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      generateFood();
    } else {
      snake.pop();
    }

    drawFood();
    drawSnake();

    // Draw scoreboard
    ctx.fillStyle = '#fff';
    ctx.font = '12px "Space Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 10, 20);

    setTimeout(loop, 90);
  }

  // Start game loop
  loop();
}
