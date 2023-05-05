import { config } from '../config'
import SlotMachine from '../entities/machine'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.machineLeftOffset = config.game.width / 2 - config.machine.width / 2;
        this.machineTopOffset = config.game.height / 2 - config.machine.height / 2 - 50;
    }
    
    create() {
        // Set background image
        this.background = this.add.image(0, 0, 'bg')
            .setOrigin(0)
            .setDisplaySize(config.game.width, config.game.height);

        // Create slot machine object
        this.machine = new SlotMachine(this, this.machineLeftOffset, this.machineTopOffset);

        // Create spin button
        this.spinButton = this.add.text(config.game.width / 2 - 40, config.game.height - 100, "Spin", { fontSize: 32 })
            .setOrigin(0)
            .setInteractive()
            .on("pointerdown", () => this.machine.startSpin());

        // Display player balance
        this.balanceText = this.add.text(20, 20, `Balance: ${config.game.balance}`);
    }

    toggleSpinButton(enabled) {
        this.spinButton.input.enabled = enabled;
    }
}