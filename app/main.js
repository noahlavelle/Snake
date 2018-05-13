const { remote } = require('electron');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const w = canvas.width;
const h = canvas.height;

const gridsize = 30;
const gridsquaresize = w / gridsize;

function clear() {
    ctx.fillStyle = '#23272a';
    ctx.fillRect(0, 0, w, h);
}

function draw(x, y, color = '#7289da') {
    const realX = x * gridsquaresize;
    const realY = y * gridsquaresize;

    ctx.fillStyle = color;
    ctx.fillRect(realX, realY, gridsquaresize, gridsquaresize);
}

function write(text, line) {
    ctx.font='15px Verdana';
    ctx.fillStyle = 'white';
    ctx.fillText(text, w - 120, line * 15, 120);

}


clear();

const game = new Game();

document.getElementById('close-btn').addEventListener('click', (e) => {
    const window = remote.getCurrentWindow();
    window.close();
}); 

document.getElementById('min-btn').addEventListener('click', (e) => {
    const window = remote.getCurrentWindow();
    window.minimize();
}); 