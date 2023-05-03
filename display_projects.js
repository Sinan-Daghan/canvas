let projects_list = [
    //  [0] = name , [1] = src
    ["Vector Field", "projects/vector_field.js"],
    ["Snake", "projects/snake.js"]
]

//id of the script currently loaded
let script_id;

const main = document.getElementById('main');
const nav = document.getElementById('nav');
const canvas_interface = document.getElementById('canvas_interface');

let show_home_button = () => document.getElementById('home_button').style.display = 'flex';
let hide_home_button = () => document.getElementById('home_button').style.display = 'none';

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
        create_button(project[0], project[0].replace(/\s+/g, '') , main, () => { project_click_callback(project); });
        document.getElementById(project[0].replace(/\s+/g, '')).setAttribute('class', 'project');
    })
}

let create_button = (name, id, parent, callback) => {
    let button = document.createElement('button');
    button.innerText = name;
    button.addEventListener('click', callback);
    button.id = id;
    parent.appendChild(button);
}

home_buton_click_callback = () => {
    hide_canvas();
    hide_home_button();
    display_projects(projects_list);

    canvas_interface.innerHTML = '';
    hide_canvas_interface();

    const script = document.getElementById(script_id);
    if (script) {
        script.remove();
        stop_draw();
    } else {
        console.log('script not found');
    }
}

let create_home_button = () => {
    create_button('Home', "home_button", nav, home_buton_click_callback);
}

create_home_button();
hide_home_button();
hide_canvas_interface();
display_projects(projects_list);