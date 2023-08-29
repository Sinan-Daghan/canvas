class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let p1 = new Point(200, 100);
let p2 = new Point(200, 200);
let p3 = new Point(300, 150);
let p4 = new Point(50, 150);

class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.stroke();
    }
}
let segment1 = new Segment(p1, p2);
let segment2 = new Segment(p3, p4);

// Done with "https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection" date: (29/08/2023);
let x1, y1, x2, y2, x3, y3, x4, y4, t, u;
let testIntersection = (segment1, segment2) => {
    x1 = segment1.p1.x;
    y1 = segment1.p1.y;
    x2 = segment1.p2.x;
    y2 = segment1.p2.y;
    x3 = segment2.p1.x;
    y3 = segment2.p1.y;
    x4 = segment2.p2.x;
    y4 = segment2.p2.y;
    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        ctx.beginPath();
        ctx.arc((x1 + t * (x2 - x1)), (y1 + t * (y2 - y1)), 4, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fill();
    }
}

let rect;
let setRect = () => { rect = canvas.getBoundingClientRect() };
setRect();
onresize = setRect;

onmousemove = (e) => {
    p4.y = e.clientY - rect.top;
    p4.x = e.clientX - rect.left;
    render();
}

let render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    segment1.draw();
    segment2.draw();
    testIntersection(segment1, segment2);
}
render();