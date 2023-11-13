let circles = [];

let atoms = 400;
let atomLength = canvas.width / atoms;

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
for (let i = 0; i < atoms; i++) {
    circles.push(new Circle(atomLength * i, canvas.height / 2, 5, 'blue'));
}

let angle = Math.PI / 2;
let angleIncrement = 2 * Math.PI / 720;

let length = circles.length;
let fps = 60;
let elapsedMs = 0;
let lastFrameMs = new Date().getTime();

let main_loop = () => {

    if (elapsedMs < (1000 / fps)) {
        elapsedMs = new Date().getTime() - lastFrameMs;
        setTimeout(main_loop, 20);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (angle >= 2 * Math.PI) angle = 0;
        angle += angleIncrement;

        circles[0].y = Math.cos(angle) * 100 + canvas.height / 2;
        circles[0].draw();

        for (let i = length - 1; i >= 1; i--) {
            circles[i].y = circles[i - 1].y;
            circles[i].draw();
        }
        elapsedMs = 0;
        lastFrameMs = new Date().getTime();
        main_loop();
    }
}
window.requestAnimationFrame(main_loop);

create_slider('Atoms', canvas_interface, 10, 180, 30, 1).addEventListener('input', (e) => {
    fps = e.target.value;
    console.log(fps);
});

window.requestAnimationFrame(main_loop);