// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. spin the slot machine
// 5. check if the user won
// 6. give users their winnings
// 7. play again

// function deposit(){
//     return 1
// };
// const x = deposit()
// file order imports / libraries then global variables then classes and functions then mainline other aspects
const prompt = require("prompt-sync")();
// global variables at the top 

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = { // values for amount of each symbol within the array 
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8,
}

const SYMBOLS_VALUES = { // multiplyer
    "A": 5, 
    "B": 4,
    "C": 3,
    "D": 2,
}



const deposit = () => {
    while (true){ // continue looping to check 
    const depositAmount = prompt("Enter a deposit amount: ")
    const numberDepositAmount = parseFloat(depositAmount); // converts input to float

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid deposit amount, try again.");
    } else {
        return numberDepositAmount;
    }
    }
};

const getNumberOfLines = () => {
    while (true){ // continue looping to check 
        const lines = prompt("Enter the number of lines to bet on (1-3): ")
        const numberOfLines = parseFloat(lines); // converts input to float
    
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
        }
}

const getBet= (balance, lines) => { // need to pass a balance to the function as a parameter
    while (true){ // continue looping to check 
        const bet = prompt("Enter the bet per line: ")
        const numberBet = parseFloat(bet); // converts input to float
    
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){ // makes sure you do not bet more than you have 
            console.log("Invalid bet, try again.");
        } else {
            return numberBet;
        }
        }

}


const spin = () => { // symbols = [] contains all of the symbols 
    const symbols = []; // not going to change values just use and manipulate array
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol); // .push inserts elements into array. array (collection of elements)
        }
    }

    // [A, B, C]
    // 0   1   2
    const reels = []; // nested arrays. has all of the different reels
    for (let i = 0; i < COLS; i++) {
        reels.push([]); // while i is < the number of columns keep going and increase +1
            const reelSymbols = [...symbols]; // randomly select a symbol and add to reel and remove from possibilities
        for (let j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length); // generates max possibilities, rounds to nearest whole number (Math.floor())
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol); // adding it into index 
            reelSymbols.splice(randomIndex, 1); // 1 means remove 1 element 
        }
    }
    return reels;
};
// helper function 
const transpose = (reels) => { // transposing columns to rows 
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]); // pushing elements from ROWS column and 
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]) // column j at row i
        }
    }

    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) { // looping through index and element in row 
            rowString += symbol // concat string 
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) { // loop through every symbol 
            if (symbol != symbols[0]){  // if symbol is not same breaks out of loop
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]]; // multiplies by symbols_value
        }
    }
    return winnings;
};


const game = () => {
    let balance = deposit(); // let allows you to adjust the value of the variable (change what it stores)
    // console.log(depositAmount);

    while (true) {
        console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());

    if (balance <= 0) {
        console.log("You ran out of money!")
        break;
    }
    const playAgain = prompt("Do you want to play again? (y/n)")
    if (playAgain !="y") break;
    }
}

game();



// right now everything will be in column format
// [[A B C], [D D D], [A A A]]
// but we want it to have it in row form and take the first from each column section
// like this [A D A]
// B D A
// C D A to transpose a 2d matrix 
