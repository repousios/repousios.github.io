// 🍄 Mushroom Growing Simulation Game
// Core Game Engine

// ==================== GAME DATA ====================

// Mushroom Species Database
const MUSHROOM_SPECIES = {
    button: {
        id: 'button',
        name: 'Button Mushroom',
        icon: '🍄',
        tier: 1,
        growthTime: 120000, // 2 minutes
        baseValue: 10,
        requiredLevel: 1,
        optimalTemp: { min: 18, max: 22 },
        optimalHumidity: { min: 65, max: 75 },
        sporePrice: 50,
        description: 'The most common mushroom. Perfect for beginners!'
    },
    oyster: {
        id: 'oyster',
        name: 'Oyster Mushroom',
        icon: '🦪',
        tier: 1,
        growthTime: 150000, // 2.5 minutes
        baseValue: 15,
        requiredLevel: 2,
        optimalTemp: { min: 16, max: 24 },
        optimalHumidity: { min: 70, max: 80 },
        sporePrice: 75,
        description: 'Fan-shaped and delicious!'
    },
    shiitake: {
        id: 'shiitake',
        name: 'Shiitake',
        icon: '🍄',
        tier: 1,
        growthTime: 180000, // 3 minutes
        baseValue: 20,
        requiredLevel: 3,
        optimalTemp: { min: 12, max: 18 },
        optimalHumidity: { min: 75, max: 85 },
        sporePrice: 100,
        description: 'Popular in Asian cuisine!'
    },
    portobello: {
        id: 'portobello',
        name: 'Portobello',
        icon: '🍄',
        tier: 2,
        growthTime: 240000, // 4 minutes
        baseValue: 35,
        requiredLevel: 5,
        optimalTemp: { min: 18, max: 22 },
        optimalHumidity: { min: 70, max: 80 },
        sporePrice: 200,
        description: 'Large and meaty, great for grilling!'
    },
    enoki: {
        id: 'enoki',
        name: 'Enoki',
        icon: '🍄',
        tier: 2,
        growthTime: 300000, // 5 minutes
        baseValue: 45,
        requiredLevel: 7,
        optimalTemp: { min: 8, max: 14 },
        optimalHumidity: { min: 80, max: 90 },
        sporePrice: 250,
        description: 'Long thin stems with tiny caps!'
    },
    maitake: {
        id: 'maitake',
        name: 'Maitake',
        icon: '🍄',
        tier: 2,
        growthTime: 360000, // 6 minutes
        baseValue: 60,
        requiredLevel: 9,
        optimalTemp: { min: 15, max: 20 },
        optimalHumidity: { min: 75, max: 85 },
        sporePrice: 350,
        description: 'Known as "Hen of the Woods"!'
    },
    lionsMane: {
        id: 'lionsMane',
        name: "Lion's Mane",
        icon: '🦁',
        tier: 3,
        growthTime: 480000, // 8 minutes
        baseValue: 100,
        requiredLevel: 12,
        optimalTemp: { min: 16, max: 22 },
        optimalHumidity: { min: 80, max: 90 },
        sporePrice: 500,
        description: 'Looks like a white pom-pom, great for brain health!'
    },
    morel: {
        id: 'morel',
        name: 'Morel',
        icon: '🍄',
        tier: 3,
        growthTime: 600000, // 10 minutes
        baseValue: 150,
        requiredLevel: 15,
        optimalTemp: { min: 10, max: 18 },
        optimalHumidity: { min: 70, max: 85 },
        sporePrice: 750,
        description: 'Highly prized with a honeycomb appearance!'
    },
    chanterelle: {
        id: 'chanterelle',
        name: 'Chanterelle',
        icon: '🟡',
        tier: 3,
        growthTime: 720000, // 12 minutes
        baseValue: 200,
        requiredLevel: 18,
        optimalTemp: { min: 14, max: 20 },
        optimalHumidity: { min: 75, max: 85 },
        sporePrice: 1000,
        description: 'Golden yellow with a fruity aroma!'
    },
    truffle: {
        id: 'truffle',
        name: 'Truffle',
        icon: '⚫',
        tier: 4,
        growthTime: 900000, // 15 minutes
        baseValue: 500,
        requiredLevel: 22,
        optimalTemp: { min: 12, max: 18 },
        optimalHumidity: { min: 70, max: 80 },
        sporePrice: 2000,
        description: 'The diamond of the kitchen! Extremely valuable!'
    },
    matsutake: {
        id: 'matsutake',
        name: 'Matsutake',
        icon: '🍄',
        tier: 4,
        growthTime: 1200000, // 20 minutes
        baseValue: 750,
        requiredLevel: 26,
        optimalTemp: { min: 10, max: 16 },
        optimalHumidity: { min: 75, max: 85 },
        sporePrice: 3000,
        description: 'Highly valued in Japanese cuisine!'
    },
    porcini: {
        id: 'porcini',
        name: 'Porcini',
        icon: '🍄',
        tier: 4,
        growthTime: 1500000, // 25 minutes
        baseValue: 1000,
        requiredLevel: 30,
        optimalTemp: { min: 12, max: 20 },
        optimalHumidity: { min: 70, max: 80 },
        sporePrice: 4000,
        description: 'King Bolete - nutty flavor and firm texture!'
    }
};

// Growth Stages
const GROWTH_STAGES = ['Spore', 'Mycelium', 'Pinning', 'Fruiting', 'Harvestable'];

