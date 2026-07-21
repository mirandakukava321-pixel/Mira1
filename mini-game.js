/**
 * mini-game.js — Time Explorer Adventure — World Tour
 * Completely isolated 2D side-scrolling runner mini-game with multi-level progression,
 * growing artifact bag system, and rich thematic postcard-level background illustrations.
 */

(function () {
  'use strict';

  // --- World-Tour Levels Definition Array ---
  const LEVELS = [
    {
      id: "egypt",
      levelNum: 1,
      name: "Pyramids of Giza",
      country: "Egypt",
      artifact: "Golden Scarab",
      artifactIcon: "🪲",
      artifactColor: "#f59e0b",
      theme: "desert",
      bgSky: ["#0c0612", "#3d1a24", "#d97706"],
      moonColor: "rgba(251, 191, 36, 0.95)",
      mountainColor: "#21110b",
      ruinColor: "#361b0f",
      treeColor: "#1c2e1f",
      groundColor: "#170f1a",
      groundBorder: "#f59e0b",
      icon: "🏜️",
      desc: "Sprint through ancient desert sands! Avoid temporal spikes and recover the 🪲 Golden Scarab."
    },
    {
      id: "paris",
      levelNum: 2,
      name: "Eiffel Tower",
      country: "France",
      artifact: "Vintage Paris Medal",
      artifactIcon: "🏅",
      artifactColor: "#38bdf8",
      theme: "paris",
      bgSky: ["#060a17", "#1c294a", "#524368"],
      moonColor: "rgba(224, 242, 254, 0.95)",
      mountainColor: "#0b1224",
      ruinColor: "#17233c",
      treeColor: "#0c2033",
      groundColor: "#0b132b",
      groundBorder: "#38bdf8",
      icon: "🗼",
      desc: "Run across Parisian rooftops under evening stars! Recover the 🏅 Vintage Paris Medal."
    },
    {
      id: "georgia",
      levelNum: 3,
      name: "Tbilisi & Caucasus",
      country: "Georgia",
      artifact: "Georgian Enamel Pendant",
      artifactIcon: "☦️",
      artifactColor: "#a855f7",
      theme: "georgia",
      bgSky: ["#090918", "#1e1842", "#5c3d75"],
      moonColor: "rgba(233, 213, 255, 0.95)",
      mountainColor: "#131029",
      ruinColor: "#241d47",
      treeColor: "#172b22",
      groundColor: "#110e24",
      groundBorder: "#a855f7",
      icon: "🏔️",
      desc: "Navigate historic Narikala Fortress and mountain slopes! Find the ☦️ Georgian Enamel Pendant."
    },
    {
      id: "india",
      levelNum: 4,
      name: "Taj Mahal",
      country: "India",
      artifact: "Marble Lotus",
      artifactIcon: "🪷",
      artifactColor: "#ec4899",
      theme: "india",
      bgSky: ["#140718", "#3b1245", "#a63f6d"],
      moonColor: "rgba(251, 207, 232, 0.95)",
      mountainColor: "#1e0a26",
      ruinColor: "#33123d",
      treeColor: "#182d21",
      groundColor: "#16081e",
      groundBorder: "#ec4899",
      icon: "🕌",
      desc: "Dash along Mughal garden paths and reflecting pools! Discover the 🪷 Marble Lotus."
    },
    {
      id: "sydney",
      levelNum: 5,
      name: "Sydney Opera House",
      country: "Australia",
      artifact: "Miniature Opera House",
      artifactIcon: "🎭",
      artifactColor: "#06b6d4",
      theme: "sydney",
      bgSky: ["#040c18", "#11365c", "#32719e"],
      moonColor: "rgba(207, 250, 254, 0.95)",
      mountainColor: "#07182e",
      ruinColor: "#102c4f",
      treeColor: "#0e2b2e",
      groundColor: "#061324",
      groundBorder: "#06b6d4",
      icon: "🌊",
      desc: "Sprint past coastal harbor waves and iconic sails! Recover the 🎭 Miniature Opera House."
    },
    {
      id: "rome",
      levelNum: 6,
      name: "The Colosseum",
      country: "Italy",
      artifact: "Roman Coin",
      artifactIcon: "🪙",
      artifactColor: "#eab308",
      theme: "rome",
      bgSky: ["#170b05", "#421d0d", "#a3501a"],
      moonColor: "rgba(254, 240, 138, 0.95)",
      mountainColor: "#1f0d06",
      ruinColor: "#361a0b",
      treeColor: "#192c1a",
      groundColor: "#140a06",
      groundBorder: "#eab308",
      icon: "🏛️",
      desc: "Leap over gladiatorial stone obstacles in ancient Rome! Find the 🪙 Roman Coin."
    },
    {
      id: "japan",
      levelNum: 7,
      name: "Mount Fuji & Tokyo",
      country: "Japan",
      artifact: "Sakura Charm",
      artifactIcon: "🌸",
      artifactColor: "#f43f5e",
      theme: "japan",
      bgSky: ["#170718", "#3d103d", "#a04789"],
      moonColor: "rgba(254, 205, 211, 0.95)",
      mountainColor: "#1f0b21",
      ruinColor: "#361138",
      treeColor: "#2b142b",
      groundColor: "#170718",
      groundBorder: "#f43f5e",
      icon: "🗻",
      desc: "Run beneath cherry blossom trees and Mt. Fuji! Claim the 🌸 Sakura Charm."
    },
    {
      id: "london",
      levelNum: 8,
      name: "Big Ben & London",
      country: "United Kingdom",
      artifact: "Antique Clock Key",
      artifactIcon: "🗝️",
      artifactColor: "#fbbf24",
      theme: "london",
      bgSky: ["#080c16", "#1a2842", "#47546e"],
      moonColor: "rgba(254, 243, 199, 0.95)",
      mountainColor: "#0b1221",
      ruinColor: "#18263d",
      treeColor: "#102324",
      groundColor: "#090d16",
      groundBorder: "#fbbf24",
      icon: "🕰️",
      desc: "Traverse misty River Thames embankments! Recover the 🗝️ Antique Clock Key."
    },
    {
      id: "newyork",
      levelNum: 9,
      name: "Statue of Liberty",
      country: "United States",
      artifact: "Liberty Torch Badge",
      artifactIcon: "🗽",
      artifactColor: "#10b981",
      theme: "newyork",
      bgSky: ["#061317", "#153d45", "#326c75"],
      moonColor: "rgba(209, 250, 229, 0.95)",
      mountainColor: "#071b1f",
      ruinColor: "#11333a",
      treeColor: "#0f2e24",
      groundColor: "#061315",
      groundBorder: "#10b981",
      icon: "🏙️",
      desc: "Sprint past New York harbor waters and skyline lights! Collect the 🗽 Liberty Torch Badge."
    },
    {
      id: "china",
      levelNum: 10,
      name: "Great Wall of China",
      country: "China",
      artifact: "Jade Dragon",
      artifactIcon: "🐉",
      artifactColor: "#10b981",
      theme: "china",
      bgSky: ["#140808", "#381414", "#943b3b"],
      moonColor: "rgba(254, 226, 226, 0.95)",
      mountainColor: "#210c0c",
      ruinColor: "#381414",
      treeColor: "#1c2b1c",
      groundColor: "#140808",
      groundBorder: "#10b981",
      icon: "🧱",
      desc: "Sprint along ancient mountain stone watchtowers! Uncover the 🐉 Jade Dragon."
    },
    {
      id: "greece",
      levelNum: 11,
      name: "The Acropolis",
      country: "Greece",
      artifact: "Laurel Crown",
      artifactIcon: "🌿",
      artifactColor: "#84cc16",
      theme: "greece",
      bgSky: ["#06101c", "#14304f", "#336999"],
      moonColor: "rgba(236, 252, 203, 0.95)",
      mountainColor: "#0b1a2c",
      ruinColor: "#163152",
      treeColor: "#172d1d",
      groundColor: "#09121c",
      groundBorder: "#84cc16",
      icon: "🏛️",
      desc: "Dash through marble Parthenon columns! Discover the 🌿 Laurel Crown."
    },
    {
      id: "peru",
      levelNum: 12,
      name: "Machu Picchu",
      country: "Peru",
      artifact: "Inca Sun Medallion",
      artifactIcon: "☀️",
      artifactColor: "#f97316",
      theme: "peru",
      bgSky: ["#170c06", "#421f0b", "#9c4c1e"],
      moonColor: "rgba(254, 215, 170, 0.95)",
      mountainColor: "#210e05",
      ruinColor: "#381909",
      treeColor: "#1d2e16",
      groundColor: "#180c06",
      groundBorder: "#f97316",
      icon: "⛰️",
      desc: "Conquer Andean terraced ridges and Inca citadel ruins! Find the ☀️ Inca Sun Medallion."
    }
  ];

  // --- Audio Synthesizer (Web Audio API) ---
  class SoundFX {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playJump() {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(420, this.ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
      } catch (e) {}
    }

    playCoin() {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.setValueAtTime(1320, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
      } catch (e) {}
    }

    playArtifact() {
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.18, now + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.3);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.07);
          osc.stop(now + i * 0.07 + 0.3);
        });
      } catch (e) {}
    }

    playHit() {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(40, this.ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
      } catch (e) {}
    }
  }

  // --- World Tour Game Engine ---
  class TimeExplorerGame {
    constructor() {
      this.canvas = document.getElementById('game-canvas');
      this.ctx = this.canvas.getContext('2d');

      // DOM UI Elements
      this.levelSelectScreen = document.getElementById('level-select-screen');
      this.startScreen = document.getElementById('start-screen');
      this.gameoverScreen = document.getElementById('gameover-screen');
      this.gameHud = document.getElementById('game-hud');
      this.levelsGrid = document.getElementById('levels-grid');

      // Header Badges
      this.headerBagIcon = document.getElementById('header-bag-icon');
      this.headerBagLabel = document.getElementById('header-bag-label');
      this.headerBagCount = document.getElementById('header-bag-count');

      // Level Select Screen Bag Summary
      this.selectBagIcon = document.getElementById('select-bag-icon');
      this.selectBagTitle = document.getElementById('select-bag-title');
      this.selectBagProgress = document.getElementById('select-bag-progress');

      // Start Screen Elements
      this.startLevelBadge = document.getElementById('start-level-badge');
      this.startLevelNum = document.getElementById('start-level-num');
      this.startLevelTitle = document.getElementById('start-level-title');
      this.startLevelDesc = document.getElementById('start-level-desc');
      this.startArtifactIcon = document.getElementById('start-artifact-icon');
      this.startArtifactName = document.getElementById('start-artifact-name');
      this.startBtn = document.getElementById('start-btn');
      this.startSelectBtn = document.getElementById('start-select-btn');

      // HUD Elements
      this.hudLevelIcon = document.getElementById('hud-level-icon');
      this.hudLevelName = document.getElementById('hud-level-name');
      this.hudScore = document.getElementById('hud-score');
      this.hudCoins = document.getElementById('hud-coins');
      this.hudArtifactIcon = document.getElementById('hud-artifact-icon');
      this.hudArtifactName = document.getElementById('hud-artifact-name');
      this.hudArtifactStatus = document.getElementById('hud-artifact-status');
      this.hudBagIcon = document.getElementById('hud-bag-icon');
      this.hudBagLabel = document.getElementById('hud-bag-label');

      // Game Over / Complete Screen Elements
      this.gameoverIcon = document.getElementById('gameover-icon');
      this.gameoverTitle = document.getElementById('gameover-title');
      this.gameoverSubtitle = document.getElementById('gameover-subtitle');
      this.finalScore = document.getElementById('final-score');
      this.finalCoins = document.getElementById('final-coins');
      this.finalArtifactStatus = document.getElementById('final-artifact-status');
      this.finalBagIcon = document.getElementById('final-bag-icon');
      this.finalBagTitle = document.getElementById('final-bag-title');
      this.finalTotalArtifacts = document.getElementById('final-total-artifacts');
      this.nextLevelBtn = document.getElementById('next-level-btn');
      this.replayBtn = document.getElementById('replay-btn');
      this.gameoverSelectBtn = document.getElementById('gameover-select-btn');

      // Top Nav Buttons
      this.navLevelSelectBtn = document.getElementById('nav-level-select-btn');
      this.headerBagBadge = document.getElementById('header-bag-badge');

      this.sound = new SoundFX();

      // Canvas dimensions
      this.width = 1280;
      this.height = 720;
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      // Ground Y level
      this.groundY = 560;

      // Persistent Storage State
      this.collectedArtifacts = this.loadCollectedArtifacts();
      this.unlockedLevels = this.loadUnlockedLevels();

      // Active level state
      this.currentLevelIndex = 0;
      this.currentLevel = LEVELS[0];

      // Game State: LEVELSELECT, START, PLAYING, GAMEOVER, VICTORY
      this.state = 'LEVELSELECT';
      this.animId = null;
      this.lastTime = 0;

      // Gameplay Metrics
      this.score = 0;
      this.coins = 0;
      this.artifactFound = false;
      this.distance = 0;
      this.baseSpeed = 6.5;
      this.currentSpeed = 6.5;
      this.targetDistance = 1900;

      // Entities
      this.player = null;
      this.obstacles = [];
      this.coinsList = [];
      this.levelArtifact = null;
      this.finishPortal = null;
      this.particles = [];
      this.popups = [];
      this.animatingArtifacts = [];
      this.bagBounceTimer = 0;

      // Parallax offsets
      this.parallaxSky = 0;
      this.parallaxMountains = 0;
      this.parallaxRuins = 0;
      this.parallaxTrees = 0;
      this.parallaxGround = 0;

      this.init();
    }

    // --- Persistence Handlers ---
    loadCollectedArtifacts() {
      try {
        const data = localStorage.getItem('timeExplorerArtifacts');
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    }

    saveCollectedArtifacts() {
      try {
        localStorage.setItem('timeExplorerArtifacts', JSON.stringify(this.collectedArtifacts));
      } catch (e) {}
    }

    loadUnlockedLevels() {
      try {
        const data = localStorage.getItem('timeExplorerUnlockedLevels');
        return data ? JSON.parse(data) : ['egypt'];
      } catch (e) {
        return ['egypt'];
      }
    }

    saveUnlockedLevels() {
      try {
        localStorage.setItem('timeExplorerUnlockedLevels', JSON.stringify(this.unlockedLevels));
      } catch (e) {}
    }

    // --- Bag Stage System ---
    getBagStage() {
      const count = this.collectedArtifacts.length;
      if (count === 0) {
        return { stage: 1, name: 'Small Pouch', width: 10, height: 14, color: '#78350f', icon: '🎒' };
      } else if (count <= 2) {
        return { stage: 2, name: 'Explorer Bag', width: 14, height: 18, color: '#92400e', icon: '🎒' };
      } else if (count <= 4) {
        return { stage: 3, name: 'Medium Backpack', width: 18, height: 22, color: '#b45309', icon: '🎒' };
      } else if (count <= 7) {
        return { stage: 4, name: 'Expedition Pack', width: 22, height: 26, color: '#d97706', icon: '🎒' };
      } else {
        return { stage: 5, name: 'Master Pack', width: 26, height: 30, color: '#f59e0b', icon: '🎒✨' };
      }
    }

    updateBagBadgesUI() {
      const bag = this.getBagStage();
      const count = this.collectedArtifacts.length;

      if (this.headerBagIcon) this.headerBagIcon.textContent = bag.icon;
      if (this.headerBagLabel) this.headerBagLabel.textContent = bag.name;
      if (this.headerBagCount) this.headerBagCount.textContent = `(${count}/12 Artifacts)`;

      if (this.selectBagIcon) this.selectBagIcon.textContent = bag.icon;
      if (this.selectBagTitle) this.selectBagTitle.textContent = bag.name;
      if (this.selectBagProgress) this.selectBagProgress.textContent = `${count} of 12 Artifacts Discovered`;

      if (this.hudBagIcon) this.hudBagIcon.textContent = bag.icon;
      if (this.hudBagLabel) this.hudBagLabel.textContent = bag.name;
    }

    // --- Initialization ---
    init() {
      // Controls & Touch Listeners
      window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
          e.preventDefault();
          this.handleJump();
        }
      });

      this.canvas.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.handleJump();
      });

      // Navigation Buttons
      if (this.navLevelSelectBtn) {
        this.navLevelSelectBtn.addEventListener('click', () => this.showLevelSelectScreen());
      }
      if (this.headerBagBadge) {
        this.headerBagBadge.addEventListener('click', () => this.showLevelSelectScreen());
      }

      if (this.startBtn) {
        this.startBtn.addEventListener('click', () => {
          this.sound.init();
          this.startNewGame();
        });
      }

      if (this.startSelectBtn) {
        this.startSelectBtn.addEventListener('click', () => this.showLevelSelectScreen());
      }

      if (this.nextLevelBtn) {
        this.nextLevelBtn.addEventListener('click', () => {
          this.sound.init();
          if (this.currentLevelIndex < LEVELS.length - 1) {
            this.selectLevel(this.currentLevelIndex + 1);
          } else {
            this.showLevelSelectScreen();
          }
        });
      }

      if (this.replayBtn) {
        this.replayBtn.addEventListener('click', () => {
          this.sound.init();
          this.startNewGame();
        });
      }

      if (this.gameoverSelectBtn) {
        this.gameoverSelectBtn.addEventListener('click', () => this.showLevelSelectScreen());
      }

      this.updateBagBadgesUI();
      this.showLevelSelectScreen();
    }

    showLevelSelectScreen() {
      this.state = 'LEVELSELECT';
      if (this.animId) cancelAnimationFrame(this.animId);

      this.updateBagBadgesUI();
      this.renderLevelGrid();

      if (this.gameHud) this.gameHud.classList.add('hidden');
      if (this.startScreen) this.startScreen.classList.add('hidden');
      if (this.gameoverScreen) this.gameoverScreen.classList.add('hidden');
      if (this.levelSelectScreen) this.levelSelectScreen.classList.remove('hidden');

      this.resetEntities();
      this.render();
    }

    renderLevelGrid() {
      if (!this.levelsGrid) return;
      this.levelsGrid.innerHTML = '';

      LEVELS.forEach((lvl, idx) => {
        const isUnlocked = this.unlockedLevels.includes(lvl.id);
        const hasArtifact = this.collectedArtifacts.includes(lvl.artifact);
        const isCurrent = idx === this.currentLevelIndex;

        const card = document.createElement('div');
        card.className = `level-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'active-level' : ''}`;
        
        card.innerHTML = `
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-cyan-400">LVL ${lvl.levelNum}</span>
            <span class="text-lg">${lvl.icon}</span>
          </div>
          <h4 class="font-display text-sm font-bold text-white mb-0.5 truncate">${lvl.name}</h4>
          <p class="text-[11px] font-mono text-white/50 mb-3">${lvl.country}</p>

          <div class="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
            ${
              isUnlocked
                ? `<span class="${hasArtifact ? 'text-purple-300 font-bold' : 'text-white/40'}">${hasArtifact ? `✓ ${lvl.artifactIcon}` : `🏺 Missing`}</span>`
                : `<span class="text-red-400/70 flex items-center gap-1">🔒 Locked</span>`
            }
            ${isUnlocked ? `<span class="text-cyan-300 font-bold hover:underline">Play →</span>` : ''}
          </div>
        `;

        if (isUnlocked) {
          card.addEventListener('click', () => {
            this.sound.init();
            this.selectLevel(idx);
          });
        }

        this.levelsGrid.appendChild(card);
      });
    }

    selectLevel(index) {
      this.currentLevelIndex = index;
      this.currentLevel = LEVELS[index];

      // Update Start Screen info
      if (this.startLevelBadge) this.startLevelBadge.textContent = this.currentLevel.icon;
      if (this.startLevelNum) this.startLevelNum.textContent = `LEVEL ${this.currentLevel.levelNum} // ${this.currentLevel.country.toUpperCase()}`;
      if (this.startLevelTitle) this.startLevelTitle.textContent = this.currentLevel.name;
      if (this.startLevelDesc) this.startLevelDesc.textContent = this.currentLevel.desc;
      if (this.startArtifactIcon) this.startArtifactIcon.textContent = this.currentLevel.artifactIcon;
      if (this.startArtifactName) this.startArtifactName.textContent = this.currentLevel.artifact;

      if (this.levelSelectScreen) this.levelSelectScreen.classList.add('hidden');
      if (this.gameoverScreen) this.gameoverScreen.classList.add('hidden');
      if (this.gameHud) this.gameHud.classList.add('hidden');
      if (this.startScreen) this.startScreen.classList.remove('hidden');

      this.state = 'START';
      this.resetEntities();
      this.render();
    }

    handleJump() {
      if (this.state === 'PLAYING' && this.player) {
        if (this.player.isGrounded) {
          this.player.vy = -17;
          this.player.isGrounded = false;
          this.sound.playJump();
          this.spawnDust(this.player.x + 15, this.player.y + 50);
        } else if (!this.player.doubleJumped) {
          this.player.vy = -15;
          this.player.doubleJumped = true;
          this.sound.playJump();
          this.spawnDust(this.player.x + 15, this.player.y + 40);
        }
      }
    }

    startNewGame() {
      this.score = 0;
      this.coins = 0;
      this.artifactFound = this.collectedArtifacts.includes(this.currentLevel.artifact);
      this.distance = 0;
      this.currentSpeed = this.baseSpeed;

      this.resetEntities();

      this.state = 'PLAYING';

      if (this.startScreen) this.startScreen.classList.add('hidden');
      if (this.gameoverScreen) this.gameoverScreen.classList.add('hidden');
      if (this.levelSelectScreen) this.levelSelectScreen.classList.add('hidden');
      if (this.gameHud) this.gameHud.classList.remove('hidden');

      // Update HUD Labels
      if (this.hudLevelIcon) this.hudLevelIcon.textContent = this.currentLevel.icon;
      if (this.hudLevelName) this.hudLevelName.textContent = `${this.currentLevel.country} — ${this.currentLevel.name}`;
      if (this.hudArtifactIcon) this.hudArtifactIcon.textContent = this.currentLevel.artifactIcon;
      if (this.hudArtifactName) this.hudArtifactName.textContent = this.currentLevel.artifact;
      if (this.hudArtifactStatus) this.hudArtifactStatus.textContent = this.artifactFound ? '[Discovered]' : '[0/1]';

      this.updateHud();

      this.lastTime = performance.now();
      if (this.animId) cancelAnimationFrame(this.animId);
      this.loop(this.lastTime);
    }

    resetEntities() {
      this.player = {
        x: 140,
        y: this.groundY - 56,
        width: 36,
        height: 56,
        vy: 0,
        gravity: 0.8,
        isGrounded: true,
        doubleJumped: false,
        runFrame: 0
      };

      this.obstacles = [];
      this.coinsList = [];
      this.particles = [];
      this.popups = [];
      this.animatingArtifacts = [];
      this.bagBounceTimer = 0;

      // Spawn level unique artifact at distance ~900m
      this.levelArtifact = {
        x: this.width + 1200,
        y: this.groundY - 110,
        width: 44,
        height: 44,
        spawned: false,
        collected: this.artifactFound
      };

      // Finish portal at ~1900m
      this.finishPortal = {
        x: this.width + 2500,
        y: this.groundY - 140,
        width: 60,
        height: 140,
        spawned: false
      };

      this.parallaxSky = 0;
      this.parallaxMountains = 0;
      this.parallaxRuins = 0;
      this.parallaxTrees = 0;
      this.parallaxGround = 0;
    }

    updateHud() {
      if (this.hudScore) this.hudScore.textContent = Math.floor(this.score);
      if (this.hudCoins) this.hudCoins.textContent = this.coins;
      if (this.hudArtifactStatus) this.hudArtifactStatus.textContent = this.artifactFound ? '✓ Collected' : '[0/1]';
      this.updateBagBadgesUI();
    }

    loop(timestamp) {
      if (this.state !== 'PLAYING') return;

      const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
      this.lastTime = timestamp;

      this.update(dt);
      this.render();

      if (this.state === 'PLAYING') {
        this.animId = requestAnimationFrame((t) => this.loop(t));
      }
    }

    update(dt) {
      this.distance += this.currentSpeed * 0.1;
      this.score += this.currentSpeed * 0.2;
      this.currentSpeed = this.baseSpeed + (this.distance * 0.0008);

      if (this.bagBounceTimer > 0) this.bagBounceTimer--;

      // Parallax scroll
      this.parallaxSky = (this.parallaxSky + this.currentSpeed * 0.1) % this.width;
      this.parallaxMountains = (this.parallaxMountains + this.currentSpeed * 0.25) % this.width;
      this.parallaxRuins = (this.parallaxRuins + this.currentSpeed * 0.5) % this.width;
      this.parallaxTrees = (this.parallaxTrees + this.currentSpeed * 0.8) % this.width;
      this.parallaxGround = (this.parallaxGround + this.currentSpeed) % 40;

      // Update Player Physics
      this.player.vy += this.player.gravity;
      this.player.y += this.player.vy;

      if (this.player.y >= this.groundY - this.player.height) {
        this.player.y = this.groundY - this.player.height;
        this.player.vy = 0;
        if (!this.player.isGrounded) {
          this.spawnDust(this.player.x + 15, this.groundY);
        }
        this.player.isGrounded = true;
        this.player.doubleJumped = false;
      }

      this.player.runFrame += 0.2;

      // Spawning
      this.spawnLogic();

      // Update Obstacles
      for (let i = this.obstacles.length - 1; i >= 0; i--) {
        const obs = this.obstacles[i];
        obs.x -= this.currentSpeed;

        if (this.checkCollision(this.player, obs)) {
          this.triggerGameOver('TEMPORAL COLLISION', `You collided with an obstacle in ${this.currentLevel.name}!`);
          return;
        }

        if (obs.x + obs.width < -50) {
          this.obstacles.splice(i, 1);
        }
      }

      // Update Coins
      for (let i = this.coinsList.length - 1; i >= 0; i--) {
        const coin = this.coinsList[i];
        coin.x -= this.currentSpeed;
        coin.anim += 0.1;

        if (this.checkCollision(this.player, coin)) {
          this.coins += 1;
          this.score += 50;
          this.sound.playCoin();
          this.spawnSparkles(coin.x, coin.y, '#f59e0b');
          this.popups.push({ text: '+50', x: coin.x, y: coin.y, alpha: 1.0, color: '#f59e0b' });
          this.coinsList.splice(i, 1);
          continue;
        }

        if (coin.x + coin.width < -50) {
          this.coinsList.splice(i, 1);
        }
      }

      // Update Level Unique Artifact
      if (this.levelArtifact && this.levelArtifact.spawned && !this.levelArtifact.collected) {
        this.levelArtifact.x -= this.currentSpeed;

        if (this.checkCollision(this.player, this.levelArtifact)) {
          this.levelArtifact.collected = true;
          this.artifactFound = true;
          this.score += 500;
          this.sound.playArtifact();

          // Save artifact to persistent array
          if (!this.collectedArtifacts.includes(this.currentLevel.artifact)) {
            this.collectedArtifacts.push(this.currentLevel.artifact);
            this.saveCollectedArtifacts();
          }

          // Trigger Artifact Shrink-into-Bag Animation
          this.animatingArtifacts.push({
            icon: this.currentLevel.artifactIcon,
            color: this.currentLevel.artifactColor,
            x: this.levelArtifact.x,
            y: this.levelArtifact.y,
            scale: 1.0,
            alpha: 1.0
          });

          this.popups.push({ text: `+500 ${this.currentLevel.artifact}!`, x: this.player.x, y: this.player.y - 30, alpha: 1.0, color: this.currentLevel.artifactColor });
        }
      }

      // Update Animating Shrinking Artifacts
      for (let i = this.animatingArtifacts.length - 1; i >= 0; i--) {
        const animArt = this.animatingArtifacts[i];
        const targetX = this.player.x - 5;
        const targetY = this.player.y + 20;

        animArt.x += (targetX - animArt.x) * 0.15;
        animArt.y += (targetY - animArt.y) * 0.15;
        animArt.scale -= 0.04;
        animArt.alpha -= 0.02;

        if (animArt.scale <= 0.2 || animArt.alpha <= 0) {
          this.bagBounceTimer = 15;
          this.spawnSparkles(targetX, targetY, animArt.color, 12);
          this.animatingArtifacts.splice(i, 1);
        }
      }

      // Update Finish Portal
      if (this.distance >= this.targetDistance) {
        if (!this.finishPortal.spawned) {
          this.finishPortal.spawned = true;
          this.finishPortal.x = this.width + 100;
        }
        this.finishPortal.x -= this.currentSpeed;

        if (this.player.x + this.player.width >= this.finishPortal.x + 20) {
          this.triggerVictory();
          return;
        }
      }

      // Update Particles & Popups
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        if (p.alpha <= 0) this.particles.splice(i, 1);
      }

      for (let i = this.popups.length - 1; i >= 0; i--) {
        const pop = this.popups[i];
        pop.y -= 1;
        pop.alpha -= 0.02;
        if (pop.alpha <= 0) this.popups.splice(i, 1);
      }

      this.updateHud();
    }

    spawnLogic() {
      // Spawn Artifact at ~900m distance
      if (this.distance >= 900 && !this.levelArtifact.spawned && !this.levelArtifact.collected) {
        this.levelArtifact.spawned = true;
        this.levelArtifact.x = this.width + 50;
      }

      // Obstacles
      if (Math.random() < 0.015 && this.distance < this.targetDistance - 200) {
        const minGap = 420;
        const lastObs = this.obstacles[this.obstacles.length - 1];
        if (!lastObs || (this.width + 50 - lastObs.x) > minGap) {
          const type = Math.random() > 0.5 ? 'SPIKE' : 'BLOCK';
          this.obstacles.push({
            x: this.width + 50,
            y: type === 'SPIKE' ? this.groundY - 42 : this.groundY - 50,
            width: type === 'SPIKE' ? 36 : 40,
            height: type === 'SPIKE' ? 42 : 50,
            type: type
          });
        }
      }

      // Coins
      if (Math.random() < 0.025 && this.distance < this.targetDistance - 100) {
        const lastCoin = this.coinsList[this.coinsList.length - 1];
        if (!lastCoin || (this.width + 50 - lastCoin.x) > 120) {
          const coinY = this.groundY - 60 - Math.random() * 120;
          this.coinsList.push({
            x: this.width + 50,
            y: coinY,
            width: 24,
            height: 24,
            anim: 0
          });
        }
      }
    }

    checkCollision(rect1, rect2) {
      const padding = 6;
      return (
        rect1.x + padding < rect2.x + rect2.width - padding &&
        rect1.x + rect1.width - padding > rect2.x + padding &&
        rect1.y + padding < rect2.y + rect2.height - padding &&
        rect1.y + rect1.height - padding > rect2.y + padding
      );
    }

    spawnDust(x, y) {
      for (let i = 0; i < 5; i++) {
        this.particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 2,
          radius: Math.random() * 4 + 2,
          color: 'rgba(255,255,255,0.6)',
          alpha: 0.8
        });
      }
    }

    spawnSparkles(x, y, color, count = 8) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 4 + 2,
          color: color,
          alpha: 1.0
        });
      }
    }

    triggerGameOver(title, subtitle) {
      this.state = 'GAMEOVER';
      this.sound.playHit();
      if (this.animId) cancelAnimationFrame(this.animId);

      const bag = this.getBagStage();

      if (this.gameoverTitle) this.gameoverTitle.textContent = title;
      if (this.gameoverSubtitle) this.gameoverSubtitle.textContent = subtitle;
      if (this.gameoverIcon) {
        this.gameoverIcon.textContent = '💥';
        this.gameoverIcon.className = 'w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-3xl';
      }

      if (this.finalScore) this.finalScore.textContent = Math.floor(this.score);
      if (this.finalCoins) this.finalCoins.textContent = this.coins;
      if (this.finalArtifactStatus) this.finalArtifactStatus.textContent = this.artifactFound ? 'Discovered!' : 'Missed';
      if (this.finalBagIcon) this.finalBagIcon.textContent = bag.icon;
      if (this.finalBagTitle) this.finalBagTitle.textContent = bag.name;
      if (this.finalTotalArtifacts) this.finalTotalArtifacts.textContent = `(${this.collectedArtifacts.length}/12 Total)`;

      if (this.nextLevelBtn) this.nextLevelBtn.classList.add('hidden');

      if (this.gameHud) this.gameHud.classList.add('hidden');
      if (this.gameoverScreen) this.gameoverScreen.classList.remove('hidden');
    }

    triggerVictory() {
      this.state = 'VICTORY';
      this.sound.playArtifact();
      if (this.animId) cancelAnimationFrame(this.animId);

      // Unlock next level
      if (this.currentLevelIndex < LEVELS.length - 1) {
        const nextLvl = LEVELS[this.currentLevelIndex + 1];
        if (!this.unlockedLevels.includes(nextLvl.id)) {
          this.unlockedLevels.push(nextLvl.id);
          this.saveUnlockedLevels();
        }
      }

      const bag = this.getBagStage();

      if (this.gameoverTitle) this.gameoverTitle.textContent = 'DESTINATION COMPLETED!';
      if (this.gameoverSubtitle) this.gameoverSubtitle.textContent = `You reached the finish portal in ${this.currentLevel.name}!`;
      if (this.gameoverIcon) {
        this.gameoverIcon.textContent = '🏆';
        this.gameoverIcon.className = 'w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl shadow-lg';
      }

      if (this.finalScore) this.finalScore.textContent = Math.floor(this.score + 1000);
      if (this.finalCoins) this.finalCoins.textContent = this.coins;
      if (this.finalArtifactStatus) this.finalArtifactStatus.textContent = `✓ ${this.currentLevel.artifact}`;
      if (this.finalBagIcon) this.finalBagIcon.textContent = bag.icon;
      if (this.finalBagTitle) this.finalBagTitle.textContent = bag.name;
      if (this.finalTotalArtifacts) this.finalTotalArtifacts.textContent = `(${this.collectedArtifacts.length}/12 Total)`;

      if (this.nextLevelBtn) {
        if (this.currentLevelIndex < LEVELS.length - 1) {
          this.nextLevelBtn.textContent = 'Next Destination →';
          this.nextLevelBtn.classList.remove('hidden');
        } else {
          this.nextLevelBtn.classList.add('hidden');
        }
      }

      if (this.gameHud) this.gameHud.classList.add('hidden');
      if (this.gameoverScreen) this.gameoverScreen.classList.remove('hidden');
    }

    // --- Rich Vector Parallax Illustration Engine ---
    render() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      const lvl = this.currentLevel;

      // Layer 0: Sky Gradient & Celestial Orbs
      this.renderSky(lvl);

      // Layer 1: Distant Mountains / Horizon Silhouette
      this.renderDistantHorizon(lvl);

      // Layer 2: Main Recognized Landmark Layer (Pyramids, Eiffel Tower, Sameba, Taj Mahal, Sydney Opera, Colosseum, Mt Fuji, Big Ben, Liberty, Great Wall, Acropolis, Machu Picchu)
      this.renderMainLandmark(lvl);

      // Layer 3: Middleground Architecture & Scenery
      this.renderMiddleground(lvl);

      // Layer 4: Foreground Vegetation & Details
      this.renderForegroundDetails(lvl);

      // Layer 5: Collision Ground
      this.renderGround(lvl);

      // Layer 6: Game Entities
      if (this.finishPortal && this.finishPortal.spawned) {
        this.renderFinishPortal();
      }

      this.renderObstacles(lvl);
      this.renderCoins();
      this.renderLevelArtifact();
      this.renderPlayer();
      this.renderAnimatingArtifacts();
      this.renderParticles();
      this.renderPopups();
    }

    renderSky(lvl) {
      const grad = this.ctx.createLinearGradient(0, 0, 0, this.groundY);
      grad.addColorStop(0, lvl.bgSky[0]);
      grad.addColorStop(0.5, lvl.bgSky[1]);
      grad.addColorStop(1, lvl.bgSky[2]);
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, this.width, this.height);

      // Celestial Orb (Moon / Sun)
      this.ctx.save();
      this.ctx.fillStyle = lvl.moonColor;
      this.ctx.shadowColor = lvl.moonColor;
      this.ctx.shadowBlur = 35;
      this.ctx.beginPath();
      this.ctx.arc(1040, 130, 48, 0, Math.PI * 2);
      this.ctx.fill();

      // Flying Birds / Petals effect in sky
      const time = this.lastTime * 0.001;
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 5; i++) {
        const bx = (this.width - ((time * 40 + i * 220) % (this.width + 300)));
        const by = 80 + Math.sin(time + i) * 15;
        this.ctx.beginPath();
        this.ctx.moveTo(bx, by);
        this.ctx.lineTo(bx - 10, by - 6);
        this.ctx.lineTo(bx - 5, by + 2);
        this.ctx.lineTo(bx + 5, by + 2);
        this.ctx.lineTo(bx + 10, by - 6);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    renderDistantHorizon(lvl) {
      this.ctx.save();
      this.ctx.fillStyle = lvl.mountainColor;
      const offset = this.parallaxMountains;

      this.ctx.beginPath();
      this.ctx.moveTo(-offset, this.groundY);

      if (lvl.theme === 'georgia' || lvl.theme === 'peru') {
        // High Andes / Caucasus Jagged Mountain Range
        for (let x = -offset; x < this.width + 500; x += 300) {
          this.ctx.lineTo(x + 100, 240);
          this.ctx.lineTo(x + 180, 340);
          this.ctx.lineTo(x + 300, 210);
        }
      } else if (lvl.theme === 'japan') {
        // Mt Fuji Cone Silhouette in Distance
        for (let x = -offset; x < this.width + 600; x += 800) {
          this.ctx.lineTo(x + 200, 460);
          this.ctx.lineTo(x + 450, 210); // Snow cone peak
          this.ctx.lineTo(x + 700, 460);
        }
      } else {
        // Rolling Horizon Dunes / Hills
        for (let x = -offset; x < this.width + 400; x += 350) {
          this.ctx.lineTo(x + 150, 320);
          this.ctx.lineTo(x + 350, 420);
        }
      }

      this.ctx.lineTo(this.width + 500, this.groundY);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
    }

    renderMainLandmark(lvl) {
      this.ctx.save();
      const offset = this.parallaxRuins;

      // Draw Main Landmark every 700px loop so it is ALWAYS clearly visible
      for (let i = 0; i < 3; i++) {
        const x = (i * 700 - offset) % (this.width + 700);
        const lx = x < -300 ? x + this.width + 700 : x;
        const ly = this.groundY;

        this.drawLandmarkByTheme(lvl.theme, lx, ly);
      }

      this.ctx.restore();
    }

    drawLandmarkByTheme(theme, x, y) {
      this.ctx.save();

      if (theme === 'egypt') {
        // EGYPT: Great Pyramids (Giza, Khafre, Menkaure) + Sphinx
        this.ctx.fillStyle = '#2d180d';

        // Khafre Pyramid (Center)
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + 170, y - 270);
        this.ctx.lineTo(x + 340, y);
        this.ctx.fill();

        // Khafre Capstone Casing
        this.ctx.fillStyle = '#f59e0b';
        this.ctx.beginPath();
        this.ctx.moveTo(x + 148, y - 235);
        this.ctx.lineTo(x + 170, y - 270);
        this.ctx.lineTo(x + 192, y - 235);
        this.ctx.fill();

        // Great Pyramid of Khufu (Right)
        this.ctx.fillStyle = '#24130a';
        this.ctx.beginPath();
        this.ctx.moveTo(x + 230, y);
        this.ctx.lineTo(x + 380, y - 300);
        this.ctx.lineTo(x + 530, y);
        this.ctx.fill();

        // Menkaure Pyramid (Left)
        this.ctx.fillStyle = '#3a1f11';
        this.ctx.beginPath();
        this.ctx.moveTo(x - 120, y);
        this.ctx.lineTo(x - 30, y - 160);
        this.ctx.lineTo(x + 60, y);
        this.ctx.fill();

        // Great Sphinx Silhouette (Foreground of Pyramids)
        this.ctx.fillStyle = '#472514';
        this.ctx.fillRect(x - 80, y - 45, 120, 45); // Body
        this.ctx.fillRect(x - 40, y - 85, 45, 45);  // Head & Nemes
        this.ctx.fillRect(x - 100, y - 20, 30, 20); // Paws
      } else if (theme === 'paris') {
        // PARIS: Eiffel Tower (3 Lattice Tiers, Arched Base, Spire & Sweeping Beacon)
        this.ctx.fillStyle = '#17233c';
        this.ctx.strokeStyle = '#38bdf8';
        this.ctx.lineWidth = 2;

        // Base Legs & Grand Arch
        this.ctx.fillRect(x, y - 65, 28, 65);
        this.ctx.fillRect(x + 102, y - 65, 28, 65);
        this.ctx.beginPath();
        this.ctx.arc(x + 65, y - 32, 44, Math.PI, 0);
        this.ctx.stroke();

        // Platforms 1 & 2
        this.ctx.fillRect(x - 12, y - 80, 154, 16);
        this.ctx.fillRect(x + 16, y - 170, 98, 14);

        // Tower Tapering Shaft
        this.ctx.beginPath();
        this.ctx.moveTo(x + 22, y - 80);
        this.ctx.lineTo(x + 50, y - 320);
        this.ctx.lineTo(x + 80, y - 320);
        this.ctx.lineTo(x + 108, y - 80);
        this.ctx.fill();

        // Lattice Cross Bracing Details
        this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        this.ctx.beginPath();
        this.ctx.moveTo(x + 25, y - 80);
        this.ctx.lineTo(x + 105, y - 170);
        this.ctx.moveTo(x + 105, y - 80);
        this.ctx.lineTo(x + 25, y - 170);
        this.ctx.stroke();

        // Top Spire & Sweeping Beacon Light Ray
        this.ctx.fillStyle = '#38bdf8';
        this.ctx.fillRect(x + 62, y - 370, 6, 50);

        this.ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
        this.ctx.beginPath();
        this.ctx.moveTo(x + 65, y - 370);
        this.ctx.lineTo(x - 240, y - 480);
        this.ctx.lineTo(x - 180, y - 280);
        this.ctx.fill();
      } else if (theme === 'georgia') {
        // GEORGIA: Sameba Cathedral (Gold Dome & Cross) + Narikala Fortress
        this.ctx.fillStyle = '#241d47';
        this.ctx.strokeStyle = '#a855f7';
        this.ctx.lineWidth = 2;

        // Cathedral Main Base & Multi-tiered Facade
        this.ctx.fillRect(x, y - 160, 170, 160);
        this.ctx.fillRect(x + 20, y - 200, 130, 40);

        // Octagonal Drum & Arched Windows
        this.ctx.fillRect(x + 35, y - 240, 100, 40);

        // Golden Conical Roof & Dome
        this.ctx.fillStyle = '#f59e0b';
        this.ctx.beginPath();
        this.ctx.moveTo(x + 30, y - 240);
        this.ctx.lineTo(x + 85, y - 310);
        this.ctx.lineTo(x + 140, y - 240);
        this.ctx.fill();

        // Georgian Orthodox Cross
        this.ctx.fillRect(x + 82, y - 335, 6, 25);
        this.ctx.fillRect(x + 74, y - 327, 22, 5);

        // Narikala Fortress Cliff Wall & Towers (Right)
        this.ctx.fillStyle = '#1a1438';
        this.ctx.fillRect(x + 230, y - 120, 160, 120);
        for (let b = 0; b < 6; b++) {
          this.ctx.fillRect(x + 230 + b * 26, y - 142, 14, 22);
        }
      } else if (theme === 'india') {
        // INDIA: Taj Mahal (Grand Central Onion Dome, 4 Minarets, Marble Facade)
        this.ctx.fillStyle = '#33123d';

        // Main Marble Tomb Structure
        this.ctx.fillRect(x + 45, y - 170, 190, 170);

        // Central Grand Arch
        this.ctx.fillStyle = '#1e0a26';
        this.ctx.fillRect(x + 100, y - 120, 80, 120);
        this.ctx.beginPath();
        this.ctx.arc(x + 140, y - 120, 40, Math.PI, 0);
        this.ctx.fill();

        // Main Central Onion Dome
        this.ctx.fillStyle = '#ec4899';
        this.ctx.shadowColor = '#ec4899';
        this.ctx.shadowBlur = 20;
        this.ctx.beginPath();
        this.ctx.arc(x + 140, y - 235, 55, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillRect(x + 137, y - 310, 6, 25); // Brass Finial
        this.ctx.shadowBlur = 0;

        // Side Cupolas (Chhatris)
        this.ctx.fillRect(x + 65, y - 200, 24, 30);
        this.ctx.fillRect(x + 191, y - 200, 24, 30);

        // 4 Corner Minaret Towers
        this.ctx.fillStyle = '#240a2c';
        this.ctx.fillRect(x - 20, y - 230, 20, 230);
        this.ctx.fillRect(x + 280, y - 230, 20, 230);
        this.ctx.fillRect(x - 24, y - 250, 28, 20);
        this.ctx.fillRect(x + 276, y - 250, 28, 20);
      } else if (theme === 'sydney') {
        // SYDNEY: Opera House Shell Sails & Harbour Bridge Arch
        this.ctx.fillStyle = '#102c4f';
        this.ctx.strokeStyle = '#06b6d4';
        this.ctx.lineWidth = 2;

        // Opera House Shell Sails
        this.ctx.beginPath();
        this.ctx.arc(x + 60, y - 45, 80, Math.PI * 1.25, Math.PI * 1.85);
        this.ctx.arc(x + 135, y - 45, 65, Math.PI * 1.25, Math.PI * 1.85);
        this.ctx.arc(x + 200, y - 45, 50, Math.PI * 1.25, Math.PI * 1.85);
        this.ctx.lineTo(x + 270, y);
        this.ctx.lineTo(x, y);
        this.ctx.fill();
        this.ctx.stroke();

        // Sydney Harbour Bridge Steel Arch (Right)
        this.ctx.strokeStyle = '#06b6d4';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(x + 420, y, 170, Math.PI, 0);
        this.ctx.stroke();

        // Bridge Pylons
        this.ctx.fillStyle = '#0a1a30';
        this.ctx.fillRect(x + 240, y - 110, 30, 110);
        this.ctx.fillRect(x + 570, y - 110, 30, 110);
      } else if (theme === 'rome') {
        // ROME: The Colosseum 3-Tier Arcades
        this.ctx.fillStyle = '#361a0b';
        this.ctx.strokeStyle = '#eab308';
        this.ctx.lineWidth = 1.5;

        this.ctx.fillRect(x, y - 190, 300, 190);

        // Arched Arcade Windows
        this.ctx.fillStyle = '#1f0d06';
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 8; col++) {
            const ax = x + 15 + col * 35;
            const ay = y - 45 - row * 54;
            this.ctx.fillRect(ax, ay, 20, 34);
            this.ctx.beginPath();
            this.ctx.arc(ax + 10, ay, 10, Math.PI, 0);
            this.ctx.fill();
          }
        }
      } else if (theme === 'japan') {
        // JAPAN: 5-Story Pagoda & Mt Fuji Cone Peak
        this.ctx.fillStyle = '#361138';

        // Pagoda Tiered Eaves
        for (let tier = 0; tier < 5; tier++) {
          const tw = 130 - tier * 18;
          const ty = y - 60 - tier * 44;
          this.ctx.fillStyle = '#f43f5e';
          this.ctx.fillRect(x + 60 - tw / 2, ty, tw, 10); // Red roof edge
          this.ctx.fillStyle = '#260a28';
          this.ctx.fillRect(x + 60 - (tw - 20) / 2, ty - 34, tw - 20, 34);
        }
        // Spire Finial
        this.ctx.fillStyle = '#f59e0b';
        this.ctx.fillRect(x + 57, y - 300, 6, 35);
      } else if (theme === 'london') {
        // LONDON: Big Ben Elizabeth Clock Tower & Palace of Westminster
        this.ctx.fillStyle = '#18263d';

        // Clock Tower Body
        this.ctx.fillRect(x + 40, y - 290, 60, 290);

        // Clock Face (Glowing Gold)
        this.ctx.fillStyle = '#fbbf24';
        this.ctx.shadowColor = '#fbbf24';
        this.ctx.shadowBlur = 15;
        this.ctx.beginPath();
        this.ctx.arc(x + 70, y - 230, 20, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // Spire & Bicker Top
        this.ctx.fillStyle = '#18263d';
        this.ctx.beginPath();
        this.ctx.moveTo(x + 35, y - 290);
        this.ctx.lineTo(x + 70, y - 365);
        this.ctx.lineTo(x + 105, y - 290);
        this.ctx.fill();

        // Palace Roofs
        this.ctx.fillRect(x + 100, y - 140, 180, 140);
      } else if (theme === 'newyork') {
        // NEW YORK: Statue of Liberty & One World Trade Center / Manhattan Skyline
        this.ctx.fillStyle = '#11333a';

        // Pedestal & Draped Robe Statue
        this.ctx.fillRect(x + 60, y - 85, 55, 85);
        this.ctx.fillRect(x + 72, y - 190, 32, 105);

        // 7 Crown Spikes
        this.ctx.fillStyle = '#10b981';
        for (let s = -3; s <= 3; s++) {
          this.ctx.fillRect(x + 88 + s * 5, y - 208 - Math.abs(s) * 2, 3, 16);
        }

        // Glowing Torch Flame
        this.ctx.shadowColor = '#10b981';
        this.ctx.shadowBlur = 20;
        this.ctx.beginPath();
        this.ctx.arc(x + 120, y - 220, 14, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // One World Trade Center Spire (Right)
        this.ctx.fillStyle = '#0b2328';
        this.ctx.fillRect(x + 220, y - 280, 45, 280);
        this.ctx.fillRect(x + 240, y - 350, 4, 70); // Spire
      } else if (theme === 'china') {
        // CHINA: Great Wall Stone Watchtowers & Wall Rampart
        this.ctx.fillStyle = '#381414';

        // Watchtower 1 & Wall
        this.ctx.fillRect(x, y - 140, 80, 140);
        this.ctx.fillRect(x - 20, y - 75, 340, 75); // Wall rampart
        this.ctx.fillRect(x + 220, y - 160, 85, 160);

        // Crenellations
        this.ctx.fillStyle = '#1a0909';
        for (let c = 0; c < 4; c++) {
          this.ctx.fillRect(x + c * 20, y - 158, 10, 18);
          this.ctx.fillRect(x + 220 + c * 20, y - 178, 10, 18);
        }
      } else if (theme === 'greece') {
        // GREECE: The Parthenon Temple (Marble Fluted Columns & Pediment)
        this.ctx.fillStyle = '#163152';
        this.ctx.strokeStyle = '#84cc16';
        this.ctx.lineWidth = 1.5;

        // Base Steps & Columns
        this.ctx.fillRect(x, y - 25, 260, 25);
        for (let col = 0; col < 8; col++) {
          this.ctx.fillRect(x + 12 + col * 32, y - 150, 18, 125);
        }
        // Architrave & Triangular Pediment
        this.ctx.fillRect(x - 5, y - 170, 270, 20);
        this.ctx.beginPath();
        this.ctx.moveTo(x - 10, y - 170);
        this.ctx.lineTo(x + 130, y - 230);
        this.ctx.lineTo(x + 270, y - 170);
        this.ctx.fill();
        this.ctx.stroke();
      } else if (theme === 'peru') {
        // PERU: Machu Picchu Huayna Picchu Peak & Inca Terraced Citadel
        this.ctx.fillStyle = '#381909';

        // Huayna Picchu Mountain Peak
        this.ctx.beginPath();
        this.ctx.moveTo(x + 30, y);
        this.ctx.lineTo(x + 220, y - 330);
        this.ctx.lineTo(x + 400, y);
        this.ctx.fill();

        // Inca Terraced Stone Walls
        this.ctx.fillStyle = '#241005';
        for (let t = 0; t < 5; t++) {
          this.ctx.fillRect(x + t * 45, y - 35 - t * 28, 240, 28);
        }

        // Llama Silhouette on Terrace
        this.ctx.fillStyle = '#5c2d13';
        this.ctx.fillRect(x + 110, y - 120, 24, 15); // Llama body
        this.ctx.fillRect(x + 128, y - 140, 6, 20);  // Neck/head
        this.ctx.fillRect(x + 112, y - 105, 4, 12);  // Legs
        this.ctx.fillRect(x + 126, y - 105, 4, 12);
      }

      this.ctx.restore();
    }

    renderMiddleground(lvl) {
      this.ctx.save();
      const offset = this.parallaxTrees;

      for (let i = 0; i < 5; i++) {
        const x = (i * 350 - offset) % (this.width + 350);
        const mx = x < -100 ? x + this.width + 350 : x;
        const my = this.groundY;

        if (lvl.theme === 'georgia') {
          // GEORGIA: Bridge of Peace Glass Canopy Curve & Old Tbilisi Balconies
          // River Mtkvari Water Band
          this.ctx.fillStyle = '#1a1638';
          this.ctx.fillRect(0, my - 20, this.width, 20);

          // Bridge of Peace Glass Canopy Curve
          this.ctx.strokeStyle = '#00f0ff';
          this.ctx.lineWidth = 3;
          this.ctx.beginPath();
          this.ctx.arc(mx + 80, my - 10, 90, Math.PI * 1.1, Math.PI * 1.9);
          this.ctx.stroke();

          // Old Tbilisi Carved Wooden Balconies
          this.ctx.fillStyle = '#241d47';
          this.ctx.fillRect(mx + 200, my - 90, 80, 90);
          this.ctx.fillStyle = '#f59e0b';
          this.ctx.fillRect(mx + 190, my - 70, 100, 14); // Carved wooden balcony
        } else if (lvl.theme === 'paris') {
          // PARIS: River Seine Water, Bridges & Streetlamps
          this.ctx.fillStyle = '#101e38';
          this.ctx.fillRect(0, my - 25, this.width, 25);

          // Seine Bridge Arch
          this.ctx.fillStyle = '#17233c';
          this.ctx.beginPath();
          this.ctx.arc(mx + 100, my, 70, Math.PI, 0);
          this.ctx.fill();

          // Haussmann Rooftops & Vintage Streetlamps
          this.ctx.fillRect(mx + 200, my - 80, 90, 80);
          this.ctx.fillRect(mx + 310, my - 95, 3, 95); // Streetlamp
          this.ctx.fillStyle = '#f59e0b';
          this.ctx.shadowColor = '#f59e0b';
          this.ctx.shadowBlur = 10;
          this.ctx.beginPath();
          this.ctx.arc(mx + 311.5, my - 95, 7, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.shadowBlur = 0;
        } else if (lvl.theme === 'india') {
          // INDIA: Mughal Reflecting Pool & Cypress Trees
          this.ctx.fillStyle = '#2b1033';
          this.ctx.fillRect(0, my - 20, this.width, 20);

          // Columnar Cypress Trees
          this.ctx.fillStyle = '#182d21';
          this.ctx.beginPath();
          this.ctx.ellipse(mx + 60, my - 80, 16, 60, 0, 0, Math.PI * 2);
          this.ctx.ellipse(mx + 240, my - 80, 16, 60, 0, 0, Math.PI * 2);
          this.ctx.fill();
        } else if (lvl.theme === 'sydney') {
          // SYDNEY: Harbour Water & Ferryboat
          this.ctx.fillStyle = '#0b223d';
          this.ctx.fillRect(0, my - 30, this.width, 30);

          // Ferryboat Silhouette
          this.ctx.fillStyle = '#06b6d4';
          this.ctx.fillRect(mx + 100, my - 35, 60, 15);
          this.ctx.fillRect(mx + 115, my - 45, 30, 10);
        } else if (lvl.theme === 'japan') {
          // JAPAN: Red Torii Gate & Blooming Sakura Trees
          this.ctx.fillStyle = '#f43f5e';
          this.ctx.fillRect(mx, my - 120, 12, 120);
          this.ctx.fillRect(mx + 80, my - 120, 12, 120);
          this.ctx.fillRect(mx - 15, my - 120, 122, 16);
          this.ctx.fillRect(mx - 5, my - 102, 102, 12);

          // Cherry Blossom Canopy
          this.ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
          this.ctx.beginPath();
          this.ctx.arc(mx + 220, my - 90, 45, 0, Math.PI * 2);
          this.ctx.fill();
        } else if (lvl.theme === 'london') {
          // LONDON: River Thames & Red Bus Silhouette
          this.ctx.fillStyle = '#101726';
          this.ctx.fillRect(0, my - 25, this.width, 25);

          // Red Double-Decker Bus
          this.ctx.fillStyle = '#ef4444';
          this.ctx.fillRect(mx + 140, my - 45, 55, 30);
          this.ctx.fillStyle = '#fbbf24';
          this.ctx.fillRect(mx + 145, my - 38, 45, 6); // Windows
        } else if (lvl.theme === 'newyork') {
          // NEW YORK: Hudson River Water & Yellow Taxi Silhouette
          this.ctx.fillStyle = '#0e262a';
          this.ctx.fillRect(0, my - 25, this.width, 25);

          // Yellow Taxi
          this.ctx.fillStyle = '#f59e0b';
          this.ctx.fillRect(mx + 160, my - 32, 45, 18);
        } else {
          // Standard Trees / Vegetation
          this.ctx.fillStyle = lvl.treeColor;
          this.ctx.beginPath();
          this.ctx.arc(mx, my - 80, 32, 0, Math.PI * 2);
          this.ctx.arc(mx + 25, my - 95, 26, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.fillRect(mx + 8, my - 45, 12, 45);
        }
      }

      this.ctx.restore();
    }

    renderForegroundDetails(lvl) {
      this.ctx.save();
      // Subtle foreground details (grass, flowers, fence posts)
      this.ctx.fillStyle = lvl.groundBorder;
      this.ctx.globalAlpha = 0.3;

      for (let x = 0; x < this.width; x += 180) {
        this.ctx.fillRect(x, this.groundY - 6, 8, 6);
      }
      this.ctx.restore();
    }

    renderGround(lvl) {
      this.ctx.save();

      // Main ground fill
      this.ctx.fillStyle = lvl.groundColor;
      this.ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);

      // Glowing top border line
      this.ctx.fillStyle = lvl.groundBorder;
      this.ctx.fillRect(0, this.groundY, this.width, 4);

      // Diagonal stone tiles pattern
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      this.ctx.lineWidth = 2;
      for (let x = -this.parallaxGround; x < this.width; x += 40) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, this.groundY);
        this.ctx.lineTo(x - 20, this.height);
        this.ctx.stroke();
      }

      this.ctx.restore();
    }

    renderPlayer() {
      const p = this.player;
      const bag = this.getBagStage();
      this.ctx.save();

      // Glowing aura
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.shadowBlur = p.isGrounded ? 10 : 20;

      // --- BACKPACK (Attached to player's back) ---
      this.ctx.fillStyle = bag.color;
      this.ctx.strokeStyle = '#f59e0b';
      this.ctx.lineWidth = 1.5;

      const bounceOffset = this.bagBounceTimer > 0 ? Math.sin(this.bagBounceTimer) * 4 : 0;
      const bagX = p.x + 6 - bag.width;
      const bagY = p.y + 16 + (24 - bag.height) / 2 - bounceOffset;

      this.ctx.fillRect(bagX, bagY, bag.width, bag.height);
      this.ctx.strokeRect(bagX, bagY, bag.width, bag.height);

      // Backpack flap & buckle
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.fillRect(bagX + 2, bagY + 2, bag.width - 4, 4);

      // --- SCARF FLUTTERING ---
      this.ctx.fillStyle = '#f59e0b';
      const scarfOffset = Math.sin(p.runFrame * 2) * 8;
      this.ctx.beginPath();
      this.ctx.moveTo(p.x + 8, p.y + 16);
      this.ctx.lineTo(p.x - 18 - scarfOffset, p.y + 18 + scarfOffset * 0.5);
      this.ctx.lineTo(p.x - 16 - scarfOffset, p.y + 24);
      this.ctx.lineTo(p.x + 12, p.y + 22);
      this.ctx.fill();

      // Torso / Jacket
      this.ctx.fillStyle = '#38bdf8';
      this.ctx.fillRect(p.x + 6, p.y + 16, 24, 24);

      // Head & Explorer Goggles
      this.ctx.fillStyle = '#fde047'; // Hat
      this.ctx.fillRect(p.x + 4, p.y + 2, 28, 6);
      this.ctx.fillStyle = '#fdba74'; // Face
      this.ctx.fillRect(p.x + 8, p.y + 8, 20, 10);
      this.ctx.fillStyle = '#0284c7'; // Goggles
      this.ctx.fillRect(p.x + 18, p.y + 10, 10, 5);

      // Legs Animation
      this.ctx.fillStyle = '#1e293b';
      if (p.isGrounded) {
        const legAngle = Math.sin(p.runFrame) * 12;
        this.ctx.fillRect(p.x + 8 + legAngle, p.y + 40, 8, 16);
        this.ctx.fillRect(p.x + 20 - legAngle, p.y + 40, 8, 16);
      } else {
        this.ctx.fillRect(p.x + 6, p.y + 38, 8, 14);
        this.ctx.fillRect(p.x + 22, p.y + 36, 8, 12);
      }

      this.ctx.restore();
    }

    renderObstacles(lvl) {
      this.ctx.save();
      this.obstacles.forEach(obs => {
        if (obs.type === 'SPIKE') {
          this.ctx.fillStyle = lvl.groundBorder;
          this.ctx.shadowColor = lvl.groundBorder;
          this.ctx.shadowBlur = 12;

          this.ctx.beginPath();
          this.ctx.moveTo(obs.x + obs.width / 2, obs.y);
          this.ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
          this.ctx.lineTo(obs.x, obs.y + obs.height);
          this.ctx.closePath();
          this.ctx.fill();
        } else {
          this.ctx.fillStyle = lvl.ruinColor;
          this.ctx.strokeStyle = lvl.groundBorder;
          this.ctx.lineWidth = 2;
          this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          this.ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
        }
      });
      this.ctx.restore();
    }

    renderCoins() {
      this.ctx.save();
      this.coinsList.forEach(coin => {
        this.ctx.shadowColor = '#f59e0b';
        this.ctx.shadowBlur = 10;

        const scaleX = Math.abs(Math.cos(coin.anim));
        this.ctx.fillStyle = '#f59e0b';

        this.ctx.beginPath();
        this.ctx.ellipse(
          coin.x + coin.width / 2,
          coin.y + coin.height / 2,
          (coin.width / 2) * scaleX,
          coin.height / 2,
          0, 0, Math.PI * 2
        );
        this.ctx.fill();
      });
      this.ctx.restore();
    }

    renderLevelArtifact() {
      const art = this.levelArtifact;
      if (!art || !art.spawned || art.collected) return;

      this.ctx.save();
      const floatY = Math.sin(this.lastTime * 0.005) * 6;
      const curY = art.y + floatY;

      // Aura
      this.ctx.shadowColor = this.currentLevel.artifactColor;
      this.ctx.shadowBlur = 25;

      this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
      this.ctx.strokeStyle = this.currentLevel.artifactColor;
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.arc(art.x + art.width / 2, curY + art.height / 2, 26, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      // Icon text
      this.ctx.font = '24px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(this.currentLevel.artifactIcon, art.x + art.width / 2, curY + art.height / 2);

      this.ctx.restore();
    }

    renderAnimatingArtifacts() {
      this.ctx.save();
      this.animatingArtifacts.forEach(anim => {
        this.ctx.globalAlpha = anim.alpha;
        this.ctx.shadowColor = anim.color;
        this.ctx.shadowBlur = 15;

        this.ctx.font = `${Math.max(12, Math.floor(28 * anim.scale))}px sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(anim.icon, anim.x, anim.y);
      });
      this.ctx.restore();
    }

    renderFinishPortal() {
      const portal = this.finishPortal;
      this.ctx.save();

      this.ctx.shadowColor = '#00f0ff';
      this.ctx.shadowBlur = 30;

      // Swirling ring
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.ellipse(portal.x + 30, portal.y + 70, 30, 65, 0, 0, Math.PI * 2);
      this.ctx.stroke();

      this.ctx.fillStyle = 'rgba(0, 240, 255, 0.25)';
      this.ctx.fill();

      // Text label
      this.ctx.font = 'bold 12px Space Grotesk, monospace';
      this.ctx.fillStyle = '#00f0ff';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('FINISH PORTAL', portal.x + 30, portal.y - 15);

      this.ctx.restore();
    }

    renderParticles() {
      this.ctx.save();
      this.particles.forEach(p => {
        this.ctx.globalAlpha = p.alpha;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
      });
      this.ctx.restore();
    }

    renderPopups() {
      this.ctx.save();
      this.popups.forEach(pop => {
        this.ctx.globalAlpha = pop.alpha;
        this.ctx.fillStyle = pop.color;
        this.ctx.font = 'bold 16px Space Grotesk, sans-serif';
        this.ctx.fillText(pop.text, pop.x, pop.y);
      });
      this.ctx.restore();
    }
  }

  // DOM Load trigger
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TimeExplorerGame());
  } else {
    new TimeExplorerGame();
  }
})();
