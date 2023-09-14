canvas.style.display = 'none';
canvas_interface.style.display = 'none';

let Div = document.createElement('div');
Div.style.width = '100px';
Div.style.height = '100px';
Div.style.borderRadius = '50%';
Div.style.border = '4px solid black';
Div.style.position = 'absolute';
Div.style.left = window.innerWidth / 2 - 50 + 'px';
Div.style.top = window.innerHeight / 2 - 50 + 'px';
main.appendChild(Div);

Div.style.transition = 'transform 0.1s linear ';

let angle = 0;
let angleIncrement = Math.PI / 180;
let rotate = () => {
    if (angle > Math.PI * 2) angle = 0;
    angle += angleIncrement;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    Div.style.transform =`matrix3d(${cos}, 0, ${-sin}, 0, 0, 1, 0,  0, ${-sin}, 0, ${cos}, 0, 0, 0, 0, 1)`;
}

setInterval(() => {
    rotate();
    console.log(angle);
}, 100);
