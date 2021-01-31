import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    preload(){
    }

    create() {
        this.score = 0;
        this.ball = this.add.circle(600, 250, 5, 0xffffff, 1);
        this.paddle = this.add.rectangle(400, 470, 60, 10, 0xffffff);
        this.deathLine = this.add.rectangle(400, 499, 800, 1, 0xffffff, 0);
        this.scoreLabel = this.add.text(50, 400, "Score: 0");
        
        this.physics.add.existing(this.ball);
        this.physics.add.existing(this.deathLine);
        this.physics.add.existing(this.paddle, true);
        this.physics.add.collider(this.ball, this.paddle);
        this.physics.add.collider(this.ball, this.deathLine, this.gameOver, null, this);


        this.ball.body.setVelocity(-200, 200);
        this.ball.body.setCollideWorldBounds(true, 1, 1);
        this.ball.body.setBounce(1, 1);

        this.gameBlocks = this.add.group({
            runChildUpdate: true
        });

        for(let i = 0; i < 17; i++ ) {
            for(let j = 0; j < 5; j++) {
                const block = this.add.rectangle(40 + (i * 45), 50 + (j * 25), 30 , 10, 0xffffff)

                this.gameBlocks.add(block);
                this.physics.add.existing(block, true);
            }
        }
        
        this.physics.add.collider(this.ball,this.gameBlocks, this.ballHitBlock, null, this);

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

    ballHitBlock(ball, block) {
        block.destroy();
        this.score += 10;
        this.scoreLabel.setText("Score: " + this.score);
    }

    gameOver() {
        this.scene.restart();
    }
}

class Block extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        super(scene, x, y, 30 , 10, 0xffffff);
        console.log(x + " " + y);
    }
} 

