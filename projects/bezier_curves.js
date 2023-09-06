let topCanvas = document.createElement('canvas');
topCanvas.width = canvas.width;
topCanvas.height = canvas.height;
topCanvas.style.position = 'absolute';
topCanvas.style.top =  canvas.style.top;
topCanvas.style.left = canvas.style.left;
topCanvas.style.transform = canvas.style.transform;
topCanvas.style.zIndex = '1';
topCanvas.style.display = 'none';
document.body.appendChild(topCanvas);
let topCtx = topCanvas.getContext('2d');

let toggleTopCanvas = () => {
    topCanvas.style.display = topCanvas.style.display == 'block' ? 'none' : 'block';
}

let p1 = new Vector(100, 100);
let p2 = new Vector(200, 100);
let p3 = new Vector(300, 200);

let drawPoint = (Vector, color, context) => {
    context.beginPath();
    context.arc(Vector.x, Vector.y, 5, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
}

class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        // this.p2 = p2;
        this.end = p1;
        this.segment = p2.sub(p1);
        this.length = Math.sqrt(this.segment.x ** 2 + this.segment.y ** 2);
    }
    update() {
        this.end = (this.p1.add(this.segment.mult(t)));
    }
    draw(t) {
        draw_Vstart_Vend(this.p1, this.end);
    }
}

let s1 = new Segment(p1, p2);
let s2 = new Segment(p2, p3);

let t = 0;

let main_loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_Vstart_Vend(p1, p2);
    draw_Vstart_Vend(p2, p3);

    s1.update();
    // s1.draw(t);
    s2.update();
    // s2.draw(t)
    draw_Vstart_Vend(s1.end, s2.end);

    drawPoint(p1, 'rgb(0, 100, 100)', ctx);
    drawPoint(p2, 'rgb(0, 100, 100)', ctx);
    drawPoint(p3, 'rgb(0, 100, 100)', ctx);

    let s3 = new Segment(s1.end, s2.end);
    s3.update();
    drawPoint(s3.end, 'red', ctx);
    drawPoint(s3.end, 'red', topCtx);

    setTimeout(() => {
        window.requestAnimationFrame(main_loop);
        if (t > 1) {
            t = 0;
            topCtx.clearRect(0, 0, canvas.width, canvas.height);
        }
        t += 0.01;
    }, 20);
}
window.requestAnimationFrame(main_loop);

let btn = create_button('Draw Path', canvas_interface, () => {
    toggleTopCanvas();
    btn.style.border = btn.style.border == '3px solid red' ? 'none' : '3px solid red';
});