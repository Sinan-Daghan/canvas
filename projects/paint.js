
let clickCount = 0;

let boxCanvas = canvas.getBoundingClientRect();
let canvasCorner = new Vector(boxCanvas.x, boxCanvas.y);

let v1 = new Vector(0, 0);
let v2 = new Vector(0, 0);
let Vmouse = new Vector(0, 0);

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

    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    v1 = new Vector(0, 0);
    v2 = new Vector(0, 0);
}