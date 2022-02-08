import Phaser from 'phaser';
import Player from '../Sprites/Player';

export default class GameScene extends Phaser.Scene {
  player;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  preload() {
    this.load.image('spraycan', new URL('../../assets/spraycan.png', import.meta.url).href);
  }

  create() {
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);
  }

  update() {
    this.player.update();
  }
}
