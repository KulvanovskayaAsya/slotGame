import Phaser from 'phaser';
import Preloader from './scenes/preloader';
import Game from './scenes/game';

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    audio: {
        disableWebAudio: true
    },
    physics: {
        default : 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    fps: {
        min: 30,
        target: 60
    },
    scene: [ 
        Preloader,
        Game
    ]
};

let game = new Phaser.Game(config);