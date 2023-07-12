canvas_interface.style.display = 'none';

class Tile {
    static length = 50;

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

let grid = [];

for (let i = 0; i <= canvas.width - Tile.length; i += Tile.length) {
    for (let j = 0; j <= canvas.height - Tile.length; j += Tile.length) {
        grid.push(new Tile(i, j));
    }
}

let draw_random_grid = () =>{
    for (tile of grid) {
        tile.randomColor();
        tile.draw();
    }
}
draw_random_grid();

setInterval(() => {
    draw_random_grid();
}, 1000);