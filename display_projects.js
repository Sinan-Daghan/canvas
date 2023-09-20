let projects_list = [
    //  [0] = name , [1] = src
    ["Unit Circle", "projects/unit_circle.js"],
    ["Extrude", "projects/extrude.js"],
    ["rotation CSS", "projects/rotationCSS.js"],
    ["Square", "projects/square.js"],
    ["Gravity", "projects/gravity.js"],
    ["Intersection", "projects/intersection.js"],
    ["Composition", "projects/composition.js"],
    ["Torus", "projects/torus.js"],
    ["Merging", "projects/merging.js"],
    ["Loading", "projects/loading.js"],
    ["Pong", "projects/pong.js"],
    ["Logic Gates", "projects/logic_gates.js"],
    ["Waves", "projects/waves.js"],
    ["Bézier Curves", "projects/bezier_curves.js"],
    ["Binary search", "projects/binary_search.js"],
    ["Unstable", "projects/unstable.js"],
    ["Random Walk", "projects/random_walk.js"],
    ["Stacker", "projects/stacker.js"],
    ["Bird", "projects/bird.js"],
    ["10 Print", "projects/10_print.js"],
    ["3D Text", "projects/3d_text.js"],
    ["Tic-Tac-Toe", "projects/tic-tac-toe.js"],
    ["Falling Emojis", "projects/falling_emojis.js"],
    ["Noise Grid", "projects/noise_grid.js"],
    ["Avatar", "projects/avatar.js"],
    ["Cube 3D", "projects/cube_3d.js"],
    ["Trigonometry", "projects/trigonometry.js"],
    ["Snake", "projects/snake.js"],
    ["Vector Field", "projects/vector_field.js"]
]

//id of the script currently loaded
let script_id;

const main = document.getElementById('main');
const nav = document.getElementById('nav');
const canvas_interface = document.getElementById('canvas_interface');

let show_home_button = () => document.getElementById('button_Home').style.display = 'block';
let hide_home_button = () => document.getElementById('button_Home').style.display = 'none';

let show_canvas = () => { canvas.style.display = 'block'; }
let hide_canvas = () => { canvas.style.display = 'none'; }

let show_canvas_interface = () => { canvas_interface.style.display = 'flex'; }
let hide_canvas_interface = () => { canvas_interface.style.display = 'none'; }

let project_click_callback = (project) => {

    main.innerHTML = '';
    show_canvas_interface();
    show_canvas();
    show_home_button();

    let script = document.createElement('script');
    script.id = project[1];
    script_id = project[1];
    script.src = project[1];

    document.body.appendChild(script);
}

let display_projects = (project_list) => {
    let color = 120;
    project_list.forEach(project => {
        // create_button = (name, id, parent, callback)
        btn = create_button(project[0], main, () => { project_click_callback(project); });
        btn.style.backgroundColor = `hsl(${color}, 50%, 50%)`;
        color += 10;
        document.getElementById('button_' + project[0].replace(/\s+/g, '')).setAttribute('class', 'project');
    })
}

let create_button = (name, parent, callback) => {
    let button = document.createElement('button');
    button.innerText = name;
    button.addEventListener('click', callback);
    button.id = 'button_' + name.replace(/\s+/g, '');
    parent.appendChild(button);
    return button;
}

let create_slider = (name, parent, min, max, value, step) => {
let slider = document.createElement('input');
slider.type = 'range';
slider.min = min;
slider.max = max;
slider.value = value;
slider.step = step;
slider.id = 'slider_' + name.replace(/\s+/g, '');
parent.appendChild(slider);
return slider;
}

home_buton_click_callback = () => {
    hide_canvas();
    hide_home_button();
    display_projects(projects_list);

    canvas_interface.innerHTML = '';
    hide_canvas_interface();

    const script = document.getElementById(script_id);
    if (script) {
        stop_draw();
        script.remove();
    } else {
        console.log('script not found');
    }
    location.reload();
}

let create_home_button = () => {
    create_button('Home', nav, home_buton_click_callback);
}

create_home_button();
hide_home_button();
hide_canvas_interface();
display_projects(projects_list);