// Mission Templates
const MISSION_TEMPLATES = [
    {
        id: 'tutorial_1',
        type: 'tutorial',
        title: 'First Steps',
        description: 'Plant your first mushroom spore',
        requirement: { type: 'plant', count: 1 },
        rewards: { gold: 50, xp: 20 }
    },
    {
        id: 'tutorial_2',
        type: 'tutorial',
        title: 'Patience is Key',
        description: 'Harvest your first mushroom',
        requirement: { type: 'harvest', count: 1 },
        rewards: { gold: 100, xp: 50 }
    },
    {
        id: 'tutorial_3',
        type: 'tutorial',
        title: 'Market Day',
        description: 'Sell a mushroom at the market',
        requirement: { type: 'sell', count: 1 },
        rewards: { gold: 150, xp: 75, researchPoints: 10 }
    },
    {
        id: 'daily_harvest',
        type: 'daily',
        title: 'Daily Harvest',
        description: 'Harvest 10 mushrooms of any type',
        requirement: { type: 'harvest', count: 10 },
        rewards: { gold: 200, xp: 100, researchPoints: 20 }
    },
    {
        id: 'quality_control',
        type: 'daily',
        title: 'Quality Control',
        description: 'Harvest 3 mushrooms with Good quality or better',
        requirement: { type: 'harvest_quality', count: 3, minQuality: 3 },
        rewards: { gold: 300, xp: 150, researchPoints: 30 }
    },
    {
        id: 'entrepreneur',
        type: 'weekly',
        title: 'Entrepreneur',
        description: 'Earn 1000 gold from selling mushrooms',
        requirement: { type: 'earn', count: 1000 },
        rewards: { gold: 500, xp: 250, researchPoints: 50 }
    },
    {
        id: 'collector',
        type: 'achievement',
        title: 'Mushroom Collector',
        description: 'Unlock 5 different mushroom species',
        requirement: { type: 'species_unlocked', count: 5 },
        rewards: { gold: 1000, xp: 500, researchPoints: 100 }
    }
];

// Research Tree
const RESEARCH_TREE = {
    biology: [
        { id: 'bio_1', name: 'Fast Growth I', description: 'Reduce growth time by 10%', cost: 100, bonus: { growthSpeed: 0.1 } },
        { id: 'bio_2', name: 'Better Yields I', description: 'Increase harvest yield by 20%', cost: 200, bonus: { yieldBonus: 0.2 }, requires: 'bio_1' },
        { id: 'bio_3', name: 'Fast Growth II', description: 'Reduce growth time by 15%', cost: 400, bonus: { growthSpeed: 0.15 }, requires: 'bio_2' },
        { id: 'bio_4', name: 'Quality Expert', description: 'Higher chance of perfect quality', cost: 800, bonus: { qualityBonus: 0.15 }, requires: 'bio_3' }
    ],
    engineering: [
        { id: 'eng_1', name: 'Extra Bed', description: 'Unlock 1 additional growing bed', cost: 150, bonus: { extraBeds: 1 } },
        { id: 'eng_2', name: 'Climate Control I', description: 'Better temperature control', cost: 300, bonus: { climateControl: 0.2 }, requires: 'eng_1' },
        { id: 'eng_3', name: 'Extra Beds II', description: 'Unlock 2 more growing beds', cost: 600, bonus: { extraBeds: 2 }, requires: 'eng_2' },
        { id: 'eng_4', name: 'Auto-Harvester', description: 'Automatically harvest ready mushrooms', cost: 1200, bonus: { autoHarvest: true }, requires: 'eng_3' }
    ],
    business: [
        { id: 'bus_1', name: 'Negotiation I', description: 'Get 10% better prices', cost: 100, bonus: { priceBonus: 0.1 } },
        { id: 'bus_2', name: 'Bulk Sales', description: 'Sell multiple items at once', cost: 250, bonus: { bulkSales: true }, requires: 'bus_1' },
        { id: 'bus_3', name: 'Negotiation II', description: 'Get 20% better prices', cost: 500, bonus: { priceBonus: 0.2 }, requires: 'bus_2' },
        { id: 'bus_4', name: 'Black Market Access', description: 'Unlock rare species and items', cost: 1000, bonus: { blackMarket: true }, requires: 'bus_3' }
    ]
};

// ==================== GAME STATE ====================

let gameState = {
    player: {
        id: Date.now(),
        username: 'Mushroom Farmer',
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        gold: 100,
        researchPoints: 0,
        premiumTokens: 0,
        reputation: 0,
        unlockedSpecies: ['button'],
        completedMissions: [],
        statistics: {
            totalHarvests: 0,
            totalSales: 0,
            totalGoldEarned: 0,
            playtime: 0,
            mushroomsGrownBySpecies: {}
        },
        lastLoginTime: Date.now()
    },
    farm: {
        globalTemp: 20,
        globalHumidity: 70,
        growingBeds: [
            { id: 1, species: null, plantedTime: null, currentStage: 0, health: 100, contamination: 0 },
            { id: 2, species: null, plantedTime: null, currentStage: 0, health: 100, contamination: 0 }
        ]
    },
    inventory: {
        mushrooms: [],
        resources: [
            { type: 'substrate', name: 'Basic Substrate', quantity: 5 }
        ],
        equipment: [],
        spores: {}
    },
    missions: {
        active: [],
        completed: []
    },
    research: {
        unlocked: [],
        bonuses: {
            growthSpeed: 0,
            yieldBonus: 0,
            qualityBonus: 0,
            priceBonus: 0,
            climateControl: 0,
            extraBeds: 0,
            autoHarvest: false,
            bulkSales: false,
            blackMarket: false
        }
    },
    market: {
        priceFluctuations: {}
    }
};

// ==================== GAME LOGIC ====================

