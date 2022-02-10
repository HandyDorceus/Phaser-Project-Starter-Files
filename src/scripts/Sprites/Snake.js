// import Phaser from 'phaser';

// export default class Snake extends Phaser.GameObjects.Rectangle {
//     constructor(scene, x, y, width, height, fillColor) {
//         super(scene, x, y, width, height, fillColor)
//         scene.add.existing(this)
//         scene.physics.world.enableBody(this);
//         // this.setCollideWorldBounds(true);


//         this.cursors = scene.input.keyboard.createCursorKeys();
//         return this;
//     }

//     update() {
//         if (this.cursors.left.isDown) {
//             // this.x -= 10;
//             this.body.setVelocityY(0)
//             this.body.setVelocityX(-100)
//             console.log(this)
//         }
//         else if (this.cursors.right.isDown) {
//             // this.x += 10;
//             this.body.setVelocityY(0)
//             this.body.setVelocityX(100)

//         }
//         else if (this.cursors.up.isDown) {
//             // this.y -= 10;
//             this.body.setVelocityX(0)
//             this.body.setVelocityY(-100)
//         }
//         else if (this.cursors.down.isDown) {
//             // this.y += 10;
//             this.body.setVelocityX(0)
//             this.body.setVelocityY(100)
//         }

//         if (this.body.x < 0){
//             this.body.x = 959;
//         }
//         if (this.body.x > 960){
//             this.body.x = 1;
//         }
//         if (this.body.y < 0){
//             this.body.y = 719;
//         }
//         if (this.body.y > 720){
//             this.body.y = 1;
//         }
//     }
// }