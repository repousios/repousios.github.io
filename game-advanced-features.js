// 🍄 Mushroom Game - Advanced Features Extension
// Competition, Contracts, Pet System, Mini-games, and more!

// ==================== COMPETITION SYSTEM ====================

class CompetitionSystem {
    constructor(game) {
        this.game = game;
        this.activeCompetition = null;
        this.competitionHistory = [];
        this.marcusScore = 0;
        this.playerScore = 0;
    }

    startCompetition(type = 'weekly') {
        if (gameState.player.level < 21) return; // Marcus appears at level 21

        const competitionTypes = {
            weekly: {
                name: 'Weekly Growing Challenge',
                duration: 604800000, // 7 days
                goal: 75,
                objective: 'Grow the most mushrooms this week',
                rewards: { gold: 5000, researchPoints: 200, rare: 'Rare spore voucher' }
            },
            quality: {
                name: 'Quality Competition',
                duration: 259200000, // 3 days
                goal: 10,
                objective: 'Harvest 10 perfect quality mushrooms',
                rewards: { gold: 3000, researchPoints: 150 }
            },
            speed: {
                name: 'Speed Challenge',
                duration: 86400000, // 1 day
                goal: 30,
                objective: 'Fastest to grow 30 mushrooms',
                rewards: { gold: 2000, researchPoints: 100 }
            }
        };

        const competition = competitionTypes[type];
        this.activeCompetition = {
            ...competition,
            startTime: Date.now(),
            endTime: Date.now() + competition.duration,
            playerProgress: 0,
            marcusProgress: 0
        };

        this.game.showNotification(
            '🏆 Competition Started!',
            `Marcus challenges you: ${competition.objective}`,
            'info'
        );

        this.renderCompetitionUI();
    }

    updateCompetition() {
        if (!this.activeCompetition) return;

        // Check if competition ended
        if (Date.now() >= this.activeCompetition.endTime) {
            this.endCompetition();
            return;
        }

        // Marcus grows mushrooms too (AI competitor)
        if (Math.random() < 0.01) { // 1% chance per tick
            this.activeCompetition.marcusProgress++;
        }

        // Update UI
        this.renderCompetitionUI();
    }

    onPlayerHarvest() {
        if (this.activeCompetition) {
            this.activeCompetition.playerProgress++;
            this.renderCompetitionUI();
        }
    }

    endCompetition() {
        const playerWon = this.activeCompetition.playerProgress > this.activeCompetition.marcusProgress;

        if (playerWon) {
            this.playerScore++;
            // Grant rewards
            if (this.activeCompetition.rewards.gold) {
                gameState.player.gold += this.activeCompetition.rewards.gold;
            }
            if (this.activeCompetition.rewards.researchPoints) {
                gameState.player.researchPoints += this.activeCompetition.rewards.researchPoints;
            }

            this.game.showNotification(
                '🏆 You Won!',
                `Beat Marcus! Score: ${this.activeCompetition.playerProgress} vs ${this.activeCompetition.marcusProgress}`,
                'success'
            );

            // Story dialogue
            if (gameState.player.level < 40) {
                this.showCompetitionDialogue('win');
            }
        } else {
            this.marcusScore++;
            this.game.showNotification(
                '😔 Marcus Won',
                `Marcus: ${this.activeCompetition.marcusProgress}, You: ${this.activeCompetition.playerProgress}. Try again!`,
                'warning'
            );

            if (gameState.player.level < 40) {
                this.showCompetitionDialogue('lose');
            }
        }

        this.competitionHistory.push({
            ...this.activeCompetition,
            winner: playerWon ? 'player' : 'marcus',
            completedAt: Date.now()
        });

        this.activeCompetition = null;
        this.renderCompetitionUI();
    }

