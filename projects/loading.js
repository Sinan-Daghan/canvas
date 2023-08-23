class Rectangle {
    static y = 200;
    static height = 5;
    constructor(x, width, color) {
        this.x = x;
        this.y = Rectangle.y;
        this.width = width;
        this.height = Rectangle.height;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

let seperator = new Rectangle(0, 4, 'black');
let left = new Rectangle(0, 0, 'rgb(209, 92, 38)');
let right = new Rectangle(0, 0, 'rgb(209, 49, 38)');

let percent = 0;
let x_off = 150;

let main_loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (percent > 100) percent = 0;

    left.x = x_off;
    left.width = percent;
    right.x = x_off + percent;
    right.width = 100 - percent;
    seperator.x = x_off + percent - 2;

    left.draw();
    right.draw();
    seperator.draw();

    setTimeout(() => {
        window.requestAnimationFrame(main_loop);
        percent += 1;
    }, 20);
}
window.requestAnimationFrame(main_loop);