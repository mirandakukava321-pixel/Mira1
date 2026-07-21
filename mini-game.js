/**
 * mini-game.js — Time Explorer Adventure
 * Completely isolated 2D side-scrolling runner mini-game.
 */

(function () {
  'use strict';

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
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.15, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.25);
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

  // --- Main Mini-Game Engine ---
  class TimeExplorerGame {
    constructor() {
      this.canvas = document.getElementById('game-canvas');
      this.ctx = this.canvas.getContext('2d');

      // UI elements
      this.startScreen = document.getElementById('start-screen');
      this.gameoverScreen = document.getElementById('gameover-screen');
      this.gameHud = document.getElementById('game-hud');
      this.hudScore = document.getElementById('hud-score');
      this.hudCoins = document.getElementById('hud-coins');
      this.hudArtifacts = document.getElementById('hud-artifacts');
      
      this.startBtn = document.getElementById('start-btn');
      this.restartBtn = document.getElementById('restart-btn');

      this.finalScore = document.getElementById('final-score');
      this.finalCoins = document.getElementById('final-coins');
      this.finalArtifacts = document.getElementById('final-artifacts');
      this.gameoverTitle = document.getElementById('gameover-title');
      this.gameoverSubtitle = document.getElementById('gameover-subtitle');
      this.gameoverIcon = document.getElementById('gameover-icon');

      this.sound = new SoundFX();

      // Canvas internal resolution
      this.width = 1280;
      this.height = 720;
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      // Ground plane parameters
      this.groundY = 560;

      // State variables
      this.state = 'START'; // START, PLAYING, GAMEOVER, VICTORY
      this.animId = null;
      this.lastTime = 0;

      // Gameplay metrics
      this.score = 0;
      this.coins = 0;
      this.artifactsCollected = 0;
      this.distance = 0;
      this.baseSpeed = 6;
      this.currentSpeed = 6;

      // Entities
      this.player = null;
      this.obstacles = [];
      this.coinsList = [];
      this.artifactsList = [];
      this.particles = [];
      this.popups = [];

      // Parallax scroll offsets
      this.parallaxSky = 0;
      this.parallaxMountains = 0;
      this.parallaxRuins = 0;
      this.parallaxTrees = 0;
      this.parallaxGround = 0;

      // Artifact definitions to spawn at fixed distances
      this.artifactDefs = [
        { name: 'Golden Sundial', distance: 400, icon: '🏺', color: '#f59e0b', points: 200, spawned: false },
        { name: 'Ankh of Chronos', distance: 950, icon: '☥', color: '#00f0ff', points: 300, spawned: false },
        { name: 'Celestial Astrolabe', distance: 1550, icon: '🧭', color: '#a855f7', points: 500, spawned: false }
      ];

      this.init();
    }

    init() {
      // Event Listeners
      window.addEventListener('resize', () => this.handleResize());
      this.handleResize();

      // Controls
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

      this.startBtn.addEventListener('click', () => {
        this.sound.init();
        this.startNewGame();
      });

      this.restartBtn.addEventListener('click', () => {
        this.sound.init();
        this.startNewGame();
      });

      // Initial render frame for backdrop
      this.resetEntities();
      this.render();
    }

    handleResize() {
      // Keep canvas resolution fixed for crisp 1280x720 internal rendering
    }

    handleJump() {
      if (this.state === 'START' || this.state === 'GAMEOVER' || this.state === 'VICTORY') {
        return;
      }
      if (this.state === 'PLAYING' && this.player) {
        if (this.player.isGrounded) {
          this.player.vy = -17;
          this.player.isGrounded = false;
          this.sound.playJump();
          this.spawnDust(this.player.x + 15, this.player.y + 50);
        } else if (!this.player.doubleJumped) {
          // Air jump / double jump
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
      this.artifactsCollected = 0;
      this.distance = 0;
      this.currentSpeed = this.baseSpeed;

      this.artifactDefs.forEach(a => a.spawned = false);

      this.resetEntities();

      this.state = 'PLAYING';

      this.startScreen.classList.add('hidden');
      this.gameoverScreen.classList.add('hidden');
      this.gameHud.classList.remove('hidden');

      this.updateHud();

      this.lastTime = performance.now();
      if (this.animId) cancelAnimationFrame(this.animId);
      this.loop(this.lastTime);
    }

    resetEntities() {
      // Player
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
      this.artifactsList = [];
      this.particles = [];
      this.popups = [];

      this.parallaxSky = 0;
      this.parallaxMountains = 0;
      this.parallaxRuins = 0;
      this.parallaxTrees = 0;
      this.parallaxGround = 0;
    }

    updateHud() {
      if (this.hudScore) this.hudScore.textContent = Math.floor(this.score);
      if (this.hudCoins) this.hudCoins.textContent = this.coins;
      if (this.hudArtifacts) this.hudArtifacts.textContent = `${this.artifactsCollected} / 3`;
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
      // Distance & score progression
      this.distance += this.currentSpeed * 0.1;
      this.score += this.currentSpeed * 0.2;
      this.currentSpeed = this.baseSpeed + (this.distance * 0.001);

      // Scroll parallax
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

      // Spawn items & obstacles based on distance
      this.spawnLogic();

      // Update Obstacles
      for (let i = this.obstacles.length - 1; i >= 0; i--) {
        const obs = this.obstacles[i];
        obs.x -= this.currentSpeed;

        // Collision Check with Player
        if (this.checkCollision(this.player, obs)) {
          this.triggerGameOver('TEMPORAL COLLISION', 'You collided with a temporal obstacle!');
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

      // Update Artifacts
      for (let i = this.artifactsList.length - 1; i >= 0; i--) {
        const art = this.artifactsList[i];
        art.x -= this.currentSpeed;
        art.anim += 0.05;

        if (this.checkCollision(this.player, art)) {
          this.artifactsCollected += 1;
          this.score += art.def.points;
          this.sound.playArtifact();
          this.spawnSparkles(art.x, art.y, art.def.color, 15);
          this.popups.push({ text: `+${art.def.points} ${art.def.name}`, x: art.x, y: art.y - 20, alpha: 1.0, color: art.def.color });
          this.artifactsList.splice(i, 1);

          // Check for Victory if 3 artifacts collected
          if (this.artifactsCollected >= 3) {
            setTimeout(() => {
              this.triggerVictory();
            }, 600);
          }
          continue;
        }

        if (art.x + art.width < -50) {
          this.artifactsList.splice(i, 1);
        }
      }

      // Update Particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        if (p.alpha <= 0) this.particles.splice(i, 1);
      }

      // Update Popups
      for (let i = this.popups.length - 1; i >= 0; i--) {
        const pop = this.popups[i];
        pop.y -= 1;
        pop.alpha -= 0.02;
        if (pop.alpha <= 0) this.popups.splice(i, 1);
      }

      this.updateHud();
    }

    spawnLogic() {
      // Spawn Artifacts at specified distance thresholds
      this.artifactDefs.forEach((def) => {
        if (!def.spawned && this.distance >= def.distance) {
          def.spawned = true;
          this.artifactsList.push({
            x: this.width + 50,
            y: this.groundY - 110,
            width: 44,
            height: 44,
            def: def,
            anim: 0
          });
        }
      });

      // Spawn regular obstacles (ground rocks / spikes)
      if (Math.random() < 0.015) {
        const minGap = 400;
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

      // Spawn Coin patterns
      if (Math.random() < 0.025) {
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

      this.gameoverTitle.textContent = title;
      this.gameoverSubtitle.textContent = subtitle;
      this.gameoverIcon.textContent = '💥';
      this.gameoverIcon.className = 'w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-3xl';

      this.finalScore.textContent = Math.floor(this.score);
      this.finalCoins.textContent = this.coins;
      this.finalArtifacts.textContent = `${this.artifactsCollected} / 3`;

      this.gameHud.classList.add('hidden');
      this.gameoverScreen.classList.remove('hidden');
    }

    triggerVictory() {
      this.state = 'VICTORY';
      this.sound.playArtifact();

      if (this.animId) cancelAnimationFrame(this.animId);

      this.gameoverTitle.textContent = 'TEMPORAL MASTER!';
      this.gameoverSubtitle.textContent = 'You collected all historical artifacts and completed the journey!';
      this.gameoverIcon.textContent = '🏆';
      this.gameoverIcon.className = 'w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl';

      this.finalScore.textContent = Math.floor(this.score + 1000);
      this.finalCoins.textContent = this.coins;
      this.finalArtifacts.textContent = `${this.artifactsCollected} / 3`;

      this.gameHud.classList.add('hidden');
      this.gameoverScreen.classList.remove('hidden');
    }

    // --- Rendering Methods ---
    render() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Layer 0: Sky Gradient & Distant Nebula/Stars
      this.renderSky();

      // Layer 1: Distant Mountains / Pyramids Silhouettes (Parallax 0.25)
      this.renderMountains();

      // Layer 2: Historical Ruins (Parallax 0.5)
      this.renderRuins();

      // Layer 3: Trees & Pillars (Parallax 0.8)
      this.renderTrees();

      // Layer 4: Ground Platform (Parallax 1.0)
      this.renderGround();

      // Layer 5: Entities
      this.renderObstacles();
      this.renderCoins();
      this.renderArtifacts();
      this.renderPlayer();
      this.renderParticles();
      this.renderPopups();
    }

    renderSky() {
      const grad = this.ctx.createLinearGradient(0, 0, 0, this.groundY);
      grad.addColorStop(0, '#0a0d18');
      grad.addColorStop(0.5, '#12192c');
      grad.addColorStop(1, '#1a243b');
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, this.width, this.height);

      // Distant glowing moon/portal orb
      this.ctx.save();
      this.ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
      this.ctx.beginPath();
      this.ctx.arc(1000, 140, 80, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      this.ctx.beginPath();
      this.ctx.arc(1000, 140, 35, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    renderMountains() {
      this.ctx.save();
      this.ctx.fillStyle = '#111827';
      const offset = this.parallaxMountains;

      this.ctx.beginPath();
      this.ctx.moveTo(-offset, this.groundY);
      this.ctx.lineTo(200 - offset, 340);
      this.ctx.lineTo(450 - offset, 420);
      this.ctx.lineTo(700 - offset, 300);
      this.ctx.lineTo(950 - offset, 440);
      this.ctx.lineTo(1280 - offset, 320);
      this.ctx.lineTo(1500 - offset, this.groundY);

      // Repeat tile
      this.ctx.lineTo(1280 + 200 - offset, 340);
      this.ctx.lineTo(1280 + 450 - offset, 420);
      this.ctx.lineTo(1280 + 700 - offset, 300);
      this.ctx.lineTo(1280 + 950 - offset, 440);
      this.ctx.lineTo(1280 + 1500 - offset, this.groundY);

      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
    }

    renderRuins() {
      this.ctx.save();
      this.ctx.fillStyle = '#1f293d';
      const offset = this.parallaxRuins;

      // Draw historical pillars and arches along the middleground
      for (let i = 0; i < 4; i++) {
        const x = (i * 450 - offset) % (this.width + 450);
        const actualX = x < -150 ? x + this.width + 450 : x;

        // Pillar arch
        this.ctx.fillRect(actualX, this.groundY - 140, 24, 140);
        this.ctx.fillRect(actualX + 70, this.groundY - 140, 24, 140);
        this.ctx.fillRect(actualX - 10, this.groundY - 160, 114, 20);
      }
      this.ctx.restore();
    }

    renderTrees() {
      this.ctx.save();
      this.ctx.fillStyle = '#162238';
      const offset = this.parallaxTrees;

      for (let i = 0; i < 6; i++) {
        const x = (i * 300 - offset) % (this.width + 300);
        const actualX = x < -80 ? x + this.width + 300 : x;

        // Tree foliage silhouette
        this.ctx.beginPath();
        this.ctx.arc(actualX, this.groundY - 80, 35, 0, Math.PI * 2);
        this.ctx.arc(actualX + 25, this.groundY - 100, 30, 0, Math.PI * 2);
        this.ctx.fill();

        // Trunk
        this.ctx.fillRect(actualX + 8, this.groundY - 50, 12, 50);
      }
      this.ctx.restore();
    }

    renderGround() {
      this.ctx.save();

      // Main ground fill
      this.ctx.fillStyle = '#0f172a';
      this.ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);

      // Top glowing temporal border
      this.ctx.fillStyle = '#00f0ff';
      this.ctx.fillRect(0, this.groundY, this.width, 4);

      // Ground stone pattern moving left
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
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
      this.ctx.save();

      // Glowing aura
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.shadowBlur = p.isGrounded ? 10 : 20;

      // Scarf fluttering
      this.ctx.fillStyle = '#f59e0b';
      const scarfOffset = Math.sin(p.runFrame * 2) * 8;
      this.ctx.beginPath();
      this.ctx.moveTo(p.x + 8, p.y + 16);
      this.ctx.lineTo(p.x - 20 - scarfOffset, p.y + 18 + scarfOffset * 0.5);
      this.ctx.lineTo(p.x - 18 - scarfOffset, p.y + 24);
      this.ctx.lineTo(p.x + 12, p.y + 22);
      this.ctx.fill();

      // Torso / Jacket
      this.ctx.fillStyle = '#38bdf8';
      this.ctx.fillRect(p.x + 6, p.y + 16, 24, 24);

      // Head
      this.ctx.fillStyle = '#fde047'; // Hat
      this.ctx.fillRect(p.x + 4, p.y + 2, 28, 6);
      this.ctx.fillStyle = '#fdba74'; // Face
      this.ctx.fillRect(p.x + 8, p.y + 8, 20, 10);
      this.ctx.fillStyle = '#0284c7'; // Goggles
      this.ctx.fillRect(p.x + 18, p.y + 10, 10, 5);

      // Legs animation
      this.ctx.fillStyle = '#1e293b';
      if (p.isGrounded) {
        const legAngle = Math.sin(p.runFrame) * 12;
        // Left leg
        this.ctx.fillRect(p.x + 8 + legAngle, p.y + 40, 8, 16);
        // Right leg
        this.ctx.fillRect(p.x + 20 - legAngle, p.y + 40, 8, 16);
      } else {
        // Jump pose
        this.ctx.fillRect(p.x + 6, p.y + 38, 8, 14);
        this.ctx.fillRect(p.x + 22, p.y + 36, 8, 12);
      }

      this.ctx.restore();
    }

    renderObstacles() {
      this.ctx.save();
      this.obstacles.forEach(obs => {
        if (obs.type === 'SPIKE') {
          // Glowing Temporal Shard Spike
          this.ctx.fillStyle = '#ef4444';
          this.ctx.shadowColor = '#ef4444';
          this.ctx.shadowBlur = 12;

          this.ctx.beginPath();
          this.ctx.moveTo(obs.x + obs.width / 2, obs.y);
          this.ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
          this.ctx.lineTo(obs.x, obs.y + obs.height);
          this.ctx.closePath();
          this.ctx.fill();
        } else {
          // Ancient Ruin Stone Block
          this.ctx.fillStyle = '#334155';
          this.ctx.strokeStyle = '#64748b';
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

    renderArtifacts() {
      this.ctx.save();
      this.artifactsList.forEach(art => {
        const floatY = Math.sin(art.anim * 2) * 6;
        const curY = art.y + floatY;

        // Glowing pedestal aura
        this.ctx.shadowColor = art.def.color;
        this.ctx.shadowBlur = 20;

        this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
        this.ctx.strokeStyle = art.def.color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(art.x + art.width / 2, curY + art.height / 2, 24, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        // Icon text
        this.ctx.font = '22px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(art.def.icon, art.x + art.width / 2, curY + art.height / 2);
      });
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

  // Instantiate when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TimeExplorerGame());
  } else {
    new TimeExplorerGame();
  }
})();
