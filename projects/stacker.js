color = 200;
class Tile {
    static height = 10;
    static width = 200;
    constructor(y1) {
        this.width = Tile.width;
        this.x1 = 0;
        this.y1 = y1;
        this.x2 = Tile.width;
        this.increment = 1;
        this.movable = true;
        this.color = `hsl(${color}, 50%, 50%)`;
        color += 10;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x1, this.y1, this.width, Tile.height);
    }
    move() {
        if (!this.movable) return;

        this.x1 += this.increment;
        this.x2 = this.x1 + this.width;

        if (this.x1 < 0) {
            this.x1 = 0;
            this.x2 = this.width;
            this.increment *= -1;
        }
        if (this.x2 > canvas.width) {
            this.x1 = canvas.width - this.width;
            this.increment *= -1;
        }
        this.x2 = this.x1 + this.width;
    }
}
let Tiles = [];

//first Tile
let y1 = (canvas.height - Tile.height);
let tile = new Tile(y1);
tile.x1 = canvas.width / 2 - Tile.width / 2;
tile.x2 = tile.x1 + Tile.width;
tile.movable = false;
Tiles.push(tile);
//second Tile
y1 -= Tile.height;
Tiles.push(new Tile(y1));

let button = create_button("Tile length : " + Tile.width, canvas_interface, null);

function intersect(A, B) {
    if (B.x1 > A.x2 || B.x2 < A.x1) {
        console.log("game over");
        return false;
    }
    if (B.x1 == A.x1) {
        B.x1 = A.x1;
        B.x2 = A.x2;
    }
    if (B.x1 < A.x1) {
        B.x1 = A.x1;
    }
    if (B.x2 > A.x2) {
        B.x2 = A.x2;
    }
    B.width = B.x2 - B.x1;
    Tile.width = B.width;
    button.innerText = " Tile length : " + Tile.width;
    return true;
}

let loopId;
let main_loop = () => {
    ctx.fillStyle = `hsl(0, 0%, 0%)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    Tiles.forEach(tile => {
        tile.draw();
        tile.move();
    });

    setTimeout(() => {
        loopId = window.requestAnimationFrame(main_loop);
    }, 10)
}
loopId = window.requestAnimationFrame(main_loop);

let yLimit = 200;

let game_over = false;
document.addEventListener('click', () => {
    if (game_over) return;

    if (y1 <= yLimit + 10) {
        for (let i = 1; i < 10; i++) {
            setTimeout(() => {
                Tiles.forEach(tile => { tile.y1++ });
            }, 15 * i);
        }
        y1 = yLimit;
    } else {
        y1 -= Tile.height;
    }

    Tiles[Tiles.length - 1].movable = false;

    if (!intersect(
        Tiles[Tiles.length - 2],
        Tiles[Tiles.length - 1]))
        {
            window.cancelAnimationFrame(loopId);
            button.innerText = "Game Over ! \n Score : " + Tiles.length + " tiles";
            game_over = true;
            return;
        };
    Tiles.push(new Tile(y1));
});