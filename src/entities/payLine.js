import { config } from '../config'

export default class PayLine {
    constructor(scene, payLinePoints) {
        super(scene, options);
        
        scene.add.existing(this);
    }

    drawAllLines() {
        config.payLines.forEach((payLine) => {
            let line = [];
    
            payLine.forEach((slot, reelIndex) => {
                let x, y;
    
                x = this.reels[reelIndex].x;
                y = this.machineTopOffset + config.slot.height * (slot - 1) + config.slot.height / 2;
    
                line.push({ x: x, y: y })
            });
    
            this.drawLine(line, 6, config.machine.borderColor);
        });
    }
}