    showCompetitionDialogue(result) {
        const dialogues = {
            win: [
                { speaker: 'marcus', text: 'Okay, you got me this time. Nice work!' },
                { speaker: 'alex', text: 'Thanks! Want to go again?' },
                { speaker: 'marcus', text: "You're on!" }
            ],
            lose: [
                { speaker: 'marcus', text: 'Hah! Told you I was good!' },
                { speaker: 'alex', text: 'Lucky break. Next time is mine!' },
                { speaker: 'marcus', text: "We'll see about that!" }
            ]
        };

        // Show mini dialogue
        const modal = document.getElementById('story-modal');
        if (!modal) return;

        const content = document.getElementById('story-modal-content');
        let html = '<div class="cutscene-container"><div class="cutscene-dialogue">';

        dialogues[result].forEach((line, index) => {
            const character = CHARACTERS[line.speaker];
            html += `
                <div class="dialogue-line visible">
                    <div class="dialogue-speaker">
                        <span class="speaker-avatar">${character.avatar}</span>
                        <span class="speaker-name">${character.name}</span>
                    </div>
                    <div class="dialogue-text">${line.text}</div>
                </div>
            `;
        });

        html += `
            </div>
            <button class="story-btn" onclick="document.getElementById('story-modal').classList.remove('active')">Close</button>
            </div>
        `;

        content.innerHTML = html;
        modal.classList.add('active');
    }

    renderCompetitionUI() {
        let container = document.getElementById('competition-panel');
        if (!container) {
            container = document.createElement('div');
            container.id = 'competition-panel';
            container.className = 'competition-panel';
            document.getElementById('farm-view').appendChild(container);
        }

        if (!this.activeCompetition) {
            if (gameState.player.level >= 21) {
                container.innerHTML = `
                    <div class="competition-inactive">
                        <h4>🏆 Competition</h4>
                        <p>Overall Score: You ${this.playerScore} - ${this.marcusScore} Marcus</p>
                        <button class="btn-start-competition" onclick="competitionSystem.startCompetition('weekly')">
                            Start New Competition
                        </button>
                    </div>
                `;
            } else {
                container.innerHTML = '';
            }
            return;
        }

        const timeLeft = this.activeCompetition.endTime - Date.now();
        const hoursLeft = Math.floor(timeLeft / 3600000);
        const minutesLeft = Math.floor((timeLeft % 3600000) / 60000);

        container.innerHTML = `
            <div class="competition-active">
                <h4>🏆 ${this.activeCompetition.name}</h4>
                <p style="font-size: 0.9em; color: #666;">${this.activeCompetition.objective}</p>
                <div class="competition-scores">
                    <div class="score-player">
                        <div class="score-label">You</div>
                        <div class="score-value">${this.activeCompetition.playerProgress}</div>
                    </div>
                    <div class="score-vs">VS</div>
                    <div class="score-marcus">
                        <div class="score-label">Marcus</div>
                        <div class="score-value">${this.activeCompetition.marcusProgress}</div>
                    </div>
                </div>
                <div class="competition-time">
                    Time Left: ${hoursLeft}h ${minutesLeft}m
                </div>
                <div class="competition-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(this.activeCompetition.playerProgress / this.activeCompetition.goal) * 100}%"></div>
                    </div>
                    <span>${this.activeCompetition.playerProgress} / ${this.activeCompetition.goal}</span>
                </div>
            </div>
        `;
    }
}

// ==================== CONTRACT SYSTEM ====================

class ContractSystem {
    constructor(game) {
        this.game = game;
        this.activeContracts = [];
        this.completedContracts = 0;
    }

    unlockContracts() {
        if (gameState.player.level >= 26) {
            this.offerContract();
        }
    }

