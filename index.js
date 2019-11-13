var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update:update
    }
};

var game = new Phaser.Game(config);
// key value dictionary
var gameObjects = {};
function preload ()
{
    this.load.setBaseURL(document.URL);

    //this.load.image('sky', 'assets/skies/space3.png');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
    this.load.image('meteor001', 'assets/meteors/space_meteors_001.png');
    this.load.image('meteor002', 'assets/meteors/space_meteors_002.png');
    this.load.image('meteor003', 'assets/meteors/space_meteors_003.png');
    this.load.image('meteor004', 'assets/meteors/space_meteors_004.png');
    this.load.atlasXML('spaceShooter2_spritesheet', 'assets/spritesheet/spaceShooter2_spritesheet.png','assets/spritesheet/spaceShooter2_spritesheet.xml');

    console.log(this);
}

function create ()
{
console.log('gameObjects[group]', gameObjects['group']);
//console.log('this.add', this.add);
<!-- var atlasTexture = this.textures.get('spaceShooter2_spritesheet'); -->
<!-- var frames = atlasTexture.getFrameNames(); -->
<!-- for (var i = 0; i < frames.length; i++) -->
<!-- { -->
  <!-- var x = Phaser.Math.Between(0, 800); -->
  <!-- var y = Phaser.Math.Between(0, 600); -->

  <!-- this.add.image(x, y, 'spaceShooter2_spritesheet', frames[i]); -->
<!-- } -->

    //this.add.image(400, 300, 'sky');
gameObjects['meteor'] = this.add.sprite(400, 350, 'meteor001');
gameObjects['meteor'] .setDataEnabled();
console.log('meteor', gameObjects['meteor']);
//gameObjects['meteor'].setScale(0.5,0.5);

    <!-- var particles = this.add.particles('red'); -->
    <!-- var emitter = particles.createEmitter({ -->
        <!-- speed: 100, -->
        <!-- scale: { start: 1, end: 0 }, -->
        <!-- blendMode: 'ADD' -->
    <!-- }); -->
    //var logo = this.physics.add.image(400, 100, 'logo');
    //emitter.startFollow(logo);
}


function update(time, delta){
gameObjects['meteor'].angle+=10*delta/1000;
var cursors = this.input.keyboard.createCursorKeys();
if(cursors.up.isDown){
  gameObjects['meteor'].scaleX +=0.1
  gameObjects['meteor'].scaleY +=0.1
}
if(cursors.down.isDown){
  gameObjects['meteor'].scaleX -=0.1
  gameObjects['meteor'].scaleY -=0.1
}
}
