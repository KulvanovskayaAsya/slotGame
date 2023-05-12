import { config } from '../config';

export default class PayLine {
    constructor(scene) {
        this.scene = scene;
        this.reels = this.scene.machine.reels;
        
        scene.add.existing(this);
    }

    getPayLinePoints(payLine) {
        payLine.forEach((slotIndex, reelIndex) => {
            payLinePoints.push({x: this.reels[reelIndex].x, y: this.reels[reelIndex].y + config.slot.height * slotIndex});
        });

        
    }

    drawLine(linePoints, lineWidth, lineColor) {
        let line = this.scene.add.graphics({
            lineStyle: { width: lineWidth, color: lineColor }
        });

        line.moveTo(linePoints[0].x, linePoints[0].y);

        for (var i = 1; i < linePoints.length; i++) {
            line.lineTo(linePoints[i].x, linePoints[i].y);
        }

        line.strokePath();

        this.lines.push(line)
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