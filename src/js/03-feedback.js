import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput() {
  const formData = {
    email: refs.input.value,
    message: refs.textarea.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function checksStorage() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    refs.input.value = savedData.email;
    refs.textarea.value = savedData.message;
  } else {
    refs.input.value = '';
    refs.textarea.value = '';
  }
}

checksStorage();

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
