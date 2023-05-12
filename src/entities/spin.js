import { config } from '../config';

export default class Spin {
    constructor(scene) {
        this.scene = scene;
        this.reels = this.scene.machine.reels;
        this.lines = [];
        
        scene.add.existing(this);
    }

    startSpin() {
        this.scene.toggleSpinButton(false);
        this.scene.changeBalance(-10);

        let repeat = 3;

        this.reels.forEach((reel, reelIndex) => {
            reel.spinReel(repeat, reelIndex);
            repeat += 4;
        });
    }

    finishSpin() {
        this.checkSpinResult();
    }

    checkSpinResult() {
        let isWin = false;

        config.payLines.forEach((payLine) => {
            let payLineSlots = this.getPayLineSlots(payLine);
            let payLineWinCombination = this.getPayLineWinCombination(payLineSlots);

            if (payLineWinCombination.length != 0) { //if win
                console.log(`Линия ${payLine} платит с комбинацией ${payLineWinCombination.map((symbol) => symbol.name)}!`);
                isWin = true

                let payLinePoints = [];

                payLine.forEach((slotIndex, reelIndex) => {
                    payLinePoints.push({x: this.reels[reelIndex].x, y: this.reels[reelIndex].y + config.slot.height * slotIndex});
                })

                this.drawLine(payLinePoints, config.payLine.width, config.payLine.color);
                this.animateWinCombination(payLineWinCombination)
            }
        });

        if(!isWin)
            this.scene.toggleSpinButton(true);
    }

    getPayLineSlots(payLine) {
        return payLine.map((symbolIndex, reelIndex) => this.reels[reelIndex].list[symbolIndex]);
    }

    getPayLineWinCombination(slots) {
        let combinationSymbol = slots[0].name;
        let winCombination = [slots[0]];

        for(let slotIndex = 1; slotIndex < slots.length; slotIndex++) {
            if(combinationSymbol == "wild") 
                combinationSymbol = slots[slotIndex].name;

            if(slots[slotIndex].name == combinationSymbol || slots[slotIndex].name == "wild")
                winCombination.push(slots[slotIndex]);
            else
                break;
        }

        if(winCombination.length >= 3)
            this.calcPayLineWin(combinationSymbol, winCombination);

        return winCombination.length >= 3 ? winCombination : [];
    }

    calcPayLineWin(combinationSymbol, winCombination) {
        console.log(combinationSymbol, config.payValues[combinationSymbol], config.payValues[combinationSymbol][winCombination.length - 3]);
        this.scene.changeBalance(config.payValues[combinationSymbol][winCombination.length - 3]);
    }

    animateWinCombination(winCombination) {
        winCombination.forEach((slot) => {
            this.scene.tweens.add({
                targets: slot,
                scaleX: 1.3,
                scaleY: 1.3,
                duration: 300,
                repeat: 2,
                repeatDelay: 100,
                yoyo: true,
                onComplete: () => {
                    this.lines.forEach((line) => line.destroy());
                    this.scene.toggleSpinButton(true);
                }
            })
        })
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
}