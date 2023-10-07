let angle = 0;
let increment = 2 * Math.PI / 3600;
let radius = 200;

let main_loop = () => {

    ctx.beginPath();
    ctx.strokeStyle = `hsl(${angle * 180 / Math.PI}, 100%, 50%)`;
    ctx.moveTo(canvas.width / 2 , canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + radius * Math.cos(angle), canvas.height / 2 + radius * Math.sin(angle));
    ctx.stroke();
    angle += increment;

    if (angle < 2 * Math.PI) window.requestAnimationFrame(main_loop);
}
window.requestAnimationFrame(main_loop);

let btn_radius = create_button('Radius: 200', canvas_interface, null);
create_slider('radius', canvas_interface, 0, 200, 200, 1).addEventListener('input', (e) => {
    radius = e.target.value;
    btn_radius.innerText = `Radius: ${radius}`;
});

create_button('Redraw', canvas_interface, () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    angle = 0;
    main_loop();
});