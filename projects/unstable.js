let stopVector = new Vector(0, 0);
let left = new Vector(-5, 0);
let right = new Vector(5, 0);
let up = new Vector(0, -5);
let down = new Vector(0, 5);

let gravity = new Vector(0, 0.1);

let AABBB = (A, B) => {
    if (A.position.x1 < B.position.x2 && A.position.x2 > B.position.x1 && A.position.y1 < B.position.y2 && A.position.y2 > B.position.y1) {
        return true;
    }
    return false;
}

class Player {
    constructor() {
        this.position = new Vector(canvas.width / 2, canvas.height / 2 );
        this.x1 = this.position.x;
        this.x2 = this.position.x + this.width;
        this.y1 = this.position.y;
        this.y2 = this.position.y + this.height;

        this.velocity = new Vector(0, 0);
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {

        this.position = this.position.add(this.velocity);
        this.velocity = this.velocity.mult(0.99);
        this.velocity = this.velocity.add(gravity);

        if (this.position.x + this.width >= canvas.width) {
            this.position.x = canvas.width - this.width;
            this.velocity = stopVector;
            return;

        } else if (this.position.x <= 0) {
            this.position.x = 0;
            this.velocity = stopVector;
            return;

        }
        if (this.position.y <= 0) {
            this.position.y = 0
            this.velocity = stopVector;
            return;

        } else if (this.position.y + this.height >= canvas.height) {
            this.position.y = canvas.height - this.height;
            this.velocity = stopVector
            return;
        }
    }
}

let player = new Player();

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowUp":
            player.velocity = up;
            break;
        case "ArrowDown":
            player.velocity = down;
            break;
        case "ArrowLeft":
            player.velocity = left;
            break;
        case "ArrowRight":
            player.velocity = right;
            break;
        default:
            player.velocity = stopVector;
            break;
    }
})

main_loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();

    setTimeout(() => {
        window.requestAnimationFrame(main_loop);
    }, 10);
}
window.requestAnimationFrame(main_loop);