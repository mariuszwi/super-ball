import Phaser from "phaser";

export default class IntroScene extends Phaser.Scene {
    preload() {
    }

    create() {
        const title = this.add.text(400, 250, "Super Ball!");

        title.setOrigin(0.5, 0.5);
    }
}
