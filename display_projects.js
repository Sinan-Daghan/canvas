let projects_list = [
    //  [0] = name , [1] = src
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

    project_list.forEach(project => {
        // create_button = (name, id, parent, callback)
        create_button(project[0], main, () => { project_click_callback(project); });
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