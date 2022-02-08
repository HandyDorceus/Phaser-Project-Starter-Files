import Phaser from 'phaser';
import WebFont from 'webfontloader';
import range from 'inclusive-range';
import { colors } from '../constants';
import { IMAGES } from '../assets';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });

    this.coins;
  }

  preload() {
    this.load.image(IMAGES.MENUBACKGROUND['KEY'], IMAGES.MENUBACKGROUND['FILE']);
    //this.load.image(IMAGES.ENEMY['KEY'], IMAGES.ENEMY['FILE']);
    this.load.spritesheet(IMAGES.COIN['KEY'], IMAGES.COIN['FILE'],
                                {   frameWidth: 40, frameHeight: 40});
  }

  create() {
    this.createEnemies();

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

    this.anims.create({
      key: 'spin1',
      frames: [
          { key: 'coin', frame: 0 },
          { key: 'coin', frame: 1 },
          { key: 'coin', frame: 2 },
          { key: 'coin', frame: 3 },
          { key: 'coin', frame: 4 },
          { key: 'coin', frame: 5 },
          { key: 'coin', frame: 6 }
      ],
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
    key: 'spin2',
    frames: [
        { key: 'coin', frame: 2 },
        { key: 'coin', frame: 3 },
        { key: 'coin', frame: 4 },
        { key: 'coin', frame: 5 },
        { key: 'coin', frame: 6 },
        { key: 'coin', frame: 0 },
        { key: 'coin', frame: 1 }
    ],
    frameRate: 10,
    repeat: -1
});

this.anims.create({
  key: 'spin3',
  frames: [
      { key: 'coin', frame: 4 },
      { key: 'coin', frame: 5 },
      { key: 'coin', frame: 6 },
      { key: 'coin', frame: 0 },
      { key: 'coin', frame: 1 },
      { key: 'coin', frame: 2 },
      { key: 'coin', frame: 3 }
  ],
  frameRate: 10,
  repeat: -1
});
}

  update() {
    this.coins.children.iterate((child) => {
      const body = child.body;

      if (body.x > 0 && body.x <= 320){
        child.anims.play('spin2', true);
      }
      if (body.x > 320 && body.x <= 640){
        child.anims.play('spin1', true);
      }
      if (body.x > 640 && body.x < 960){
        child.anims.play('spin3', true);
      }


      if (body.y > this.game.config.height) {
        child.body.y = child.height * -1;
      }
    });
    console.log(this.coins);

  }

  generateEnemyPositions() {
    const spacing = 240;
    const ranges = {
      x: Array.from(range(0, this.game.config.width - spacing, spacing)),
      y: Array.from(range(0, this.game.config.height - spacing, spacing)),
    };

    const rangeArray = ranges.x
      .reduce((accX, x) => [...accX, ...ranges.y.reduce((accY, y) => [...accY, { x, y }], [])], [])
      .map((range) => ({
        x: range.x + Phaser.Math.Between(0, spacing),
        y: range.y + Phaser.Math.Between(0, spacing),
      }));

    return rangeArray;
  }

  createEnemies() {
    this.coins = this.physics.add.group();

    const positions = this.generateEnemyPositions();
    positions.map(({ x, y }) => this.createEnemy(x, y));

    this.coins.setVelocityY(20);
  }

  createEnemy(x, y) {
    //this.enemies.create(x, y, 'coin').setTint(colors.redNumber);
    this.coins.create(x, y, 'coin')
    // this.coins = this.physics.add.sprite(x, y, 'coin');
  }
}
