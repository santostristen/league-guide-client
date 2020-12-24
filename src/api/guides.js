import axios from 'axios'
import apiUrl from '../apiConfig'

export const indexGuides = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/guides/'
  })
}

export const deleteGuide = (guideId) => {
  return axios({
    method: 'DELETE',
    url: `${apiUrl}/guides/${guideId}/`
  })
}

export const createGuide = (token, guide) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/guides/',
    headers: {
      Authorization: `Token ${token}`
    },
    data: { guide }
  })
}

export const editGuide = (guide, id) => {
  return axios({
    method: 'PATCH',
    url: `${apiUrl}/guides/${id}/`,
    data: { guide: guide }
  })
}

export const showGuide = (guideId) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/guides/${guideId}/`
  })
}
