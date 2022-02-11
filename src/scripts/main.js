import Phaser from 'phaser';
import MenuScene from './Scenes/MenuScene';
import GameScene from './Scenes/GameScene';
import { getPixelValue } from './helpers';

// Set configuration for phaser game instance
const config = {
  type: Phaser.AUTO,
  width: getPixelValue(64),
  height: getPixelValue(36),

  // Add physics, arcade, scene, and audio
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
      },
      debug: false,
    },
  },
  scene: [GameScene],
  audio: {
    disableWebAudio: true,
  },
};

// Initialize game instance
new Phaser.Game(config);
