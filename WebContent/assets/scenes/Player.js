/**
 *
 */
class Player extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
		this.scene.physics.add.existing(this);
	
		this.play("idle", true);
		
		//this.initX = x;
		//this.initY = y;
		//this.body.setSize(16\, 19);
		//this.body.setOffset(37, 29);
		
		this.setBounce(0.2);
    	//this.setCollideWorldBounds(true);
		this.setGravityY(300);
		
		this.body.gravity.y = 300;
		this.kind = "player";
		
		//this.body.setCollideWorldBounds(true);
		scene.fPlayer = this;
		
		this._isFloor = true;
	}
	
	IsFloor(){
		return this._isFloor || this.body.onFloor();
	}

	playHurt() {
		this.play("player-hurt");
	}

	playMoveAnimation() {
		if (this.body.velocity.y != 0) {
			this.play("player-jump", true);
		} else {
			this.play("player-run", true);
		}
	}

	playStillAnimation(isDucking) {
		if (this.body.velocity.y != 0) {
			this.play("player-jump", true);
		} else if (isDucking) {
			this.play("player-duck", true);
		} else {
			this.play("player-idle", true);
		}
	}
	
}

Phaser.GameObjects.GameObjectFactory.register("player", function(x, y, texture, frame) {	
	var sprite = new Player(this.scene, x, y, texture, frame);

	this.scene.sys.displayList.add(sprite);
	this.scene.sys.updateList.add(sprite);

	return sprite;
});