class MushroomGame {
    constructor() {
        this.tickRate = 1000; // 1 second
        this.tickInterval = null;
        this.selectedBed = null;
        this.currentView = 'farm';
        this.init();
    }

    init() {
        this.loadGame();
        this.initMissions();
        this.renderUI();
        this.startGameLoop();
        this.setupEventListeners();
        this.calculateOfflineProgress();
    }

    // ==================== SAVE/LOAD ====================

    saveGame() {
        try {
            localStorage.setItem('mushroomGameSave', JSON.stringify(gameState));
            this.showNotification('Game Saved', 'Your progress has been saved!', 'success');
        } catch (error) {
            console.error('Save failed:', error);
            this.showNotification('Save Failed', 'Could not save game!', 'error');
        }
    }

    loadGame() {
        try {
            const savedData = localStorage.getItem('mushroomGameSave');
            if (savedData) {
                gameState = { ...gameState, ...JSON.parse(savedData) };
                this.showNotification('Welcome Back!', 'Your game has been loaded!', 'success');
            }
        } catch (error) {
            console.error('Load failed:', error);
        }
    }

    calculateOfflineProgress() {
        const now = Date.now();
        const lastLogin = gameState.player.lastLoginTime;
        const offlineTime = now - lastLogin;

        if (offlineTime > 5000) { // More than 5 seconds offline
            const offlineMinutes = Math.floor(offlineTime / 60000);
            const maxOfflineMinutes = 1440; // 24 hours max
            const cappedMinutes = Math.min(offlineMinutes, maxOfflineMinutes);

            // Process growing beds
            gameState.farm.growingBeds.forEach(bed => {
                if (bed.species) {
                    this.updateBedGrowth(bed, offlineTime);
                }
            });

            this.showNotification(
                'Welcome Back!',
                `You were away for ${cappedMinutes} minutes. Your mushrooms continued growing!`,
                'info'
            );
        }

        gameState.player.lastLoginTime = now;
    }

    // ==================== GAME LOOP ====================

    startGameLoop() {
        this.tickInterval = setInterval(() => {
            this.gameTick();
        }, this.tickRate);
    }

    gameTick() {
        // Update all growing beds
        gameState.farm.growingBeds.forEach(bed => {
            if (bed.species) {
                this.updateBedGrowth(bed, this.tickRate);
            }
        });

        // Auto-harvest if unlocked
        if (gameState.research.bonuses.autoHarvest) {
            this.autoHarvest();
        }

        // Auto-save every 30 seconds
        if (Date.now() % 30000 < this.tickRate) {
            this.saveGame();
        }

        // Update UI
        this.updateFarmUI();
    }

    updateBedGrowth(bed, deltaTime) {
        const species = MUSHROOM_SPECIES[bed.species];
        if (!species) return;

        const elapsed = Date.now() - bed.plantedTime;
        const totalGrowthTime = species.growthTime * (1 - gameState.research.bonuses.growthSpeed);
        const progress = elapsed / totalGrowthTime;

        // Calculate stage
        const stageIndex = Math.min(Math.floor(progress * GROWTH_STAGES.length), GROWTH_STAGES.length - 1);
        bed.currentStage = stageIndex;

        // Check if harvestable
        if (progress >= 1 && bed.currentStage < GROWTH_STAGES.length) {
            bed.currentStage = GROWTH_STAGES.length - 1;
            this.onMushroomReady(bed);
        }

        // Environmental effects on health
        this.updateBedHealth(bed);
    }

    updateBedHealth(bed) {
        const species = MUSHROOM_SPECIES[bed.species];
        if (!species) return;

        const temp = gameState.farm.globalTemp;
        const humidity = gameState.farm.globalHumidity;

        let healthChange = 0;

        // Temperature check
        if (temp < species.optimalTemp.min - 5 || temp > species.optimalTemp.max + 5) {
            healthChange -= 2;
        } else if (temp < species.optimalTemp.min || temp > species.optimalTemp.max) {
            healthChange -= 0.5;
        } else {
            healthChange += 0.5;
        }

        // Humidity check
        if (humidity < species.optimalHumidity.min - 10 || humidity > species.optimalHumidity.max + 10) {
            healthChange -= 2;
        } else if (humidity < species.optimalHumidity.min || humidity > species.optimalHumidity.max) {
            healthChange -= 0.5;
        } else {
            healthChange += 0.5;
        }

        bed.health = Math.max(0, Math.min(100, bed.health + healthChange));

        // Random contamination
        if (Math.random() < 0.001) {
            bed.contamination += Math.random() * 5;
        }
    }

    onMushroomReady(bed) {
        // Notification that mushroom is ready
        if (bed.currentStage === GROWTH_STAGES.length - 1 && !bed.notified) {
            this.showNotification(
                'Harvest Ready!',
                `Your ${MUSHROOM_SPECIES[bed.species].name} is ready to harvest!`,
                'success'
            );
            bed.notified = true;
        }
    }

    autoHarvest() {
        gameState.farm.growingBeds.forEach((bed, index) => {
            if (bed.species && bed.currentStage === GROWTH_STAGES.length - 1) {
                this.harvestBed(index);
            }
        });
    }

    // ==================== FARM ACTIONS ====================

