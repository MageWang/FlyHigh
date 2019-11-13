var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                scale: 0
            },
            plugins: {
                attractors: true
            }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    var directory = document.URL.substr(0,document.URL.lastIndexOf('/'))
    this.load.setBaseURL(directory);
    this.load.image('sun', 'assets/tests/space/sun.png');
    this.load.image('alien', 'assets/sprites/space-baddie.png');
}

function create ()
{
    //  You can enable the Attractors plugin either via the game config (see above), or explicitly in code:
    // this.matter.system.enableAttractorPlugin();
    this.matter.world.setBounds();

    var imageStack = this.matter.add.imageStack('alien', null, 0, 500, 5, 2, 10, 10, {
        mass: 100000000,
        // ignorePointer: true
    });
    console.log('Phaser', Phaser);
    console.log('this', this);
    console.log('imageStack', imageStack);
    for(var i = 0 ; i < imageStack.bodies.length ; i++) {
      var body = imageStack.bodies[i];
      // body.velocity.x = -100+Math.random()*200.0;
      // body.velocity.y = -100+Math.random()*200.0;
      body.force.x = -1+Math.random()*2.0;
      body.force.y = -1+Math.random()*2.0;
    }
    var sun = this.matter.add.image(400, 200, 'sun', null, {
        shape: {
            type: 'circle',
            radius: 64
        },
        plugin: {
            attractors: [
                function (bodyA, bodyB) {
                  var force = new Phaser.Math.Vector2();
                  force.x = (bodyA.position.x - bodyB.position.x);
                  force.y = (bodyA.position.y - bodyB.position.y);
                  force.normalize();
                  force*=1e-10;

                  // apply force to both bodies
                  bodyA.force = -(force);
                  bodyB.force = force;
                }
            ]
        }
    });

    this.matter.add.mouseSpring();
}
