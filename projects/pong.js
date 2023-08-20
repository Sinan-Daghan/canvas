let ball = {
    x: 200,
    y: 200,
    radius: 10,
    color: 'red',
    speedX: 0.7,
    speedY: 1,

    move: function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x - this.radius < Player.width) {
            if (this.y > player1.y && this.y < player1.y + Player.height) {
                this.x = Player.width + this.radius;
                this.speedX *= -1;
            }
        }
        if (this.x + this.radius > (canvas.width - Player.width)) {
            if (this.y > player2.y && this.y < player2.y + Player.height) {
                this.x = canvas.width - Player.width - this.radius;
                this.speedX *= -1;
            }
        }
        if (this.x < 0) {
            this.x = 0;
            this.speedX *= -1;
        }
        if (this.y < 0) {
            this.y = 0;
            this.speedY *= -1;
        }
        if (this.x > canvas.width) {
            this.x = canvas.width;
            this.speedX *= -1;
        }
        if (this.y > canvas.height) {
            this.y = canvas.height;
            this.speedY *= -1;
        }
    },
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Player {
    static width = 10;
    static height = 100;
    constructor(side) {
        this.width = Player.width;
        this.height = Player.height;
        this.color = 'black';
        this.y = canvas.width / 2 - this.height / 2;
        this.direction = 'stop';
        this.step = 1;
        if (side == 'left') {
            this.x = 0;
        } else if (side == 'right') {
            this.x = canvas.width - this.width;
        }

    }
    move() {
        this.y += this.step;

        if (this.y < 0) {
            this.y = 0;
            this.step *= -1;
        } else if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
            this.step *= -1;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let player1 = new Player('left');
let player2 = new Player('right');

document.addEventListener('keyup', (e) => {
    if (e.key == 'a' || e.key == 'A') player1.step = -1;
    if (e.key == 'z' || e.key == 'Z') player1.step = 1;

    if (e.key == 'j' || e.key == 'J') player2.step = -1;
    if (e.key == 'n' || e.key == 'N') player2.step = 1;
})

main_loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player1.move();
    player2.move();
    player1.draw();
    player2.draw();
    ball.move();
    ball.draw();
    setTimeout(() => {
        window.requestAnimationFrame(main_loop);
    }, 5)
}
window.requestAnimationFrame(main_loop);