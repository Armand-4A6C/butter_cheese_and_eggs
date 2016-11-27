//saved arrayof strings
var numbarray = ['','one','two','three','four','five', 'six','seven','eight','nine']

// used to store the information of each block in the 9grid
var arrayofmoves = []
var nmb = 0

//used to store temporarly information
var blcknumb = "" //used to store an Id number
var varprint = "" //used to store a message before returning it to UI
var character = "" // used to save a character after each turn

//Counter for the amount of passed turns
var varturncount = 0

// saved strings
var temp = ""
var blok = "block_"
var P_one = "Player 1"
var P_two = "Player 2"
var P_cpu = "Computer"
var close_sol = 99
var character_O = "O" // 0 is for player1

var character_X = "X" // X is for player2

var player = 1 //used to indentify player 1

//switches
var turnswitch = 1 	//1 = player1   			2 = player2 or cpu
var cpu = 0 		//1 = singleplayer   		0 = multiplayer
var game = 0 		//0 = game in process   	1 = game ended

/////////////////////////////////////////////////////////////////////
function closesolution(){
	if(close_sol == 99){
		close_sol= 1
		varprint= "Known solutions are Disabled"
	}
	else{
		close_sol=99
		varprint="Known solutions are Enabled"
	}
	printdisplay()
}
function setpmode_one(){
	cpu = 1
	turnswitch = 1
	reset()
	varprint = "Human player starts first"
	printdisplay()	
	P_two = "Computer"
}
function setpmode_two(){
	cpu = 0
	turnswitch = 1
	reset()
	P_two = "Player 2"
}

///////////////////////////////////////////////////////////////////

//Reset function
function reset(){
	for(i=1; i<=9; i++){
		arrayofmoves[i] = "";
		blcknumb = blok+numbarray[i];
		document.getElementById(blcknumb).innerHTML = '';
	}
	varturncount = 0
	turnswitcher()
	turnswitcher()
	printdisplay()
	arrayofmoves = ['','10','20','3','4','5','6','7','8','9']
	game = 0
}
/////////////////////////////////////////////////////////////////////

//Core of the program
function execute(){
	if(game == 0){
		if(arrayofmoves[nmb] != 1 && arrayofmoves[nmb] != 2){
			//Storage functions
			blcknumb = blok+numbarray[nmb];	//saves ID name
			arrayofmoves[nmb] = turnswitch; //Saves player action into array
			document.getElementById(blcknumb).innerHTML = character; //writes O or X to ID
			
			//calculating functions
			win(); 							//Tests for a won game
			turncounter();					//counts turn's
			if(game == 0){
				turnswitcher();				//Switches player after each turn
				cpu_opponent();				//Plays computer opponent
			}
			printdisplay();					//Return's to display
		}
	}
}
////////////////////////////////////////////////////////////////////

//Print to display
function printdisplay(){
	document.getElementById("display").innerHTML = varprint
}

//Switches which character is displayed.
function turnswitcher(){
	if (turnswitch == 2){
		character = character_O
		turnswitch = 1
		varprint = "Its "+P_one+" it's turn"
	}
	else{
		character = character_X
		turnswitch = 2
		varprint = "Its "+P_two+" it's turn"
	}
}

//Counts the turns
function turncounter(){
	varturncount += 1
	if(varturncount == 9){
		varturncount = 0
		varprint = "The game is a draw"
		game = 1
		printdisplay()
	}
}
////////////////////////////////////////////////////////////////

