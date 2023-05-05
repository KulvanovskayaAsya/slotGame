const config = {
    game: {
        height: 800,
        width: 1200,
        balance: 100,
    },
    machine: {
        width: 800,
        height: 500,
        borderColor: 0xffeb87,
        reelsCount: 5,
        slotsPerReel: 3,
        spinSpeed: 70,
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
    ],
}

config.slot.width = config.machine.width / config.machine.reelsCount;
config.slot.height = config.machine.height / config.machine.slotsPerReel;

export { config };