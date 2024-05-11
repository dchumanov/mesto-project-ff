function createCard (cardData, removeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = 'Фото ' + cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  deleteButton.addEventListener('click', () => removeCard(cardElement));

  return cardElement;
}

function removeCard (cardElement) {
  cardElement.querySelector('.card__delete-button').closest('.card').remove();
}

const cardsContainer = document.querySelector('.places__list');
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card, removeCard));
})