let angle = 0;
let increment = 2 * Math.PI / 3600;
let outer_radius = 200;
let inner_radius = 0;
let main_loop = () => {

    ctx.beginPath();
    ctx.strokeStyle = `hsl(${angle * 180 / Math.PI}, 100%, 50%)`;
    // ctx.(canvas.width / 2 , canvas.height / 2);
    ctx.moveTo(canvas.width / 2 + inner_radius * Math.cos(angle), canvas.height / 2 + inner_radius * Math.sin(angle));
    ctx.lineTo(canvas.width / 2 + outer_radius * Math.cos(angle), canvas.height / 2 + outer_radius * Math.sin(angle));
    ctx.stroke();
    angle += increment;

    if (angle < 2 * Math.PI) window.requestAnimationFrame(main_loop);
}
window.requestAnimationFrame(main_loop);

let btn_outerRadius = create_button('Outer Radius: 200', canvas_interface, null);
create_slider('Outer Radius', canvas_interface, 0, 200, 200, 1).addEventListener('input', (e) => {
    outer_radius = e.target.value;
    btn_outerRadius.innerText = `Outer Radius: ${outer_radius}`;
});

let btn_innerRadius = create_button('Inner Radius: 200', canvas_interface, null);
create_slider('Inner Radius', canvas_interface, 0, 200, 0, 1).addEventListener('input', (e) => {
    inner_radius = e.target.value;
    btn_innerRadius.innerText = `Inner Radius: ${inner_radius}`;
});

create_button('Redraw', canvas_interface, () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    angle = 0;
    main_loop();
});