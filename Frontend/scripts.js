const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const basket = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 50,
    width: 100,
    height: 20,
    speed: 10,
    dx: 0
};

const fruit = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 20,
    height: 20,
    speed: 2
};

let score = 0;

function drawBasket() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawFruit() {
    ctx.fillStyle = 'red';
    ctx.fillRect(fruit.x, fruit.y, fruit.width, fruit.height);
}

function moveBasket() {
    basket.x += basket.dx;

    if (basket.x < 0) {
        basket.x = 0;
    }

    if (basket.x + basket.width > canvas.width) {
        basket.x = canvas.width - basket.width;
    }
}

function moveFruit() {
    fruit.y += fruit.speed;

    if (fruit.y + fruit.height > canvas.height) {
        fruit.x = Math.random() * (canvas.width - fruit.width);
        fruit.y = 0;
    }

    if (
        fruit.y + fruit.height > basket.y &&
        fruit.x < basket.x + basket.width &&
        fruit.x + fruit.width > basket.x
    ) {
        score++;
        document.getElementById('score').textContent = score;
        fruit.x = Math.random() * (canvas.width - fruit.width);
        fruit.y = 0;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    clearCanvas();
    drawBasket();
    drawFruit();
    moveBasket();
    moveFruit();
    requestAnimationFrame(update);
}

function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        basket.dx = basket.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        basket.dx = -basket.speed;
    }
}

function keyUp(e) {
    if (
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft'
    ) {
        basket.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update();
