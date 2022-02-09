import Phaser from 'phaser';

export default class Snake extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, fillColor) {
        super(scene, x, y, width, height, fillColor)
        scene.add.existing(this)
        // this.setCollideWorldBounds(true);


        this.cursors = scene.input.keyboard.createCursorKeys();
        return this;
    }

    update() {
        if (this.cursors.left.isDown) {
            this.x -= 10;
          console.log(this.player)
            // this.setX(-10)
          }
          if (this.cursors.right.isDown) {
            this.x += 10;
          }
          if (this.cursors.up.isDown) {
            this.y -= 10;
          }
          if (this.cursors.down.isDown) {
            this.y += 10;
          }
        // console.log("This is from the snake class.")
    }
}