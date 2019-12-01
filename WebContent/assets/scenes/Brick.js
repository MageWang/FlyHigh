class Brick extends Phaser.Physics.Arcade.Sprite {

	/**
	 * Brick
	 *
	 * @param {Phaser.Scene} scene
	 * @param x 
	 * @param y 
	 * @param texture
	 * @param frame
	 */
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
		//console.log(texture);
		//this.scene.physics.BlockPhysics.add(texture);
		//this.scene.physics.add.existing(this);
		//this.body.setCollideWorldBounds();
		//this.body.gravity.y = 100;
		this.scene.physics.add.existing(this);
		//this.body.gravity.y = 100;
		this.body.setImmovable(true);
    	this.body.allowGravity = false;
    	//this.body.setVelocityX(50);
		this.scene.physics.add.collider(this.scene.fPlayer, this, this.checkCollisioin);
		this.scene.physics.add.overlap(this.scene.fPlayer, this, this.checkCollisioin, null, this);
		
	}
	
	build(){
		
		//this.destroy();
	}
	
	checkCollisioin(player, brick) {
		player._isFloor = true;
		if (player.y-brick.y > player.body.height*0.8 && Math.abs(player.x-brick.x)<player.body.width*0.65) {
			brick.destroy();
			console.log(player);
			player.scene.audioBreak.play();
			//this.scene.spawnEnemyDeath(enemy.x, enemy.y);
			player.body.velocity.y = 200;
		}
	}
	
	spawnEnemyDeath(x, y) {
		var temp = new EnemyDeath(this, x, y);
        this.add.existing(temp);
	}
}

Phaser.GameObjects.GameObjectFactory.register("brick", function (x, y, texture, frame) {
	
	var sprite = new Brick(this.scene, x, y, texture, frame);

	this.scene.sys.displayList.add(sprite);
	this.scene.sys.updateList.add(sprite);

	return sprite;
});