let continuous = false;
let btn_continuous = create_button('Continuous', canvas_interface, () => {
    continuous = !continuous;
    continuous ? btn_continuous.style.border = "2px solid red" : btn_continuous.style.border = "none";
});

let previous_point = { x: 0, y: 0 };
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
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 1, 1);
        if (color) {
            if (this.colorAngle > 360) this.colorAngle = 0;
            this.color = `hsl(${this.colorAngle}, 100%, 50%)`;
            this.colorAngle++;
        } else {
            this.color = 'rgba(0,0,0,1)';
        }
        if (continuous)  {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.moveTo(previous_point.x, previous_point.y);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
        }
        previous_point.x = this.x;
        previous_point.y = this.y;
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

let box = document.createElement('div');
box.style.display = 'flex';
box.style.gap = '30px';
canvas_interface.appendChild(box);

let plus = create_button('+', box, () => {
    if (square.step < 30) {
        square.step ++;
    }
    button_step.innerText = 'step : ' + square.step;
});

let minus = create_button('-', box, () => {
    if (square.step > 1) {
        square.step --
    }
    button_step.innerText = 'step : ' + square.step;
});

plus.style.width = '50px';
plus.style.height = '50px';
minus.style.width = '50px';
minus.style.height = '50px';

let color = false;
let btn_color = create_button ('Color', canvas_interface, () => {
    color = !color;
    color ? btn_color.style.border = "2px solid red" : btn_color.style.border = "none";
});