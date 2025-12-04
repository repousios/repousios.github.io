// 🍄 Mushroom Growing Simulation - Story & Progression Data
// Complete storyline, characters, and 1-100 level progression

// ==================== CHARACTERS ====================

const CHARACTERS = {
    alex: {
        id: 'alex',
        name: 'Alex',
        role: 'Player',
        age: 12,
        avatar: '👤',
        description: 'A curious 12-year-old who discovers the magic of mushroom growing'
    },
    mom: {
        id: 'mom',
        name: 'Mom',
        role: 'Supporter',
        avatar: '👩',
        description: 'Supportive parent who encourages your mushroom business'
    },
    mrFungi: {
        id: 'mrFungi',
        name: 'Mr. Fungi',
        role: 'Mentor',
        avatar: '🧙',
        description: 'Retired mycologist and mysterious neighbor'
    },
    marcus: {
        id: 'marcus',
        name: 'Marcus',
        role: 'Rival',
        avatar: '😎',
        description: 'School rival turned friendly competitor'
    },
    drMycelium: {
        id: 'drMycelium',
        name: 'Dr. Mycelium',
        role: 'Scientist',
        avatar: '🔬',
        description: 'Eccentric scientist studying rare mushroom species'
    }
};

// ==================== STORY ARCS ====================

const STORY_ARCS = {
    awakening: {
        id: 'awakening',
        name: 'The Awakening',
        subtitle: 'From Curiosity to Passion',
        levels: [1, 20],
        description: 'Alex discovers an old mushroom kit and begins an unexpected journey'
    },
    expansion: {
        id: 'expansion',
        name: 'The Expansion',
        subtitle: 'Growing Pains',
        levels: [21, 40],
        description: 'Operations expand as challenges and competitions arise'
    },
    innovation: {
        id: 'innovation',
        name: 'The Innovation',
        subtitle: 'Breaking New Ground',
        levels: [41, 60],
        description: 'Advanced techniques and rare species unlock new possibilities'
    },
    legacy: {
        id: 'legacy',
        name: 'The Legacy',
        subtitle: 'Beyond the Garage',
        levels: [61, 80],
        description: 'Building something bigger than just mushrooms'
    },
    mastery: {
        id: 'mastery',
        name: 'The Mastery',
        subtitle: 'The Mycelium Network',
        levels: [81, 100],
        description: 'Becoming a legend and leaving your mark on the world'
    }
};

// ==================== DIALOGUES & CUTSCENES ====================

