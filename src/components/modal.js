export function openModal (modal) {
  modal.classList.add('popup_is-opened');
  modal.addEventListener('click', closeModalByOverlay);
  document.addEventListener('keydown', closeModalByEsq);
}

export function closeModal (modal) {
  modal.classList.remove('popup_is-opened');
  modal.removeEventListener('click', closeModalByOverlay);
  document.removeEventListener('keydown', closeModalByEsq);
}

export function closeModalByOverlay (event) {
  if (event.target === event.currentTarget) {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

export function closeModalByEsq (event) {
  if (event.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}