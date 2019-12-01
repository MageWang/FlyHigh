class Goal extends Phaser.Physics.Arcade.Sprite {

	/**
	 * Goal
	 *
	 * @param {Phaser.Scene} scene
	 * @param x 
	 * @param y 
	 * @param texture
	 * @param frame
	 */
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
		console.log('goal')
		this.scene.physics.add.existing(this);
		//this.body.gravity.y = 100;
		this.body.setImmovable(true);
    	this.body.allowGravity = false;
    	//this.body.setVelocityX(50);
		this.scene.physics.add.collider(this.scene.fPlayer, this, this.checkCollisioin);
		this.scene.physics.add.overlap(this.scene.fPlayer, this, this.checkCollisioin, null, this);
	}
	checkCollisioin(player, mine) {
		console.log('goal collision')
		
		mine.scene.add.image(mine.x+17, mine.y-20, "monochrome", 983);
		
		mine.scene.add.image(mine.x+17*2, mine.y-20, "monochrome", 1011);
		
		mine.scene.add.image(mine.x+17*3, mine.y-20, "monochrome", 982);
		
		mine.scene.music.stop();
		
		player.destroy();
		
	}

}

Phaser.GameObjects.GameObjectFactory.register("goal", function (x, y, texture, frame) {
	
	var sprite = new Goal(this.scene, x, y, texture, frame);

	this.scene.sys.displayList.add(sprite);
	this.scene.sys.updateList.add(sprite);

	return sprite;
});