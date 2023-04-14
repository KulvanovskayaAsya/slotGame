import { config } from '../config'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    
        this.reels = [];
        this.balance = 100;
        this.winnings = 0;
        this.reelsSpinning = false;
    }

    init() {
        this.sceneWidth = this.sys.canvas.width;
        this.sceneHeight = this.sys.canvas.height;

        this.machineLeftOffset = this.sceneWidth / 2 - config.machine.width / 2;
        this.machineTopOffset = this.sceneHeight / 2 - config.machine.height / 2 - 50;

        this.slotWidth = config.machine.width / config.machine.reelsCount;
        this.slotHeight = config.machine.height / config.machine.slotsPerReel;
    }
    
    create() {
        this.background = this.add.image(0, 0, 'bg').setOrigin(0);
        this.background.displayWidth = this.sceneWidth;
        this.background.displayHeight = this.sceneHeight;

        this.spinButton = this.add.text(this.sceneWidth / 2 - 40, this.sceneHeight - 100, "Spin", { fontSize: 32 });
        this.spinButton.setOrigin(0);
      
        this.spinButton.setInteractive();
        this.spinButton.on("pointerdown", () => {
            this.startSpin();
        });
      
        this.balanceText = this.add.text(20, 20, "Balance: " + this.balance);
        this.winningText = this.add.text(20, 50, "Winning Lines: " + this.winnings);

        this.generateSlotMachine();
    }

    generateSlot(min, max) {
        return 'symbols_' + Phaser.Math.Between(min, max) + '.png';
    }

    generateSlotMachine() {
        let reelLeftOffset = 0,
            thickness = 4,
            color = 0xffeb87,
            alpha = 1;


        /*Контур машины*/
        this.graphics = this.add.graphics();
        
        this.graphics.lineStyle(thickness, color, alpha);

        this.graphics.strokeRect(
            this.machineLeftOffset,
            this.machineTopOffset, 
            config.machine.width,
            config.machine.height
        );

        for (let x = 0; x < config.machine.reelsCount; x++) {
            if (x != 0) {
                this.graphics.strokeRect(
                    this.machineLeftOffset + reelLeftOffset,
                    this.machineTopOffset, 
                    this.slotWidth,
                    this.slotHeight * 3
                );
            }

            let reel = this.add.container(this.machineLeftOffset + this.slotWidth / 2 + reelLeftOffset, this.machineTopOffset - this.slotHeight / 2);
            this.fillReel(reel);
            this.reels.push(reel);
            this.createMask(reel);

            reelLeftOffset += this.slotWidth;
        }
    }

    fillReel(reel) {
        let slotTopOffest = 0;

        for (let y = 0; y <= config.machine.slotsPerReel; y++) {
            reel.add(this.add.sprite(0, slotTopOffest, 'symbols', this.generateSlot(0, 9)));
            slotTopOffest += this.slotHeight;
        }
    }

    createMask(el) {
        this.graphics = this.add.graphics();
        const shape = this.make.graphics();
        shape.fillRect(this.machineLeftOffset, this.machineTopOffset, config.machine.width, config.machine.height);
        const mask = shape.createGeometryMask();
        el.setMask(mask);
    }
    
    startSpin() {
        let repeat = 8;
        this.reels.forEach((reel) => {
            this.spinReel(reel, repeat);
            repeat += 4;
        });
    }

    spinReel(reel, repeat) {
        (reel.list).forEach((slot) => {
            let spin = this.tweens.add({
                targets: slot,
                y: slot.y + this.slotHeight,
                duration: 100,
                repeat: repeat,
                ease: 'Cubic.easeInOut',
                onRepeat: () => {
                    slot.setFrame(this.generateSlot(0, 9));
                    slot.y = 0;
                },
                onComplete: () => {
                    if (slot.y == this.slotHeight * 4) {
                        slot.y = 0;
                        slot.setFrame(this.generateSlot(0, 9));
                    }
                }
            });
        });

        // let rotating = this.time.addEvent({
        //     delay: 10,
        //     callback: this.spin,
        //     callbackScope: this,
        //     loop: true
        // });

        // setTimeout(function() {
        //     rotating.remove();
        // }, 1500);
    }

    spin() {
        this.reels.forEach((reel) => {
            reel.list.forEach((slot) => this.move(slot))
        }) 
    }

    move(slot){
        slot.y += this.slotHeight / 4;

        if(slot.y == this.slotHeight * 4){
            slot.y = 0;
            slot.setFrame(this.generateSlot(0, 9));
        }

        if (slot.y == this.slotHeight * 8) {
            this.rotating.remove();
        }
    }
}