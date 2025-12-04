// 🍄 Mushroom Growing Simulation - Story Enhanced Extension
// This file extends the base game with story, achievements, and enhanced features

// Load story data from story-data.js (must be loaded before this file)

// ==================== STORY SYSTEM ====================

class StorySystem {
    constructor(game) {
        this.game = game;
        this.viewedDialogues = [];
        this.unlockedMemories = [];
        this.currentDialogue = null;
    }

    checkStoryTriggers() {
        const level = gameState.player.level;

        // Check for level-based story triggers
        Object.values(STORY_DIALOGUES).forEach(dialogue => {
            if (dialogue.trigger === 'level' && dialogue.level === level) {
                if (!this.viewedDialogues.includes(dialogue.id)) {
                    this.triggerStory(dialogue);
                }
            }
        });
    }

    triggerStory(dialogue) {
        this.currentDialogue = dialogue;
        this.viewedDialogues.push(dialogue.id);

        if (dialogue.type === 'cutscene') {
            this.showCutscene(dialogue);
        } else {
            this.showDialogue(dialogue);
        }

        // Add memory if present
        if (dialogue.memory) {
            this.unlockMemory(dialogue.memory);
        }
    }

    showCutscene(cutscene) {
        const modal = document.getElementById('story-modal');
        if (!modal) {
            this.createStoryModal();
            return this.showCutscene(cutscene);
        }

        const content = document.getElementById('story-modal-content');
        const character = CHARACTERS[cutscene.character];

        let html = `
            <div class="cutscene-container">
                <div class="cutscene-header">
                    <div class="cutscene-character">
                        <div class="character-avatar">${character.avatar}</div>
                        <div class="character-name">${character.name}</div>
                    </div>
                </div>
                <div class="cutscene-dialogue">
        `;

        cutscene.dialogue.forEach((line, index) => {
            const speaker = CHARACTERS[line.speaker];
            html += `
                <div class="dialogue-line" data-index="${index}">
                    <div class="dialogue-speaker">
                        <span class="speaker-avatar">${speaker.avatar}</span>
                        <span class="speaker-name">${speaker.name}</span>
                    </div>
                    <div class="dialogue-text">${line.text}</div>
                </div>
            `;
        });

        html += `
                </div>
                <div class="cutscene-controls">
                    <button class="story-btn story-continue" onclick="storySystem.closeCutscene()">Continue</button>
                </div>
            </div>
        `;

        content.innerHTML = html;
        modal.classList.add('active');

        // Animate dialogue lines
        this.animateDialogue();
    }

    showDialogue(dialogue) {
        this.showCutscene(dialogue); // Same UI for now
    }

