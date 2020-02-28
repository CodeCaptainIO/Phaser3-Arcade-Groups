class Laser extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y) {
		super(scene, x, y, 'laser');
	}

	fire(x, y) {
		this.body.reset(x, y);

		this.setActive(true);
		this.setVisible(true);

		this.setVelocityY(-900);
	}

}

class LaserGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 30,
			key: 'laser',
			active: false,
			visible: false,
			classType: Laser
		});
	}

	fireBullet(x, y) {
		const laser = this.getFirstDead(false);

		if(laser) {
			laser.fire(x, y);
		}
	}
}

class SpaceScene extends Phaser.Scene
{
	constructor() {
		super();

		this.ship;
		this.laserGroup;
		this.inputKeys;
	}

	preload() {
		this.load.image('laser', '/static/img/assets/laserBlue02.png');
		this.load.image('ship', '/static/img/assets/playerShip1_red.png');
	}

	create() {
		this.cameras.main.setBackgroundColor(0x1D1923);

		this.laserGroup = new LaserGroup(this);

		this.addShip();
		this.addEvents();
	}

	addShip() {
		const centerX = this.cameras.main.width / 2;
		const bottom = this.cameras.main.height;
		this.ship = this.add.image(centerX, bottom - 90, 'ship');
	}

	addEvents() {

		// Moving the mouse should move the ship
		this.input.on('pointermove', (pointer) => {
			this.ship.x = pointer.x;
		});

		// Clicking the mouse should fire a bullet
		this.input.on('pointerdown', (pointer) => {
			this.fireBullet();
		});

		// Firing bullets should also work on enter / spacebar press
		this.inputKeys = [
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
		];
	}

	fireBullet() {
		this.laserGroup.fireBullet(this.ship.x, this.ship.y - 20);
	}

	update() {
		// Loop over all keys
		this.inputKeys.forEach(key => {
			// Check if the key was just pressed, and if so -> fire the bullet
			if(Phaser.Input.Keyboard.JustDown(key)) {
				this.fireBullet();
			}
		});
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