const STORY_DIALOGUES = {
    // Level 1: The Discovery
    level1_intro: {
        id: 'level1_intro',
        trigger: 'level',
        level: 1,
        type: 'cutscene',
        character: 'alex',
        dialogue: [
            {
                speaker: 'alex',
                text: "Whoa... what's this old box doing in the garage?"
            },
            {
                speaker: 'alex',
                text: "A mushroom growing kit? This looks ancient! Let's see if it still works..."
            }
        ],
        memory: {
            title: 'The Discovery',
            description: 'Found an old mushroom growing kit in the garage',
            icon: '📦'
        }
    },

    // Level 2: First Harvest
    level2_harvest: {
        id: 'level2_harvest',
        trigger: 'level',
        level: 2,
        type: 'dialogue',
        character: 'mom',
        dialogue: [
            {
                speaker: 'mom',
                text: "Wow! Your first mushroom! It looks perfect, sweetie!"
            },
            {
                speaker: 'alex',
                text: "I can't believe it actually worked! This is so cool!"
            },
            {
                speaker: 'mom',
                text: "You know, my friend Sarah loves mushrooms. Maybe you could grow some to sell?"
            }
        ],
        memory: {
            title: 'First Harvest',
            description: 'Successfully grew your first mushroom',
            icon: '🍄'
        }
    },

    // Level 3: First Sale
    level3_sale: {
        id: 'level3_sale',
        trigger: 'level',
        level: 3,
        type: 'dialogue',
        character: 'mom',
        dialogue: [
            {
                speaker: 'mom',
                text: "Sarah wants to buy some! She's offering $10 for those mushrooms!"
            },
            {
                speaker: 'alex',
                text: "Really?! My first sale! This could actually be a business!"
            },
            {
                speaker: 'mom',
                text: "Just don't take over the entire garage, okay? Your dad still needs space for his tools."
            }
        ],
        memory: {
            title: 'First Sale',
            description: 'Made your first sale to a customer',
            icon: '💰'
        }
    },

    // Level 5: Mr. Fungi Appears
    level5_mrfungi: {
        id: 'level5_mrfungi',
        trigger: 'level',
        level: 5,
        type: 'cutscene',
        character: 'mrFungi',
        dialogue: [
            {
                speaker: 'mrFungi',
                text: "Hello there, young grower. I couldn't help but notice your mushroom operation."
            },
            {
                speaker: 'alex',
                text: "Who are you? How did you know about my mushrooms?"
            },
            {
                speaker: 'mrFungi',
                text: "I'm Mr. Fungi, your neighbor from two houses down. I used to be a mycologist, you know."
            },
            {
                speaker: 'alex',
                text: "A myco-what?"
            },
            {
                speaker: 'mrFungi',
                text: "A mushroom scientist! I can see you have natural talent. Mind if I offer some guidance?"
            },
            {
                speaker: 'alex',
                text: "That would be amazing! I have so many questions!"
            },
            {
                speaker: 'mrFungi',
                text: "Good. First lesson: temperature and humidity are everything. Let me show you..."
            }
        ],
        memory: {
            title: 'The Mentor',
            description: 'Met Mr. Fungi, your mysterious neighbor and mentor',
            icon: '🧙'
        }
    },

    // Level 10: Shop Opens
    level10_shop: {
        id: 'level10_shop',
        trigger: 'level',
        level: 10,
        type: 'dialogue',
        character: 'mom',
        dialogue: [
            {
                speaker: 'mom',
                text: "I'm impressed with how serious you are about this! Here's $20 to invest in supplies."
            },
            {
                speaker: 'alex',
                text: "Thanks, Mom! I'll spend it wisely, I promise!"
            },
            {
                speaker: 'mom',
                text: "I know you will. Just remember - business isn't just about making money. It's about providing value."
            }
        ]
    },

    // Level 15: Farmer's Market
    level15_market: {
        id: 'level15_market',
        trigger: 'level',
        level: 15,
        type: 'cutscene',
        character: 'alex',
        dialogue: [
            {
                speaker: 'alex',
                text: "The farmer's market invited me to set up a booth! This is incredible!"
            },
            {
                speaker: 'mrFungi',
                text: "Well deserved, young one. Your mushrooms are consistently high quality."
            },
            {
                speaker: 'alex',
                text: "I couldn't have done it without your help, Mr. Fungi."
            },
            {
                speaker: 'mrFungi',
                text: "Nonsense. The talent was always there. I just helped you see it."
            }
        ],
        memory: {
            title: 'Market Day',
            description: 'Earned a booth at the local farmer\'s market',
            icon: '🏪'
        }
    },

    // Level 20: Science Fair & Marcus Introduction
    level20_sciencefair: {
        id: 'level20_sciencefair',
        trigger: 'level',
        level: 20,
        type: 'cutscene',
        character: 'marcus',
        dialogue: [
            {
                speaker: 'alex',
                text: "First place at the science fair! I can't believe it!"
            },
            {
                speaker: 'marcus',
                text: "Nice project, I guess. Mushrooms are pretty boring though."
            },
            {
                speaker: 'alex',
                text: "Boring? Have you even tried growing anything?"
            },
            {
                speaker: 'marcus',
                text: "I could grow better mushrooms than you any day. Bet on it."
            },
            {
                speaker: 'alex',
                text: "You're on! Let's see what you've got."
            },
            {
                speaker: 'marcus',
                text: "Challenge accepted. Don't cry when I beat you."
            }
        ],
        memory: {
            title: 'The Rival',
            description: 'Won the science fair and met your rival Marcus',
            icon: '🏆'
        }
    },

    // Level 21: Competition Begins
    level21_competition: {
        id: 'level21_competition',
        trigger: 'level',
        level: 21,
        type: 'dialogue',
        character: 'marcus',
        dialogue: [
            {
                speaker: 'marcus',
                text: "Alright, competition starts now. Most mushrooms grown in one week wins."
            },
            {
                speaker: 'alex',
                text: "What does the winner get?"
            },
            {
                speaker: 'marcus',
                text: "Bragging rights. And my respect. Which is worth a lot, by the way."
            },
            {
                speaker: 'alex',
                text: "You're on. May the best grower win!"
            }
        ]
    },

    // Level 26: Restaurant Contract
    level26_restaurant: {
        id: 'level26_restaurant',
        trigger: 'level',
        level: 26,
        type: 'cutscene',
        character: 'alex',
        dialogue: [
            {
                speaker: 'alex',
                text: "A restaurant wants a weekly contract? This is huge!"
            },
            {
                speaker: 'mom',
                text: "I'm so proud of you! From a hobby to a real business."
            },
            {
                speaker: 'alex',
                text: "Thanks for believing in me, Mom. Even when the garage got a bit crowded."
            },
            {
                speaker: 'mom',
                text: "Just promise me one thing - don't forget to still be a kid, okay?"
            }
        ],
        memory: {
            title: 'Going Professional',
            description: 'Signed your first restaurant contract',
            icon: '📝'
        }
    },

    // Level 30: Mr. Fungi's Secret
    level30_secret: {
        id: 'level30_secret',
        trigger: 'level',
        level: 30,
        type: 'cutscene',
        character: 'mrFungi',
        dialogue: [
            {
                speaker: 'mrFungi',
                text: "You've come far, Alex. I think it's time I told you about my past."
            },
            {
                speaker: 'alex',
                text: "Your past? I thought you were just a retired scientist."
            },
            {
                speaker: 'mrFungi',
                text: "I was the lead researcher at the National Mycology Institute. Discovered 12 new species."
            },
            {
                speaker: 'alex',
                text: "Wait, seriously? Why did you quit?"
            },
            {
                speaker: 'mrFungi',
                text: "I... lost something precious. My research notes on the rarest species ever found."
            },
            {
                speaker: 'alex',
                text: "What if we could find them together?"
            },
            {
                speaker: 'mrFungi',
                text: "You'd help me? After all these years... perhaps it's not too late."
            }
        ],
        memory: {
            title: 'The Secret',
            description: 'Learned about Mr. Fungi\'s mysterious past',
            icon: '📚'
        }
    },

    // Level 36: Marcus's Offer
    level36_alliance: {
        id: 'level36_alliance',
        trigger: 'level',
        level: 36,
        type: 'dialogue',
        character: 'marcus',
        dialogue: [
            {
                speaker: 'marcus',
                text: "Okay, okay. You win. You're actually really good at this."
            },
            {
                speaker: 'alex',
                text: "Thanks, Marcus. You're not bad yourself."
            },
            {
                speaker: 'marcus',
                text: "What if... we worked together instead of competing?"
            },
            {
                speaker: 'alex',
                text: "Like partners?"
            },
            {
                speaker: 'marcus',
                text: "Yeah. I have some rare spores you might want. Trade?"
            },
            {
                speaker: 'alex',
                text: "Partners it is. Welcome to the team!"
            }
        ],
        memory: {
            title: 'Unlikely Alliance',
            description: 'Marcus became your partner instead of rival',
            icon: '🤝'
        }
    },

    // Level 41: Dr. Mycelium Introduction
    level41_drMycelium: {
        id: 'level41_drMycelium',
        trigger: 'level',
        level: 41,
        type: 'cutscene',
        character: 'drMycelium',
        dialogue: [
            {
                speaker: 'drMycelium',
                text: "So you're the famous young mushroom prodigy everyone's talking about!"
            },
            {
                speaker: 'alex',
                text: "Famous? I just grow mushrooms in my garage..."
            },
            {
                speaker: 'drMycelium',
                text: "Modesty! I like it. I'm Dr. Mycelium. I study... unusual specimens."
            },
            {
                speaker: 'alex',
                text: "What kind of unusual?"
            },
            {
                speaker: 'drMycelium',
                text: "The kind that most people think are myths. But I assure you, they're very real."
            },
            {
                speaker: 'alex',
                text: "Mythical mushrooms? That sounds incredible!"
            },
            {
                speaker: 'drMycelium',
                text: "Care to visit my laboratory? I think you're ready for the next level."
            }
        ],
        memory: {
            title: 'The Scientist',
            description: 'Met the mysterious Dr. Mycelium',
            icon: '🔬'
        }
    },

    // Level 50: Regional Awards
    level50_awards: {
        id: 'level50_awards',
        trigger: 'level',
        level: 50,
        type: 'cutscene',
        character: 'alex',
        dialogue: [
            {
                speaker: 'alex',
                text: "Regional Grower of the Year Award... Me?"
            },
            {
                speaker: 'mrFungi',
                text: "Entirely deserved. You've surpassed even my wildest expectations."
            },
            {
                speaker: 'mom',
                text: "We're so proud of you, sweetie!"
            },
            {
                speaker: 'marcus',
                text: "Speech! Speech!"
            },
            {
                speaker: 'alex',
                text: "Thank you everyone. I couldn't have done this without my mentor, my family, and my friends. This is just the beginning!"
            }
        ],
        memory: {
            title: 'Recognition',
            description: 'Won the Regional Grower of the Year Award',
            icon: '🏅'
        }
    },

    // Level 61: Ancient Texts
    level61_ancientTexts: {
        id: 'level61_ancientTexts',
        trigger: 'level',
        level: 61,
        type: 'cutscene',
        character: 'drMycelium',
        dialogue: [
            {
                speaker: 'drMycelium',
                text: "I've been waiting for the right person to share this with. Look at these ancient texts."
            },
            {
                speaker: 'alex',
                text: "They're beautiful... but I can't read them."
            },
            {
                speaker: 'drMycelium',
                text: "They describe mushrooms that glow, mushrooms that live for centuries, mushrooms with almost magical properties."
            },
            {
                speaker: 'alex',
                text: "Do you think they really exist?"
            },
            {
                speaker: 'drMycelium',
                text: "I know they do. And together, we're going to find them."
            }
        ],
        memory: {
            title: 'Ancient Knowledge',
            description: 'Discovered ancient texts about legendary mushrooms',
            icon: '📜'
        }
    },

    // Level 80: Legendary Status
    level80_legendary: {
        id: 'level80_legendary',
        trigger: 'level',
        level: 80,
        type: 'cutscene',
        character: 'alex',
        dialogue: [
            {
                speaker: 'alex',
                text: "We did it. We actually grew an Aurora Luminosa. The mythical mushroom."
            },
            {
                speaker: 'drMycelium',
                text: "You did it, Alex. I merely guided you. This is your achievement."
            },
            {
                speaker: 'mrFungi',
                text: "In all my years, I never thought I'd see this day. You've made history."
            },
            {
                speaker: 'marcus',
                text: "Dude, you're literally going to be in textbooks now."
            },
            {
                speaker: 'alex',
                text: "It feels surreal. What started as a hobby in my garage became... this."
            }
        ],
        memory: {
            title: 'Legendary Achievement',
            description: 'Successfully grew your first mythical mushroom',
            icon: '✨'
        }
    },

    // Level 100: The Legacy
    level100_ending: {
        id: 'level100_ending',
        trigger: 'level',
        level: 100,
        type: 'cutscene',
        character: 'alex',
        dialogue: [
            {
                speaker: 'alex',
                text: "From a dusty box in the garage to a worldwide phenomenon. What a journey."
            },
            {
                speaker: 'mom',
                text: "You've taught so many people, helped so many communities. I'm beyond proud."
            },
            {
                speaker: 'mrFungi',
                text: "You've become the master, Alex. Far surpassed anything I could teach."
            },
            {
                speaker: 'marcus',
                text: "Thanks for letting me be part of this crazy ride, partner."
            },
            {
                speaker: 'drMycelium',
                text: "The question is: what's next? Your legacy is just beginning."
            },
            {
                speaker: 'alex',
                text: "Whatever comes next, I know one thing - there's still so much to discover. The mycelium network connects us all. Let's see where it leads."
            }
        ],
        memory: {
            title: 'The Legacy',
            description: 'Completed your journey and became a legend',
            icon: '👑'
        }
    }
};

