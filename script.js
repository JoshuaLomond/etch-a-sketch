/**
 * Finally decided to write comments.
 * 
 * To do:
 * Clean CSS
 * Add background color selector
 * Add eraser
 * media queries
 */

//Default values
let defaultSize = 64;
let defaultColor = 'rgb(0, 0, 0)';
let defaultBackground = 'rgb(255, 255, 255)';
let mouseDown = false;
let toggleColor = true;
let toggleRainbow = false;
let toggleEraser = false;
let gridToggle = false;

//Document is listening for holdng down, to check if should be drawing
document.body.addEventListener('mousedown', () => {
    mouseDown = true;
});
document.body.addEventListener('mouseup', () => {
    mouseDown = false;
})

//create html elements
let main = document.getElementsByClassName("main")[0];
let options = document.createElement("div");
let title = document.createElement("div");
let colorPicker = document.createElement("input");
let sliderContainer = document.createElement("div");
let slider = document.createElement("input");
let sliderOutput = document.createElement("div");
let colorButton = document.createElement("div");
let rainbowButton = document.createElement("div");
let eraserButton = document.createElement("div");
let toggleGrid = document.createElement("div");
let clearButton = document.createElement("div");
let container = document.createElement("div");
let windowDimensions = document.createElement("div");

//html structure
options.append(title);
options.append(colorPicker);
sliderContainer.append(slider);
sliderContainer.append(sliderOutput);
options.append(sliderContainer);
options.append(colorButton);
options.append(rainbowButton);
options.append(eraserButton);
options.append(toggleGrid)
options.append(clearButton);
options.append(windowDimensions);
main.append(options);
main.append(container);

//set class names
options.className = 'options';
title.className = 'title'
colorPicker.className = 'color-picker';
sliderContainer.className = 'slider-container'
slider.className = 'slider';
sliderOutput.className = 'slider-output';
colorButton.className ='button-selected';
rainbowButton.className = 'button';
eraserButton.className = 'button';
toggleGrid.className = 'button';
clearButton.className = 'button';
container.className = 'grid-container';
windowDimensions.className = "window-dimensions";

//size slider logic
slider.type ='range';slider.min='1';slider.max='128';slider.value='64';
slider.oninput = () => {
    sliderOutput.innerHTML = `${slider.value} x ${slider.value}`
}
slider.onchange = (e) => buildGrid(e.target.value, gridToggle);

//set innerHTML
title.innerHTML = 'Etch-a-sketch'
sliderOutput.innerHTML = `${slider.value} x ${slider.value}`
colorButton.innerHTML = 'Color Mode';
rainbowButton.innerHTML = 'Rainbow Mode';
eraserButton.innerHTML = 'Eraser';
toggleGrid.innerHTML = 'Toggle Grid'
clearButton.innerHTML = 'Clear';
colorPicker.type='color';
windowDimensions.innerHTML = `${window.innerWidth} x ${window.innerHeight}`;

//color picker logic
colorPicker.onclick = () => {
    if (!toggleColor && toggleRainbow) {
        toggleColor = !toggleColor;
        toggleRainbow = !toggleRainbow;

        colorButton.className = "button-selected";
        rainbowButton.className = "button";
    }
    if (!toggleColor && toggleEraser) {
        toggleColor = !toggleColor;
        toggleEraser = !toggleEraser;

        colorButton.className = "button-selected";
        eraserButton.className = "button";
    }
}

//color button logic
colorButton.onclick = (e) => {
    if (!toggleColor && toggleRainbow) {
        toggleColor = !toggleColor;
        toggleRainbow = !toggleRainbow;

        e.target.className = "button-selected";
        rainbowButton.className = "button";
    }
    if (!toggleColor && toggleEraser) {
        toggleColor = !toggleColor;
        toggleEraser = !toggleEraser;

        e.target.className = "button-selected";
        eraserButton.className = "button";
    }
}

//rainbow button logic
rainbowButton.onclick = (e) => {
    if (!toggleRainbow && toggleColor) {
        toggleColor = !toggleColor;
        toggleRainbow = !toggleRainbow;
        e.target.className = "button-selected";
        colorButton.className = "button";
    }
    if (!toggleRainbow && toggleEraser) {
        toggleRainbow = !toggleRainbow;
        toggleEraser = !toggleEraser;

        e.target.className = "button-selected";
        eraserButton.className = "button";
    }
};

//eraser logic
eraserButton.onclick = (e) => {
    if (!toggleEraser && toggleColor) {
        toggleColor = !toggleColor;
        toggleEraser = !toggleEraser;
        e.target.className = "button-selected";
        colorButton.className = "button";
    }
    if (!toggleEraser && toggleRainbow) {
        toggleEraser = !toggleEraser;
        toggleRainbow = !toggleRainbow;

        rainbowButton.className = "button";
        eraserButton.className = "button-selected";
    }
}

//toggle grid logic
toggleGrid.onclick = (e) => {
    gridToggle = !gridToggle
    if (gridToggle) {
        e.target.className = 'button-selected'
    } else {
        e.target.className = 'button';
    }
    enableGrid(gridToggle);
}

//clear button logic
clearButton.onclick = () => buildGrid(slider.value, gridToggle);

//window zie logic
window.onresize = () => {
    windowDimensions.innerHTML = `${window.innerWidth} x ${window.innerHeight}`;
}

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
        if (toggleColor) {
            e.target.style.backgroundColor = colorPicker.value;
        } else if (toggleRainbow) {
            e.target.style.backgroundColor = randomRGB();
        } else if (toggleEraser) {
            e.target.style.backgroundColor = defaultBackground;
        }
    }
}

function enableGrid(gridToggle) {
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