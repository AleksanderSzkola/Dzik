let score = 0;
let currentNumber;
let timer;
let reactionStartTime;

document.getElementById('dzik').addEventListener('click', () => handleClick(true));
document.getElementById('notDzik').addEventListener('click', () => handleClick(false));
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('timeSlider').addEventListener('input', updateTimeValue);

function startGame() {
    score = 0;
    updateScore();
    generateNumber();
}

function generateNumber() {
    currentNumber = Math.floor(Math.random() * 100);
    document.getElementById('numberDisplay').innerText = currentNumber;

    
    document.getElementById('dzik').style.display = 'block';
    document.getElementById('notDzik').style.display = 'block';

    
    clearTimeout(timer);
    const timeLimit = getTimeLimit(); 
    timer = setTimeout(() => {
        alert('Przegrałeś! Nie kliknąłeś w odpowiedni obrazek.');
        resetGame();
    }, timeLimit * 1000); 

    
    reactionStartTime = Date.now();
}

function handleClick(isDzik) {
    clearTimeout(timer);
    const reactionTime = (Date.now() - reactionStartTime) / 1000; 
    const isCorrect = (currentNumber % 7 === 0 || currentNumber.toString().includes('7')) === isDzik;

    if (isCorrect) {
        score++;
        updateScore();
        document.getElementById('reactionTime').innerText = `Czas reakcji: ${reactionTime.toFixed(2)} s`; 
        generateNumber(); 
    } else {
        alert('Nieprawidłowy klik! Przegrałeś!');
        resetGame();
    }
}

function resetGame() {
    score = 0;
    updateScore();
    document.getElementById('numberDisplay').innerText = '0';
    document.getElementById('reactionTime').innerText = 'Czas reakcji: 0s'; 
    clearTimeout(timer);
}

function updateScore() {
    document.getElementById('score').innerText = `Wynik: ${score}`;
}

function updateTimeValue() {
    const timeValue = document.getElementById('timeSlider').value;
    document.getElementById('timeValue').innerText = timeValue;
}

function getTimeLimit() {
    return document.getElementById('timeSlider').value; 
}
