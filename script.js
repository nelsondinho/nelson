
/* =====================================================================
 * STEP 1: SELECTING HTML ELEMENTS (The DOM)
 * ---------------------------------------------------------------------
 * To make our game work, JavaScript needs to "grab" the HTML pieces.
 * We are intentionally using 4 different ways to grab elements to 
 * show you how flexible JavaScript is!
 * ===================================================================== */

// 1. querySelectorAll: Grabs ALL elements that share the same CSS class.
// It returns a list (like an Array) of all 9 squares on our board.
const cells = document.querySelectorAll(".cell");

// 2. querySelector: Grabs the very FIRST element that matches a CSS selector.
// We use a dot (.) for classes, just like in CSS!
const statusText = document.querySelector(".game-status");

// 3. getElementById: The fastest way to grab a SINGLE unique element.
// We don't need a '#' here because the method name already says 'Id'.
const board = document.getElementById("tic-tac-board");
const overlay = document.getElementById("game-overlay");
const overlayBtn = document.getElementById("overlay-btn");
const difficultySelect = document.getElementById("difficulty");
const strikeLine = document.getElementById("strike-line");


/* =====================================================================
 * STEP 2: SETTING UP THE GAME'S MEMORY (Variables & Arrays)
 * ---------------------------------------------------------------------
 * A computer needs variables to remember the state of the game.
 * ===================================================================== */

// 'const' means this variable can never be reassigned. 
// This 2D Array holds all 8 possible winning combinations (Indices 0-8).
const winConditions = [
    [0, 1, 2], // Row 0 (Top)
    [3, 4, 5], // Row 1 (Middle)
    [6, 7, 8], // Row 2 (Bottom)
    [0, 3, 6], // Col 0 (Left)
    [1, 4, 7], // Col 1 (Middle)
    [2, 5, 8], // Col 2 (Right)
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

// 'let' means we CAN change these values later as the game plays out.
let options = ["", "", "", "", "", "", "", "", ""]; // Tracks the 9 squares
let currentPlayer = "X"; // The Human is X, the Computer is O
let startingPlayerThisRound = "X"; // Alternates who starts first
let running = false; // A boolean (true/false) switch to turn the game on/off


/* =====================================================================
 * STEP 3: INITIALIZING THE GAME
 * ---------------------------------------------------------------------
 * Adding "Event Listeners" (Ears) so JavaScript can hear when we click.
 * ===================================================================== */

// When the player clicks the big Overlay Button, run the startGame function
overlayBtn.addEventListener("click", startGame);

// We use a '.forEach()' loop to attach a click listener to all 9 cells at once!
cells.forEach(cell => cell.addEventListener("click", cellClicked));

// This function resets everything and starts the round
function startGame() {
    // 1. Hide the overlay screen so we can see the board
    overlay.classList.remove("active");

    // 2. Hide the winning strike-line if it was showing from the last game
    strikeLine.className = "";

    // 3. Clear the JavaScript memory array
    options = ["", "", "", "", "", "", "", "", ""];

    // 4. Clear the HTML squares (remove text and color classes)
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x-mark", "o-mark");
    });

    // 5. Figure out whose turn it is to start
    currentPlayer = startingPlayerThisRound;
    running = true; // Turn the game ON

    // Conditionals (if/else) to decide what text to show
    if (currentPlayer === "X") {
        statusText.textContent = `Your turn! You are 'X'`;
        statusText.style.color = "var(--text-muted)";
    } else {
        statusText.textContent = `Computer is playing first...`;

        // setTimeout pauses the code for 600 milliseconds so the computer feels "human"
        setTimeout(computerTurn, 600);
    }
}


/* =====================================================================
 * STEP 4: HUMAN PLAYS A TURN
 * ===================================================================== */
function cellClicked() {
    // 'this' refers to the exact HTML square you just clicked.
    // We grab its custom 'cellIndex' attribute to know which number (0-8) it is.
    const cellIndex = this.getAttribute("cellIndex");

    // Decision Maker: 
    // If the square is NOT empty (""), OR the game is stopped, OR it's the computer's turn... DO NOTHING!
    if (options[cellIndex] !== "" || !running || currentPlayer === "O") {
        return;
    }

    // If it is a valid click, update the square and check if you won!
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    // 1. Update our JavaScript Array
    options[index] = currentPlayer;

    // 2. Update the HTML text on the screen
    cell.textContent = currentPlayer;

    // 3. Add CSS classes to color 'X' purple and 'O' red
    if (currentPlayer === "X") {
        cell.classList.add("x-mark");
    } else {
        cell.classList.add("o-mark");
    }
}


/* =====================================================================
 * STEP 5: CHECKING FOR A WIN OR DRAW
 * ===================================================================== */
function checkWinner() {
    let roundWon = false;
    let winningIndex = -1; // We use this to know which strike-line to draw

    // A 'for' loop checks all 8 combinations in our winConditions array
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]; // e.g., [0, 1, 2]

        // Look inside our options array to see what is currently in those 3 squares
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // If any cell in this row is empty, no one has won this row yet. Skip it.


        
        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        // Strict Equality (===): If cell A, B, and C all have the exact same letter...
        if (cellA === cellB && cellB === cellC) {
            roundWon = true; // WE HAVE A WINNER!
            winningIndex = i; // Save the winning row number so we can draw the line
            break; // Stop looping, we already found a winner
        }
    }

    // Logic: What happens next?
    if (roundWon) {
        drawWinningLine(winningIndex); // Draw the line!
        showGameOver(currentPlayer === "X" ? "win" : "lose");
    }
    // Check for a Draw: If our options array does NOT include any empty strings ("") left
    else if (!options.includes("")) {
        showGameOver("draw");
    }
    // If no win and no draw, pass the turn to the other player
    else {
        changePlayer();
    }
}

