import Phaser     from "phaser";
import IntroScene from "./scenes/IntroScene";
import Game       from "./scenes/Game";

const config = {
    width:   800,
    height:  500,
    type:    Phaser.AUTO,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            },
            // debug: true
        }
    }
};

const game = new Phaser.Game(config);

game.scene.add("introScene", IntroScene);
game.scene.add("game", Game);

game.scene.start("game");