    animateDialogue() {
        const lines = document.querySelectorAll('.dialogue-line');
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('visible');
            }, index * 800);
        });
    }

    closeCutscene() {
        const modal = document.getElementById('story-modal');
        modal.classList.remove('active');
        this.currentDialogue = null;

        // Check for follow-up actions
        this.game.checkLevelUnlocks();
    }

    unlockMemory(memory) {
        if (!this.unlockedMemories.find(m => m.title === memory.title)) {
            this.unlockedMemories.push(memory);
            this.game.showNotification(
                'Memory Unlocked!',
                `New memory: ${memory.title}`,
                'success'
            );
        }
    }

    createStoryModal() {
        const modal = document.createElement('div');
        modal.id = 'story-modal';
        modal.className = 'modal-overlay story-modal';
        modal.innerHTML = `
            <div class="modal story-modal-content">
                <button class="modal-close" onclick="storySystem.closeCutscene()">&times;</button>
                <div id="story-modal-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    showMemoriesGallery() {
        const modal = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');

        let html = '<h2>📚 Story Memories</h2>';
        html += '<p style="color: #666; margin-bottom: 20px;">Relive your journey through these special moments</p>';
        html += '<div class="memories-grid">';

        if (this.unlockedMemories.length === 0) {
            html += '<p style="text-align: center; color: #999; padding: 40px;">No memories unlocked yet. Progress through the story to unlock memories!</p>';
        } else {
            this.unlockedMemories.forEach(memory => {
                html += `
                    <div class="memory-card">
                        <div class="memory-icon">${memory.icon}</div>
                        <div class="memory-title">${memory.title}</div>
                        <div class="memory-description">${memory.description}</div>
                    </div>
                `;
            });
        }

        html += '</div>';
        content.innerHTML = html;
        modal.classList.add('active');
    }
}

// ==================== ACHIEVEMENT SYSTEM ====================

class AchievementSystem {
    constructor(game) {
        this.game = game;
        this.unlockedAchievements = [];
    }

    checkAchievement(achievementId) {
        if (this.unlockedAchievements.includes(achievementId)) {
            return false; // Already unlocked
        }

        const achievement = ACHIEVEMENTS[achievementId];
        if (!achievement) return false;

        this.unlockAchievement(achievement);
        return true;
    }

    unlockAchievement(achievement) {
        this.unlockedAchievements.push(achievement.id);

        // Grant rewards
        if (achievement.reward.gold) {
            gameState.player.gold += achievement.reward.gold;
        }
        if (achievement.reward.researchPoints) {
            gameState.player.researchPoints += achievement.reward.researchPoints;
        }

        // Show notification
        this.game.showNotification(
            '🏆 Achievement Unlocked!',
            `${achievement.icon} ${achievement.name}`,
            'success'
        );

        // Update UI
        this.game.updateUI();
    }

    checkAllAchievements() {
        const stats = gameState.player.statistics;

        // Growing achievements
        if (stats.totalHarvests >= 1) this.checkAchievement('firstHarvest');
        if (stats.totalHarvests >= 100) this.checkAchievement('harvest100');
        if (stats.totalHarvests >= 1000) this.checkAchievement('harvest1000');

        // Economic achievements
        if (stats.totalSales >= 1) this.checkAchievement('firstSale');
        if (stats.totalGoldEarned >= 10000) this.checkAchievement('earn10k');
        if (stats.totalGoldEarned >= 100000) this.checkAchievement('earn100k');

        // Species achievements
        if (gameState.player.unlockedSpecies.length >= 5) this.checkAchievement('species5');
        if (gameState.player.unlockedSpecies.length >= 20) this.checkAchievement('species20');

        // Level achievement
        if (gameState.player.level >= 100) this.checkAchievement('level100');
    }

    showAchievementsPanel() {
        const modal = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');

        let html = '<h2>🏆 Achievements</h2>';
        html += '<div class="achievements-grid">';

        Object.values(ACHIEVEMENTS).forEach(achievement => {
            const unlocked = this.unlockedAchievements.includes(achievement.id);
            html += `
                <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon">${unlocked ? achievement.icon : '🔒'}</div>
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                    ${unlocked ? '<div class="achievement-unlocked">✓ Unlocked</div>' : ''}
                </div>
            `;
        });

        html += '</div>';
        html += `<p style="text-align: center; margin-top: 20px;">
            Unlocked: ${this.unlockedAchievements.length} / ${Object.keys(ACHIEVEMENTS).length}
        </p>`;

        content.innerHTML = html;
        modal.classList.add('active');
    }
}

// ==================== SEASON SYSTEM ====================

class SeasonSystem {
    constructor(game) {
        this.game = game;
        this.currentSeason = 'spring';
        this.seasonStartTime = Date.now();
    }

    updateSeason() {
        const elapsed = Date.now() - this.seasonStartTime;
        const seasonDuration = SEASONS[this.currentSeason].duration;

        if (elapsed >= seasonDuration) {
            this.changeSeason();
        }

        // Apply seasonal effects
        this.applySeasonalEffects();
    }

    changeSeason() {
        const seasons = ['spring', 'summer', 'autumn', 'winter'];
        const currentIndex = seasons.indexOf(this.currentSeason);
        const nextIndex = (currentIndex + 1) % seasons.length;
        this.currentSeason = seasons[nextIndex];
        this.seasonStartTime = Date.now();

        const season = SEASONS[this.currentSeason];
        this.game.showNotification(
            `${season.icon} ${season.name} has arrived!`,
            season.description,
            'info'
        );

        // Update visual theme
        this.updateSeasonalVisuals();
    }

    applySeasonalEffects() {
        const season = SEASONS[this.currentSeason];

        // Influence temperature and humidity ranges
        const tempRange = season.effects.temperature;
        gameState.farm.globalTemp = Math.floor(
            Math.random() * (tempRange.max - tempRange.min) + tempRange.min
        );

        const humidityRange = season.effects.humidity;
        gameState.farm.globalHumidity = Math.floor(
            Math.random() * (humidityRange.max - humidityRange.min) + humidityRange.min
        );
    }

    updateSeasonalVisuals() {
        const body = document.body;
        body.className = ''; // Clear existing classes
        body.classList.add(`season-${this.currentSeason}`);

        // Update season indicator in UI
        const seasonIndicator = document.getElementById('season-indicator');
        if (seasonIndicator) {
            const season = SEASONS[this.currentSeason];
            seasonIndicator.innerHTML = `${season.icon} ${season.name}`;
        }
    }

    getSeasonBonus(speciesId) {
        const season = SEASONS[this.currentSeason];
        if (season.specialSpecies.includes(speciesId)) {
            return season.effects.growthBonus;
        }
        return 0;
    }
}

// ==================== TUTORIAL SYSTEM ====================

class TutorialSystem {
    constructor(game) {
        this.game = game;
        this.tutorialStep = 0;
        this.tutorialActive = false;
        this.tutorialSteps = [
            {
                target: '.growing-bed.empty',
                title: 'Welcome to Your Mushroom Farm!',
                message: 'This is a growing bed. Click on it to plant your first mushroom!',
                highlight: true
            },
            {
                target: '.growing-bed',
                title: 'Watch It Grow!',
                message: 'Your mushroom is growing! Watch the progress bar fill up.',
                highlight: true,
                condition: () => gameState.farm.growingBeds.some(bed => bed.species)
            },
            {
                target: '.btn-harvest',
                title: 'Harvest Time!',
                message: 'Your mushroom is ready! Click "Harvest" to collect it.',
                highlight: true,
                condition: () => gameState.farm.growingBeds.some(bed => bed.currentStage === 4)
            },
            {
                target: '.nav-btn[data-view="market"]',
                title: 'Visit the Market',
                message: 'Now go to the Market to sell your mushroom and buy more spores!',
                highlight: true,
                condition: () => gameState.inventory.mushrooms.length > 0
            }
        ];
    }

    startTutorial() {
        if (gameState.player.level > 1) return; // Only for new players

        this.tutorialActive = true;
        this.tutorialStep = 0;
        this.showTutorialStep();
    }

    showTutorialStep() {
        if (this.tutorialStep >= this.tutorialSteps.length) {
            this.completeTutorial();
            return;
        }

        const step = this.tutorialSteps[this.tutorialStep];

        // Check condition if present
        if (step.condition && !step.condition()) {
            return; // Wait for condition
        }

        const target = document.querySelector(step.target);
        if (!target) {
            setTimeout(() => this.showTutorialStep(), 1000);
            return;
        }

        // Remove existing tutorial overlay
        const existingOverlay = document.querySelector('.tutorial-overlay');
        if (existingOverlay) existingOverlay.remove();

        // Create tutorial overlay
        const overlay = document.createElement('div');
        overlay.className = 'tutorial-overlay';

        if (step.highlight) {
            const rect = target.getBoundingClientRect();
            overlay.innerHTML = `
                <div class="tutorial-spotlight" style="
                    top: ${rect.top - 10}px;
                    left: ${rect.left - 10}px;
                    width: ${rect.width + 20}px;
                    height: ${rect.height + 20}px;">
                </div>
                <div class="tutorial-tooltip" style="
                    top: ${rect.bottom + 20}px;
                    left: ${rect.left}px;">
                    <div class="tutorial-title">${step.title}</div>
                    <div class="tutorial-message">${step.message}</div>
                    <button class="tutorial-next" onclick="tutorialSystem.nextStep()">Got it!</button>
                </div>
            `;
        }

        document.body.appendChild(overlay);
    }

    nextStep() {
        this.tutorialStep++;
        const overlay = document.querySelector('.tutorial-overlay');
        if (overlay) overlay.remove();

        setTimeout(() => {
            this.showTutorialStep();
        }, 500);
    }

    completeTutorial() {
        this.tutorialActive = false;
        const overlay = document.querySelector('.tutorial-overlay');
        if (overlay) overlay.remove();

        this.game.showNotification(
            'Tutorial Complete!',
            'You\'re ready to grow your mushroom empire!',
            'success'
        );
    }

    checkTutorialProgress() {
        if (this.tutorialActive) {
            this.showTutorialStep();
        }
    }
}

// ==================== ENHANCED GAME CLASS EXTENSION ====================

// Extend the existing MushroomGame class with story features
const originalGameInit = MushroomGame.prototype.init;
MushroomGame.prototype.init = function() {
    // Call original init
    originalGameInit.call(this);

    // Initialize story systems
    this.storySystem = new StorySystem(this);
    this.achievementSystem = new AchievementSystem(this);
    this.seasonSystem = new SeasonSystem(this);
    this.tutorialSystem = new TutorialSystem(this);

    // Start tutorial for new players
    if (gameState.player.level === 1 && gameState.player.statistics.totalHarvests === 0) {
        setTimeout(() => {
            this.tutorialSystem.startTutorial();
        }, 1000);
    }

    // Add story-specific UI elements
    this.createStoryUI();

    // Assign to global for onclick handlers
    window.storySystem = this.storySystem;
    window.achievementSystem = this.achievementSystem;
    window.tutorialSystem = this.tutorialSystem;
};

// Override level up to check story triggers
const originalLevelUp = MushroomGame.prototype.levelUp;
MushroomGame.prototype.levelUp = function() {
    originalLevelUp.call(this);

    // Check for story triggers
    if (this.storySystem) {
        this.storySystem.checkStoryTriggers();
    }

    // Check achievements
    if (this.achievementSystem) {
        this.achievementSystem.checkAllAchievements();
    }

    // Check for special unlocks based on level
    this.checkLevelUnlocks();
};

// Add level-specific unlocks
MushroomGame.prototype.checkLevelUnlocks = function() {
    const level = gameState.player.level;
    const levelData = LEVEL_PROGRESSION.find(l => l.level === level);

    if (levelData && levelData.unlock) {
        this.showNotification(
            `Level ${level} Unlocked!`,
            `New: ${levelData.unlock}`,
            'success'
        );
    }
};

// Override game tick to include seasons and tutorial
const originalGameTick = MushroomGame.prototype.gameTick;
MushroomGame.prototype.gameTick = function() {
    originalGameTick.call(this);

    // Update seasons
    if (this.seasonSystem) {
        this.seasonSystem.updateSeason();
    }

    // Check tutorial progress
    if (this.tutorialSystem) {
        this.tutorialSystem.checkTutorialProgress();
    }
};

// Add story UI elements
MushroomGame.prototype.createStoryUI = function() {
    // Add Achievements button to nav
    const nav = document.getElementById('main-nav');
    if (nav && !document.querySelector('[data-view="achievements"]')) {
        const achievementsBtn = document.createElement('button');
        achievementsBtn.className = 'nav-btn';
        achievementsBtn.dataset.view = 'achievements';
        achievementsBtn.textContent = '🏆 Achievements';
        achievementsBtn.onclick = () => this.achievementSystem.showAchievementsPanel();
        nav.appendChild(achievementsBtn);

        const memoriesBtn = document.createElement('button');
        memoriesBtn.className = 'nav-btn';
        memoriesBtn.dataset.view = 'memories';
        memoriesBtn.textContent = '📚 Memories';
        memoriesBtn.onclick = () => this.storySystem.showMemoriesGallery();
        nav.appendChild(memoriesBtn);
    }

    // Add season indicator to farm view
    const farmHeader = document.querySelector('.farm-header .environment-controls');
    if (farmHeader && !document.getElementById('season-indicator')) {
        const seasonDiv = document.createElement('span');
        seasonDiv.id = 'season-indicator';
        const season = SEASONS[this.seasonSystem.currentSeason];
        seasonDiv.innerHTML = `${season.icon} ${season.name}`;
        farmHeader.appendChild(seasonDiv);
    }

    // Add current arc indicator to top bar
    const topBar = document.getElementById('top-bar');
    if (topBar && !document.getElementById('story-arc-indicator')) {
        const arcDiv = document.createElement('div');
        arcDiv.id = 'story-arc-indicator';
        arcDiv.style.cssText = 'font-size: 0.9em; color: rgba(255,255,255,0.8);';

        const currentArc = this.getCurrentStoryArc();
        if (currentArc) {
            arcDiv.textContent = `${currentArc.name}: ${currentArc.subtitle}`;
        }

        const playerInfo = topBar.querySelector('.player-info');
        if (playerInfo) {
            playerInfo.appendChild(arcDiv);
        }
    }
};

// Get current story arc based on level
MushroomGame.prototype.getCurrentStoryArc = function() {
    const level = gameState.player.level;
    return Object.values(STORY_ARCS).find(arc =>
        level >= arc.levels[0] && level <= arc.levels[1]
    );
};

// Override harvest to check achievements and tutorial
const originalHarvestBed = MushroomGame.prototype.harvestBed;
MushroomGame.prototype.harvestBed = function(bedIndex) {
    originalHarvestBed.call(this, bedIndex);

    // Check achievements after harvest
    if (this.achievementSystem) {
        this.achievementSystem.checkAllAchievements();
    }

    // Progress tutorial
    if (this.tutorialSystem && this.tutorialSystem.tutorialActive) {
        this.tutorialSystem.checkTutorialProgress();
    }
};

// Override sell to check achievements
const originalSellMushroom = MushroomGame.prototype.sellMushroom;
MushroomGame.prototype.sellMushroom = function(index) {
    originalSellMushroom.call(this, index);

    // Check achievements after sale
    if (this.achievementSystem) {
        this.achievementSystem.checkAllAchievements();
    }
};

// Add seasonal growth bonus to updateBedGrowth
const originalUpdateBedGrowth = MushroomGame.prototype.updateBedGrowth;
MushroomGame.prototype.updateBedGrowth = function(bed, deltaTime) {
    // Apply seasonal bonus
    const seasonBonus = this.seasonSystem ? this.seasonSystem.getSeasonBonus(bed.species) : 0;
    const originalGrowthSpeed = gameState.research.bonuses.growthSpeed;
    gameState.research.bonuses.growthSpeed += seasonBonus;

    originalUpdateBedGrowth.call(this, bed, deltaTime);

    // Restore original growth speed
    gameState.research.bonuses.growthSpeed = originalGrowthSpeed;
};

// Update XP requirements to match 1-100 progression
MushroomGame.prototype.updateXPRequirements = function() {
    const levelData = LEVEL_PROGRESSION.find(l => l.level === gameState.player.level + 1);
    if (levelData) {
        const currentLevelData = LEVEL_PROGRESSION.find(l => l.level === gameState.player.level);
        gameState.player.xpToNextLevel = levelData.xp - (currentLevelData ? currentLevelData.xp : 0);
    }
};

console.log('🍄 Story Enhanced Extension Loaded!');
console.log('📚 Story System: Active');
console.log('🏆 Achievement System: Active');
console.log('🌸 Season System: Active');
console.log('🎓 Tutorial System: Active');
