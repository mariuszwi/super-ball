import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    preload(){
    }

    create() {
        const ball = this.add.circle(600, 250, 5, 0xffffff, 1);
        const paddle = this.add.rectangle(400, 470, 60, 10, 0xffffff);
        
        this.physics.add.existing(ball);
        this.physics.add.existing(paddle, true);
        this.physics.add.collider(ball, paddle);
        
        ball.body.setVelocity(-200, 200);
        ball.body.setCollideWorldBounds(true, 1, 1);
        ball.body.setBounce(1, 1);
    }
}
