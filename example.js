
// Создание игровых объектов
function create() {
    // Создание колес
    const wheel1 = this.add.sprite(200, 300, 'wheel1');
    const wheel2 = this.add.sprite(400, 300, 'wheel2');
    const wheel3 = this.add.sprite(600, 300, 'wheel3');

    // Создание анимации вращения колеса
    const frameNames = this.anims.generateFrameNames('wheel1', {
        start: 1,
        end: 3,
    });
    this.anims.create({
        key: 'spin',
        frames: frameNames,
        frameRate: 10,
        repeat: 5, // количество повторений анимации
        yoyo: true, // анимация возвращается к первому кадру после завершения
    });

    // Запуск анимации вращения колеса
    wheel1.anims.play('spin');
    this.time.addEvent({
        delay: 1000, // задержка между каждой анимацией
        callback: function () {
            wheel2.anims.play('spin');
        },
    });

    this.time.addEvent({
        delay: 2000, // задержка между каждой анимацией
        callback: function () {
            wheel3.anims.play('spin');
        },
    });

    // Обрабатывание завершения анимации
    wheel3.anims.currentAnim.setCallback('complete', function () {
        const result = [
            wheel1.frame.name,
            wheel2.frame.name,
            wheel3.frame.name,
        ];
        console.log(result);
    });
}


// // Загрузка ресурсов
// function preload() {
//     this.load.setBaseURL('./');
//     this.load.image('wheel1', 'assets/wheel1.png');
//     this.load.image('wheel2', 'assets/wheel2.png');
//     this.load.image('wheel3', 'assets/wheel3.png');
// }

// // Создание игровых объектов
// function create() {
//     // Создание колес
//     const wheel1 = this.add.sprite(200, 300, 'wheel1');
//     const wheel2 = this.add.sprite(400, 300, 'wheel2');
//     const wheel3 = this.add.sprite(600, 300, 'wheel3');

//     // Создание анимации вращения колеса
//     const frameNames = this.anims.generateFrameNames('wheel1', {
//         start: 1,
//         end: 3,
//     });
//     this.anims.create({
//         key: 'spin',
//         frames: frameNames,
//         frameRate: 10,
//         repeat: 5, // количество повторений анимации
//         yoyo: true, // анимация возвращается к первому кадру после завершения
//     });

//     // Запуск анимации вращения колеса
//     wheel1.anims.play('spin');
//     this.time.addEvent({
//         delay: 1000, // задержка между каждой анимацией
//         callback: function () {
//             wheel2.anims.play('spin');
//         },
//     });
//     this.time.addEvent({
//         delay: 2000, // задержка между каждой анимацией
//         callback: function () {
//             wheel3.anims.play('spin');
//         },
//     });

//     // Обрабатывание завершения анимации
//     wheel3.anims.currentAnim.setCallback('complete', function () {
//         const result = [
//             wheel1.frame.name,
//             wheel2.frame.name,
//             wheel3.frame.name,
//         ];
//         console.log(result);
//     });
// }

// function update() {
//     // Код обновления игры
// }

this.columnTween1 = this.scene.tweens.add({
    targets: this.reels[0],
    props: {
        y: {
            value: "+=" + 150,
            duration: 200
        }
    },
    repeat: 5,
    onRepeat: function () {
        const randomNumber = Phaser.Math.RND.between(0, 9);
        this.updateTo('y', this.targets[0].y + Options.symbolHeight, true);
        this.targets[0].first.y = this.targets[0].last.y - Options.symbolHeight;
        const symbol = this.targets[0].first;
        symbol.setVisible(true).setTexture('symbols_blur', 'symbols_' + randomNumber + '.png');
        this.targets[0].moveTo(symbol, 4);
    },
    // onComplete: function () {
    //     this.targets[0].scene.tweens.add({
    //         targets: this.targets[0],
    //         props: {
    //             y: {
    //                 value: "-=" + Options.symbolHeight,
    //                 duration: Options.duration * 2
    //             }
    //         },
    //         repeat: 1,
    //         onRepeat: function () {
    //             this.updateTo('y', this.targets[0].y - Options.symbolHeight, true);
    //         },
    //         onComplete: function () {
    //             this.targets[0].last.y = this.targets[0].first.y +
    //                 Options.symbolHeight;
    //             const symbol = this.targets[0].last;
    //             this.targets[0].moveTo(symbol, 0);
    //             //set texture symbols
    //             for (let i = 0; i < 5; i++) {
    //                 const symbolsName = this.targets[0].list[i].frame.name;
    //                 this.targets[0].list[i].setTexture('symbols', symbolsName);
    //             }
    //             //play audio
    //             if (this.targets[0].scene.audioMusicName === 'btn_music.png') {
    //                 this.targets[0].scene.audioObject.audioReelStop.play();
    //             }
    //         }
    //     });
    // }
}, this);


    // spinReels(results) {
    //     const spinDuration = 2000;
    //     const pauseDuration = 500;
    //     const positions = [0, -100, -200];
    
    //     for (let i = 0; i < this.reels.length; i++) {
    //         const reel = this.reels[i];
    //         const resultIndex = results[i] - 1; 
    
    //         const currentY = reel.y % this.reelHeight;
    //         const offset = currentY + (positions[Math.floor(Math.random() * positions.length)]);
    
    //         this.tweens.add({
    //             targets: reel,
    //             y: reel.y + offset + this.reelHeight,
    //             duration: spinDuration,
    //             ease: 'Cubic.easeOut',
    //             onComplete: () => {
    //                 const resultIndex = results[i] - 1; // Get the corresponding result for this reel
    //                 const resultY = -reel.symbols[resultIndex].y + this.reelHeight;
    //                 const resultOffset = resultY - currentY % this.reelHeight; 
    
    //                 this.tweens.add({
    //                     targets: reel,
    //                     y: reel.y + resultOffset,
    //                     duration: spinDuration/2,
    //                     ease: 'Cubic.easeOut',
    //                     onComplete: () => {
    //                         reel.y -= currentY;
    //                         reel.y += resultOffset;
    //                     },
    //                     delay: pauseDuration
    //                 });
    //             }
    //         });
    //     }
    // }