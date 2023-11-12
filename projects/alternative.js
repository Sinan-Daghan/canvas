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
angleIncrement = 2 * Math.PI / 720;

let length = circles.length;

let main_loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (angle >= 2 * Math.PI) angle = 0;
    angle += angleIncrement;

    circles[0].y = Math.cos(angle) * 100 + canvas.height / 2;
    circles[0].draw();

    for (let i = length - 1; i >= 1; i--) {
        circles[i].y = circles[i - 1].y;
        circles[i].draw();
    }
    window.requestAnimationFrame(main_loop);
}
window.requestAnimationFrame(main_loop);