// ==================== ENHANCED LEVEL PROGRESSION (1-100) ====================

const LEVEL_PROGRESSION = [
    // Tutorial Phase (1-5)
    { level: 1, xp: 0, unlock: '2 grow beds', mission: 'Plant first mushroom', story: 'level1_intro' },
    { level: 2, xp: 50, unlock: 'Harvest mechanic', mission: 'Harvest first mushroom', story: 'level2_harvest' },
    { level: 3, xp: 100, unlock: 'Market (sell)', mission: 'Sell 1 mushroom', story: 'level3_sale' },
    { level: 4, xp: 200, unlock: '3rd grow bed', mission: 'Grow 3 at once' },
    { level: 5, xp: 350, unlock: 'Oyster species', mission: 'Grow 1 Oyster', story: 'level5_mrfungi' },

    // Early Game (6-20)
    { level: 6, xp: 500, unlock: 'Temperature system', mission: 'Maintain optimal temp' },
    { level: 7, xp: 700, unlock: 'Time boost (2x)', mission: 'Use time boost' },
    { level: 8, xp: 900, unlock: 'Quality system', mission: 'Get Good quality' },
    { level: 9, xp: 1200, unlock: 'Shiitake species', mission: 'Unlock 3 species' },
    { level: 10, xp: 1600, unlock: 'Shop (buy)', mission: 'Buy 1 item', story: 'level10_shop' },
    { level: 11, xp: 2000, unlock: '4th grow bed', mission: 'Grow 8 mushrooms' },
    { level: 12, xp: 2500, unlock: 'Humidity system', mission: 'Maintain humidity' },
    { level: 13, xp: 3000, unlock: 'Contamination', mission: 'Remove contamination' },
    { level: 14, xp: 3600, unlock: 'Day/night cycle', mission: 'Complete full cycle' },
    { level: 15, xp: 4300, unlock: 'Farmer\'s market', mission: 'Sell 50 mushrooms', story: 'level15_market' },
    { level: 16, xp: 5000, unlock: '5th grow bed + Portobello', mission: 'Harvest 100 total' },
    { level: 17, xp: 5800, unlock: 'Auto-harvest L1', mission: 'Use auto-harvest' },
    { level: 18, xp: 6700, unlock: 'Substrate quality', mission: 'Use Good substrate' },
    { level: 19, xp: 7700, unlock: 'Storage +15 slots', mission: 'Fill inventory' },
    { level: 20, xp: 9000, unlock: 'Research Lab', mission: 'First research', story: 'level20_sciencefair' },

    // Mid Game (21-40)
    { level: 21, xp: 10000, unlock: 'Competitions', mission: 'Beat Marcus', story: 'level21_competition' },
    { level: 22, xp: 11000, unlock: 'Biology research', mission: 'Unlock biology upgrade' },
    { level: 23, xp: 12500, unlock: 'Fast growth I', mission: 'Reduce grow time 10%' },
    { level: 24, xp: 14000, unlock: 'Yield boost I', mission: 'Increase yield 20%' },
    { level: 25, xp: 16000, unlock: '6th grow bed + Enoki', mission: 'Full capacity 1hr' },
    { level: 26, xp: 18000, unlock: 'Restaurant contract', mission: 'Fulfill 3 weeks', story: 'level26_restaurant' },
    { level: 27, xp: 20000, unlock: 'Auto-planter', mission: 'Automate 10 cycles' },
    { level: 28, xp: 22000, unlock: 'Climate control', mission: 'Perfect conditions 2hrs' },
    { level: 29, xp: 25000, unlock: 'Quality detector', mission: '5 perfect quality' },
    { level: 30, xp: 28000, unlock: 'Engineering research', mission: 'Engineering upgrade', story: 'level30_secret' },
    { level: 31, xp: 32000, unlock: 'Mr. Fungi quest', mission: 'Complete quest' },
    { level: 32, xp: 36000, unlock: 'Hybridization', mission: 'Create hybrid' },
    { level: 33, xp: 40000, unlock: 'Mutations', mission: 'Discover mutation' },
    { level: 34, xp: 45000, unlock: '7th & 8th beds + Maitake', mission: 'Manage 8 beds' },
    { level: 35, xp: 50000, unlock: 'Business research', mission: 'Price boost 15%' },
    { level: 36, xp: 56000, unlock: 'Trading system', mission: 'Trade with Marcus', story: 'level36_alliance' },
    { level: 37, xp: 62000, unlock: 'Greenhouse section', mission: 'Transfer to greenhouse' },
    { level: 38, xp: 70000, unlock: 'Rare tier (Chanterelle)', mission: 'Grow rare mushroom' },
    { level: 39, xp: 78000, unlock: 'Prestige preview', mission: 'Learn prestige' },
    { level: 40, xp: 87000, unlock: 'Black market', mission: 'Black market purchase' },

    // Advanced Game (41-60)
    { level: 41, xp: 97000, unlock: 'Genetic lab', mission: 'Meet Dr. Mycelium', story: 'level41_drMycelium' },
    { level: 42, xp: 108000, unlock: 'Gene splicing', mission: 'Splice genes' },
    { level: 43, xp: 120000, unlock: 'Trait selection', mission: 'Select 3 traits' },
    { level: 44, xp: 133000, unlock: 'Breeding program', mission: 'Breed 10 generations' },
    { level: 45, xp: 148000, unlock: 'Genetics research', mission: 'Genetic modification' },
    { level: 46, xp: 164000, unlock: 'Charity missions', mission: 'Donate 200 mushrooms' },
    { level: 47, xp: 182000, unlock: 'Multi-bed tools', mission: '90% efficiency' },
    { level: 48, xp: 201000, unlock: 'Advanced automation', mission: 'Automate 24hrs' },
    { level: 49, xp: 222000, unlock: '9th & 10th beds + Lion\'s Mane', mission: '10-bed operation' },
    { level: 50, xp: 245000, unlock: 'Porcini (expert)', mission: 'Grow Porcini', story: 'level50_awards' },
    { level: 51, xp: 270000, unlock: 'Regional competition', mission: 'Place top 3' },
    { level: 52, xp: 297000, unlock: 'Perfect consistency', mission: '20 perfect in row' },
    { level: 53, xp: 327000, unlock: 'Species mastery', mission: 'Master rank 5' },
    { level: 54, xp: 360000, unlock: 'Advanced hybrids', mission: 'Create 5 hybrids' },
    { level: 55, xp: 396000, unlock: 'Collection tracking', mission: 'Unlock 30 species' },
    { level: 56, xp: 435000, unlock: 'Apprentice system', mission: 'Teach 5 apprentices' },
    { level: 57, xp: 478000, unlock: 'Wholesale ops', mission: '10 wholesale orders' },
    { level: 58, xp: 525000, unlock: 'Brand development', mission: 'Create brand' },
    { level: 59, xp: 577000, unlock: 'Distribution network', mission: '5 restaurants' },
    { level: 60, xp: 634000, unlock: 'Corporate partnership', mission: 'Corporate contract' },

    // Late Game (61-80)
    { level: 61, xp: 697000, unlock: 'Legendary quests', mission: 'Decipher text', story: 'level61_ancientTexts' },
    { level: 62, xp: 767000, unlock: 'Matsutake (legendary)', mission: 'Grow legendary' },
    { level: 63, xp: 843000, unlock: 'Expedition system', mission: 'Send expedition' },
    { level: 64, xp: 927000, unlock: 'Artifact collection', mission: 'Find 5 artifacts' },
    { level: 65, xp: 1020000, unlock: 'Legendary breeding', mission: 'Breed legendary' },
    { level: 66, xp: 1122000, unlock: 'International market', mission: 'Int\'l competition' },
    { level: 67, xp: 1234000, unlock: 'Import/export', mission: 'Trade 3 countries' },
    { level: 68, xp: 1357000, unlock: 'Cultural species', mission: 'Collect 5 cultural' },
    { level: 69, xp: 1493000, unlock: 'Weather system', mission: 'Adapt all weather' },
    { level: 70, xp: 1642000, unlock: 'Mega greenhouse', mission: 'Build ultimate facility' },
    { level: 71, xp: 1806000, unlock: 'Partnership business', mission: 'Marcus joint venture' },
    { level: 72, xp: 1987000, unlock: 'AI assistant', mission: 'AI runs 48hrs' },
    { level: 73, xp: 2186000, unlock: 'Quantum chambers', mission: 'Quantum acceleration' },
    { level: 74, xp: 2405000, unlock: 'Perfection protocol', mission: '100 perfect quality' },
    { level: 75, xp: 2646000, unlock: 'All research maxed', mission: 'Complete all research' },
    { level: 76, xp: 2915000, unlock: 'Mythical clues', mission: 'Gather 10 fragments' },
    { level: 77, xp: 3207000, unlock: 'Hidden locations', mission: 'Find ancient site' },
    { level: 78, xp: 3535000, unlock: 'Ancient puzzles', mission: 'Unlock chamber' },
    { level: 79, xp: 3894000, unlock: 'Ultimate hybrid', mission: 'Combine knowledge' },
    { level: 80, xp: 4287000, unlock: 'Aurora Luminosa (mythical)', mission: 'Grow mythical', story: 'level80_legendary' },

    // End Game (81-100)
    { level: 81, xp: 4710000, unlock: 'Prestige system', mission: 'Prepare prestige' },
    { level: 82, xp: 5181000, unlock: 'Common collection', mission: 'All common species' },
    { level: 83, xp: 5699000, unlock: 'Uncommon collection', mission: 'All uncommon' },
    { level: 84, xp: 6269000, unlock: 'Rare collection', mission: 'All rare' },
    { level: 85, xp: 6896000, unlock: 'Legendary collection', mission: 'All legendary' },
    { level: 86, xp: 7585000, unlock: 'World championship', mission: 'Win worlds' },
    { level: 87, xp: 8344000, unlock: 'Celestial Shiitake', mission: 'Grow celestial' },
    { level: 88, xp: 9178000, unlock: 'Phoenix Morel', mission: 'Grow phoenix' },
    { level: 89, xp: 10096000, unlock: 'Time Truffle', mission: 'Grow time truffle' },
    { level: 90, xp: 11106000, unlock: 'All mythicals', mission: 'All 5 mythicals' },
    { level: 91, xp: 12217000, unlock: 'Path choice', mission: 'Choose legacy path' },
    { level: 92, xp: 13439000, unlock: 'Path progress 1', mission: 'Path mission 1' },
    { level: 93, xp: 14783000, unlock: 'Path progress 2', mission: 'Path mission 2' },
    { level: 94, xp: 16261000, unlock: 'Path progress 3', mission: 'Path mission 3' },
    { level: 95, xp: 17887000, unlock: 'Path completion', mission: 'Complete path' },
    { level: 96, xp: 19676000, unlock: 'Conservation quest', mission: 'Save 50 species' },
    { level: 97, xp: 21643000, unlock: 'Perfect mastery', mission: '1000 perfect quality' },
    { level: 98, xp: 23808000, unlock: 'Complete codex', mission: 'All 200+ species' },
    { level: 99, xp: 26189000, unlock: 'System mastery', mission: 'Master all systems' },
    { level: 100, xp: 28708000, unlock: 'THE LEGACY', mission: 'Final legacy mission', story: 'level100_ending' }
];

