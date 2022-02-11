import Phaser from 'phaser';
import { getPixelValue } from '../helpers';

export default class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, getPixelValue(x), getPixelValue(y), 'snake-food');

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setOrigin(0);

    this.cursors = scene.input.keyboard.createCursorKeys();
    return this;
  }
}