//checks if some 1 has won
function win(){
	
	//horizontal checks
	if(arrayofmoves[1] == arrayofmoves[2] && arrayofmoves[2] == arrayofmoves[3]){
		winprint()
	}
	else if(arrayofmoves[4] == arrayofmoves[5] && arrayofmoves[5] == arrayofmoves[6]){
		winprint()
	}
	else if(arrayofmoves[7] == arrayofmoves[8] && arrayofmoves[8] == arrayofmoves[9]){
		winprint()
	}
	
	//vertical checks
	else if(arrayofmoves[1] == arrayofmoves[4] && arrayofmoves[4] == arrayofmoves[7]){
		winprint()
	}
	else if(arrayofmoves[2] == arrayofmoves[5] && arrayofmoves[5] == arrayofmoves[8]){
		winprint()
	}
	else if(arrayofmoves[3] == arrayofmoves[6] && arrayofmoves[6] == arrayofmoves[9]){
		winprint()
	}
	
	//diagonal checks
	else if(arrayofmoves[1] == arrayofmoves[5] && arrayofmoves[5] == arrayofmoves[9]){
		winprint()
	}
	else if(arrayofmoves[3] == arrayofmoves[5] && arrayofmoves[5] == arrayofmoves[7]){
		
		winprint()
	}
}
function winprint(){
	if (player == turnswitch){
		varprint = P_one+" Won the game"	
		game = 1
	}
	else{
		varprint = P_two+" Won the game"	
		game = 1
	}
	printdisplay()
}

////////////////////////////////////////////////////////////////

