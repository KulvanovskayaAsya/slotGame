import { config } from '../config'
import Reel from '../entities/reel'

export default class SlotMachine extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        
        this.scene = scene;
        this.machineLeftOffset = x;
        this.machineTopOffset = y;
        this.reels = [];

        this.generateSlotMachine();
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
        graphics = this.scene.add.graphics();

        graphics.lineStyle(lineWidth, borderColor)
            .strokeRect(x, y, width, height);
    }

    startSpin() {
        let repeat = 3;

        this.reels.forEach((reel, reelIndex) => {
            reel.spinReel(reel.list, repeat, reelIndex);
            repeat += 4;
        });
    }

    /*
    if(this.isPayLineWin(payLine) == true) 
        this.showPaylineWin(payline)
    */

    checkSpinResult() {
        config.payLines.forEach((payLine) => {
            this.isWinCombination(this.getPayLineSymbols(payLine), payLine)
        })
    }

    getPayLineSymbols(payLine) {
        let payLineSymbols = [];

        for(let i = 0; i < config.machine.reelsCount; i++) {
            payLineSymbols.push(this.reels[i].list[payLine[i]].name)
        }

        return payLineSymbols;
    }

    isWinCombination(combination, payLine) {
        let combinationSymbol = combination[0];
        let winCombination = [combination[0]];

        for(let i = 1; i < combination.length; i++) {
            if(combinationSymbol == "wild") 
                combinationSymbol = combination[i]

            if(combination[i] == combinationSymbol || combination[i] == "wild")
                winCombination.push(combination[i])
            else
                break
        }

        if(winCombination.length >= 3) {
            let lineWinCombination = [];
            let line = [];

            for (let i = 0; i < config.machine.reelsCount; i++) {
                if (i < winCombination.length) {
                    lineWinCombination.push(this.reels[i].list[payLine[i]]);
                }
                line.push({ x: this.reels[i].x, y: this.reels[i].list[payLine[i]].y });
            }
            this.winView(lineWinCombination)
            this.drawLine(line, 7, 0xffffff)
        }
    }

    drawLine(linePoints, lineWidth, lineColor) {
        this.lines = this.scene.add.graphics({
            lineStyle: { width: lineWidth, color: lineColor }
        });

        this.lines.moveTo(linePoints[0].x, linePoints[0].y);

        for (var i = 1; i < linePoints.length; i++) {
            this.lines.lineTo(linePoints[i].x, linePoints[i].y);
        }

        this.lines.strokePath();
    }

    winView(winCombination) {
        winCombination.forEach((slot) => {
            this.scene.tweens.add({
                targets: slot,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 300,
                repeat: 4,
                repeatDelay: 100,
                yoyo: true,
                onComplete: () => this.lines.clear()
            })
        })
    }
}