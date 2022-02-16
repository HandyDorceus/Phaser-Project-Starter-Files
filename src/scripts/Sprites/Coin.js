import Phaser from 'phaser';
import { getPixelValue } from '../helpers';

export default class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, getPixelValue(x + 5), getPixelValue(y + 5), 'snake-food');

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setOrigin(0);

    // this.coinOverlap = false;

    this.cursors = scene.input.keyboard.createCursorKeys();
    return this;
  }

  // create(snake, coin){
  //   console.log('REACHME 00');

  //   this.physics.add.overlap(this.player, this.coin, this.snakeOverlapCoin(this.player, this.coin));
  // }



  update(snake, coin){
    // console.log(this.coinOverlap)

    // if (this.coinOverlap){
    //   this.snakeOverlapCoin(snake, coin);
    // }
    // this.coinOverlap = false;

  }

  // snakeOverlapCoin(snake, coin) {
  //   this.coinOverlap = true;


  //   // coin.x = this.Phaser.Math.Betweeen(0, 64);
  //   // coin.y = Phaser.Math.Between(0, 32);
  // }

  // snakeXcoin(){
  //   this.coinOverlap = true;
  //   return this.coinOverlap;
  // } 

}
