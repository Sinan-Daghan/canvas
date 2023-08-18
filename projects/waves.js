let increment  = Math.PI / 180;
let angle = 0;
let zoom = 2;

let main_loop = () => {

    for (let i = 0 ; i < 200 ; i++) {
        ctx.beginPath();
        let sinus  = Math.sin(angle + i * zoom * increment);
        let color  = `hsl(${180 + 180 * sinus}, 50%, 50%)`
        ctx.arc(200, 200, i, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.stroke();
        console.log(sinus);
    }

    if (angle > Math.PI * 2) angle = 0;
    angle += Math.PI / 180;

    setTimeout(() => {
        window.requestAnimationFrame(main_loop);
    }, 10);
}
window.requestAnimationFrame(main_loop);

create_button('Zoom Out', canvas_interface, () => { zoom += 0.1; });
create_button('Zoom In', canvas_interface, () => { zoom -= 0.1; });