    plantMushroom(bedIndex, speciesId) {
        const bed = gameState.farm.growingBeds[bedIndex];
        const species = MUSHROOM_SPECIES[speciesId];

        if (!bed || bed.species) {
            this.showNotification('Error', 'Bed is not available!', 'error');
            return;
        }

        if (!gameState.player.unlockedSpecies.includes(speciesId)) {
            this.showNotification('Error', 'Species not unlocked!', 'error');
            return;
        }

        // Check for spores
        if (!gameState.inventory.spores[speciesId] || gameState.inventory.spores[speciesId] <= 0) {
            this.showNotification('Error', 'No spores available! Buy some from the market.', 'error');
            return;
        }

        // Plant the mushroom
        bed.species = speciesId;
        bed.plantedTime = Date.now();
        bed.currentStage = 0;
        bed.health = 100;
        bed.contamination = 0;
        bed.notified = false;

        // Use spore
        gameState.inventory.spores[speciesId]--;

        // Update mission progress
        this.updateMissionProgress('plant', 1);

        this.showNotification('Planted!', `${species.name} has been planted!`, 'success');
        this.renderFarm();
    }

    harvestBed(bedIndex) {
        const bed = gameState.farm.growingBeds[bedIndex];

        if (!bed || !bed.species || bed.currentStage < GROWTH_STAGES.length - 1) {
            this.showNotification('Error', 'Mushroom is not ready to harvest!', 'error');
            return;
        }

        const species = MUSHROOM_SPECIES[bed.species];

        // Calculate quality based on health and conditions
        const quality = this.calculateQuality(bed);

        // Calculate yield
        const baseYield = 1;
        const harvestYield = Math.floor(baseYield * (1 + gameState.research.bonuses.yieldBonus));

        // Add to inventory
        for (let i = 0; i < harvestYield; i++) {
            gameState.inventory.mushrooms.push({
                species: bed.species,
                quality: quality,
                harvestTime: Date.now()
            });
        }

        // Update statistics
        gameState.player.statistics.totalHarvests++;
        if (!gameState.player.statistics.mushroomsGrownBySpecies[bed.species]) {
            gameState.player.statistics.mushroomsGrownBySpecies[bed.species] = 0;
        }
        gameState.player.statistics.mushroomsGrownBySpecies[bed.species] += harvestYield;

        // Add XP
        this.addXP(species.tier * 10);

        // Update mission progress
        this.updateMissionProgress('harvest', harvestYield);
        if (quality >= 3) {
            this.updateMissionProgress('harvest_quality', harvestYield);
        }

        // Clear bed
        bed.species = null;
        bed.plantedTime = null;
        bed.currentStage = 0;
        bed.notified = false;

        this.showNotification(
            'Harvested!',
            `Collected ${harvestYield}x ${species.name} (${this.getQualityStars(quality)})!`,
            'success'
        );

        this.renderFarm();
        this.renderInventory();
    }

    removeBed(bedIndex) {
        const bed = gameState.farm.growingBeds[bedIndex];
        if (bed && bed.species) {
            bed.species = null;
            bed.plantedTime = null;
            bed.currentStage = 0;
            this.renderFarm();
            this.showNotification('Removed', 'Growing bed cleared!', 'info');
        }
    }

    calculateQuality(bed) {
        const species = MUSHROOM_SPECIES[bed.species];
        let qualityScore = 50; // Base score

        // Health affects quality
        qualityScore += (bed.health - 50);

        // Contamination reduces quality
        qualityScore -= bed.contamination;

        // Temperature and humidity
        const temp = gameState.farm.globalTemp;
        const humidity = gameState.farm.globalHumidity;

        if (temp >= species.optimalTemp.min && temp <= species.optimalTemp.max) {
            qualityScore += 20;
        }

        if (humidity >= species.optimalHumidity.min && humidity <= species.optimalHumidity.max) {
            qualityScore += 20;
        }

        // Research bonus
        qualityScore += gameState.research.bonuses.qualityBonus * 100;

        // Convert to 1-5 quality rating
        if (qualityScore >= 90) return 5; // Perfect
        if (qualityScore >= 75) return 4; // Excellent
        if (qualityScore >= 60) return 3; // Good
        if (qualityScore >= 40) return 2; // Common
        return 1; // Poor
    }

    getQualityStars(quality) {
        return '⭐'.repeat(quality);
    }

    // ==================== MARKET ACTIONS ====================

    buySpores(speciesId) {
        const species = MUSHROOM_SPECIES[speciesId];
        const price = species.sporePrice;

        if (gameState.player.gold < price) {
            this.showNotification('Not Enough Gold', `You need ${price} gold!`, 'error');
            return;
        }

        gameState.player.gold -= price;

        if (!gameState.inventory.spores[speciesId]) {
            gameState.inventory.spores[speciesId] = 0;
        }
        gameState.inventory.spores[speciesId]++;

        // Unlock species
        if (!gameState.player.unlockedSpecies.includes(speciesId)) {
            gameState.player.unlockedSpecies.push(speciesId);
            this.showNotification(
                'Species Unlocked!',
                `You can now grow ${species.name}!`,
                'success'
            );
            this.updateMissionProgress('species_unlocked', 1);
        }

        this.showNotification('Purchase Complete', `Bought ${species.name} spores!`, 'success');
        this.updateUI();
    }

    sellMushroom(index) {
        const mushroom = gameState.inventory.mushrooms[index];
        if (!mushroom) return;

        const species = MUSHROOM_SPECIES[mushroom.species];
        const qualityMultipliers = [0.5, 1.0, 1.5, 2.5, 5.0];
        const basePrice = species.baseValue;
        const priceBonus = 1 + gameState.research.bonuses.priceBonus;
        const finalPrice = Math.floor(basePrice * qualityMultipliers[mushroom.quality - 1] * priceBonus);

        gameState.player.gold += finalPrice;
        gameState.player.statistics.totalSales++;
        gameState.player.statistics.totalGoldEarned += finalPrice;

        // Update mission progress
        this.updateMissionProgress('sell', 1);
        this.updateMissionProgress('earn', finalPrice);

        // Remove from inventory
        gameState.inventory.mushrooms.splice(index, 1);

        this.showNotification(
            'Sold!',
            `Sold ${species.name} for ${finalPrice} gold!`,
            'success'
        );

        this.updateUI();
    }

