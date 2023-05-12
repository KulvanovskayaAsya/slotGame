const config = {
    game: {
        height: 800,
        width: 1200,
        balance: 1000,
    },
    machine: {
        width: 800,
        height: 500,
        leftOffset: 0,
        topOffset: 0,
        borderColor: 0xffeb87,
        reelsCount: 5,
        slotsPerReel: 3,
        spinSpeed: 70,
    },
    payLine: {
        width: 7,
        color: 0xffef9e,
    },
    reel: {
        slotsPerReel: 3
    },
    slot: {
        width: 0,
        height: 0,
    },
    payLines: [
        [1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2],
        [3, 3, 3, 3, 3],
        [1, 2, 2, 2, 1],
        [3, 2, 2, 2, 3],
        [1, 2, 3, 2, 1],
        [3, 2, 1, 2, 3],
        [1, 1, 2, 1, 1],
        [3, 3, 2, 3, 3],
        [2, 1, 1, 1, 2],
        [2, 3, 3, 3, 2],
    ],
    payValues: {
        "wild": [100, 500, 1000],
        "bar": [25, 50, 250],
        "seven": [25, 50, 250],
        "watermelon": [10, 20, 100],
        "lemon": [10, 20, 100],
        "bell": [20, 40, 200],
        "pear": [10, 20, 100],
        "orange": [10, 20, 100],
        "strawberry": [10, 20, 100],
        "bananas": [10, 20, 100]
    }
}

config.slot.width = config.machine.width / config.machine.reelsCount;
config.slot.height = config.machine.height / config.machine.slotsPerReel;

config.machine.leftOffset = config.game.width / 2 - config.machine.width / 2;
config.machine.topOffset = config.game.height / 2 - config.machine.height / 2 - 50;

export { config };