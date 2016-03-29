// Enemies our player must avoid
var allEnemies = [];
var enemySpeed = 30;

/**
* @description Enemies
* @constructor
* @param {number} posX - x positon of the enemy
* @param {number} posY - y position of the enemy
* @param {number} speed - speed of the enemy
*/
var Enemy = function(posX,posY, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.x = posX;
	this.y = posY;
	this.speed = speed;
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	console.log(this.speed);
};

Enemy.prototype.collisionDetector = function(player){
	if (this.x < player.x + 45 &&
		this.x + 60 > player.x &&
		this.y < player.y + 55 &&
		39 + this.y > player.y) {
		console.log("enemy collision detected");
		player.reset();

		//Erase one life instance
		allLife.pop();
	}
};

//Reuse enemies already created by setting new x positions
//once their x position is greater than the canvace's width
Enemy.prototype.reset = function(){
	if(this.x > 505){
		this.x = -150;
	}
};

function createEnemies(){
	//Arrays determining possible x and y positions for the enemies
	this.yPos = [220, 270, 320, 420];
	this.xPos = [-300,-200,-100, 0, 100, 200];


	for (var i = 0; i < 15; i++) {
		//Choosing randon x and y positions for every instance of enemy
		this.randY = this.yPos[Math.floor(Math.random() * this.yPos.length)];
		this.randX = this.xPos[Math.floor(Math.random() * this.xPos.length)];
		allEnemies.push(new Enemy(this.randX, this.randY, enemySpeed));
	}
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/**
* @description Class to create players
* @constructor
* @param {number} x - x positon of the player
* @param {number} y - y position of the player
*/
var Player = function(x, y){
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt){
	//Setting player's boundaries
	if(this.y < 60){
		this.y = 60;
	}
	if(this.y > 580){
		this.y = 580;
	}
	if(this.x < 10){
		this.x = 10;
	}
	if(this.x > 440){
		this.x = 440;
	}
};

Player.prototype.handleInput = function(keyCode){

	if(keyCode === 'up'){
		this.y = this.y - 10;
	}
	if(keyCode === 'down'){
		this.y = this.y + 10;
	}
	if(keyCode === 'left'){
		this.x = this.x - 10;
	}
	if(keyCode === 'right'){
		this.x = this.x + 10;
	}
};

//disable page scroll for up and down keys
//Code found here: http://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
window.addEventListener("keydown", function(e){
	if([38, 40].indexOf(e.keyCode) > -1){
		e.preventDefault();
	}
}, false);

var allLife = [];

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function(){
	this.x = 225;
	this.y = 570;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(225, 570);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

/**
* @description Class to create instaces of the life of the player
* @constructor
* @param {number} posX - x positon of the life
* @param {number} posY - y position of the life
*/
var Life = function(posX, posY){
	this.x = posX;
	this.y = posY;
	this.sprite = 'images/char-boy.png';
};

//array to store all life instances
var allLife = [];

//Create life instances
function createLife(){
	xPos = [410, 440, 470];
	yPos = 65;

	for(var i = 0; i < 3; i++){
		allLife.push(new Life(xPos[i], yPos));
	}
}
createLife();

Life.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 25, 25);
};


//Gem arrays
var allGems = ['images/gem-gray.png','images/gem-blue.png', 'images/gem-orange.png', 'images/gem-green.png'];
var smallGemHolders = [];//stores gem holders
var smallGems = [];//stores gems to replace holders on big gem collition
var bigGems = [];//stores level gems

/**
* @description Class to create instances of gems
* @constructor
* @param {string} gemSprite - the sprite to be used in the instace
* @param {number} posX - x positon of the gem
* @param {number} posY - y position of the gem
* @param {number} gemWidth - width of the gem
* @param {number} gemHeight - height of the gem
*/
var Gem = function(gemSprite, posX, posY, gemWidth, gemHeight){
	this.x = posX;
	this.y = posY;
	this.width = gemWidth;
	this.height = gemHeight;
	this.sprite = gemSprite;
};

Gem.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

