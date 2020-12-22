import axios from 'axios'
import apiUrl from '../apiConfig'

export const indexGuides = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/guides',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deleteGuide = (user, guideId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/guides/' + guideId,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const createGuide = (user, guide) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/guides',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { guide }
  })
}

export const editGuide = (user, guide, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/guides/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { guide: guide }
  })
}

export const showGuide = (user, guideId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/guides/' + guideId,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
