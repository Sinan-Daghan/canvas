let clickCount = 0;

let boxCanvas = canvas.getBoundingClientRect();
let canvasCorner = new Vector(boxCanvas.x, boxCanvas.y);

let v1 = new Vector(0, 0);
let v2 = new Vector(0, 0);
let Vmouse = new Vector(0, 0);
let vectorColor = "black";
class colorPicker {
    static width = 30;
    constructor(x,y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = colorPicker.width;
    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, colorPicker.width, colorPicker.width);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

let AABB = (V1, V2, Vmouse) => {
    if (Vmouse.x > V1.x && Vmouse.x < V2.x && Vmouse.y > V1.y && Vmouse.y < V2.y) {
        return true;
    }
    return false;
}

onmousedown = (e) => {
    clickCount++;
    Vmouse = new Vector(e.clientX, e.clientY);

    if (clickCount == 1) {
        v1 = Vmouse;
        return;
    }
    v2 = Vmouse;

    clickCount = 0;
    v1 = v1.sub(canvasCorner);
    v2 = v2.sub(canvasCorner);
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.strokeStyle = vectorColor;
    ctx.stroke();
    vectorColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    v1 = new Vector(0, 0);
    v2 = new Vector(0, 0);
}