// ==================== ACHIEVEMENTS ====================

const ACHIEVEMENTS = {
    // Growing Achievements
    firstHarvest: { id: 'firstHarvest', name: 'First Harvest', description: 'Harvest your first mushroom', icon: '🍄', reward: { gold: 100 } },
    harvest100: { id: 'harvest100', name: 'Centurion', description: 'Harvest 100 mushrooms', icon: '💯', reward: { gold: 500 } },
    harvest1000: { id: 'harvest1000', name: 'Master Harvester', description: 'Harvest 1000 mushrooms', icon: '👨‍🌾', reward: { gold: 2000 } },

    // Quality Achievements
    firstPerfect: { id: 'firstPerfect', name: 'Perfect', description: 'Harvest a perfect quality mushroom', icon: '⭐', reward: { gold: 300 } },
    perfectStreak10: { id: 'perfectStreak10', name: 'Consistency', description: '10 perfect quality in a row', icon: '🎯', reward: { gold: 1000 } },

    // Species Achievements
    species5: { id: 'species5', name: 'Collector', description: 'Unlock 5 species', icon: '📚', reward: { researchPoints: 50 } },
    species20: { id: 'species20', name: 'Mycologist', description: 'Unlock 20 species', icon: '🔬', reward: { researchPoints: 200 } },
    allCommon: { id: 'allCommon', name: 'Common Collection', description: 'Collect all common species', icon: '✅', reward: { gold: 5000 } },

    // Economic Achievements
    firstSale: { id: 'firstSale', name: 'Entrepreneur', description: 'Make your first sale', icon: '💰', reward: { gold: 50 } },
    earn10k: { id: 'earn10k', name: 'Big Earner', description: 'Earn 10,000 gold total', icon: '💵', reward: { gold: 1000 } },
    earn100k: { id: 'earn100k', name: 'Tycoon', description: 'Earn 100,000 gold total', icon: '💎', reward: { gold: 10000 } },

    // Story Achievements
    metMrFungi: { id: 'metMrFungi', name: 'The Mentor', description: 'Meet Mr. Fungi', icon: '🧙', reward: { researchPoints: 100 } },
    metMarcus: { id: 'metMarcus', name: 'The Rival', description: 'Meet Marcus', icon: '😎', reward: { gold: 500 } },
    metDrMycelium: { id: 'metDrMycelium', name: 'The Scientist', description: 'Meet Dr. Mycelium', icon: '🔬', reward: { researchPoints: 500 } },

    // Completion Achievements
    allMissions: { id: 'allMissions', name: 'Mission Master', description: 'Complete all missions', icon: '✔️', reward: { gold: 50000 } },
    allResearch: { id: 'allResearch', name: 'Research Complete', description: 'Unlock all research', icon: '🎓', reward: { researchPoints: 1000 } },
    level100: { id: 'level100', name: 'The Legend', description: 'Reach level 100', icon: '👑', reward: { gold: 100000 } },

    // Special Achievements
    speedRunner: { id: 'speedRunner', name: 'Speed Runner', description: 'Grow a mushroom in under 30 seconds', icon: '⚡', reward: { gold: 1000 } },
    nightOwl: { id: 'nightOwl', name: 'Night Owl', description: 'Harvest mushrooms at midnight', icon: '🦉', reward: { gold: 500 } },
    weathered: { id: 'weathered', name: 'All Weather Pro', description: 'Grow in all weather conditions', icon: '🌦️', reward: { researchPoints: 300 } }
};

