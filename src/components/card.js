import { removeLike, addLike } from './api';

const cardTemplate = document.querySelector('#card-template').content;
function getCardTemplate () {
  return cardTemplate.querySelector('.card').cloneNode(true);
}

export function createCard (cardData, profileID, removeCard, likeCard, openPopupImage) {
  const cardElement = getCardTemplate();
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const likeButton = cardElement.querySelector('.card__like-button');

  if (profileID !== cardData.owner) {
    deleteButton.classList.add('card__delete-button_disable');
  }

  if (cardData.likesArray) {
    if (cardData.likesArray.includes(profileID)) {
      likeButton.classList.add('card__like-button_is-active');
    }
  }

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes;

  deleteButton.addEventListener('click', () => removeCard(cardElement, cardData.cardID));
  likeButton.addEventListener('click', () => likeCard(likeButton, likeCounter, cardData.cardID));
  cardImage.addEventListener('click', () => openPopupImage(cardData.link, cardData.name));
  // cardImage.addEventListener('click', (event) => openPopupImage(event.target.src, event.target.alt));

  return cardElement;
}

export function likeCard(likeButton, likeCounter, cardId) {

  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active')
    removeLike(cardId)
      .then(response => {
        likeCounter.textContent = response.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }
  
  else {
    likeButton.classList.add('card__like-button_is-active');
    addLike(cardId)
      .then(response => {
        likeCounter.textContent = response.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }
}