    // ==================== MISSIONS ====================

    initMissions() {
        // Add tutorial missions
        MISSION_TEMPLATES.filter(m => m.type === 'tutorial').forEach(template => {
            if (!gameState.missions.completed.includes(template.id)) {
                const mission = {
                    ...template,
                    progress: 0
                };
                if (!gameState.missions.active.find(m => m.id === template.id)) {
                    gameState.missions.active.push(mission);
                }
            }
        });

        // Add daily missions
        this.addDailyMissions();
    }

    addDailyMissions() {
        const dailyMissions = MISSION_TEMPLATES.filter(m => m.type === 'daily');
        dailyMissions.forEach(template => {
            if (!gameState.missions.active.find(m => m.id === template.id)) {
                gameState.missions.active.push({
                    ...template,
                    progress: 0
                });
            }
        });
    }

    updateMissionProgress(type, amount) {
        gameState.missions.active.forEach(mission => {
            if (mission.requirement.type === type) {
                mission.progress = (mission.progress || 0) + amount;

                if (mission.progress >= mission.requirement.count) {
                    this.completeMission(mission);
                }
            }
        });

        this.renderMissions();
    }

    completeMission(mission) {
        if (mission.claimable) return; // Already completed

        mission.claimable = true;

        this.showNotification(
            'Mission Complete!',
            `${mission.title} completed! Click to claim rewards.`,
            'success'
        );

        this.renderMissions();
    }

    claimMissionRewards(missionId) {
        const missionIndex = gameState.missions.active.findIndex(m => m.id === missionId);
        if (missionIndex === -1) return;

        const mission = gameState.missions.active[missionIndex];
        if (!mission.claimable) return;

        // Give rewards
        if (mission.rewards.gold) {
            gameState.player.gold += mission.rewards.gold;
        }
        if (mission.rewards.xp) {
            this.addXP(mission.rewards.xp);
        }
        if (mission.rewards.researchPoints) {
            gameState.player.researchPoints += mission.rewards.researchPoints;
        }

        // Move to completed
        gameState.missions.completed.push(missionId);
        gameState.missions.active.splice(missionIndex, 1);

        this.showNotification(
            'Rewards Claimed!',
            `Received: ${mission.rewards.gold || 0} gold, ${mission.rewards.xp || 0} XP, ${mission.rewards.researchPoints || 0} RP`,
            'success'
        );

        this.updateUI();
    }

    // ==================== PROGRESSION ====================

    addXP(amount) {
        gameState.player.xp += amount;

        while (gameState.player.xp >= gameState.player.xpToNextLevel) {
            this.levelUp();
        }

        this.updateUI();
    }

    levelUp() {
        gameState.player.xp -= gameState.player.xpToNextLevel;
        gameState.player.level++;
        gameState.player.xpToNextLevel = Math.floor(gameState.player.xpToNextLevel * 1.5);

        // Level up rewards
        gameState.player.gold += 100 * gameState.player.level;
        gameState.player.researchPoints += 50;

        this.showNotification(
            'Level Up!',
            `You reached level ${gameState.player.level}! Rewards: ${100 * gameState.player.level} gold, 50 RP`,
            'success'
        );
    }

    // ==================== RESEARCH ====================

    unlockResearch(researchId) {
        const allResearch = [...RESEARCH_TREE.biology, ...RESEARCH_TREE.engineering, ...RESEARCH_TREE.business];
        const research = allResearch.find(r => r.id === researchId);

        if (!research) return;

        if (gameState.research.unlocked.includes(researchId)) {
            this.showNotification('Already Unlocked', 'You already have this research!', 'error');
            return;
        }

        if (gameState.player.researchPoints < research.cost) {
            this.showNotification('Not Enough RP', `You need ${research.cost} research points!`, 'error');
            return;
        }

        // Check requirements
        if (research.requires && !gameState.research.unlocked.includes(research.requires)) {
            this.showNotification('Requirements Not Met', 'Unlock previous research first!', 'error');
            return;
        }

        // Unlock research
        gameState.player.researchPoints -= research.cost;
        gameState.research.unlocked.push(researchId);

        // Apply bonuses
        Object.keys(research.bonus).forEach(key => {
            if (typeof research.bonus[key] === 'boolean') {
                gameState.research.bonuses[key] = research.bonus[key];
            } else {
                gameState.research.bonuses[key] += research.bonus[key];
            }
        });

        // Add extra beds if research grants them
        if (research.bonus.extraBeds) {
            for (let i = 0; i < research.bonus.extraBeds; i++) {
                gameState.farm.growingBeds.push({
                    id: gameState.farm.growingBeds.length + 1,
                    species: null,
                    plantedTime: null,
                    currentStage: 0,
                    health: 100,
                    contamination: 0
                });
            }
        }

        this.showNotification(
            'Research Unlocked!',
            `${research.name} has been researched!`,
            'success'
        );

        this.updateUI();
    }

    // ==================== UI RENDERING ====================

    renderUI() {
        this.updateTopBar();
        this.renderFarm();
        this.renderInventory();
        this.renderMarket();
        this.renderMissions();
        this.renderResearch();
        this.renderStats();
    }