// ==================== SEASON SYSTEM ====================

const SEASONS = {
    spring: {
        id: 'spring',
        name: 'Spring',
        icon: '🌸',
        duration: 604800000, // 7 days in ms
        effects: {
            temperature: { min: 15, max: 22 },
            humidity: { min: 65, max: 80 },
            growthBonus: 0.1
        },
        specialSpecies: ['button', 'oyster', 'morel'],
        description: 'Perfect growing conditions for most species'
    },
    summer: {
        id: 'summer',
        name: 'Summer',
        icon: '☀️',
        duration: 604800000,
        effects: {
            temperature: { min: 22, max: 30 },
            humidity: { min: 55, max: 70 },
            growthBonus: -0.05
        },
        specialSpecies: ['chanterelle', 'portobello'],
        description: 'Hot weather challenges mushroom growing'
    },
    autumn: {
        id: 'autumn',
        name: 'Autumn',
        icon: '🍂',
        duration: 604800000,
        effects: {
            temperature: { min: 12, max: 20 },
            humidity: { min: 70, max: 85 },
            growthBonus: 0.15
        },
        specialSpecies: ['porcini', 'matsutake', 'maitake'],
        description: 'Peak mushroom season with ideal conditions'
    },
    winter: {
        id: 'winter',
        name: 'Winter',
        icon: '❄️',
        duration: 604800000,
        effects: {
            temperature: { min: 5, max: 15 },
            humidity: { min: 60, max: 75 },
            growthBonus: -0.1
        },
        specialSpecies: ['enoki', 'shiitake'],
        description: 'Cold weather favors specific species'
    }
};

// Export all data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CHARACTERS,
        STORY_ARCS,
        STORY_DIALOGUES,
        LEVEL_PROGRESSION,
        ACHIEVEMENTS,
        SEASONS
    };
}
