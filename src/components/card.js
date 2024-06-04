const cardTemplate = document.querySelector('#card-template').content;

export function createCard (cardData, removeCard, likeCard, openPopupImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  deleteButton.addEventListener('click', () => removeCard(cardElement));
  likeButton.addEventListener('click', () => likeCard(likeButton));
  cardImage.addEventListener('click', () => openPopupImage(cardData.link, cardData.name));
  // cardImage.addEventListener('click', (event) => openPopupImage(event.target.src, event.target.alt));

  return cardElement;
}

export function removeCard (cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}