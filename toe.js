console.log("starting");
// var to keep track of who turn
let ex = document.getElementById("ex");
let oh = document.getElementById("oh");
let live = true;
let turn = 1;
let boxes = ["one1", "two2", "three3", "four4",
			"five5", "six6", "seven7", "eight8", "nine9"];
function player(name,letter){
	this.name = name;
	this.letter = letter;
	this.score = 0;
	this.won = function() {
		this.score = this.score + 1;
	}
}
const player1 = new player("bob", "X");
const player2 = new player("pat", "O");
console.log(player1.score);

function reset(){
	console.log("blarg");
	
	for(let i = 0; i < boxes.length; i++){
		let temp = document.getElementById(boxes[i]);
		temp.innerHTML = "";
	}
}
function fullReset(){
	console.log("bloop");
	reset();
	player1.score = 0;
	player2.score = 0;
	let temp = document.getElementById("playerOne");
	temp.innerHTML = player1.score;
	temp = document.getElementById("playerTwo");
	temp.innerHTML = player2.score;
	live = true;
	if(turn == 0){
		turn = 1;
	}
	else{
		turn = 0;
	}
}
function newGame(){
	fullReset();
}
function newRound(){
	//check if round is over before new round
	live = true;
	reset();
	// add point to winner
}
function changeTurn(){
	let active = "lightblue";
	let inactive = "red";
	if(turn == 0){
		turn = 1;
		ex.style.background = inactive;
		playerOne.style.background = inactive;
		oh.style.background = active;
		playerTwo.style.background = active;
	}
	else{
		turn = 0;
		ex.style.background = active;
		playerOne.style.background = active;
		oh.style.background = inactive;
		playerTwo.style.background = inactive;
	}
}

changeTurn();
// array of available moves

function checkMove(elem){
	if(elem.innerHTML.length === 0){
		return true;
	}
	else{
		return false;
	}
}
function winner(letter){
	console.log(letter);
	if(player1.letter === letter){
		player1.won();
		let temp = document.getElementById("playerOne");
		temp.innerHTML = player1.score;
		live = false;
	}
	else{
		player2.won();
		let temp = document.getElementById("playerTwo");
		temp.innerHTML = player2.score;
		live = false;
	}
	
}
function checkArr(group){
	let length = group.length;
		//console.log("length:", length,"--------------------");
	for(let i = 0; i < length; i++){
		let temp = group[i];
		let first = "";
		let second = "";
		for(let j = 0; j < 3; j++){
			let temper = document.getElementById(boxes[temp[j] - 1]);
			//console.log(temper, j);
			let check = temper.innerHTML;
			// if first box is blank, skip this row
			if(check === ""){
				break;
			}
			// if first box is not blank, set first to check
			else if(check !== "" && j === 0){
				first = check;
				continue;
			}
			// if first box is a char, check second box. if not same, skip row
			else if(j === 1){
				if(first === check){
					second = check;
					continue;
				}
				else{break;}
			}
			//if first two are the same,  check third. if not same, skip row
			else if(second === check){
				console.log(first,":",second,":",check, "winner");
				winner(check);
				return true;
			}
		}
	}
}
function checkWin(){
	// check rows
	let rows =[[1,2,3],[4,5,6],[7,8,9]];
	let cols = [[1,4,7],[2,5,8],[3,6,9]];
	let diag = [[1,5,9],[3,5,7]];
	if(checkArr(rows)){
		console.log("here");
	}
	else if(checkArr(cols)){
		console.log("wow got here");
	}
	else if(checkArr(diag)){
			console.log("poodoo");
	}
	else{
		//console.log("hiiii");
		
	}
	//check columns
	
	//check diagonals
	
}

function makeMove(elem) {
	//console.log("make a move");
	if(live){
	if(checkMove(elem)){
		let mark = "";
		if(turn == 0){
			mark = "X";
		}
		else{
			mark = "O";
		}
		elem.innerHTML = mark;
		checkWin();
		changeTurn();
		
	}
	else {
		//console.log(elem.innerHTML);
	}
	}
}