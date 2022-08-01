/**
 * Finally decided to write comments.
 * 
 * To do:
 * Clean CSS
 * Add background color selector
 * Add eraser
 * improve toggle grid
 * media queries
 */

//Default values
let defaultSize = 64;
let defaultColor = 'rgb(0, 0, 0)';
let mouseDown = false;
let toggleRainbow = false;
let gridToggle = false;

document.body.addEventListener('mousedown', () => {
    mouseDown = true;
});
document.body.addEventListener('mouseup', () => {
    mouseDown = false;
})

//Building html structure
let main = document.getElementsByClassName("main")[0];
let options = document.createElement("div");
let title = document.createElement("div");
let colorPicker = document.createElement("input");
let sliderContainer = document.createElement("div");
let slider = document.createElement("input");
let sliderOutput = document.createElement("div");
let rainbowButton = document.createElement("div");
let toggleGrid = document.createElement("div");
let clearButton = document.createElement("div");
let container = document.createElement("div");

let windowDimensions = document.createElement("div");

options.className = 'options';
title.className = 'title'
colorPicker.className = 'color-picker';
sliderContainer.className = 'slider-container'
slider.className = 'slider';
sliderOutput.className = 'slider-output';
rainbowButton.className = 'button';
toggleGrid.className = 'button';
clearButton.className = 'button';
container.className = 'grid-container';

windowDimensions.className = "window-dimensions";

colorPicker.type='color';
slider.type ='range';slider.min='1';slider.max='128';slider.value='64';

options.onmouseleave = () => {
    defaultColor = colorPicker.value;
}

slider.oninput = () => {
    sliderOutput.innerHTML = `${slider.value} x ${slider.value}`
}
slider.onchange = (e) => buildGrid(e.target.value, gridToggle);

title.innerHTML = 'Etch-a-sketch'
sliderOutput.innerHTML = `${slider.value} x ${slider.value}`
toggleGrid.innerHTML = 'Toggle Grid'
rainbowButton.innerHTML = 'Toggle Rainbow';
clearButton.innerHTML = 'Clear';

windowDimensions.innerHTML = `${window.innerWidth} x ${window.innerHeight}`;

rainbowButton.onclick = (e) => {
    if (!toggleRainbow) {
        toggleRainbow = true;
        e.target.className = 'button-selected';
    } else {
        toggleRainbow = false;
        e.target.className = 'button';
    }
};

toggleGrid.onclick = (e) => {
    gridToggle = !gridToggle
    if (gridToggle) {
        e.target.className = 'button-selected'
    } else {
        e.target.className = 'button';
    }
    enableGrid(gridToggle);
}

clearButton.onclick = () => buildGrid(slider.value, gridToggle);

window.onresize = () => {
    windowDimensions.innerHTML = `${window.innerWidth} x ${window.innerHeight}`;
}

options.append(title);
options.append(colorPicker);

sliderContainer.append(slider);
sliderContainer.append(sliderOutput);

options.append(sliderContainer);
options.append(rainbowButton);
options.append(toggleGrid)
options.append(clearButton);
options.append(windowDimensions);

main.append(options);
main.append(container);

//Builds the default 64x64 grid and appends to main
buildGrid(64, false);

function randomRGB() {
    let rgb = new Array(3);
    for (let i = 0; i < 3; i++) {
        let x = Math.floor(Math.random() * 256);
        rgb[i] = x;
    }
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function buildGrid(size, grid) {
    container.innerHTML = ""

    for (let i = 0; i < size*size; i++) {
        let div = document.createElement("div");
        
        if (!grid) {
            div.className = "grid-item";
        } else {
            div.className = 'grid-item-toggle';
        }
        

        div.addEventListener('mousedown', changeColor);
        div.addEventListener('mouseover', changeColor);

        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
        container.append(div);
    }
}

function changeColor(e) {
    if (mouseDown || e.type == 'mousedown') {
        if (!toggleRainbow) {
            e.target.style.backgroundColor = defaultColor;
        } else if (toggleRainbow) {
            e.target.style.backgroundColor = randomRGB();
        }
    }
}

function enableGrid(gridToggle) {
    console.log(gridToggle);
    console.log("Hello :)")

    let gridItems = document.getElementsByClassName('grid-item');

    if (gridItems.length == 0) {
        gridItems = document.getElementsByClassName('grid-item-toggle');
    }

    Array.from(gridItems).forEach((gridItem) => {
        if (gridToggle) {
            gridItem.className = 'grid-item-toggle'
        } else {
            gridItem.className = 'grid-item';
        }
    });
}