//Computer opponent{
function cpu_opponent(){
	if(cpu == 1 && turnswitch == 2){
		//Captures the middle
		if(arrayofmoves[5] != 1 && arrayofmoves[5] != 2){
			block__five()
			temp ="5C"
		}
		//makes sure top horizontal row isn't captured
		else if(arrayofmoves[1] == 10 && arrayofmoves[2] == arrayofmoves[3]){
			block__one()
			temp ="1H"
		}
		else if(arrayofmoves[2] == 20 && arrayofmoves[1] == arrayofmoves[3]){
			block__two()
			temp ="2H"
		}
		else if(arrayofmoves[3] == 3 && arrayofmoves[1] == arrayofmoves[2]){
			block__three()
			temp ="3H"
		}
		
		//makes sure middle horizontal row isn't captured
		else if(arrayofmoves[4] == 4 && arrayofmoves[5] == arrayofmoves[6]){
			block__four()
			temp ="4H"
		}
		else if(arrayofmoves[5] == 5 && arrayofmoves[4] == arrayofmoves[6]){
			block__five()
			temp ="5H"
		}
		else if(arrayofmoves[6] == 6 && arrayofmoves[4] == arrayofmoves[5]){
			block__six()
			temp ="6H"
		}
		
		//makes sure bottom horizontal row isn't captured
		else if(arrayofmoves[7] == 7 && arrayofmoves[8] == arrayofmoves[9]){
			block__seven()
			temp ="7H"
		}
		else if(arrayofmoves[8] == 8 && arrayofmoves[7] == arrayofmoves[9]){
			block__eight()
			temp ="8H"
		}
		else if(arrayofmoves[9] == 9 && arrayofmoves[7] == arrayofmoves[8]){
			block__nine()
			temp ="9H"
		}
		
		
		///////////////////////////////////////
		// makes sure left verticalrow isn't captured
		else if(arrayofmoves[1] == 10 && arrayofmoves[4] == arrayofmoves[7]){
			block__one()
			temp ="1V"
		}
		else if(arrayofmoves[4] == 4 && arrayofmoves[1] == arrayofmoves[7]){
			block__four()
			temp ="4V"
		}
		else if(arrayofmoves[7] == 7 && arrayofmoves[1] == arrayofmoves[4]){
			block__seven()
			temp ="7V"
		}
		
		//makes sure the middle verticalrow isn't captured
		else if(arrayofmoves[2] == 20 && arrayofmoves[5] == arrayofmoves[8]){
			block__two()
			temp ="2V"
		}
		else if(arrayofmoves[5] == 5 && arrayofmoves[2] == arrayofmoves[8]){
			block__five()
			temp ="5V"
		}
		else if(arrayofmoves[8] == 8 && arrayofmoves[2] == arrayofmoves[5]){
			block__eight()
			temp ="8V"
		}
		
		//makes sure the right verticalrow isn't captured
		else if(arrayofmoves[3] == 3 && arrayofmoves[6] == arrayofmoves[9]){
			block__three()
			temp ="3V"
		}
		else if(arrayofmoves[6] == 6 && arrayofmoves[3] == arrayofmoves[9]){
			block__six()
			temp ="6V"
		}
		else if(arrayofmoves[9] == 9 && arrayofmoves[3] == arrayofmoves[6]){
			block__nine()
			temp ="9V"
		}
		
		//makes sure the \\ diagonalrow isn't captured
		else if(arrayofmoves[1] == 10 && arrayofmoves[5] == arrayofmoves[9]){
			block__one()
			temp ="1D"
		}
		else if(arrayofmoves[5] == 5 && arrayofmoves[1] == arrayofmoves[9]){
			block__five()
			temp ="5D"
		}
		else if(arrayofmoves[9] == 9 && arrayofmoves[1] == arrayofmoves[5]){
			block__nine()
			temp ="9D"
		}		
		
		//makes sure the // diagonalrow isn't captured
		else if(arrayofmoves[3] == 3 && arrayofmoves[5] == arrayofmoves[7]){
			block__three()
			temp ="3D"
		}
		else if(arrayofmoves[5] == 5 && arrayofmoves[3] == arrayofmoves[7]){
			block__five()
			temp ="5D"
		}
		else if(arrayofmoves[7] == 7 && arrayofmoves[3] == arrayofmoves[5]){
			block__seven()
			temp ="7D"
		}		
		
		//counter movements
		else if(arrayofmoves[1] == 1 && arrayofmoves[9] == 9){
			block__nine()
			temp = "9Count"
		}
		else if(arrayofmoves[3] == 1 && arrayofmoves[7] == 7){
			block__seven()
			temp = "7Count"
		}
		else if(arrayofmoves[7] == 1 && arrayofmoves[3] == 3){
			block__three()
			temp = "3Count"
		}
		else if(arrayofmoves[9] == 1 && arrayofmoves[1] == 10){
			block__one()
			temp = "1Count"
		}
		
		//closes victory lines disabled on purpose
		else if(arrayofmoves[6] == close_sol && arrayofmoves[8] == close_sol && arrayofmoves[9] == 9) {
			block__nine()
			temp = "9specialcount"
		}
		
		else if(arrayofmoves[5] == close_sol && arrayofmoves[9] == close_sol && arrayofmoves[3] == 3){
			block__three()
			temp = "3specialcount"
		}
		else if(arrayofmoves[3] == close_sol && arrayofmoves[3] == close_sol && arrayofmoves[2] == 20){
			block__two()
			temp = "2specialcount"
		}
		
		//makes sure the game get's played out
		else if(arrayofmoves[1] == 10){
			block__one()
			temp ="1draw"
		}
		else if(arrayofmoves[2] == 20){
			block__two()
			temp ="2draw"
		}
		else if(arrayofmoves[3] == 3){
			block__three()
			temp ="3draw"
		}
		else if(arrayofmoves[4] == 4){
			block__four()
			temp ="4draw"
		}
		else if(arrayofmoves[5] == 5){
			block__five()
			temp ="5draw"
		}
		else if(arrayofmoves[6] == 6){
			block__six()
			temp ="6draw"
		}
		else if(arrayofmoves[7] == 7){
			block__seven()
			temp ="7draw"
		}
		else if(arrayofmoves[8] == 8){
			block__eight()
			temp ="8draw"
		}
		else if(arrayofmoves[9] == 9){
			block__nine()
			temp ="9draw"
		}
			
		//test info
		//varprint ="<br />"+temp+nmb
		//varprint +="<br />"+arrayofmoves
		
		printdisplay()	//return's to display after computer turn and for tests
	}
}

/////////////////////////////////////////////////////////////////

//Blocks to number input
function block__one(){
	nmb = 1
	execute()
}
function block__two(){
	nmb = 2
	execute()
}
function block__three(){
	nmb = 3
	execute()
}
function block__four(){
	nmb = 4
	execute()
}
function block__five(){
	nmb = 5
	execute()
}
function block__six(){
	nmb = 6
	execute()
}
function block__seven(){
	nmb = 7
	execute()
}
function block__eight(){
	nmb = 8
	execute()
}
function block__nine(){
	nmb = 9
	execute()
}
reset()