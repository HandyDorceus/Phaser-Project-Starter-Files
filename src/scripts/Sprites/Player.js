import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    // this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard.createCursorKeys();


    // Direction constants
    this.up = 0;
    this.down = 1;
    this.left = 2;
    this.right = 3;

    // Initialize Snake
    this.headPosition = new Phaser.Geom.Point(x, y);
    this.body = scene.add.group();
    this.head = this.body.create(x * 20, y * 20, 'snake-body');
    this.head.setOrigin(0);
    this.alive = true;
    this.speed = 100;
    this.moveTime = 0;
    this.heading = this.right;
    this.direction = this.right;
    this.length = 1;



    return this;
  }

  snakeUpdate(time){
    if (time >= this.moveTime){
      return this.move(time);
    }
  }

  update(time) {


    if (!this.alive)
    {
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
      // this.x -= 10;
    // console.log(this.player)
      this.faceLeft();
    }
    else if (this.cursors.right.isDown) {
      // this.x += 10;
      this.faceRight();
    }
    else if (this.cursors.up.isDown) {
      // this.y -= 10;
      this.faceUp();

    }
    else if (this.cursors.down.isDown) {
      // this.y += 10;
      this.faceDown();

    }

    this.snakeUpdate(time);

  }

  move(time){

    /**
    * Based on the heading property (which is the direction the pgroup pressed)
    * we update the headPosition value accordingly.
    * 
    * The Math.wrap call allow the snake to wrap around the screen, so when
    * it goes off any of the sides it re-appears on the other.
    */
    switch (this.heading){
      case this.left:
          this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 64);
          break;

      case this.right:
          this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 64);
          break;

      case this.up:
          this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 36);
          break;

      case this.down:
          this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 36);
          break;
    }

    this.direction = this.heading;
    //  Update the body segments
    Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 20, this.headPosition.y * 20, 1);

    //  Update the timer ready for the next movement
    this.moveTime = time + this.speed;


    return true;
  }


  faceLeft(){
    if (this.direction === this.up || this.direction === this.down){
      this.heading = this.left;
    }
  }

  faceRight(){
    if (this.direction === this.up || this.direction === this.down){
      this.heading = this.right;
    }
  }

  faceUp(){
    if (this.direction === this.left || this.direction === this.right){
      this.heading = this.up;
    }
  }

  faceDown(){
    if (this.direction === this.left || this.direction === this.right){
      this.heading = this.down;
    }
  }
}