// Function to draw the cool line across the winning squares!
function drawWinningLine(index) {
    // We add specific CSS classes that we styled to match the 8 winning angles
    if (index === 0) strikeLine.className = "strike-row-0";
    if (index === 1) strikeLine.className = "strike-row-1";
    if (index === 2) strikeLine.className = "strike-row-2";
    if (index === 3) strikeLine.className = "strike-col-0";
    if (index === 4) strikeLine.className = "strike-col-1";
    if (index === 5) strikeLine.className = "strike-col-2";
    if (index === 6) strikeLine.className = "strike-diag-0";
    if (index === 7) strikeLine.className = "strike-diag-1";
}


/* =====================================================================
 * STEP 6: OVERLAY LOGIC FOR GAME OVER
 * ---------------------------------------------------------------------
 * Changes the color and text of the button depending on if you won or lost.
 * ===================================================================== */
function showGameOver(result) {
    running = false; // Stop the game

    // We wait 1 second (1000ms) before showing the overlay so you can see the winning line!
    setTimeout(function () {
        overlay.classList.add("active"); // Show the overlay screen

        // Remove old colors from the button
        overlayBtn.classList.remove("btn-purple", "btn-red", "btn-green");

        if (result === "win") {
            statusText.textContent = `YOU WIN! 🎉`;
            statusText.style.color = "var(--accent-purple)";
            overlayBtn.textContent = "Restart Game";
            overlayBtn.classList.add("btn-red"); // Red button on win

        } else if (result === "lose") {
            statusText.textContent = `COMPUTER WINS! 🤖`;
            statusText.style.color = "var(--accent-warm)";
            overlayBtn.textContent = "Play Again";
            overlayBtn.classList.add("btn-green"); // Green button on lose

        } else {
            statusText.textContent = `It's a Draw! 🤝`;
            statusText.style.color = "var(--text-muted)";
            overlayBtn.textContent = "Play Again";
            overlayBtn.classList.add("btn-green"); // Green button on draw
        }

        // Toggle who gets to start next round (If X started, O starts next)
        startingPlayerThisRound = (startingPlayerThisRound === "X") ? "O" : "X";

    }, 1000);
}


/* =====================================================================
 * STEP 7: CHANGING TURNS & THE SMART COMPUTER AI
 * ===================================================================== */
function changePlayer() {
    // Ternary Operator: A fast way to write an if/else statement
    // "If current is X, change to O. Otherwise, change to X."
    currentPlayer = (currentPlayer === "X") ? "O" : "X";

    if (currentPlayer === "X") {
        statusText.textContent = `Your turn! You are 'X'`;
    } else {
        statusText.textContent = `Computer is thinking...`;
        setTimeout(computerTurn, 600); // Wait 0.6 seconds, then run computerTurn
    }
}

// The Brains of the Computer
function computerTurn() {
    if (!running) return; // Don't play if the game is over

    let chosenSpot = -1;
    const difficulty = difficultySelect.value; // Checks the HTML dropdown ("easy" or "hard")

    if (difficulty === "hard") {
        // 1. Try to WIN: Can 'O' get three in a row right now?
        chosenSpot = findBestMove("O");

        // 2. Try to BLOCK: If 'O' can't win, is 'X' about to win? Block them!
        if (chosenSpot === -1) {
            chosenSpot = findBestMove("X");
        }

        // 3. Take the CENTER: If no one is about to win, take the middle (Index 4)
        if (chosenSpot === -1 && options[4] === "") {
            chosenSpot = 4;
        }
    }

    // 4. RANDOM FALLBACK (Used for Easy Mode, or if the Hard AI has no better moves)
    if (chosenSpot === -1) {
        let emptySpots = []; // Create a list of empty squares
        for (let i = 0; i < options.length; i++) {
            if (options[i] === "") emptySpots.push(i);
        }

        // Pick a random number based on how many empty spots are left
        const randomIndex = Math.floor(Math.random() * emptySpots.length);
        chosenSpot = emptySpots[randomIndex];
    }

    // Update the chosen cell
    const cellToUpdate = document.querySelector(`.cell[cellIndex="${chosenSpot}"]`);
    updateCell(cellToUpdate, chosenSpot);
    checkWinner();
}

// Helper Function for the Smart AI
// It checks all 8 winning lines to see if a player has 2 pieces and 1 empty spot
function findBestMove(playerSymbol) {
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];

        // Put the current values of this row into an Array
        const vals = [options[a], options[b], options[c]];

        // Count how many spots belong to the player, and how many are empty
        const countSymbol = vals.filter(val => val === playerSymbol).length;
        const countEmpty = vals.filter(val => val === "").length;

        // If the player has 2 spots and 1 is empty... we found our move!
        if (countSymbol === 2 && countEmpty === 1) {
            if (options[a] === "") return a;
            if (options[b] === "") return b;
            if (options[c] === "") return c;
        }
    }
    return -1; // Return -1 if no smart move was found
}