import Phaser from 'phaser';
import Player from '../Sprites/Player';
// import Snake from '../Sprites/Snake';
import { colors } from '../constants';


export default class GameScene extends Phaser.Scene {
  player;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  preload() {
    this.load.image('snake-body', new URL('../../assets/snake-body.png', import.meta.url).href);
    this.load.image('food', new URL('../../assets/food.png', import.meta.url).href);

  }

  create() {
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);

    // var r1 = this.add.rectangle(200, 200, 40, 40, colors.white);
    //this.player = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 40, 40, 0xADE25D);
    // this.player = new Snake(this, this.game.config.width / 2, this.game.config.height / 2, 20, 20, 0xADE25D)
    // this.player.physics.arcade.enable();


    // this.physics.world.enableBody(this.player);
    // this.setCollideWorldBounds(true);
  }

  update(time) {
    
    this.player.update(time);
    // console.log('REACHME 02')
  }
}
