import { config } from '../config';
import SlotMachine from '../entities/machine';
import Spin from '../entities/spin';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    
    create() {
        this.background = this.add.image(0, 0, 'bg')
            .setOrigin(0)
            .setDisplaySize(config.game.width, config.game.height);

        this.machine = new SlotMachine(this, config.machine.leftOffset, config.machine.topOffset);
        this.spin = new Spin(this);

        this.spinButton = this.add.text(config.game.width / 2 - 40, config.game.height - 100, "Spin", { fontSize: 32 })
            .setOrigin(0)
            .setInteractive()
            .on("pointerdown", () => this.spin.startSpin());

        this.balanceText = this.add.text(20, 20, `Balance: ${config.game.balance}`);
    }

    toggleSpinButton(enabled) {
        this.spinButton.input.enabled = enabled;
    }

    changeBalance(value) {
        config.game.balance += value;
        this.balanceText.setText(`Balance: ${config.game.balance}`)
    }
}