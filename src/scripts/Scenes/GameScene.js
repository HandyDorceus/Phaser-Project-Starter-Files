import Phaser from 'phaser';
import Player from '../Sprites/Player';
// import Coin from '../Sprites/Coin';
import { colors } from '../constants';


export default class GameScene extends Phaser.Scene {
  player;
  coin;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  preload() {
    this.load.image('snake-body', new URL('../../assets/snake-body.png', import.meta.url).href);
    this.load.image('snake-food', new URL('../../assets/snake-food.png', import.meta.url).href);
    this.load.image('background', new URL('../../assets/snake-background.png', import.meta.url).href);
  }

  create() {
    this.background = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'background');
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);
    // this.coin = new Coin(this, this.game.config.width / 2, this.game.config.height / 2);

  }

  update(time) {
    this.player.update(time);
    // this.coin.update();
  }
}