    updateUI() {
        this.updateTopBar();
        if (this.currentView === 'farm') this.renderFarm();
        if (this.currentView === 'inventory') this.renderInventory();
        if (this.currentView === 'market') this.renderMarket();
        if (this.currentView === 'missions') this.renderMissions();
        if (this.currentView === 'research') this.renderResearch();
        if (this.currentView === 'stats') this.renderStats();
    }

    updateTopBar() {
        document.getElementById('player-level').textContent = gameState.player.level;
        document.getElementById('gold').textContent = gameState.player.gold;
        document.getElementById('research-points').textContent = gameState.player.researchPoints;
        document.getElementById('premium-tokens').textContent = gameState.player.premiumTokens;

        const xpPercent = (gameState.player.xp / gameState.player.xpToNextLevel) * 100;
        document.getElementById('xp-fill').style.width = xpPercent + '%';
        document.getElementById('xp-text').textContent =
            `${gameState.player.xp} / ${gameState.player.xpToNextLevel}`;
    }

    renderFarm() {
        const container = document.getElementById('growing-beds-container');
        container.innerHTML = '';

        gameState.farm.growingBeds.forEach((bed, index) => {
            const bedElement = this.createBedElement(bed, index);
            container.appendChild(bedElement);
        });

        document.getElementById('global-temp').textContent = gameState.farm.globalTemp;
        document.getElementById('global-humidity').textContent = gameState.farm.globalHumidity;
    }

    createBedElement(bed, index) {
        const div = document.createElement('div');
        div.className = 'growing-bed' + (bed.species ? '' : ' empty');
        div.dataset.bedIndex = index;

        if (bed.species) {
            const species = MUSHROOM_SPECIES[bed.species];
            const elapsed = Date.now() - bed.plantedTime;
            const totalTime = species.growthTime * (1 - gameState.research.bonuses.growthSpeed);
            const progress = Math.min((elapsed / totalTime) * 100, 100);
            const stage = GROWTH_STAGES[bed.currentStage] || 'Unknown';

            div.innerHTML = `
                <div class="bed-header">
                    <span>Bed #${bed.id}</span>
                    <span>${species.tier}★</span>
                </div>
                <div class="mushroom-icon">${species.icon}</div>
                <div class="growth-stage">${stage}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="bed-conditions">
                    <div class="condition-indicator">
                        <span>🌡️ ${gameState.farm.globalTemp}°C</span>
                    </div>
                    <div class="condition-indicator">
                        <span>💧 ${gameState.farm.globalHumidity}%</span>
                    </div>
                </div>
                <div class="health-bar">
                    <div class="health-fill ${bed.health > 66 ? 'good' : bed.health > 33 ? 'medium' : 'bad'}"
                         style="width: ${bed.health}%"></div>
                </div>
                <div class="bed-actions">
                    ${bed.currentStage === GROWTH_STAGES.length - 1
                        ? '<button class="bed-action-btn btn-harvest" onclick="game.harvestBed(' + index + ')">Harvest</button>'
                        : ''}
                    <button class="bed-action-btn btn-remove" onclick="game.removeBed(' + index + ')">Clear</button>
                </div>
            `;
        } else {
            div.innerHTML = `
                <div class="bed-header">
                    <span>Bed #${bed.id}</span>
                </div>
                <div class="mushroom-icon">➕</div>
                <p style="text-align: center; color: #999; margin: 20px 0;">Empty Bed</p>
                <button class="bed-action-btn btn-plant" onclick="game.openPlantModal(${index})">Plant</button>
            `;
        }

        return div;
    }

    updateFarmUI() {
        gameState.farm.growingBeds.forEach((bed, index) => {
            if (bed.species) {
                const bedElement = document.querySelector(`[data-bed-index="${index}"]`);
                if (bedElement && !bedElement.classList.contains('empty')) {
                    const species = MUSHROOM_SPECIES[bed.species];
                    const elapsed = Date.now() - bed.plantedTime;
                    const totalTime = species.growthTime * (1 - gameState.research.bonuses.growthSpeed);
                    const progress = Math.min((elapsed / totalTime) * 100, 100);

                    const progressBar = bedElement.querySelector('.progress-fill');
                    if (progressBar) {
                        progressBar.style.width = progress + '%';
                    }

                    const stage = bedElement.querySelector('.growth-stage');
                    if (stage) {
                        stage.textContent = GROWTH_STAGES[bed.currentStage] || 'Unknown';
                    }

                    const healthBar = bedElement.querySelector('.health-fill');
                    if (healthBar) {
                        healthBar.style.width = bed.health + '%';
                        healthBar.className = 'health-fill ' +
                            (bed.health > 66 ? 'good' : bed.health > 33 ? 'medium' : 'bad');
                    }

                    // Update buttons if harvestable
                    if (bed.currentStage === GROWTH_STAGES.length - 1) {
                        const actions = bedElement.querySelector('.bed-actions');
                        if (actions && !actions.querySelector('.btn-harvest')) {
                            actions.innerHTML = `
                                <button class="bed-action-btn btn-harvest" onclick="game.harvestBed(${index})">Harvest</button>
                                <button class="bed-action-btn btn-remove" onclick="game.removeBed(${index})">Clear</button>
                            `;
                        }
                    }
                }
            }
        });
    }

