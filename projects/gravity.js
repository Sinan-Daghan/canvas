let ball1 = new Ball(100, 100, 10);
let ball2 = new Ball(150, 200, 10);
let balls = [ball1, ball2];

let gravityForce = (ball1, ball2) => {
    let distance = ball1.position.sub(ball2.position);
    let distance_mag = distance.get_magnitude();
    let m1 = ball1.mass;
    let m2 = ball2.mass;
    let G = 0.01;

    let gravity = G * m1 * m2 / distance_mag ** 2;
    let force = distance.normalize(gravity);

    if (distance_mag < 10) return;

    ball2.apply_force(force);
    ball1.apply_force(force.mult(-1));
}

let main_loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gravityForce(balls[0], balls[1]);
    balls.forEach((ball) => {
        ball.draw();
        ball.update();
    });

    setTimeout(() => {
        window.requestAnimationFrame(main_loop);
    }, 10);
}
window.requestAnimationFrame(main_loop);