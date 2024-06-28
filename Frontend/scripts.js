const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const basket = {
    width: 100,
    height: 20,
    speed: 10,
    dx: 0
};

const fruitImages = ['banana', 'grape', 'apple'];
let fruits = [];
const fruitWidth = 40;
const fruitHeight = 40;

let score = 0;
let timer = 30;
let isGameRunning = false;

const bananaImg = new Image();
bananaImg.src = 'images/banana.png';

const grapeImg = new Image();
grapeImg.src = 'images/grape.png';

const appleImg = new Image();
appleImg.src = 'images/apple.png';

function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('game-over-message').style.display = 'none';
        document.getElementById('restart-button').style.display = 'none';
        score = 0;
        timer = 30;
        updateScoreDisplay();
        updateTimerDisplay();
        resetFruits();
        update();
        countdown();
    }
}

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

function drawFruit(fruit) {
    if (fruit.type === 'banana') {
        ctx.drawImage(bananaImg, fruit.x, fruit.y, fruitWidth, fruitHeight);
    } else if (fruit.type === 'grape') {
        ctx.drawImage(grapeImg, fruit.x, fruit.y, fruitWidth, fruitHeight);
    } else if (fruit.type === 'apple') {
        ctx.drawImage(appleImg, fruit.x, fruit.y, fruitWidth, fruitHeight);
    }
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

function moveFruits() {
    fruits.forEach(fruit => {
        fruit.y += fruit.speed;

        if (fruit.y + fruitHeight > canvas.height) {
            resetFruit(fruit);
        }

        if (
            fruit.y + fruitHeight > basket.y &&
            fruit.x < basket.x + basket.width &&
            fruit.x + fruitWidth > basket.x
        ) {
            score++;
            document.getElementById('score').textContent = score;
            resetFruit(fruit);
        }
    });
}

function resetFruit(fruit) {
    fruit.x = Math.random() * (canvas.width - fruitWidth);
    fruit.y = 0;
    fruit.type = fruitImages[Math.floor(Math.random() * fruitImages.length)];
}

function resetFruits() {
    fruits = [
        { x: Math.random() * (canvas.width - fruitWidth), y: 0, speed: 2, type: fruitImages[Math.floor(Math.random() * fruitImages.length)] },
        { x: Math.random() * (canvas.width - fruitWidth), y: 0, speed: 2.5, type: fruitImages[Math.floor(Math.random() * fruitImages.length)] }
    ];
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = score;
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = timer;
}

function countdown() {
    const interval = setInterval(() => {
        timer--;
        updateTimerDisplay();

        if (timer <= 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    isGameRunning = false;
    document.getElementById('final-score').textContent = score;
    document.getElementById('game-over-message').style.display = 'block';
    document.getElementById('restart-button').style.display = 'block';
}

function update() {
    clearCanvas();
    drawBasket();
    fruits.forEach(drawFruit);
    moveBasket();
    moveFruits();
    if (isGameRunning) {
        requestAnimationFrame(update);
    }
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

function handleTouchStart(e) {
    const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    if (touchX > basket.x + basket.width / 2) {
        basket.dx = basket.speed;
    } else {
        basket.dx = -basket.speed;
    }
}

function handleTouchEnd() {
    basket.dx = 0;
}

window.addEventListener('resize', resizeCanvas);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchend', handleTouchEnd);
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('restart-button').addEventListener('click', startGame);

resizeCanvas();