/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

/*----- app's state (variables) -----*/

let board;
let turn = 'X';
let win;

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);


/*----- functions -----*/

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        return winner ? winner : board.includes('') ? null : 'T';
};

function handleTurn() {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    render();

    // Ajoute la sauvegarde du nombre de parties gagnées
    if (win === 'X' || win === 'O') {
        // mettre le nombre de parties gagnées pour le joueur 
        const playerWins = localStorage.getItem(win) || 0;
        localStorage.setItem(win, parseInt(playerWins) + 1);
        // met à jour l'affichage du nombre de parties gagnées
        updateWinsDisplay();
    }
};

function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    render();

    // met à jour l'affichage du nombre de parties gagnées au chargement de la page
    updateWinsDisplay();
};

function render() {
    board.forEach(function(mark, index) {
    //this moves the value of the board item into the squares[idx]
    squares[index].textContent = mark;
    });
    messages.textContent = win === 'T' ? `C'est un match nul` : win ? `${win} a gagné la partie` : `C'est au tour de ${turn}`;
    };

    function updateWinsDisplay() {
        // met à jour l'affichage du nombre de parties gagnées pour chaque joueur
        const xWins = localStorage.getItem('X') || 0;
        const oWins = localStorage.getItem('O') || 0;
        console.log(`Nombre de parties gagnées par X : ${xWins}`);
        console.log(`Nombre de parties gagnées par O : ${oWins}`);
    }   
init();            