let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let main = document.getElementsByClassName("main")[0];

let options = document.createElement("div");
options.className = 'options';

//

main.append(options);

let container = document.createElement("div");
container.className = 'container';

for (let i = 0; i < 64*64; i++) {
    let div = document.createElement("div");
    div.className = "grid-item";

    div.addEventListener('mousedown', (e) => {
        mouseDown = true;
        if (mouseDown) {
            div.style.backgroundColor = randomRGB();
        }
    });
    div.addEventListener('mouseup', (e) => {
        mouseDown = false;
    });
    div.addEventListener('mouseover', (e) => {
        if (mouseDown) {
            div.style.backgroundColor = randomRGB();
        }
    });

    container.append(div);
}
main.append(container);

function randomRGB() {
    let rgb = new Array(3);

    for (let i = 0; i < 3; i++) {
        let x = Math.floor(Math.random() * 256);
        rgb[i] = x;
    }

    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}