import Toastify from 'toastify-js';

export function goodToast(text) {
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: 'bottom', // `top` or `bottom`
    position: 'left', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)'
    },
    onClick: function () {} // Callback after click
  }).showToast();
}

export function badToast(text) {
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: 'bottom', // `top` or `bottom`
    position: 'left', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, ##FE0944, ##FEAE96)'
    },
    onClick: function () {} // Callback after click
  }).showToast();
}
