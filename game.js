// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 50;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(465, 510, 'fond');
  createItem(535, 510, 'product');
  createItem(605, 510, 'tea');
  createItem(675, 510, 'wear');
  createItem(745, 510, '2021');

  createItem(520, 435, 'birth');
  createItem(590, 435, 'info');
  createItem(660, 435, 'goodproject');
  createItem(730, 435, 'news');

  createItem(120, 360, 'alone');
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();

  platforms.create(0, 565, 'platform1');
  platforms.create(87, 446, 'platform2');
  platforms.create(519, 485, 'platform3');


  platforms.setAll('body.immovable', true);
}
//add extraPlatform
function extraPlatform() {
  platforms = game.add.physicsGroup();

  platforms.create(0, 565, 'platform1');
  platforms.create(87, 446, 'platform2');
  platforms.create(519, 485, 'platform3');
  platforms.create(321, 459, 'platform4');

  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 7, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(400, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
   if (item.key === 'fond') {
     currentScore = currentScore + 5;
  }else if (item.key === 'product') {
     currentScore = currentScore + 5;
  } else if (item.key === 'info') {
     currentScore = currentScore + 5;
  }else if (item.key === 'tea') {
     currentScore = currentScore + 5;
  }else if (item.key === 'wear') {
     currentScore = currentScore + 5;
  }else if (item.key === 'goodproject') {
     currentScore = currentScore + 5;
  }else if (item.key === 'birth') {
     currentScore = currentScore + 5;
  }else if (item.key === '2021') {
     currentScore = currentScore + 5;
  }else if (item.key === 'news') {
     currentScore = currentScore + 5;
  }else if (item.key === 'alone') {
     currentScore = currentScore + 5;
     extraPlatform();
  }
  if (currentScore >= winningScore) {
      createBadge();
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  var btn = document.getElementById('btn-next');
  btn.removeAttribute("disabled");
  btn.style.border = "2px solid #000";
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

  // before the game begins
  function preload() {
    // game.stage.backgroundColor = '#5db1ad';
    game.load.image('background', 'background.png');

    //Load images
    game.load.image('platform1', 'platform1.png');
    game.load.image('platform2', 'platform2.png');
    game.load.image('platform3', 'platform3.png');
    game.load.image('platform4', 'platform4.png');


    //Load spritesheets
    game.load.spritesheet('player', 'chalkers.png', 48, 62);

    game.load.spritesheet('fond', 'booklets/fond.png', 36, 44);
    game.load.spritesheet('product', 'booklets/product.png', 36, 44);
    game.load.spritesheet('info', 'booklets/info.png', 36, 44);
    game.load.spritesheet('tea', 'booklets/tea.png', 36, 44);
    game.load.spritesheet('wear', 'booklets/wear.png', 36, 44);
    game.load.spritesheet('goodproject', 'booklets/goodproject.png', 36, 44);
    game.load.spritesheet('birth', 'booklets/birth.png', 36, 44);
    game.load.spritesheet('2021', 'booklets/2021.png', 36, 44);
    game.load.spritesheet('news', 'booklets/news.png', 36, 44);
    game.load.spritesheet('alone', 'booklets/alone.png', 36, 44);



    game.load.spritesheet('badge', 'badge.png', 42, 54);

  }


//timer
  var sec1 = 0;
  function timer1() {
     sec1++;
     var timer = document.querySelector(".timer");
     var m = (Math.trunc(sec1/60)<10? "0":"") + Math.trunc(sec1/60);
     var s = (sec1%60<10? "0":"") + sec1%60;
     timer.value = m + " : " + s;
}
setInterval(timer1, 1000);

  // initial game set up
  function create() {
    timer1();
    this.add.image(0, 0, 'background');
    player = game.add.sprite(60, 480, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 22px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    // if (cursors.left.isDown) {
    //   player.animations.play('walk', 10, true);
    //   player.body.velocity.x = -300;
    //   player.scale.x = - 1;
    // }
    // // is the right cursor key pressed?
    function play() {
  player.animations.play('walk', 10, true);
  player.body.velocity.x = 10;
  player.scale.x = 1;

  }
setInterval(play, 1000,player.animations.stop());

    // if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
    //   player.body.velocity.y = -330;
    // }
    // when the player winw the game
    if (won) {
      winningMessage.text = "TO THE NEXT LEVEL!";

    }

  }

  function render() {

  }

};
