window.onload = start;
var luke, yoda, vader, obiwan, maul, defender, player, totalEnemy;
var defenderCount = 0;
var chars = [];

function start() {
	luke = new createObj("luke", 7, 15, 475, "assets/images/Luke200.jpg", "assets/images/Luke600.jpg");
	yoda = new createObj("yoda", 9, 20, 400, "assets/images/Yoda200.jpg", "assets/images/Yoda600.jpg");
	vader = new createObj("vader", 4, 30, 525, "assets/images/Vader200.jpg", "assets/images/Vader600.jpg");
	obiwan = new createObj("obiwan", 4, 18, 600, "assets/images/ObiWan200.jpg", "assets/images/ObiWan600.jpg");
	maul = new createObj("maul", 3, 25, 675, "assets/images/DarthMaul200.jpg", "assets/images/DarthMaul600.jpg");
	chars = [luke, yoda, vader, obiwan, maul];
	totalEnemy = chars.length - 1;
	$("#attack").hide();
	$("#myCharHPFull").hide();
	$("#defenderHPFull").hide();
	moveArr("#charSelect", chars, "img-responsive img-circle");
}

function createObj (name, AP, CAP, HP, image1, image2) {
	this.name = name;
	this.baseAP = AP;
	this.AP = AP;
	this.updateAP =  function() {
		this.AP += this.baseAP;
	};
	this.CAP = CAP;
	this.baseHP = HP;
	this.HP = HP;
	this.image1 = image1;
	this.image2 = image2;
}

$("#charSelect").on("click", "img", function() {
	player = whichChar(this);
	chars.splice(chars.indexOf(player), 1);
	moveImg("#myCharPortrait", player.image1, "img-responsive img-circle");
	moveImg("#myChar", player.image2, "img-responsive");
	moveArr("#enemies", chars);
	$("#myCharHPFull").show();
	$("#charSelect img").remove();
	$("#charSelect").animate().fadeOut(1000);
	$("#enemies").animate().fadeIn(1000);
});

$("#enemies").on("click", "img", function() {
	if (defenderCount === 0) {
		defender = whichChar(this);
		moveImg("#defender", defender.image2, "img-responsive");
		moveImg("#defenderPortrait", defender.image1, "img-responsive img-circle");
		defenderCount++;
		var choice = this;
		$(choice).hide();
		$("#defenderHPFull").show();
		$("#enemies").hide();
		$("#attack").show();
	}
});

function whichChar(x) {
	var y;
	for (var i = 0; i < chars.length; i++) {
		if (chars[i].image1 === x.getAttribute("src")) {
			y = chars[i];
		}
	}
	return y;
}

function moveArr(location, arr, cls) {
	for (var i = 0; i < arr.length; i++) {
		var img = document.createElement("img");
		img.src = arr[i].image1;
		$(img).addClass(cls);
		$(location).append(img);
	}
}

function moveImg(location, image, cls) {
	var img = document.createElement("img");
	img.src = image;
	$(img).addClass(cls);
	$(location).append(img);
}

function updateHP(target, damage) {
	target.HP -= damage;
}

function attack() {
	updateHP(defender, player.AP);
	$("#defenderHP").css("width", defender.HP/defender.baseHP * 100 + "%");
	if (defender.HP > 0) {
		updateHP(player, defender.CAP);
		$("#myCharHP").css("width", player.HP/player.baseHP * 100 + "%");
	}
	player.updateAP();
	if (defender.HP <= 0) {
		$("#defender").empty();
		$("#defenderPortrait").empty();
		defenderCount = 0;
		totalEnemy--;
		$("#attack").hide();
		$("#enemies").show();
		$("#defenderHPFull").hide();
		$("#defenderHP").css("width", "100%");
	}
	if (totalEnemy ===  0) {
		win();
	}
	if (player.HP <= 0) {
		lose();
	}
}

function lose() {
	alert("You Lost");
}

function win() {
	alert("You win!");
}