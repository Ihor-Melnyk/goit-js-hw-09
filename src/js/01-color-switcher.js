function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    body: document.querySelector('body'),
    buttonStart: document.querySelector('[data-start]'),
    buttonStop: document.querySelector('[data-stop]'),
}
refs.buttonStop.disabled = true;
let timeIntervalId = null;

const onStart = refs.buttonStart.addEventListener('click', onClickStart)

function onClickStart(e) {
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;
    refs.body.style.backgroundColor = getRandomHexColor();
    timeIntervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.buttonStop.addEventListener('click', onClickStop)
}
function onClickStop(e) {
    refs.buttonStart.disabled = false;
    refs.buttonStop.disabled = true;
    clearInterval(timeIntervalId);
    refs.buttonStart.removeEventListener('click', onClickStop)
}

