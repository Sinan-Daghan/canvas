class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 'rgba(0,0,0,1)';
    }
    move() {
        const random = Math.random();
        if (random < 0.25) {
            this.x++;
        } else if (random < 0.5) {
            this.x--;
        } else if (random < 0.75) {
            this.y++;
        } else {
            this.y--;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 1, 1);
    }
}

let square = new Square(canvas.width / 2, canvas.height / 2);
let main_loop = () => {
    square.move();
    square.draw();

    setTimeout(() => {
        window.requestAnimationFrame(main_loop);
    }, 10);
}
window.requestAnimationFrame(main_loop);