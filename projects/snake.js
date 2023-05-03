script_wrapper = () => {

    // Array representation of the snake cells [[x, y]...[xn, yn]]
    let snake = [];
    let head_position;
    let apple;

    let start = () => {
        snake = [[width / 2, height / 2]];
        head_position = new Vector(200, 200);
        apple = new Vector(300, 200);
        direction = new Vector(10, 0);
    }
    start();

    add_arrow_keys_event_listener();
    // set the step size at 10px
    DOWN = DOWN.normalize(10);
    UP = UP.normalize(10);
    LEFT = LEFT.normalize(10);
    RIGHT = RIGHT.normalize(10);

    let red_border = () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                canvas.style.border = `${5 - i}px solid red`;
            }, i * 50);
        }
    }

    let random_apple_position = () => {
        //random number between 0 and 39 (max excluded)
        let x = Math.floor(random(0, 40)) * 10;
        let y = Math.floor(random(0, 40)) * 10;
        return new Vector(x, y);
    }

    let new_apple_position = () => {
        do {
            apple = random_apple_position();
        } while (snake.some(cell => cell[0] === apple.x && cell[1] === apple.y));
        console.log(apple);
        return apple;
    };

    let draw_apple = () => {
        ctx.beginPath();
        ctx.rect(apple.x, apple.y, 10, 10);
        ctx.fillStyle = "red";
        ctx.fill();
    }

    let draw_snake = () => {
        ctx.beginPath();
        for (let cell of snake) {
            ctx.rect(cell[0], cell[1], 10, 10);
            ctx.fillStyle = "black";
            ctx.fill();
        }
    }

    function draw() {

        head_position = head_position.add(direction);

        // Test : collision : snake head / snake body
        for (let cell of snake) {
            if (cell[0] === head_position.x && cell[1] === head_position.y) {
                return;
            }
        }

        // Test : collision : snake head / wall
        if (head_position.x < 0 || head_position.x > width - 10 || head_position.y < 0 || head_position.y > height - 10) {
            red_border();
            return;
        }

        // Test : collision : snake head / apple
        if (head_position.x === apple.x && head_position.y === apple.y) {
            snake.push([head_position.x, head_position.y]);
            new_apple_position();
        }
        else {
            snake.push([head_position.x, head_position.y]);
            snake.shift();
        }

        ctx.clearRect(0, 0, width, height);
        draw_apple();
        draw_snake();

        setTimeout(() => {
            draw_id = window.requestAnimationFrame(draw);
        }, 50)

    } draw_id = window.requestAnimationFrame(draw);
}
script_wrapper();