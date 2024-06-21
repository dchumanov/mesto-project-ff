const cardTemplate = document.querySelector('#card-template').content;

export function createCard (cardData, profileID, removeCard, likeCard, openPopupImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
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



const token = '324ed79f-3eee-48a7-8bf6-ac713c870c09';
const groupID = 'wff-cohort-16';

export function removeCard (cardElement, cardId) {
  cardElement.remove();
  fetch(`https://nomoreparties.co/v1/${groupID}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    },
  })
}

export function likeCard(likeButton, likeCounter, cardId) {

  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active')
    fetch(`https://nomoreparties.co/v1/${groupID}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: token
      }
    })
    .then(response => response.json())
    .then(response => {
      likeCounter.textContent = response.likes.length;
    })
  }
  else {
    likeButton.classList.add('card__like-button_is-active');
    fetch(`https://nomoreparties.co/v1/${groupID}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: token
      }
    })
      .then(response => response.json())
      .then(response => {
        likeCounter.textContent = response.likes.length;
      })
  }
}