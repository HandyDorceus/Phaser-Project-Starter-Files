import Phaser from 'phaser';
import WebFont from 'webfontloader';
import { colors } from '../constants';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    this.load.image(
      'menu-scene-text',
      new URL('../../assets/menu-scene-text.png', import.meta.url).href
    );
  }

  create() {
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'menu-scene-text');

    WebFont.load({
      custom: {
        families: ['Space Mono'],
      },
      active: () => {
        this.add
          .text(
            this.game.config.width / 2,
            this.game.config.height * (2 / 3),
            'You can change me in MenuScene.js',
            {
              fontFamily: 'Space Mono',
              fontSize: '32px',
              fontStyle: 'bold',
              fill: colors.white,
              align: 'center',
            }
          )
          .setOrigin(0.5);
      },
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
}
