import './pages/index.css';
import { createCard, removeCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getProfile, getCards, editProfile, postCard, changeAvatar } from './components/api';

//popups
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');

//buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

//формы
const editForm = document.forms.edit_profile;
const nameInput = editForm.elements.name;
const jobInput =  editForm.elements.description;

const addForm = document.forms.new_place;
const placeInput = addForm.elements.place_name;
const urlInput =  addForm.elements.link;

const changeAvatarForm = document.forms.new_avatar;
const avatarInput = changeAvatarForm.elements.link;

//профиль
const profileTitle = document.querySelector('.profile__info .profile__title');
const profileDescription = document.querySelector('.profile__info .profile__description');
const profileAvatar = document.querySelector('.profile__image');

//контейнер с карточками
const cardsContainer = document.querySelector('.places__list');

// объект с настройками валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//открытие и закрытие popup-ов профиля и добавления карточки
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', () => {
  addForm.reset();
  clearValidation(addForm, validationConfig);
  openModal(popupTypeNewCard);
});

profileAvatar.addEventListener('click', () => {
  changeAvatarForm.reset();
  clearValidation(changeAvatarForm, validationConfig);
  openModal(popupNewAvatar);
});

//закрытие на крестик
closeButtons.forEach((xButton) => {
  xButton.addEventListener('click', () => {closeModal(xButton.closest('.popup'));
  })
})

//открытие попапа картинки у карточки
function openPopupImage (photoLink, caption) {
  openModal(popupTypeImage);
  popupTypeImage.querySelector('.popup__image').src = photoLink;
  popupTypeImage.querySelector('.popup__caption').textContent = caption;
}

//добавление анимации
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

//валидация
enableValidation(validationConfig); 

//Отрисовка страницы
const renderProfile = (result) => {
  profileTitle.textContent = result.name;
  profileDescription.textContent = result.about;
  profileAvatar.style["background-image"] = `url(${result.avatar})`; 
}

const renderCards = (cards, profileID) => {
  const initialCards = [];
  cards.forEach((card) => {
    let likesArray = card.likes.map((profile) => {
      return profile._id;
    });
    initialCards.push({
      name: card.name, 
      link: card.link, 
      likes: card.likes.length, 
      owner: card.owner._id, 
      cardID: card._id, 
      likesArray: likesArray
    });
  });
  initialCards.forEach((card) => {
    cardsContainer.append(createCard(
      card, 
      profileID, 
      removeCard, 
      likeCard, 
      openPopupImage
    ));
  });
}

Promise.all([getProfile(), getCards()])
  .then((results) => {
    const profileID = results[0]._id;
    renderProfile(results[0]);
    renderCards(results[1], profileID);
  });

//форма редактирования профиля
editForm.addEventListener('submit', function(event) {
  event.preventDefault();
  renderLoading(true, popupTypeEdit);
  //const {name, about} = event.currentTarget.elements;
  editProfile({
    name: nameInput.value,
    about: jobInput.value
  })
    .then(response => {
      profileTitle.textContent = response.name;
      profileDescription.textContent = response.about;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => renderLoading(false, popupTypeEdit));
  closeModal(popupTypeEdit);
}); 

//форма добавления карточки 
addForm.addEventListener('submit', function(event) {
  event.preventDefault();
  renderLoading(true, popupTypeNewCard);
  postCard({
    name: placeInput.value,
    link: urlInput.value
  })
    .then(response => {
      cardsContainer.prepend(createCard({
        name: response.name, 
        link: response.link, 
        likes: response.likes.length, 
        owner: response.owner._id, 
        cardID: response._id}, 
        response.owner._id, 
        removeCard, 
        likeCard, 
        openPopupImage));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => renderLoading(false, popupTypeNewCard));
  closeModal(popupTypeNewCard);
  addForm.reset();
}); 

//форма изменения аватарки
changeAvatarForm.addEventListener('submit', function(event) {
  event.preventDefault();
  renderLoading(true, popupNewAvatar);
  changeAvatar(avatarInput.value)
    .then(profileAvatar.style["background-image"] = `url(${avatarInput.value})`)
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => renderLoading(false, popupNewAvatar));
  closeModal(popupNewAvatar);
  changeAvatarForm.reset();
}); 

//подпись сохранение
function renderLoading(isLoading, popup) {
  const formSubmitButton = popup.querySelector('.popup__button');
  if (isLoading) {
    formSubmitButton.textContent = 'Сохранение...';
  }
  else {
    formSubmitButton.textContent = 'Сохранить';
  }
}