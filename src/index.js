import Phaser from 'phaser';
import Preloader from './scenes/preloader';
import Game from './scenes/game';
import { config } from './config';

let game = new Phaser.Game({
    type: Phaser.AUTO,
    width: config.game.width,
    height: config.game.height,
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
});