    openPlantModal(bedIndex) {
        const modal = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');

        let html = '<h2>Select Mushroom to Plant</h2><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; margin-top: 20px;">';

        Object.values(MUSHROOM_SPECIES).forEach(species => {
            const unlocked = gameState.player.unlockedSpecies.includes(species.id);
            const hasSpores = gameState.inventory.spores[species.id] > 0;
            const canPlant = unlocked && hasSpores;

            html += `
                <div class="market-item ${!canPlant ? 'disabled' : ''}"
                     ${canPlant ? `onclick="game.plantMushroom(${bedIndex}, '${species.id}'); game.closeModal()"` : ''}>
                    <div class="item-icon">${species.icon}</div>
                    <div class="item-name">${species.name}</div>
                    <div style="font-size: 0.8em; color: #666; margin: 5px 0;">
                        Tier ${species.tier} | ${Math.floor(species.growthTime / 60000)}min
                    </div>
                    <div style="font-size: 0.9em; margin-top: 5px;">
                        Spores: ${gameState.inventory.spores[species.id] || 0}
                    </div>
                    ${!unlocked ? '<div style="color: red; font-size: 0.8em;">🔒 Locked</div>' : ''}
                    ${unlocked && !hasSpores ? '<div style="color: orange; font-size: 0.8em;">No spores!</div>' : ''}
                </div>
            `;
        });

        html += '</div>';
        content.innerHTML = html;
        modal.classList.add('active');
    }

    closeModal() {
        document.getElementById('modal-overlay').classList.remove('active');
    }

    renderInventory() {
        // Mushrooms tab
        const mushroomsTab = document.getElementById('inventory-mushrooms');
        mushroomsTab.innerHTML = '';

        if (gameState.inventory.mushrooms.length === 0) {
            mushroomsTab.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No mushrooms in inventory</p>';
        } else {
            gameState.inventory.mushrooms.forEach((mushroom, index) => {
                const species = MUSHROOM_SPECIES[mushroom.species];
                const div = document.createElement('div');
                div.className = 'inventory-item';
                div.innerHTML = `
                    <div class="item-icon">${species.icon}</div>
                    <div class="item-name">${species.name}</div>
                    <div class="quality-stars">${this.getQualityStars(mushroom.quality)}</div>
                    <button class="item-btn btn-sell" onclick="game.sellMushroom(${index})">Sell</button>
                `;
                mushroomsTab.appendChild(div);
            });
        }

        // Spores tab
        const sporesTab = document.getElementById('inventory-spores');
        sporesTab.innerHTML = '';

        const hasSpores = Object.keys(gameState.inventory.spores).some(key => gameState.inventory.spores[key] > 0);

        if (!hasSpores) {
            sporesTab.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No spores in inventory. Buy some from the market!</p>';
        } else {
            Object.keys(gameState.inventory.spores).forEach(speciesId => {
                const quantity = gameState.inventory.spores[speciesId];
                if (quantity > 0) {
                    const species = MUSHROOM_SPECIES[speciesId];
                    const div = document.createElement('div');
                    div.className = 'inventory-item';
                    div.innerHTML = `
                        <div class="item-icon">${species.icon}</div>
                        <div class="item-name">${species.name} Spores</div>
                        <div class="item-quantity">Quantity: ${quantity}</div>
                    `;
                    sporesTab.appendChild(div);
                }
            });
        }

        // Resources tab
        const resourcesTab = document.getElementById('inventory-resources');
        resourcesTab.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Resources coming soon!</p>';

        // Equipment tab
        const equipmentTab = document.getElementById('inventory-equipment');
        equipmentTab.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Equipment coming soon!</p>';
    }

    renderMarket() {
        // Buy tab
        const buyTab = document.getElementById('market-buy');
        buyTab.innerHTML = '';

        Object.values(MUSHROOM_SPECIES).forEach(species => {
            if (gameState.player.level >= species.requiredLevel) {
                const div = document.createElement('div');
                div.className = 'market-item';
                div.innerHTML = `
                    <div class="item-icon">${species.icon}</div>
                    <div class="item-name">${species.name}</div>
                    <div style="font-size: 0.85em; color: #666; margin: 5px 0;">
                        ${species.description}
                    </div>
                    <div style="font-size: 0.8em; margin: 5px 0;">
                        Growth: ${Math.floor(species.growthTime / 60000)}min | Tier ${species.tier}
                    </div>
                    <div class="item-price">💰 ${species.sporePrice}</div>
                    <button class="item-btn btn-buy" onclick="game.buySpores('${species.id}')"
                            ${gameState.player.gold < species.sporePrice ? 'disabled' : ''}>
                        Buy Spore
                    </button>
                `;
                buyTab.appendChild(div);
            }
        });

        // Sell tab
        const sellTab = document.getElementById('market-sell');
        sellTab.innerHTML = '';

        if (gameState.inventory.mushrooms.length === 0) {
            sellTab.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No mushrooms to sell. Harvest some first!</p>';
        } else {
            gameState.inventory.mushrooms.forEach((mushroom, index) => {
                const species = MUSHROOM_SPECIES[mushroom.species];
                const qualityMultipliers = [0.5, 1.0, 1.5, 2.5, 5.0];
                const basePrice = species.baseValue;
                const priceBonus = 1 + gameState.research.bonuses.priceBonus;
                const finalPrice = Math.floor(basePrice * qualityMultipliers[mushroom.quality - 1] * priceBonus);

                const div = document.createElement('div');
                div.className = 'market-item';
                div.innerHTML = `
                    <div class="item-icon">${species.icon}</div>
                    <div class="item-name">${species.name}</div>
                    <div class="quality-stars">${this.getQualityStars(mushroom.quality)}</div>
                    <div class="item-price">💰 ${finalPrice}</div>
                    <button class="item-btn btn-sell" onclick="game.sellMushroom(${index})">Sell</button>
                `;
                sellTab.appendChild(div);
            });
        }
    }

