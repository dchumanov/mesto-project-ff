import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, removeCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';

//popups
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

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

//профиль
const profileTitle = document.querySelector('.profile__info .profile__title');
const profileDescription = document.querySelector('.profile__info .profile__description');

//контейнер с карточками
const cardsContainer = document.querySelector('.places__list');

//открытие и закрытие popup-ов профиля и добавления карточки
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', () => {
  openModal(popupTypeNewCard);
});

//закрытие на крестик
closeButtons.forEach((xButton) => {
  xButton.addEventListener('click', () => {closeModal(xButton.closest('.popup'));
  })
})

//открытие попапа картинки у карточки
export function openPopupImage (photoLink, caption) {
  openModal(popupTypeImage);
  popupTypeImage.querySelector('.popup__image').src = photoLink;
  popupTypeImage.querySelector('.popup__caption').textContent = caption;
}

//добавление карточек
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card, removeCard, likeCard, openPopupImage));
})

//форма редактирования профиля 
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

editForm.addEventListener('submit', handleEditProfileFormSubmit); 

//форма добавления карточки 
function addCardFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({name: placeInput.value, link: urlInput.value}, removeCard));
  closeModal(popupTypeNewCard);
  addForm.reset();
}

addForm.addEventListener('submit', addCardFormSubmit); 

//добавление анимации
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});
