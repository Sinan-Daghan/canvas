(() => {

    let rotation_X = false;
    create_button("Rotation \n Around X Axis", "rotation_X", canvas_interface, () => {
        rotation_X = !rotation_X;
    });

    let rotation_Y = false;
    create_button("Rotation \n Around Y Axis", "rotation_Y", canvas_interface, () => {
        rotation_Y = !rotation_Y;
    });

    let rotation_Z = false;
    create_button("Rotation \n Around Y Axis", "rotation_Y", canvas_interface, () => {
        rotation_Z = !rotation_Z;
    });

    let draw_cube_edges = false;
    create_button("Draw Cube Edges", "draw_cube_edges", canvas_interface, () => {
        draw_cube_edges = !draw_cube_edges;
    });

    let projection_matrix = [[1, 0, 0], [0, 1, 0], [0, 0, 0]];

    // Lower face of the cube
    let vertex_1 = new Vec3(0, 0, 0); // [0]
    let vertex_2 = new Vec3(1, 0, 0); // [1]
    let vertex_3 = new Vec3(1, 1, 0); // [2]
    let vertex_4 = new Vec3(0, 1, 0); // [3]

    // Upper face of the cube
    let vertex_5 = new Vec3(0, 0, 1); // [4]
    let vertex_6 = new Vec3(1, 0, 1); // [5]
    let vertex_7 = new Vec3(1, 1, 1); // [6]
    let vertex_8 = new Vec3(0, 1, 1); // [7]

    let cube_1 = [vertex_1, vertex_2, vertex_3, vertex_4, vertex_5, vertex_6, vertex_7, vertex_8];

    let draw_cube = (cube) => {
        ctx.beginPath();
        ctx.moveTo(cube[0].x, cube[0].y);
        ctx.lineTo(cube[1].x, cube[1].y);
        ctx.lineTo(cube[2].x, cube[2].y);
        ctx.lineTo(cube[3].x, cube[3].y);
        ctx.lineTo(cube[0].x, cube[0].y);
        ctx.lineTo(cube[4].x, cube[4].y);
        ctx.lineTo(cube[5].x, cube[5].y);
        ctx.lineTo(cube[6].x, cube[6].y);
        ctx.lineTo(cube[7].x, cube[7].y);
        ctx.lineTo(cube[4].x, cube[4].y);
        ctx.moveTo(cube[1].x, cube[1].y);
        ctx.lineTo(cube[5].x, cube[5].y);
        ctx.moveTo(cube[2].x, cube[2].y);
        ctx.lineTo(cube[6].x, cube[6].y);
        ctx.moveTo(cube[3].x, cube[3].y);
        ctx.lineTo(cube[7].x, cube[7].y);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        ctx.stroke();
    }

    let scale_3D_object = (object_array, scalar) => {
        let scaled_3D_object = [];
        for (let vertex of object_array) {
            let x = vertex.x * scalar;
            let y = vertex.y * scalar;
            let z = vertex.z * scalar;
            scaled_3D_object.push(new Vec3(x, y, z));
        }
        return scaled_3D_object;
    }

    let cube_50 = scale_3D_object(cube_1, 50);

    let angle_x = 0;
    let angle_y = 0;
    let angle_z = 0;
    let increment = (2 * Math.PI / 3600);

    let draw = () => {

        ctx.translate(200, 200);
        ctx.clearRect(-200, -200, 400, 400);

        let projected_cube = [];
        for (let vertex of cube_50) {

            if (rotation_X) {
                vertex = vertex.transformation(R_x(angle_x));
                angle_x = (angle_x + increment) % (2 * Math.PI);
            } else {
                vertex = vertex.transformation(R_x(angle_x));
            }

            if (rotation_Y) {
                vertex = vertex.transformation(R_y(angle_y));
                angle_y = (angle_y + increment) % (2 * Math.PI);
            } else {
                vertex = vertex.transformation(R_y(angle_y));
            }

            if (rotation_Z) {
                vertex = vertex.transformation(R_z(angle_z));
                angle_z = (angle_z + increment) % (2 * Math.PI);
            } else {
                vertex = vertex.transformation(R_z(angle_z));
            }

            let projection = vertex.transformation(projection_matrix);
            projected_cube.push(projection)
            circle(projection.x, projection.y, 5, "rgba(0, 0, 0, 0.1)");

        }

        if (draw_cube_edges) {
            draw_cube(projected_cube);
        }

        ctx.translate(-200, -200);

        draw_id = window.requestAnimationFrame(draw);
    }
    draw_id = window.requestAnimationFrame(draw);
})();