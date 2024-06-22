const token = '324ed79f-3eee-48a7-8bf6-ac713c870c09';
const groupID = 'wff-cohort-16';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${groupID}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
}

function checkStatus (response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
}

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(response => checkStatus(response));
} 

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(response => checkStatus(response));
}

export const editProfile = (profile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profile.name,
      about: profile.about
    })
  })
    .then(response => checkStatus(response))
}

export const postCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
    .then(response => checkStatus(response))
}

export const changeAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(response => checkStatus(response))
}

export function removeCard (cardElement, cardId) {
  cardElement.remove();
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(response => {
      if (response.ok) {
        return
      }
      return Promise.reject(response.status);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    });
}

export function removeLike (cardId) {
  return  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(response => checkStatus(response))
}

export function addLike (cardId) {
  return  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(response => checkStatus(response))
}