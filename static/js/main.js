class SpaceScene extends Phaser.Scene
{
	constructor() {
		super();
	}

	preload() {
		this.load.image('laser', '/static/img/assets/laserBlue02.png');
		this.load.image('ship', '/static/img/assets/playerShip1_red.png');
	}

	create() {
		this.cameras.main.setBackgroundColor(0x1D1923);

		this.addShip();
	}

	addShip() {
		const centerX = this.cameras.main.width / 2;
		const bottom = this.cameras.main.height;
		this.ship = this.add.image(centerX, bottom - 90, 'ship');
	}

	update() {
	}
}

const config = {
	type: Phaser.AUTO,
	width: 450,
	height: 700,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: { y: 0 }
		}
	},
	scene: SpaceScene
};

const game = new Phaser.Game(config);
