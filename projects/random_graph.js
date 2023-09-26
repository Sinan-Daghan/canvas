Amplitude = 100;
let baseLine = canvas.width / 2 - Amplitude / 2;
points = [];
let createPoint = () => {
    return (Math.random() * Amplitude);
}

for ( let i = 0; i < 100; i++ ) {
    points.push(createPoint());
}

let draw_point = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();
}

let lerp = false;
let btn_lerp = create_button('Liner Interpolation', canvas_interface, () => {
    lerp = !lerp;
    lerp ? btn_lerp.style.border = '2px solid purple' : btn_lerp.style.border = 'none';
})

draw_array = (array) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let interspace = canvas.width / array.length;
    for (let i = 1; i < array.length; i++) {
        draw_point(i * interspace, array[i] + baseLine, 5);
    }
    if (lerp) {
        ctx.beginPath();
        for (let i = 1; i < array.length; i++) {
            ctx.lineTo(i * interspace, array[i] + baseLine);
        }
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
}
draw_array(points);

let pushAndShift = (array) => {
    array.push(createPoint());
    array.shift();
    draw_array(array);
}

setInterval(() => {
    pushAndShift(points);
    draw_array(points);
}, 500);