    renderMissions() {
        const container = document.getElementById('missions-content');
        container.innerHTML = '';

        if (gameState.missions.active.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No active missions</p>';
            return;
        }

        gameState.missions.active.forEach(mission => {
            const progress = Math.min(mission.progress || 0, mission.requirement.count);
            const progressPercent = (progress / mission.requirement.count) * 100;

            const div = document.createElement('div');
            div.className = 'mission-card';
            div.innerHTML = `
                <div class="mission-title">${mission.title}</div>
                <div class="mission-description">${mission.description}</div>
                <div class="mission-progress">
                    <div class="mission-progress-bar">
                        <div class="mission-progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <span>${progress} / ${mission.requirement.count}</span>
                </div>
                <div class="mission-rewards">
                    ${mission.rewards.gold ? `<span class="reward-badge">💰 ${mission.rewards.gold}</span>` : ''}
                    ${mission.rewards.xp ? `<span class="reward-badge">⭐ ${mission.rewards.xp} XP</span>` : ''}
                    ${mission.rewards.researchPoints ? `<span class="reward-badge">🔬 ${mission.rewards.researchPoints} RP</span>` : ''}
                </div>
                ${mission.claimable
                    ? `<button class="mission-claim-btn" onclick="game.claimMissionRewards('${mission.id}')">Claim Rewards!</button>`
                    : ''}
            `;
            container.appendChild(div);
        });
    }

    renderResearch() {
        ['biology', 'engineering', 'business'].forEach(branch => {
            const container = document.getElementById(`${branch}-research`);
            container.innerHTML = '';

            RESEARCH_TREE[branch].forEach(research => {
                const unlocked = gameState.research.unlocked.includes(research.id);
                const canUnlock = !research.requires || gameState.research.unlocked.includes(research.requires);

                const div = document.createElement('div');
                div.className = 'research-item' + (unlocked ? ' unlocked' : '');
                div.innerHTML = `
                    <div class="research-name">${research.name} ${unlocked ? '✓' : ''}</div>
                    <div class="research-description">${research.description}</div>
                    <div class="research-cost">🔬 ${research.cost} RP</div>
                    ${!unlocked
                        ? `<button class="research-btn"
                                   onclick="game.unlockResearch('${research.id}')"
                                   ${!canUnlock || gameState.player.researchPoints < research.cost ? 'disabled' : ''}>
                               ${canUnlock ? 'Research' : '🔒 Locked'}
                           </button>`
                        : '<div style="color: #4CAF50; font-weight: bold;">✓ Unlocked</div>'}
                `;
                container.appendChild(div);
            });
        });
    }

    renderStats() {
        const container = document.getElementById('stats-content');
        const stats = gameState.player.statistics;

        container.innerHTML = `
            <h3 style="margin-bottom: 20px;">Your Statistics</h3>
            <div class="stat-grid">
                <div class="stat-card">
                    <div class="stat-value">${stats.totalHarvests}</div>
                    <div class="stat-label">Total Harvests</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${stats.totalSales}</div>
                    <div class="stat-label">Total Sales</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${stats.totalGoldEarned}</div>
                    <div class="stat-label">Gold Earned</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${gameState.player.level}</div>
                    <div class="stat-label">Player Level</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${gameState.player.unlockedSpecies.length}</div>
                    <div class="stat-label">Species Unlocked</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${gameState.missions.completed.length}</div>
                    <div class="stat-label">Missions Completed</div>
                </div>
            </div>

            <h3 style="margin: 30px 0 20px 0;">Mushrooms Grown by Species</h3>
            <div style="background: white; padding: 20px; border-radius: 10px;">
                ${Object.keys(stats.mushroomsGrownBySpecies).length > 0
                    ? Object.keys(stats.mushroomsGrownBySpecies).map(speciesId => {
                        const species = MUSHROOM_SPECIES[speciesId];
                        return `
                            <div style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee;">
                                <span>${species.icon} ${species.name}</span>
                                <strong>${stats.mushroomsGrownBySpecies[speciesId]}</strong>
                            </div>
                        `;
                    }).join('')
                    : '<p style="text-align: center; color: #999;">No mushrooms grown yet</p>'}
            </div>
        `;
    }

    // ==================== EVENT LISTENERS ====================

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.switchView(view);
            });
        });

        // Inventory tabs
        document.querySelectorAll('.inventory-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab('inventory', e.target.dataset.tab);
            });
        });

        // Market tabs
        document.querySelectorAll('.market-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab('market', e.target.dataset.tab);
            });
        });

        // Save button
        document.getElementById('save-btn').addEventListener('click', () => {
            this.saveGame();
        });

        // Modal close
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') {
                this.closeModal();
            }
        });
    }

    switchView(viewName) {
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === viewName) {
                btn.classList.add('active');
            }
        });

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`${viewName}-view`).classList.add('active');

        this.currentView = viewName;
        this.updateUI();
    }

    switchTab(section, tabName) {
        // Update tab buttons
        document.querySelectorAll(`.${section}-tabs .tab-btn`).forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // Update tab content
        document.querySelectorAll(`.${section}-tab-content`).forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${section}-${tabName}`).classList.add('active');
    }

    // ==================== NOTIFICATIONS ====================

    showNotification(title, message, type = 'info') {
        const container = document.getElementById('notifications-container');

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        `;

        container.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
}

// ==================== INITIALIZE GAME ====================

let game;

window.addEventListener('DOMContentLoaded', () => {
    game = new MushroomGame();
});

// Auto-save before unload
window.addEventListener('beforeunload', () => {
    if (game) {
        game.saveGame();
    }
});
