import Phaser from 'phaser';
import {
  directions
} from '../constants';
import {
  getDimensionValue,
  getPixelValue
} from '../helpers';

export default class Snake extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, getPixelValue(x), getPixelValue(y), 'snake-body');
    // this.setCollideWorldBounds(true);
    // scene.add.existing(this);
    // scene.physics.world.enable(this);
    // this.setOrigin(0);

    this.cursors = scene.input.keyboard.createCursorKeys();

    // Initialize Snake
    this.snake = scene.physics.add.group();
    this.head = this.snake.create(getPixelValue(x), getPixelValue(y), 'snake-body');

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

  // This returns an x and y in game units not pixels
  getNextPosition() {
    if (this.heading === directions.left) {
      return {
        x: Phaser.Math.Wrap(
          getDimensionValue(this.getHead().x) - 1,
          0,
          getDimensionValue(this.scene.game.config.width)
        ),
        y: getDimensionValue(this.getHead().y)
      };
    }
    if (this.heading === directions.right) {
      return {
        x: Phaser.Math.Wrap(
          getDimensionValue(this.getHead().x) + 1,
          0,
          getDimensionValue(this.scene.game.config.width)
        ),
        y: getDimensionValue(this.getHead().y)
      };
    }
    if (this.heading === directions.up) {
      return {
        x: getDimensionValue(this.getHead().x),
        y: Phaser.Math.Wrap(
          getDimensionValue(this.getHead().y) - 1,
          0,
          getDimensionValue(this.scene.game.config.height)
        ),
      };
    }
    if (this.heading === directions.down) {
      return {
        x: getDimensionValue(this.getHead().x),
        y: Phaser.Math.Wrap(
          getDimensionValue(this.getHead().y) + 1,
          0,
          getDimensionValue(this.scene.game.config.height)
        ),
      };
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
    const nextPosition = this.getNextPosition();

    this.direction = this.heading;
    //  Update the snake segments
    Phaser.Actions.ShiftPosition(
      this.snake.getChildren(),
      getPixelValue(nextPosition.x- 0.5),
      getPixelValue(nextPosition.y - 0.5),
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

  getTail() {
    const children = this.snake.getChildren()
    return children[children.length - 1];
  }

  getHead() {
    return this.snake.getChildren()[0];
  }

  grow() {
    const tail = this.getTail();
    this.snake.create(tail.x, tail.y, 'snake-body');
  }
}