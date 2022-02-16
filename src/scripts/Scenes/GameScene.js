import Phaser from 'phaser';
import Snake from '../Sprites/Snake';
import Coin from '../Sprites/Coin';
import { getDimensionValue } from '../helpers';
import { getPixelValue } from '../helpers';


export default class GameScene extends Phaser.Scene {
  snake;
  coin;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  preload() {
    this.load.image('snake-body', new URL('../../assets/snake-body.png', import.meta.url).href);
    this.load.image('snake-food', new URL('../../assets/snake-food.png', import.meta.url).href);
    this.load.image(
      'background',
      new URL('../../assets/snake-background.png', import.meta.url).href
    );
  }

  create() {
    this.background = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'background'
    );
    this.snake = new Snake(
      this,
      getDimensionValue(this.game.config.width / 2),
      getDimensionValue(this.game.config.height / 2)
    );
    this.coin = new Coin(
      this,
      getDimensionValue(this.game.config.width / 2),
      getDimensionValue(this.game.config.height / 2)
    );
    this.physics.add.overlap(this.snake.head, this.coin, (head,coin) => this.snakeOverlapCoin(head, coin));

  }

  update(time, snake, coin) {
    this.snake.update(time);
    this.coin.update(snake, coin);

  }

  snakeOverlapCoin(snake, coin) {
    // reposition the coin
    // increase snake length by 1
    console.log(coin);
    coin.body.x = getPixelValue(Phaser.Math.Between(0, 63));
    coin.body.y = getPixelValue(Phaser.Math.Between(0, 35));
    this.snake.grow();
    console.log(this);

  }
}