//Create gem holders and level gems
function createGems(){
	xPos = [15, 45, 75];
	yPos = 60;
	for (var i = 0; i <= 3; i++) {
		smallGemHolders.push(new Gem(allGems[0], xPos[i], yPos, 25, 25));
		bigGems.push(new Gem(allGems[i+1], 230, 125, 50, 50));
		smallGems.push(new Gem(allGems[i+1], xPos[i], yPos, 25, 25));
	}
}
createGems();

//Variable to control if enemies have been created
var enemyCount = 0;

//Collition detector for big gems
function bigGemCollision(player){
	for(var i = 0; i <= 3; i++){
		if (bigGems[i].x < player.x + 45 &&
			bigGems[i].x + 40 > player.x &&
			bigGems[i].y < player.y + 55 &&
			40 + bigGems[i].y > player.y) {
				console.log("gem collision detected");

				//Send player to initial position
				player.reset();

				//Level up
				currentLevel += 1;

				//Increase enemy speed
				enemySpeed += 15;

				//reset enemies array an enemy count
				allEnemies = [];
				enemyCount = 0;
		}
	}
}

//Level text screen class
var levelText = ["Level 1", "Level 2", "Level 3", "Game Over", "You Win!"];
var fontSize = ["30pt impact", "50pt impact"];
var lmessages = [];//Store level text
var endMessages = [];//Store game over and win text

/**
* @description Class to create level, win, and loose text messages
* @constructor
* @param {string} screenText - text to be used in the message instance
* @param {number} posX - x positon of the message
* @param {number} posY - y position of the message
* @param {string} font - font and font size to be used in the mesage instance
*/
var LevelMessage = function(screenText, xPos, yPos, font){
	this.text = screenText;
	this.x = xPos;
	this.y = yPos;
	this.font = font;
};

LevelMessage.prototype.render = function(){
	ctx.save();
	ctx.font = this.font;
	ctx.textAlign = "center";
	ctx.fillStyle = "rgb(141, 162, 168)";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1.5;
	ctx.fillText(this.text, this.x, this.y);
	ctx.strokeText(this.text, this.x, this.y);
};

function createLevelScreens(){
	for(var i = 0; i <= 3; i++){
		lmessages.push(new LevelMessage(levelText[i], 255, 100, fontSize[0]));
	}
	for (var j = 0; j <= 2; j++){
		endMessages.push(new LevelMessage(levelText[j + 3], 255, 350, fontSize[1]));
	}
}
createLevelScreens();

//Function to create new enemies only once on each level
function drawEnemies(){
	if(enemyCount === 0){
		console.log("drawEnemies");
		createEnemies();
		enemyCount = 1;
	}
}

//Var to keep track of the current level
var currentLevel = 1;

/**
* @description Class to create levels
* @constructor
* @param {object} levelGem - gem instace the level will include
* @param {object} level - level message to be used in the specific level
*/
var Level = function(levelGem, level){
	this.levelText = level;
	this.gem = levelGem;
};

Level.prototype.render = function(){
	this.gem.render();
	bigGemCollision(player);
	drawEnemies();
	if(lmessages.length > 0){
		this.levelText.render();
	}
};


var level1 = new Level(bigGems[0], lmessages[0]);
var level2 = new Level(bigGems[1], lmessages[1]);
var level3 = new Level(bigGems[2], lmessages[2]);

//level management
function levelRender(){
	if(currentLevel === 1){
			level1.render();
		}
	else if(currentLevel === 2){
			level2.render();
			smallGemHolders.splice(0, 1, smallGems[0]);
		}
		else if(currentLevel === 3){
			level3.render();
			smallGemHolders.splice(1, 1, smallGems[1]);
		}
		else if(currentLevel === 4){
			//The player has won the game
			smallGemHolders.splice(2, 1, smallGems[2]);
			allEnemies = [];
			lmessages = [];
			endMessages[1].render();//You win message
		}

		if(allLife.length < 1){
			//The player has lost the game
			endMessages[0].render();
			allEnemies = [];
			lmessages = [];
			currentLevel = 0;
		}
}