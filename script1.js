let playerName = "Nelson"
playerName = "David";
const maxlives = 5;
console.log(playerName);
console.log(5 == "5");
console.log(5 === "5")
console.log(5 === 5)
const students = ["K", "Nelson2", "J", "S", "Nelson1", "U", "A", "C"];
const fruits = ["apple", "orange", "soursop", "mango", "grape", "Kiwi];"]
console.log(students[0] + "loves" + fruits[0] + " very much")
console.log('${student[5]} loves ${fruits[5]}very much')

let kamsiScore = 95;
let bryanScore = 95;
let totalScore = kamsiScore + bryanScore;
console.log(totalScore, kamsiScore++);
console.log(kamsiScore >= bryanScore);

let hasplayed = true;
let isGameOver = false;
console.log(!hasplayed && !isGameOver);

if (kamsiScore < totalScore) {
    console.log("kamsi is in the lead");
} else if (bryanscore > kamsiscore) {
    console.log("bryan is winning");
} else {
    console.log("its a tie");
}
let currentLevel = "Gold";
switch (currentLevel) {
    case "Bronze":
        console.log("keep practising");
        break;
    case "silver":
        console.log("You are getting good");
    case "Gold":
        console.log("You are a master");
        break;
    default:
        console.log("Level unknown");

}
let countdown = 3
while (countdown > 0) {
    console.log(countdown);
    countdown--;
}
console.log("Go!")
let players = ["Alicia", "Emmanuel", "Nelson"]
for (let i = 0; i < player.length; i++) {
    console.log("welcome", players[i]);['welcome', 'Alicia'], ['welcome', 'Emmanuel'], ['welcome', 'Nelson']
}
if (score1 > score2) {
    return "player1 wins";
} else {
    return "players2 wins";
}
let result = checkWinner(kamsiScore, bryanScore);
let appName = "Tic-Tac-Toe"; //Global: Everyone can see this

function startGame() {
    let secretcode = 1234; //local: Trapped inside this
    console.log("starting" + appName);
}

const myButton = document.getElementById("Submit - btn");
myButton.addEventListener("clicl", function () {
    myButton.style; length.backgroundColor = "purple";
    alert("Message sent successful!");
});