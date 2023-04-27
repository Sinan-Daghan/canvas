let projects_list = [
    //  [0] = name , [1] = src
    ["Vector Field", "projects/vector_field.js"]
]

const main = document.getElementById('main');
const nav = document.getElementById('nav');

let show_home_button = () => document.getElementById('home_button').style.display = 'flex';
let hide_home_button = () => document.getElementById('home_button').style.display = 'none';
let show_canvas = () => { canvas.style.display = 'block'; }
let hide_canvas = () => { canvas.style.display = 'none'; }

//id of the script currently loaded
let script_id;

let create_button = () => {
    let home = document.createElement('div');
    home.setAttribute('id', 'home_button');
    home.innerText = 'Home';
    home.style.width = '200px';
    home.style.height = '64px';
    home.style.margin = '10px';
    home.style.border = '1px solid black';
    home.style.borderRadius = '0px';
    home.style.boxShadow = '4px 4px 7px black';
    home.style.color = 'rgba(0,0,0,0.8)';
    home.style.position = 'absolute';
    nav.appendChild(home);

    home.style.display = 'none';

    home.addEventListener('click', () => {
        hide_canvas();
        hide_home_button();
        display_projects(projects_list);

        const script = document.getElementById(script_id);
        if (script) {
            script.remove();
            stop_draw();
        }

    })
}
create_button();

let display_projects = (projects) => {

    projects.forEach(project => {

        let div = document.createElement('div');
        div.setAttribute('id', project[0]);
        div.style.width = '600px';
        div.style.height = '200px';
        div.style.margin = "10px";
        div.style.border = '1px solid black';
        div.style.borderRadius = '0px';
        div.style.boxShadow = '4px 4px 7px black';
        div.style.color = 'rgba(0,0,0,0.8)';

        let paragraph = document.createElement('p');
        let text = document.createTextNode(project[0]);
        paragraph.appendChild(text);
        div.appendChild(paragraph);

        div.addEventListener('click', () => {
            main.innerHTML = '';
            show_canvas();
            show_home_button();

            let script = document.createElement('script');
            script.setAttribute('id', project[1]);
            script.src = project[1];
            document.body.appendChild(script);
            script_id = project[1];
        })

        main.appendChild(div);
    });
}
display_projects(projects_list);

// debug
// show_canvas();