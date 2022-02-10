import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y,);

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


    this.head = this.body.create(x * 16, y * 16, 'snake-body');
    this.head.setOrigin(0);

    this.alive = true;

    this.speed = 10;

    this.moveTime = 0;

    this.heading = this.right;
    this.direction = this.right;



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
        console.log(this.headPosition)
          this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 960);
          break;

      case this.right:
          this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 960);
          break;

      case this.up:
          this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 720);
          break;

      case this.down:
          this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 720);
          break;
    }
    // console.log('REACHME 07')
    // console.log(this.direction);


    this.direction = this.heading;

    //  Update the body segments
    Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x , this.headPosition.y , 1);

    //  Update the timer ready for the next movement
    console.log(time);
    this.moveTime = time + this.speed;


    return true;
  }


  faceLeft(){
    if (this.direction === this.up || this.direction === this.down){
    console.log('REACHME 03')
      this.heading = this.left;
    }
  }

  faceRight(){
    if (this.direction === this.up || this.direction === this.down){
    console.log('REACHME 04')
      this.heading = this.right;
    }
  }

  faceUp(){
    if (this.direction === this.left || this.direction === this.right){
    console.log('REACHME 05')
      this.heading = this.up;
    }
  }

  faceDown(){
    if (this.direction === this.left || this.direction === this.right){
    console.log('REACHME 06')
      this.heading = this.down;
    }
  }
}
