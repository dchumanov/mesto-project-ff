import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, removeCard, likeCard } from './components/card';
import { openModal, closeModal, closeModalByEsq, closeModalByOverlay } from './components/modal';

//popups
const Popups = document.querySelectorAll('.popup');
const PopupTypeEdit = document.querySelector('.popup_type_edit');
const PopupTypeNewCard = document.querySelector('.popup_type_new-card');
const PopupTypeImage = document.querySelector('.popup_type_image');

//buttons
const ProfileEditButton = document.querySelector('.profile__edit-button');
const ProfileAddButton = document.querySelector('.profile__add-button');
const CloseButtons = document.querySelectorAll('.popup__close');

//формы
const EditForm = document.forms.edit_profile;
const nameInput = EditForm.elements.name;
const jobInput =  EditForm.elements.description;

const AddForm = document.forms.new_place;
const placeInput = AddForm.elements.place_name;
const urlInput =  AddForm.elements.link;

//профиль
const ProfileTitle = document.querySelector('.profile__info .profile__title');
const ProfileDescription = document.querySelector('.profile__info .profile__description');

//контейнер с карточками
const cardsContainer = document.querySelector('.places__list');

//открытие и закрытие popup-ов профиля и добавления карточки
ProfileEditButton.addEventListener('click', () => {
  nameInput.value = ProfileTitle.textContent;
  jobInput.value = ProfileDescription.textContent;
  openModal(PopupTypeEdit);
});

ProfileAddButton.addEventListener('click', () => {
  openModal(PopupTypeNewCard);
});

//закрытие на крестик
CloseButtons.forEach((XButton) => {
  XButton.addEventListener('click', () => {closeModal(XButton.closest('.popup'));
  })
})

//открытие попапа картинки у карточки
export function openPopupImage (photoLink, caption) {
  PopupTypeImage.classList.add('popup_is-opened');
  PopupTypeImage.querySelector('.popup__image').src = photoLink;
  PopupTypeImage.querySelector('.popup__caption').textContent = caption;
  PopupTypeImage.addEventListener('click', closeModalByOverlay);
  document.addEventListener('keydown', closeModalByEsq);
}

//добавление карточек
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card, removeCard, likeCard));
})

//форма редактирования профиля 
function handleFormSubmit(evt) {
  evt.preventDefault(); 
  ProfileTitle.textContent = nameInput.value;
  ProfileDescription.textContent = jobInput.value;
  closeModal(PopupTypeEdit);
}

EditForm.addEventListener('submit', handleFormSubmit); 

//форма добавления карточки 
function addCardFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({name: placeInput.value, link: urlInput.value}, removeCard));
  closeModal(PopupTypeNewCard);
  AddForm.reset();
}

AddForm.addEventListener('submit', addCardFormSubmit); 

//добавление анимации
Popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});
