import { config } from '../config';
import Reel from './reel';

export default class SlotMachine extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        
        this.scene = scene;
        this.machineLeftOffset = x;
        this.machineTopOffset = y;
        this.reels = [];
        
        this.machineBorders = this.scene.add.graphics();
        
        this.generateSlotMachine();

        scene.add.existing(this);
    }

    generateSlotMachine() {
        let reelLeftOffset = 0;

        for (let x = 0; x < config.machine.reelsCount; x++) {
            this.reels.push(
                new Reel(
                    this.scene,
                    this.machineLeftOffset + config.slot.width / 2 + reelLeftOffset,
                    this.machineTopOffset - config.slot.height / 2
                ) 
            );

            this.createMachineBorders(
                this.machineBorders, 
                4, 
                config.machine.borderColor, 
                this.machineLeftOffset + reelLeftOffset, 
                this.machineTopOffset, 
                config.slot.width, 
                config.machine.height
            );

            reelLeftOffset += config.slot.width;
        }
    }

    createMachineBorders(graphics, lineWidth, borderColor, x, y, width, height) {
        graphics.lineStyle(lineWidth, borderColor)
            .strokeRect(x, y, width, height);
    }
}