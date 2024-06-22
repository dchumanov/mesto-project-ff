export function renderLoading(isLoading, popup) {
  const formSubmitButton = popup.querySelector('.popup__button');
  if (isLoading) {
    formSubmitButton.textContent = 'Сохранение...';
  }
  else {
    formSubmitButton.textContent = 'Сохранить';
  }
}