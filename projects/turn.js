let angle = 0;
let angleDeg = 0;
let turn = 0;

ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = "20px Arial";

let Vcenter = new Vector(canvas.width / 2, canvas.height / 2);
let drawTextCircle = () => {
    ctx.beginPath();
    ctx.arc(Vcenter.x, Vcenter.y, 30, 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(${angleDeg}, 50%, 50%)`;
    console.log(angle);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.fillText(angleDeg.toFixed(1), Vcenter.x, Vcenter.y);
}

let Vmouse = new Vector(0, 0);
let VcenterScreen = new Vector(window.innerWidth / 2, window.innerHeight / 2);
let VcenterMouse = new Vector(0, 0);

onmousemove = (e) => {
    Vmouse.x = e.clientX;
    Vmouse.y = e.clientY;
    VcenterMouse = Vmouse.sub(VcenterScreen);

    let cosAngle = VcenterMouse.x / VcenterMouse.get_magnitude();
    angle = Math.acos(cosAngle);
    if (VcenterMouse.y > 0) {
        angle = 2 * Math.PI - angle;
    }
    angleDeg = angle * 180 / Math.PI;
}

let render_loop = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw_Vstart_Vector(Vcenter, VcenterMouse, true, 'black');

    drawTextCircle();

    window.requestAnimationFrame(render_loop);
}
window.requestAnimationFrame(render_loop);