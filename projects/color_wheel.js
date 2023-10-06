let angle = 0;
let increment = 2 * Math.PI / 3600;
let radius = 200;

let main_loop = () => {

    ctx.beginPath();
    ctx.strokeStyle = `hsl(${angle * 180 / Math.PI}, 100%, 50%)`;
    ctx.moveTo(canvas.width / 2 + 100 * Math.cos(angle), canvas.height / 2 + 100 * Math.sin(angle));
    ctx.lineTo(canvas.width / 2 + radius * Math.cos(angle), canvas.height / 2 + radius * Math.sin(angle));
    ctx.stroke();
    angle += increment;

    if (angle < 2 * Math.PI) window.requestAnimationFrame(main_loop);
}
window.requestAnimationFrame(main_loop);