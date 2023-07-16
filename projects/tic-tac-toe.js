canvas_interface.style.display = 'none';
canvas.style.display = 'none';

// player1 = false // means player2
player1 = true;
toggle_player = () => {
    player1 = !player1;
}

let X_grid = [];
let O_grid = [];
let filledCells = 0;

let game_over = false;
function end_game() {
    grid.style.border = '15px solid red';
    game_over = true;
}

class Case {
    constructor(index) {
        this.case = document.createElement('div');
        this.case.style.border = '1px solid black';
        this.case.style.boxSizing = 'border-box';

        this.index = index;
        this.empty = true;
        this.case.addEventListener('click', () => this.check());
    }

    check() {
        if(this.empty && !game_over) {

            this.empty = false;
            toggle_player();

            if (player1) {
                X_grid[this.index] = true;
                testGrid(X_grid, win_combos);
                this.case.style.backgroundColor = 'hsl(100, 50%, 50%)';
            } else {
                O_grid[this.index] = true;
                testGrid(O_grid, win_combos);
                this.case.style.backgroundColor = 'hsl(220, 50%, 50%)';
            }

            filledCells++;
            if (filledCells === 9) {
                end_game();
            }
        }
    }
}

let grid = document.createElement('div');
grid.style.width = '400px';
grid.style.height = '400px';
grid.style.border = '1px solid black';
grid.style.boxSizing = 'border-box';
grid.style.position = 'absolute';
grid.style.top = '50%';
grid.style.left = '50%';
grid.style.transform = 'translate(-50%, -50%)';
grid.style.display = 'grid';
grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
grid.style.gridTemplateRows = 'repeat(3, 1fr)';
main.appendChild(grid);

let win_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1 ,4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4 ,6]
]

function testGrid (array, win_combos) {
    win_combos.forEach(combo => {
        if(array[combo[0]] && array[combo[1]] && array[combo[2]]) {
            end_game();
        }
    });
}

for (let i = 0; i < 9; i++) {
    let newCase = new Case(i);
    grid.appendChild(newCase.case);
}