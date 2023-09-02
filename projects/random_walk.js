class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.step = 1;
        this.color = 'rgba(0,0,0,1)';
        this.colorAngle = 0;
    }
    move() {
        const random = Math.random();
        if (random < 0.25) {
            this.x += this.step;
        } else if (random < 0.5) {
            this.x -= this.step;
        } else if (random < 0.75) {
            this.y += this.step;
        } else {
            this.y -= this.step;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 1, 1);
        if (color) {
            if (this.colorAngle > 360) this.colorAngle = 0;
            this.color = `hsl(${this.colorAngle}, 100%, 50%)`;
            this.colorAngle++;
        } else {
            this.color = 'rgba(0,0,0,1)';
        }
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

let button_step = create_button('step : 1', canvas_interface, null)

create_button('+', canvas_interface, () => {
    if (square.step < 30) {
        square.step ++;
    }
    button_step.innerText = 'step : ' + square.step;
});

create_button('-', canvas_interface, () => {
    if (square.step > 1) {
        square.step --
    }
    button_step.innerText = 'step : ' + square.step;
});

let color = false;
create_button ('Color', canvas_interface, () => {
    color = !color;
});