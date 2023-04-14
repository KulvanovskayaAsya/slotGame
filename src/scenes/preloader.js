export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        let sceneWidth = this.sys.canvas.width;
        let sceneHeight = this.sys.canvas.height;

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(sceneWidth/2 - 160, sceneHeight/2 - 25, 320, 50);

        var loadingText = this.make.text({
            x: sceneWidth / 2,
            y: sceneHeight / 2 - 50,
            text: 'Загрузка...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: sceneWidth / 2,
            y: sceneHeight / 2,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(sceneWidth/2 - 160 + 10, sceneHeight/2 - 25 + 10, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
         
        this.load.on('fileprogress', function (file) {});
         
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        this.load.path = 'src/assets/';
        this.load.image('bg', 'background.jpg');
        this.load.atlas('symbols', 'symbols/symbols.png', 'symbols/symbols.json');
        this.load.atlas('symbols_blur', 'symbols/symbols_blur.png', 'symbols/symbols_blur.json');
    }

    create() {
        this.scene.start('Game');
    }

    update() {

    }
}