    offerContract() {
        const contractTemplates = [
            {
                client: 'Bella\'s Bistro',
                icon: '🍽️',
                requirement: { species: 'button', quantity: 20, quality: 2 },
                payment: 500,
                bonus: 100,
                duration: 604800000, // 1 week
                recurring: true
            },
            {
                client: 'Gourmet Kitchen',
                icon: '👨‍🍳',
                requirement: { species: 'shiitake', quantity: 15, quality: 3 },
                payment: 800,
                bonus: 150,
                duration: 604800000,
                recurring: true
            },
            {
                client: 'Farm-to-Table Restaurant',
                icon: '🌾',
                requirement: { species: 'oyster', quantity: 25, quality: 2 },
                payment: 600,
                bonus: 120,
                duration: 604800000,
                recurring: true
            }
        ];

        // Offer random contract
        const contract = contractTemplates[Math.floor(Math.random() * contractTemplates.length)];
        contract.startTime = Date.now();
        contract.endTime = Date.now() + contract.duration;
        contract.progress = 0;

        this.activeContracts.push(contract);

        this.game.showNotification(
            '📝 New Contract!',
            `${contract.client} wants ${contract.requirement.quantity}x ${MUSHROOM_SPECIES[contract.requirement.species].name}`,
            'success'
        );

        this.renderContractsUI();
    }

    checkContractProgress(species, quality) {
        this.activeContracts.forEach(contract => {
            if (contract.requirement.species === species && quality >= contract.requirement.quality) {
                contract.progress++;

                if (contract.progress >= contract.requirement.quantity) {
                    this.completeContract(contract);
                }
            }
        });

        this.renderContractsUI();
    }

    completeContract(contract) {
        const index = this.activeContracts.indexOf(contract);
        if (index === -1) return;

        // Grant payment
        const totalPay = contract.payment + contract.bonus;
        gameState.player.gold += totalPay;
        this.completedContracts++;

        this.game.showNotification(
            '✅ Contract Complete!',
            `${contract.client} paid ${totalPay} gold!`,
            'success'
        );

        // Remove contract
        this.activeContracts.splice(index, 1);

        // Offer renewal if recurring
        if (contract.recurring && Math.random() < 0.7) {
            setTimeout(() => {
                this.offerContract();
            }, 60000); // 1 minute later
        }

        this.renderContractsUI();
    }

    updateContracts() {
        const now = Date.now();
        this.activeContracts = this.activeContracts.filter(contract => {
            if (now >= contract.endTime) {
                this.game.showNotification(
                    '⏰ Contract Expired',
                    `${contract.client} contract expired`,
                    'warning'
                );
                return false;
            }
            return true;
        });

        this.renderContractsUI();
    }

