import { config } from '../config';
import Slot from './slot';

export default class Reel extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;

        this.fillReel();
        this.createMask(x - config.slot.width / 2, y + config.slot.height / 2, config.slot.width, config.slot.height * 3);

        scene.add.existing(this);
    }

    fillReel() {
        let slotTopOffest = 0;

        for (let y = 0; y <= config.machine.slotsPerReel; y++) {
            this.add(
                new Slot(
                    this.scene, 
                    0, 
                    slotTopOffest, 
                    'symbols'
                )
            );
            
            slotTopOffest += config.slot.height;
        }
    }

    createMask(x, y, width, height) {
        const shape = this.scene.make.graphics();
        shape.fillRect(x, y, width, height);
        const mask = shape.createGeometryMask();
        this.setMask(mask);
    }

    spinReel(repeat, reelIndex) {
        this.list.forEach((slot, slotIndex) => {
            const isLastSlot = reelIndex === config.machine.reelsCount - 1 && slotIndex === config.machine.slotsPerReel - 1;
            
            this.scene.tweens.add({
                targets: slot,
                y: {
                    getStart: (target) => { return (target.y == config.slot.height * 4) ? 0 : target.y; },
                    getEnd: (target) => { return (target.y == config.slot.height * 4) ? config.slot.height : target.y + config.slot.height; }
                },
                duration: config.machine.spinSpeed,
                ease: 'Cubic.easeInOut',
                loop: repeat,
                onLoop: () => this.moveSlotToTop(slot),
                onComplete: () => {
                    this.moveSlotToTop(slot)

                    if(isLastSlot)
                        this.scene.spin.finishSpin();
                }
            });
        });
    }

    moveSlotToTop(slot) {
        if (slot.y == config.slot.height * 4) {
            slot.setSlotFrame(slot);
            slot.y = 0;
        }
    }
}