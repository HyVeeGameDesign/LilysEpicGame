const questions = [
    "Do you work at HyVee?",
    "Are you short?",
    "Does your diet in any way resemble a toddler's?",
    "Do you have purple hair?",
    "Do you have Jesus and/or Pope candles for some strange reason?",
    "Do you wear Patchouli and Old Spice?",
    "Are you married?",
    "Are you married to a woman?",
    "Is that woman a minor (making you a ped)?",
    "Is that woman named Gabriella?",
    "Are 69 and 420 your favorite numbers?"
];

let currentQuestion = 0;
let score = 0;

const startButton = document.getElementById('startButton');
const gameElement = document.getElementById('game');
const questionElement = document.getElementById('question');
const messageElement = document.getElementById('message');
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
const resultElement = document.getElementById('result');
const resultYesButton = document.getElementById('resultYes');
const resultNoButton = document.getElementById('resultNo');
const finalMessageElement = document.getElementById('finalMessage');
const fireworksContainer = document.getElementById('fireworks-container');
const boxesContainer = document.getElementById('boxes');
const scoreElement = document.getElementById('score');

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    gameElement.style.display = 'block';
    showQuestion();
});

function showQuestion() {
    if (currentQuestion < questions.length) {
        questionElement.textContent = questions[currentQuestion];
        messageElement.textContent = '';
    } else {
        gameElement.style.display = 'none';
        resultElement.style.display = 'block';
    }
}

yesButton.addEventListener('click', () => {
    currentQuestion++;
    showQuestion();
});

noButton.addEventListener('click', () => {
    messageElement.textContent = 'Incorrect. You have lied. Try Again!';
});

resultYesButton.addEventListener('click', () => {
    resultElement.style.display = 'none';
    finalMessageElement.style.display = 'block';
    launchFireworks();
    createBoxes();
});

resultNoButton.addEventListener('click', () => {
    messageElement.textContent = 'Incorrect. You have lied. Try Again!';
});

function launchFireworks() {
    const fireworks = new Fireworks.default(fireworksContainer, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        trace: 3,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: {
            min: 300,
            max: 360
        },
        delay: {
            min: 0.015,
            max: 0.03
        },
        rocketsPoint: {
            min: 50,
            max: 50
        },
        lineWidth: {
            explosion: {
                min: 1,
                max: 3
            },
            trace: {
                min: 1,
                max: 2
            }
        },
        brightness: {
            min: 50,
            max: 80
        },
        decay: {
            min: 0.015,
            max: 0.03
        },
        mouse: {
            click: false,
            move: false,
            max: 1
        }
    });

    fireworks.start();
    setTimeout(() => fireworks.stop(), 5000); // Stop fireworks after 5 seconds
}

function createBoxes() {
    for (let i = 0; i < 20; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.addEventListener('click', () => {
            box.remove();
            const points = Math.random() > 0.5 ? 69 : 420;
            score += points;
            scoreElement.textContent = `Score: ${score}`;
            showPoints(box, points);
        });
        boxesContainer.appendChild(box);
    }
}

function showPoints(box, points) {
    const pointsElement = document.createElement('span');
    pointsElement.textContent = `+${points}`;
    pointsElement.classList.add('points');
    pointsElement.style.position = 'absolute';
    pointsElement.style.left = `${box.offsetLeft}px`;
    pointsElement.style.top = `${box.offsetTop}px`;
    document.body.appendChild(pointsElement);
    setTimeout(() => pointsElement.remove(), 1000);
}

showQuestion();
