const words = ["computer", "programming", "machine-code"];
let word = '';
let wordSecret = '';
let gameEnd = false;

let body = {
	head: " ",
	torso: " ",
	leftArm: " ",
	rightArm: " ",
	leftLeg: " ",
	rightLeg: " "
};


function initGame()
{
	Object.keys(body).map(x => body[x] = " ");
	word = words[Math.floor(Math.random() * words.length)];
	wordSecret = '';
	for (letter of word)
		wordSecret += '_';
	gameEnd = false;
}

function printGallow()
{
	console.log(" _________\n",
	            "|       |\n",
	            "|      " + body.head + "\n",
	            "|      " + body.leftArm + body.torso + body.rightArm + "\n",
	            "|      " + body.leftLeg + " " + body.rightLeg + "\n",
	            "|\n");
}

function printSecret()
{
	let fmt = '';
	for (letter of wordSecret)
		fmt += letter + ' ';
	console.log(fmt);
}

function stepGame(guess = null)
{
	guess = guess == '\n' ? null : guess;
	process.stdout.write('\033c');
	
	if (guess != null && word.includes(guess)) {
		if (!(wordSecret.includes(guess))) {
			for (i = 0; i < word.length; ++i) {
				if (word[i] == guess) {
					wordSecret = wordSecret.substr(0, i) +  word[i] + wordSecret.substr(i + 1);
				}
			}
			if (wordSecret == word) {
				gameEnd = 'Win';
			}
		}
	} else if (guess != null) {
		if (body.head == " ") {
			body.head = "( )";
		} else if (body.torso == " ") {
			body.torso = "|";
		} else if (body.leftArm == " ") {
			body.leftArm = "/";
		} else if (body.rightArm == " ") {
			body.rightArm = "\\";
		} else if (body.leftLeg == " ") {
			body.leftLeg = "/";
		} else if (body.rightLeg == " ") {
			body.rightLeg = "\\";
			gameEnd = "Lose";
		}
	}

	printGallow();
	printSecret();
	if (gameEnd == false) {
		console.log('enter a guess');
	} else {
		console.log('You ' + gameEnd);
		console.log('Press Enter to play again');
	}
}



initGame();
stepGame();


process.stdin.on('data', (data) => {
	if (gameEnd != false) {
		initGame();
		stepGame();
		return;
	}
	const guess = data.toString()[0];
	stepGame(guess);
});


