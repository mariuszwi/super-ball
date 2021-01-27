import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    preload(){
    }

    create() {
        const ball  = this.add.circle(600, 250, 5, 0xffffff, 1);
        this.paddle = this.add.rectangle(400, 470, 60, 10, 0xffffff);
        
        this.physics.add.existing(ball);
        this.physics.add.existing(this.paddle, true);
        this.physics.add.collider(ball, this.paddle);

        ball.body.setVelocity(-200, 200);
        ball.body.setCollideWorldBounds(true, 1, 1);
        ball.body.setBounce(1, 1);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if(this.cursors.left.isDown) {
            if(this.paddle.x < 0) {
                return;
            }

            this.paddle.x -= 10;
            this.paddle.body.updateFromGameObject();
        } else if( this.cursors.right.isDown) {
            if(this.paddle.x > 800) {
                return;
            }

            this.paddle.x += 10;
            this.paddle.body.updateFromGameObject();
        }
    }
}
