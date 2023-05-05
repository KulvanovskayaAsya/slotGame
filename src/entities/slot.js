export default class Slot extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.setSlotFrame(this);
    }

    setSlotFrame(slot) {
        slot.setFrame(this.generateRandomFrame(0, 9));
        this.name = this.frame.customData.name;
    }

    generateRandomFrame(min, max) {
        return 'symbols_' + Phaser.Math.Between(min, max) + '.png';
    }
}