    renderContractsUI() {
        let container = document.getElementById('contracts-panel');
        if (!container) {
            container = document.createElement('div');
            container.id = 'contracts-panel';
            container.className = 'contracts-panel';
            document.getElementById('farm-view').appendChild(container);
        }

        if (gameState.player.level < 26) {
            container.innerHTML = '';
            return;
        }

        if (this.activeContracts.length === 0) {
            container.innerHTML = `
                <div class="contracts-empty">
                    <h4>📝 Contracts</h4>
                    <p>No active contracts. Check back later!</p>
                    <p style="font-size: 0.8em; color: #999;">Completed: ${this.completedContracts}</p>
                </div>
            `;
            return;
        }

        let html = '<div class="contracts-active"><h4>📝 Active Contracts</h4>';

        this.activeContracts.forEach(contract => {
            const species = MUSHROOM_SPECIES[contract.requirement.species];
            const timeLeft = contract.endTime - Date.now();
            const daysLeft = Math.floor(timeLeft / 86400000);
            const hoursLeft = Math.floor((timeLeft % 86400000) / 3600000);

            html += `
                <div class="contract-card">
                    <div class="contract-header">
                        <span class="contract-icon">${contract.icon}</span>
                        <span class="contract-client">${contract.client}</span>
                    </div>
                    <div class="contract-requirement">
                        ${species.icon} ${contract.requirement.quantity}x ${species.name}
                        (${this.getQualityName(contract.requirement.quality)}+ quality)
                    </div>
                    <div class="contract-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(contract.progress / contract.requirement.quantity) * 100}%"></div>
                        </div>
                        <span>${contract.progress} / ${contract.requirement.quantity}</span>
                    </div>
                    <div class="contract-footer">
                        <span class="contract-payment">💰 ${contract.payment + contract.bonus}</span>
                        <span class="contract-time">⏰ ${daysLeft}d ${hoursLeft}h</span>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    getQualityName(quality) {
        const names = ['Poor', 'Common', 'Good', 'Excellent', 'Perfect'];
        return names[quality - 1] || 'Unknown';
    }
}

// ==================== PET SYSTEM ====================

class PetSystem {
    constructor(game) {
        this.game = game;
        this.pet = null;
        this.petHappiness = 100;
        this.lastFed = Date.now();
        this.lastPetted = Date.now();
        this.giftsReceived = 0;
    }

    unlockPet() {
        if (gameState.player.level >= 25 && !this.pet) {
            this.pet = {
                name: 'Spore',
                type: 'cat',
                icon: '🐱',
                happiness: 100,
                level: 1,
                gifts: []
            };

            this.game.showNotification(
                '🐱 New Friend!',
                'A curious cat has wandered into your garage! Meet Spore!',
                'success'
            );

            this.renderPetUI();
        }
    }

    updatePet() {
        if (!this.pet) return;

        // Happiness decreases over time
        const timeSinceLastFed = Date.now() - this.lastFed;
        if (timeSinceLastFed > 3600000) { // 1 hour
            this.petHappiness = Math.max(0, this.petHappiness - 0.1);
        }

        // Happy cat brings gifts
        if (this.petHappiness > 80 && Math.random() < 0.001) { // 0.1% chance per tick
            this.bringGift();
        }

        this.renderPetUI();
    }

    feedPet() {
        if (gameState.player.gold < 10) {
            this.game.showNotification('Not Enough Gold', 'Need 10 gold to buy cat food', 'error');
            return;
        }

        gameState.player.gold -= 10;
        this.petHappiness = Math.min(100, this.petHappiness + 20);
        this.lastFed = Date.now();

        this.game.showNotification(
            '🐱 Spore is Happy!',
            'Fed Spore. Happiness +20',
            'success'
        );

        this.renderPetUI();
        this.game.updateUI();
    }

    petPet() {
        const timeSinceLastPet = Date.now() - this.lastPetted;
        if (timeSinceLastPet < 60000) { // 1 minute cooldown
            this.game.showNotification('🐱 Spore Needs Space', 'Wait a bit before petting again', 'info');
            return;
        }

        this.petHappiness = Math.min(100, this.petHappiness + 10);
        this.lastPetted = Date.now();

        const messages = [
            'Spore purrs happily! 😺',
            'Spore rubs against your leg! 🐱',
            'Spore meows contentedly! 😻'
        ];

        this.game.showNotification(
            '🐱 Pet!',
            messages[Math.floor(Math.random() * messages.length)],
            'success'
        );

        this.renderPetUI();
    }

    bringGift() {
        const gifts = [
            { name: 'Rare Spore', value: 0, spore: 'random' },
            { name: 'Gold Coins', value: 100 },
            { name: 'Research Notes', value: 0, research: 50 },
            { name: 'Shiny Rock', value: 0, decoration: true }
        ];

        const gift = gifts[Math.floor(Math.random() * gifts.length)];

        if (gift.value) {
            gameState.player.gold += gift.value;
        }
        if (gift.research) {
            gameState.player.researchPoints += gift.research;
        }
        if (gift.spore) {
            // Grant random spore
            const species = Object.keys(MUSHROOM_SPECIES);
            const randomSpecies = species[Math.floor(Math.random() * species.length)];
            if (!gameState.inventory.spores[randomSpecies]) {
                gameState.inventory.spores[randomSpecies] = 0;
            }
            gameState.inventory.spores[randomSpecies]++;
        }

        this.giftsReceived++;

        this.game.showNotification(
            '🎁 Spore Brought a Gift!',
            `Found: ${gift.name}`,
            'success'
        );

        this.game.updateUI();
    }

    renderPetUI() {
        if (!this.pet) return;

        let container = document.getElementById('pet-panel');
        if (!container) {
            container = document.createElement('div');
            container.id = 'pet-panel';
            container.className = 'pet-panel';
            document.getElementById('farm-view').appendChild(container);
        }

        const happinessColor = this.petHappiness > 66 ? '#4CAF50' : this.petHappiness > 33 ? '#FFC107' : '#F44336';

        container.innerHTML = `
            <div class="pet-card">
                <div class="pet-header">
                    <span class="pet-icon">${this.pet.icon}</span>
                    <div class="pet-info">
                        <div class="pet-name">${this.pet.name}</div>
                        <div class="pet-happiness">
                            <div class="happiness-bar">
                                <div class="happiness-fill" style="width: ${this.petHappiness}%; background: ${happinessColor};"></div>
                            </div>
                            <span style="font-size: 0.8em;">Happiness: ${Math.floor(this.petHappiness)}%</span>
                        </div>
                    </div>
                </div>
                <div class="pet-actions">
                    <button class="pet-btn" onclick="petSystem.feedPet()">🍖 Feed (10g)</button>
                    <button class="pet-btn" onclick="petSystem.petPet()">❤️ Pet</button>
                </div>
                <div class="pet-stats">
                    <span style="font-size: 0.8em;">🎁 Gifts: ${this.giftsReceived}</span>
                </div>
            </div>
        `;
    }
}

// ==================== MINI-GAMES ====================

class MiniGameSystem {
    constructor(game) {
        this.game = game;
        this.currentGame = null;
        this.highScores = {};
    }

    showMiniGameMenu() {
        const modal = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');

        let html = `
            <h2>🎮 Mini-Games</h2>
            <p style="color: #666; margin-bottom: 20px;">Play fun games for bonus rewards!</p>
            <div class="minigame-grid">
        `;

        const games = [
            {
                id: 'spore-match',
                name: 'Spore Match',
                icon: '🍄',
                description: 'Memory matching game with mushroom species',
                reward: 'Gold & XP',
                level: 10
            },
            {
                id: 'contamination-cleanup',
                name: 'Contamination Cleanup',
                icon: '🧹',
                description: 'Click contaminated mushrooms before they spread',
                reward: 'Research Points',
                level: 15
            },
            {
                id: 'growth-optimizer',
                name: 'Growth Optimizer',
                icon: '🎯',
                description: 'Adjust conditions for optimal growth in time limit',
                reward: 'Quality Boost',
                level: 20
            }
        ];

        games.forEach(game => {
            const unlocked = gameState.player.level >= game.level;
            html += `
                <div class="minigame-card ${!unlocked ? 'locked' : ''}"
                     ${unlocked ? `onclick="miniGameSystem.startGame('${game.id}')"` : ''}>
                    <div class="minigame-icon">${unlocked ? game.icon : '🔒'}</div>
                    <div class="minigame-name">${game.name}</div>
                    <div class="minigame-description">${game.description}</div>
                    <div class="minigame-reward">Reward: ${game.reward}</div>
                    ${!unlocked ? `<div class="minigame-level">Unlock at Level ${game.level}</div>` : ''}
                </div>
            `;
        });

        html += '</div>';
        content.innerHTML = html;
        modal.classList.add('active');
    }

    startGame(gameId) {
        document.getElementById('modal-overlay').classList.remove('active');

        switch(gameId) {
            case 'spore-match':
                this.startSporeMatch();
                break;
            case 'contamination-cleanup':
                this.startContaminationCleanup();
                break;
            case 'growth-optimizer':
                this.startGrowthOptimizer();
                break;
        }
    }

    startSporeMatch() {
        const modal = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');

        const species = Object.keys(MUSHROOM_SPECIES).slice(0, 6);
        const cards = [...species, ...species].sort(() => Math.random() - 0.5);

        let html = `
            <h2>🍄 Spore Match</h2>
            <p>Match the mushroom pairs!</p>
            <div id="match-stats">
                <span>Moves: <span id="match-moves">0</span></span>
                <span>Matches: <span id="match-found">0 / ${species.length}</span></span>
            </div>
            <div class="match-grid">
        `;

        cards.forEach((speciesId, index) => {
            html += `
                <div class="match-card" data-species="${speciesId}" data-index="${index}" onclick="miniGameSystem.flipCard(${index})">
                    <div class="card-front">?</div>
                    <div class="card-back">${MUSHROOM_SPECIES[speciesId].icon}</div>
                </div>
            `;
        });

        html += '</div><button class="story-btn" onclick="miniGameSystem.endGame()">End Game</button>';

        content.innerHTML = html;
        modal.classList.add('active');

        this.currentGame = {
            type: 'match',
            flipped: [],
            matched: [],
            moves: 0,
            totalPairs: species.length
        };
    }

    flipCard(index) {
        if (!this.currentGame || this.currentGame.flipped.length >= 2) return;

        const card = document.querySelector(`[data-index="${index}"]`);
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

        card.classList.add('flipped');
        this.currentGame.flipped.push(index);

        if (this.currentGame.flipped.length === 2) {
            this.currentGame.moves++;
            document.getElementById('match-moves').textContent = this.currentGame.moves;

            setTimeout(() => this.checkMatch(), 1000);
        }
    }

    checkMatch() {
        const [first, second] = this.currentGame.flipped;
        const card1 = document.querySelector(`[data-index="${first}"]`);
        const card2 = document.querySelector(`[data-index="${second}"]`);

        if (card1.dataset.species === card2.dataset.species) {
            // Match!
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.currentGame.matched.push(first, second);

            document.getElementById('match-found').textContent =
                `${this.currentGame.matched.length / 2} / ${this.currentGame.totalPairs}`;

            if (this.currentGame.matched.length === this.currentGame.totalPairs * 2) {
                setTimeout(() => this.completeMinigame(), 500);
            }
        } else {
            // No match
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        this.currentGame.flipped = [];
    }

    startContaminationCleanup() {
        const modal = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');

        let html = `
            <h2>🧹 Contamination Cleanup</h2>
            <p>Click the contaminated mushrooms!</p>
            <div id="cleanup-stats">
                <span>Score: <span id="cleanup-score">0</span></span>
                <span>Time: <span id="cleanup-time">30</span>s</span>
            </div>
            <div id="cleanup-grid" class="cleanup-grid">
        `;

        for (let i = 0; i < 25; i++) {
            const contaminated = Math.random() < 0.3;
            html += `
                <div class="cleanup-cell ${contaminated ? 'contaminated' : ''}"
                     data-index="${i}"
                     onclick="miniGameSystem.clickCleanup(${i}, ${contaminated})">
                    ${contaminated ? '🦠' : '🍄'}
                </div>
            `;
        }

        html += '</div>';
        content.innerHTML = html;
        modal.classList.add('active');

        this.currentGame = {
            type: 'cleanup',
            score: 0,
            timeLeft: 30
        };

        this.cleanupTimer = setInterval(() => {
            this.currentGame.timeLeft--;
            document.getElementById('cleanup-time').textContent = this.currentGame.timeLeft;

            if (this.currentGame.timeLeft <= 0) {
                clearInterval(this.cleanupTimer);
                this.completeMinigame();
            }
        }, 1000);
    }

    clickCleanup(index, isContaminated) {
        const cell = document.querySelector(`.cleanup-cell[data-index="${index}"]`);
        if (cell.classList.contains('clicked')) return;

        cell.classList.add('clicked');

        if (isContaminated) {
            this.currentGame.score += 10;
            cell.textContent = '✨';
            cell.classList.remove('contaminated');
        } else {
            this.currentGame.score -= 5;
        }

        document.getElementById('cleanup-score').textContent = this.currentGame.score;
    }

    startGrowthOptimizer() {
        // Placeholder for third minigame
        this.game.showNotification('Coming Soon!', 'This mini-game is under development', 'info');
    }

    completeMinigame() {
        clearInterval(this.cleanupTimer);

        let reward = 0;
        let rewardType = 'gold';

        if (this.currentGame.type === 'match') {
            reward = Math.max(100, 1000 - (this.currentGame.moves * 50));
            rewardType = 'gold';
        } else if (this.currentGame.type === 'cleanup') {
            reward = Math.max(0, this.currentGame.score);
            rewardType = 'researchPoints';
        }

        if (rewardType === 'gold') {
            gameState.player.gold += reward;
        } else {
            gameState.player.researchPoints += reward;
        }

        this.game.showNotification(
            '🎮 Game Complete!',
            `Earned ${reward} ${rewardType === 'gold' ? 'Gold' : 'Research Points'}!`,
            'success'
        );

        this.currentGame = null;
        document.getElementById('modal-overlay').classList.remove('active');
        this.game.updateUI();
    }

    endGame() {
        clearInterval(this.cleanupTimer);
        this.currentGame = null;
        document.getElementById('modal-overlay').classList.remove('active');
    }
}

// ==================== INTEGRATE WITH MAIN GAME ====================

// Initialize systems on game load
const originalGameInit2 = MushroomGame.prototype.init;
MushroomGame.prototype.init = function() {
    originalGameInit2.call(this);

    // Initialize advanced systems
    this.competitionSystem = new CompetitionSystem(this);
    this.contractSystem = new ContractSystem(this);
    this.petSystem = new PetSystem(this);
    this.miniGameSystem = new MiniGameSystem(this);

    // Add mini-games button to nav
    const nav = document.getElementById('main-nav');
    if (nav && !document.querySelector('[data-view="minigames"]')) {
        const minigamesBtn = document.createElement('button');
        minigamesBtn.className = 'nav-btn';
        minigamesBtn.textContent = '🎮 Games';
        minigamesBtn.onclick = () => this.miniGameSystem.showMiniGameMenu();
        nav.appendChild(minigamesBtn);
    }

    // Assign to window for onclick handlers
    window.competitionSystem = this.competitionSystem;
    window.contractSystem = this.contractSystem;
    window.petSystem = this.petSystem;
    window.miniGameSystem = this.miniGameSystem;

    // Unlock systems based on level
    if (gameState.player.level >= 21) {
        this.competitionSystem.renderCompetitionUI();
    }
    if (gameState.player.level >= 25) {
        this.petSystem.unlockPet();
    }
    if (gameState.player.level >= 26) {
        this.contractSystem.unlockContracts();
    }
};

// Update game tick
const originalGameTick2 = MushroomGame.prototype.gameTick;
MushroomGame.prototype.gameTick = function() {
    originalGameTick2.call(this);

    // Update advanced systems
    if (this.competitionSystem) {
        this.competitionSystem.updateCompetition();
    }
    if (this.contractSystem) {
        this.contractSystem.updateContracts();
    }
    if (this.petSystem) {
        this.petSystem.updatePet();
    }
};

// Hook into harvest
const originalHarvestBed2 = MushroomGame.prototype.harvestBed;
MushroomGame.prototype.harvestBed = function(bedIndex) {
    const bed = gameState.farm.growingBeds[bedIndex];
    const species = bed.species;
    const quality = this.calculateQuality(bed);

    originalHarvestBed2.call(this, bedIndex);

    // Update competition
    if (this.competitionSystem) {
        this.competitionSystem.onPlayerHarvest();
    }

    // Update contracts
    if (this.contractSystem) {
        this.contractSystem.checkContractProgress(species, quality);
    }
};

console.log('🎮 Advanced Features Loaded!');
console.log('🏆 Competition System: Active');
console.log('📝 Contract System: Active');
console.log('🐱 Pet System: Active');
console.log('🎮 Mini-Games: Active');
