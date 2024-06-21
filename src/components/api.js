const token = '324ed79f-3eee-48a7-8bf6-ac713c870c09';
const groupID = 'wff-cohort-16';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${groupID}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
}

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status)
    });
} 

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status)
    });
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
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.status)
    })
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
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.status)
    })
}

export const changeAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(response => {
      if (response.ok) {
        return
      }
      return Promise.reject(response.status)
    })
}