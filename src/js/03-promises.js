// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     
//   } else {
//     
//   }
// }

// function logPromise(DELAY, STEP, AMOUNT) {
//   return new Promise((resolve, reject) => {
//   const shouldResolve = Math.random() > 0.5;
//   setTimeout(()=> {
//     if (shouldResolve) {
//       resolve ('промис получился')
//     }
//     reject ('промис не получился(((') 
//   },DELAY)
// })
// }


// function onFulfill(results) {
//   console.log(`${results}`);
// }
// function onReject(reject) {
//   console.log(`${reject}`);
// }


// const refs = {
//   delay: document.querySelector('[name=delay]'),
//   step: document.querySelector('[name=step]'),
//   amount: document.querySelector('[name=amount]'),
//   btnSubmit: document.querySelector('[type=submit]'),
// }

// refs.btnSubmit.addEventListener('click', onClickBtn);
// function onClickBtn(e) {
//   e.preventDefault();
// // значення input
//   const DELAY = Number(refs.delay.value);
//   const STEP = Number(refs.step.value);
//   const AMOUNT = Number(refs.amount.value);
// }


const refs = {
  inputDelay: document.querySelector('[name="delay"]'),
  inputStep: document.querySelector('[name="step"]'),
  inputAmount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const firstDelay = Number(refs.inputDelay.value);
  const delayStep = Number(refs.inputStep.value);
  const amount = Number(refs.inputAmount.value);
  onExecute(firstDelay, delayStep, amount);
}

function onExecute(firstDelay, delayStep, amount) {
  for (let i = 1, delay = firstDelay; i <= amount; i += 1, delay += delayStep) {
    setTimeout(
      () =>
        createPromise(i, delay)
          .then(({ position, delay }) => {
            // Notify.success
              alert(`✅ Fulfilled promise ${position} in ${delay}ms`, {
              timeout: 2500,
            });
          })
          .catch(({ position, delay }) => {
            // Notify.failure
              alert(`❌ Rejected promise ${position} in ${delay}ms`, {
              timeout: 2500,
            });
          }),
      delay,
    );
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
}