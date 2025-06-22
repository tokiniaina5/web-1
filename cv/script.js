let book = document.querySelector('.book');
let nextButton = document.getElementById('next');
let state = 0;

nextButton.addEventListener('click', () => {
  state++;
  if (state === 1) {
    book.className = 'book open-middle';
  } else if (state === 2) {
    book.className = 'book open-back';
  } else {
    state = 0;
    book.className = 'book';
  }
});
