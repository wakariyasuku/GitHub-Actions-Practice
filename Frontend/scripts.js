const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const basket = {
    width: 100,
    height: 20,
    speed: 10,
    dx: 0
};

let fruit = {
    width: 20,
    height: 20,
    speed: 2,
    x: Math.random() * (canvas.width - 20),
    y: 0
};

let score = 0;

function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth - 20, 800);
    canvas.height = canvas.width * 0.75; // Maintain aspect ratio of 4:3
    basket.x = canvas.width / 2 - basket.width / 2;
    basket.y = canvas.height - basket.height - 10;
}

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
        resetFruit();
    }

    if (
        fruit.y + fruit.height > basket.y &&
        fruit.x < basket.x + basket.width &&
        fruit.x + fruit.width > basket.x
    ) {
        score++;
        document.getElementById('score').textContent = score;
        resetFruit();
    }
}

function resetFruit() {
    fruit.x = Math.random() * (canvas.width - fruit.width);
    fruit.y = 0;
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

window.addEventListener('resize', resizeCanvas);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

resizeCanvas();
update();
