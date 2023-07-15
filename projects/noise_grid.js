canvas_interface.style.display = 'flex';
canvas.style.backgroundColor = 'rgba(0,0,0,0)'

class Tile {
    static length = 25;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 'hsl(0, 50%, 50%)';
    }
    randomColor() {
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, Tile.length, Tile.length);
    }
}

let counter = create_button(`Tile length : ${Tile.length}`, canvas_interface, null);

let grid = [];

function create_grid() {
    // update the Tile length text when creating the grid
    counter.innerText = `Tile length : ${Tile.length}`;

    grid = [];
    for (let i = 0; i <= canvas.width - Tile.length; i += Tile.length) {
        for (let j = 0; j <= canvas.height - Tile.length; j += Tile.length) {
            grid.push(new Tile(i, j));
        }
    }
}
create_grid();

let draw_random_grid = () => {
    for (let tile of grid) {
        tile.randomColor();
        tile.draw();
    }
}
draw_random_grid();

setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_random_grid();
}, 1000);

create_button('Tile length +', canvas_interface, () => {
    if (Tile.length === 50) return;
    Tile.length++;
    create_grid();
});

create_button('Tile length -', canvas_interface, () => {
    if (Tile.length === 1) return;
    Tile.length--;
    create_grid();
});