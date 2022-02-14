import Phaser from 'phaser';
import { directions } from '../constants';
import { getDimensionValue, getPixelValue } from '../helpers';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, getPixelValue(x) , getPixelValue(y), 'snake-body');
    // scene.add.existing(this);
    // scene.physics.world.enableBody(this);
    // scene.physics.world.enable(this);

    // console.log(this);

    this.setOrigin(0);

    this.cursors = scene.input.keyboard.createCursorKeys();

    // Initialize Snake
    this.headPosition = new Phaser.Geom.Point(x + .5, y + .5);
    this.snake = scene.physics.add.group();
    this.head = this.snake.create( getPixelValue(x + .5) ,  getPixelValue(y + .5) , 'snake-body');
    // console.log(this.head)
    // console.log(this.snake);
    this.alive = true;
    this.updateInterval = 100;
    this.moveTime = 0;
    this.heading = directions.right;
    this.direction = directions.right;

    return this;
  }

  update(time) {
    if (!this.alive) {
      return;
    }

    /**
     * Check which key is pressed, and then change the direction the snake
     * is heading based on that. The checks ensure you don't double-back
     * on yourself, for example if you're moving to the right and you press
     * the LEFT cursor, it ignores it, because the only valid directions you
     * can move in at that time is up and down.
     */

    if (this.cursors.left.isDown) {
      this.faceLeft();
    } else if (this.cursors.right.isDown) {
      this.faceRight();
    } else if (this.cursors.up.isDown) {
      this.faceUp();
    } else if (this.cursors.down.isDown) {
      this.faceDown();
    }

    if (time >= this.moveTime) {
      return this.move(time);
    }
  }

  move(time) {
    /**
     * Based on the heading property (which is the direction the pgroup pressed)
     * we update the headPosition value accordingly.
     *
     * The Math.wrap call allow the snake to wrap around the screen, so when
     * it goes off any of the sides it re-appears on the other.
     */
    switch (this.heading) {
      case directions.left:
        this.headPosition.x = Phaser.Math.Wrap(
          this.headPosition.x - 1,
          0,
          getDimensionValue(this.scene.game.config.width)
        );
        break;

      case directions.right:
        this.headPosition.x = Phaser.Math.Wrap(
          this.headPosition.x + 1,
          0,
          getDimensionValue(this.scene.game.config.width)
        );
        break;

      case directions.up:
        this.headPosition.y = Phaser.Math.Wrap(
          this.headPosition.y - 1,
          0,
          getDimensionValue(this.scene.game.config.height)
        );
        break;

      case directions.down:
        this.headPosition.y = Phaser.Math.Wrap(
          this.headPosition.y + 1,
          0,
          getDimensionValue(this.scene.game.config.height)
        );
        break;
    }

    this.direction = this.heading;
    //  Update the snake segments
    Phaser.Actions.ShiftPosition(
      this.snake.getChildren(),
      getPixelValue(this.headPosition.x),
      getPixelValue(this.headPosition.y),
      1
    );

    //  Update the timer ready for the next movement
    this.moveTime = time + this.updateInterval;
  }

  faceLeft() {
    if (this.direction === directions.up || this.direction === directions.down) {
      this.heading = directions.left;
    }
  }

  faceRight() {
    if (this.direction === directions.up || this.direction === directions.down) {
      this.heading = directions.right;
    }
  }

  faceUp() {
    if (this.direction === directions.left || this.direction === directions.right) {
      this.heading = directions.up;
    }
  }

  faceDown() {
    if (this.direction === directions.left || this.direction === directions.right) {
      this.heading = directions.down;
    }
  }
}
