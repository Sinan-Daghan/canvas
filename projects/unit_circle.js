class Circle {
    constructor(x, y, radius) {
        this.position = new Vector(x, y);
        this.radius = radius;
    }
}

let Vmouse = new Vector(0, 0);
let Vcenter = new Vector(canvas.width / 2, canvas.height / 2);
let VcenterMouse = new Vector(0, 0);
let rectCanvas = canvas.getBoundingClientRect();
let VcanvasCenter = new Vector(rectCanvas.left, rectCanvas.top);

onmousemove = (e) => {
    Vmouse.x = e.clientX;
    Vmouse.y = e.clientY;

    VcenterMouse = Vmouse.sub(VcanvasCenter);
    VcenterMouse = VcenterMouse.normalize(100);
}

let unit_circle = new Circle(VcanvasCenter.x, VcanvasCenter.y, 100);
let r = unit_circle.radius;

let angle = 0;
let increment = -Math.PI / 180;

let sinus = new Vector(0, 0);
let cosinus = new Vector(0, 0);
let hypotenuse = new Vector(0, 0);

let sinus2 = new Vector(0, 0);
let cosinus2 = new Vector(0, 0);
let hypotenuse2 = new Vector(0, 0);

let render_loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sinus.y = Math.sin(angle);
    cosinus.x = Math.cos(angle);
    hypotenuse.x = cosinus.x;
    hypotenuse.y = sinus.y;

    ctx.beginPath();
    ctx.arc(Vcenter.x, Vcenter.y, r, 0, Math.PI * 2);
    ctx.rect(Vcenter.x, Vcenter.y, Math.cos(angle) * r, Math.sin(angle) * r);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    draw_Vstart_Vector(Vcenter, sinus.mult(r), true, 'blue');
    draw_Vstart_Vector(Vcenter, cosinus.mult(r), true, 'red');
    draw_Vstart_Vector(Vcenter, hypotenuse.mult(r), true, 'purple');

    sinus2.y = Math.sin(angle + Math.PI / 2);
    cosinus2.x = Math.cos(angle + Math.PI / 2);
    hypotenuse2.x = cosinus2.x;
    hypotenuse2.y = sinus2.y;

    ctx.beginPath();
    ctx.arc(Vcenter.x, Vcenter.y, r, 0, Math.PI * 2);
    ctx.rect(Vcenter.x, Vcenter.y, Math.cos(angle + Math.PI / 2) * r, Math.sin(angle + Math.PI / 2) * r);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    draw_Vstart_Vector(Vcenter, sinus2.mult(r), true, 'blue');
    draw_Vstart_Vector(Vcenter, cosinus2.mult(r), true, 'red');
    draw_Vstart_Vector(Vcenter, hypotenuse2.mult(r), true, 'purple');

    setTimeout(() => {
        angle += increment;
        if (angle < -Math.PI * 2) angle = 0;
        btn_angle.innerText = `Angle: ${Math.abs(Math.round(angle * 180 / Math.PI))}°`;
        window.requestAnimationFrame(render_loop);
    }, 10);
}

let btn_angle = create_button('Angle: 0°', canvas_interface, null);
window.requestAnimationFrame(render_loop);

let isPause = false;

let btn_pause = create_button('Pause', canvas_interface, () => {
    isPause = !isPause;
    isPause ? btn_pause.style.border = '3px solid purple' : btn_pause.style.border = '3px solid black';
    isPause ? increment = 0 : increment = -Math.PI / 180;
})