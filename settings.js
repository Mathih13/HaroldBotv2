let settings = {
    avgTypingSpeed: {
        name: 'Average Typing Speed',
        val: 0.1 * 1000,
        desc: 'The calculation for average typing speed'
    },
    typingSpeedThreshold: {
        name: 'Typing Speed Threshold',
        val: 1500,
        desc: 'The maximum time that can be spent typing'
    },
    easterEggChance: {
        name: 'Easter Egg Chance (%)',
        val: 3,
        desc: 'The percentage chance for easter egg responses to certain words or phrases'
    },
};

module.exports = settings;