let playerText = document.getElementById('player-text'),
    restartBtn = document.getElementById('restart'),
    boxes = Array.from(document.getElementsByClassName('box'))

const O_TEXT = 'O',
    X_TEXT = 'X'

let currentPlayer = X_TEXT,
    spaces = Array(9).fill(null)

const start = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if (!spaces[id]) {
        spaces[id] = currentPlayer
    }

    e.target.innerText = currentPlayer
    console.log(e.target.innerText)

    const winner = win();
    if (winner) {
        playerText.innerHTML = `Player ${winner} menang`;
        restartBtn.style.visibility = 'visible'
        return; // Hentikan pemrosesan jika sudah ada pemenang
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT

}

const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

function win() {
    for (const condition of winCombination) {
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c]))
            return spaces[a]; // Mengembalikan nilai pemain yang menang
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
    })

    currentPlayer = X_TEXT

    playerText.innerHTML = "Tic Tac WOW"

    restartBtn.style.visibility = 'hidden'

}

start()
