import Phaser from 'phaser';
import Player from '../Sprites/Player';
import Snake from '../Sprites/Snake';
import { colors } from '../constants';


export default class GameScene extends Phaser.Scene {
  player;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  preload() {
    // this.load.image('spraycan', new URL('../../assets/spraycan.png', import.meta.url).href);
  }

  create() {
    //this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);

    // var r1 = this.add.rectangle(200, 200, 40, 40, colors.white);
    //this.player = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 40, 40, 0xADE25D);
    this.player = new Snake(this, this.game.config.width / 2, this.game.config.height / 2, 40, 40, 0xADE25D)

    // this.physics.world.enableBody(this.player);
    // this.player.setCollideWorldBounds(true);
  }

  update() {
    //console.log(this.player)
    this.player.update();
    // console.log(this.player)
  }
}
