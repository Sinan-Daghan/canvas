(() => {

    let number_of_lines = 5;
    let line_array = []
    let draw_lines = true;
    let draw_perimeter_circle = false;
    let angle = 0;
    let increment = Math.PI / 360;
    let radius = 100;
    let angle_between_lines;


    let create_and_push_lines = (line_array) => {

        angle_between_lines = Math.PI / number_of_lines

        for (let i = 1; i <= number_of_lines; i++) {
            line_array.push(new Vector(Math.cos(i * angle_between_lines), Math.sin(i * angle_between_lines)));
        }
    }
    create_and_push_lines(line_array);

    create_button("Draw Lines", canvas_interface, () => {
        draw_lines = !draw_lines;
    });

    create_button("Add Line", canvas_interface, () => {
        number_of_lines += 1;
        line_array = [];
        create_and_push_lines(line_array);
    });

    create_button("Remove Line", canvas_interface, () => {
        if (number_of_lines === 1) return;

        number_of_lines -= 1;
        line_array = [];
        create_and_push_lines(line_array);
    });

    create_button("Draw Circle on Perimeter", canvas_interface, () => {
        draw_perimeter_circle = !draw_perimeter_circle;
    });

    ctx.globalCompositeOperation = "difference";

    let draw = () => {
        ctx.save();
        ctx.clearRect(0, 0, width, height);
        ctx.translate(200, 200);

        // the modulo reset the angle to 0 when angle + increment = 2 * PI
        angle = (angle + increment) % (2 * Math.PI);
        // outer circle
        circle(0, 0, radius, "rgba(0, 0, 0, 0.1)");

        for (let line of line_array) {
            if (draw_lines === true) {
                ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
                draw_Vstart_Vend(line.normalize(-100), line.normalize(100));
            }
        }

        if (draw_perimeter_circle === true) {
            let y = Math.sin(-angle) * radius;
            let x = Math.cos(-angle) * radius;
            circle(x, y, 5, "rgba(0, 140, 200, 1)");
        }

        for (let i = 0; i < number_of_lines; i += 1) {
            let line_offset = angle_between_lines + i * angle_between_lines;
            //the cosinus if we consider the current line as the x axis
            let line_cosinus = Math.cos(line_offset + angle);
            let circle_coordinates = line_array[i].normalize(line_cosinus * radius);
            circle(circle_coordinates.x, circle_coordinates.y, 5, "rgba(1000, 0, 0, 1)");
        }

        ctx.restore();
        draw_id = window.requestAnimationFrame(draw);
    }
    draw_id = window.requestAnimationFrame(draw);

})();