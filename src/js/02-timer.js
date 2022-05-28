import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


let currentTime = null;
let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkSelectedDate(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

const refs = {
  btnStart: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;

function checkSelectedDate(value) {
  currentTime = Date.now();
  selectedTime = value.getTime();

  if (selectedTime <= currentTime) {
    alert('Please choose a date in the future');
  } else {
    refs.btnStart.disabled = false;
    refs.btnStart.addEventListener('click', onBtnStartClick);
  }
}

function onBtnStartClick() {
  refs.btnStart.disabled = true;
  refs.btnStart.removeEventListener('click', onBtnStartClick);
  setCountdown();
}

function setCountdown() {
  let calculatedRemainTime = calculateRemainTime();
  updateMarkup(calculatedRemainTime);

  const timerId = setInterval(() => {
    calculatedRemainTime = calculateRemainTime();
    if (!calculatedRemainTime) {
      clearInterval(timerId);
      return;
    }
    updateMarkup(calculatedRemainTime);
  }, 1000);
}

function calculateRemainTime() {
  currentTime = Date.now();
  const remainTime = selectedTime - currentTime;
  if (remainTime < 0) {
    return null;
  }
  const transformedRemainTime = transformTimetoDateTime(remainTime);
  return transformedRemainTime;
}

function transformTimetoDateTime(time) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((time % (1000 * 60)) / 1000);

  return { days, hours, mins, secs };
}

function updateMarkup({ days, hours, mins, secs }) {
  refs.dataDays.textContent = String(days).padStart(2, 0);
  refs.dataHours.textContent = String(hours).padStart(2, 0);
  refs.dataMinutes.textContent = String(mins).padStart(2, 0);
  refs.dataSeconds.textContent = String(secs).padStart(2, 0);
}

