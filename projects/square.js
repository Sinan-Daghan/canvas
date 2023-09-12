let isClearBackground = true;
let drawSquareEdge = false;

let btn_clearBackground = create_button('Clear Background \n OFF', canvas_interface, () => {
    isClearBackground = !isClearBackground;
    isClearBackground ? btn_clearBackground.innerText = 'Clear Background \n ON' : btn_clearBackground.innerText = 'Clear Background \n OFF';
});

let btn_drawSquareEdge = create_button('Draw Square Edge \n OFF', canvas_interface, () => {
    drawSquareEdge = !drawSquareEdge;
    drawSquareEdge ? btn_drawSquareEdge.innerText = 'Draw Square Edge \n ON' : btn_drawSquareEdge.innerText = 'Draw Square Edge \n OFF';
});

class Square {
    constructor(x, y, width, color) {
        this.position = new Vector(x, y);
        this.width = width;
        this.color = color;
        this.velocity = new Vector(0.2, 1);
        this.step = 1;
        this.h = 10;
        this.color = `hsl(${this.h}, 50%, 50%)`
    }
    move(){
        this.position = this.position.add(this.velocity);
        if (this.position.x + this.width >= canvas.width) {
            this.position.x = canvas.width - this.width;
            this.velocity.x *= -1;
        }
        if (this.position.x <= 0) {
            this.position.x = 0;
            this.velocity.x *= -1;
        }
        if (this.position.y <= 0) {
            this.position.y = 0;
            this.velocity.y *= -1;
        }
        if (this.position.y + this.width >= canvas.height) {
            this.position.y = canvas.height - this.width;
            this.velocity.y *= -1;
        }
        if (this.step > 10) {
            this.step = 0;
            this.h = this.h + 10;
            this.color = `hsl(${this.h}, 50%, 50%)`
        }
        this.step ++;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.position.x, this.position.y, this.width, this.width);
        ctx.fillStyle = this.color;
        ctx.fill();
        if (drawSquareEdge ) ctx.stroke();
    }
}
let square = new Square(10,100, 50, 'red');

let loop = () => {
    if ( isClearBackground ) ctx.clearRect(0, 0, canvas.width, canvas.height);
    square.move();
    square.draw();
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);