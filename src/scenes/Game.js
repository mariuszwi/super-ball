import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    preload(){
    }

    paddleColor = 0xffffff;
    paddlePullColor = 0x0066ff;
    paddlePushColor = 0xff0000;
    iterator = 0;
    speedControl = 400;
    correctSpeed = 400;

    create() {
        this.score = 0;
        this.ball = this.add.circle(600, 250, 5, 0xffffff, 1);
        this.paddle = this.add.rectangle(400, 470, 60, 10, this.paddleColor);
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

    testSpeed() {
        return (this.correctSpeed - 3) > this.speedControl 
        || this.speedControl > (this.correctSpeed + 3);
    }

    update() {
        

        this.paddle.fillColor = this.paddleColor;
        
        const velocity   = this.ball.body.velocity;
        const xDirection = velocity.x > 0 ? 1 : -1;
        const yDirection = velocity.y > 0 ? 1 : -1;
        let changed = false;

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
        } else if( this.cursors.up.isDown) {
            velocity.y -= 1;
            velocity.x += 1 * xDirection;
            changed = true;

            this.paddle.fillColor = this.paddlePushColor;
        } else if(this.cursors.down.isDown) {
            velocity.y += 1;
            velocity.x -= 1 * xDirection;

            this.paddle.fillColor = this.paddlePullColor;
        }



        if(changed) {
            console.log("id: " + this.iterator);
            console.log(velocity);
        }

        while(this.testSpeed()) {
            if(this.speedControl < this.correctSpeed) {
                velocity.y += 1 * yDirection;
                velocity.x += 1 * xDirection;
            } else {
                velocity.y -= 1 * yDirection;
                velocity.x -= 1 * xDirection;
            }

            this.speedControl = Math.abs(velocity.y) + Math.abs(velocity.y);
        }

        if(changed) {
            console.log("id: " + this.iterator++);
            console.log(velocity);
            console.log("speed: " + this.speedControl);
            console.log("######### END ###########");
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

