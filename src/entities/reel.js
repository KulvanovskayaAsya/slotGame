import { config } from '../config'
import Slot from '../entities/slot'

export default class Reel extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;

        this.fillReel(this);
        this.createMask(this, x - config.slot.width / 2, y + config.slot.height / 2, config.slot.width, config.slot.height * 3);
        scene.add.existing(this);
    }

    createMask(reel, x, y, width, height) {
        const shape = this.scene.make.graphics();
        shape.fillRect(x, y, width, height);
        const mask = shape.createGeometryMask();
        reel.setMask(mask);
    }

    fillReel(reel) {
        let slotTopOffest = 0;

        for (let y = 0; y <= config.machine.slotsPerReel; y++) {
            reel.add(new Slot(this.scene, 0, slotTopOffest, 'symbols'));
            
            slotTopOffest += config.slot.height;
        }
    }

    spinReel(reel, repeat, reelIndex) {
        reel.forEach((slot, slotIndex) => {
            let slotHeight = config.slot.height;

            let spin = this.scene.tweens.add({
                targets: slot,
                y: {
                    getStart: function (target) {
                        if (target.y == slotHeight * 4)
                            return 0;
                        else
                            return target.y; 
                    },
                    getEnd: function (target) {
                        if (target.y == slotHeight * 4)
                            return slotHeight;
                        else
                            return target.y + slotHeight; 
                    }
                },
                duration: config.machine.spinSpeed,
                ease: 'Cubic.easeInOut',
                loop: repeat,
                onStart: () => {
                    this.scene.spinButton.input.enabled = false;
                },
                onLoop: () => this.moveSlotToTop(slot),
                onComplete: () => {
                    this.moveSlotToTop(slot)

                    if(slotIndex == 1) {
                        switch (reelIndex) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                                slot.generateRandomFrame(2, 2)
                        }
                    }

                    if(reelIndex == config.machine.reelsCount - 1 && slotIndex == config.machine.slotsPerReel) {
                        this.scene.spinButton.input.enabled = true;
                        // this.scene.machine.winView(config.payLines[3]);
                        this.scene.machine.checkSpinResult();
                    }
                }
            });
        });
    }

    moveSlotToTop(slot) {
        if (slot.y == config.slot.height * 4) {
            slot.setSlotFrame(slot)
            slot.y = 0;
        }
    }
}