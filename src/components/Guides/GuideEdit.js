import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { showGuide, editGuide } from '../../api/guides'

const GuideEdit = (props) => {
  const [guide, setGuide] = useState({ title: '', text: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    showGuide(user, match.params.guideId)
      .then(res => setGuide(res.data.guide))
      .then(() => msgAlert({
        heading: '',
        message: 'Check it out',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Guide View failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setGuide(oldGuide => {
      const updatedGuide = { ...oldGuide, ...updatedField }
      return updatedGuide
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    editGuide(user, guide, match.params.guideId)
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Update successful',
        message: 'Nice work',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return (
      <Redirect to={'/guides'} />
    )
  }

  return (
    <React.Fragment>
      <h1>Update Your Guide</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Guide Title Here"
          value={guide.title}
          onChange={handleChange}
          name="title"
        />
        <input
          placeholder="Guide Text Here"
          value={guide.text}
          onChange={handleChange}
          name="text"
        />
        <button type="submit">Update Your Guide</button>
      </form>
    </React.Fragment>
  )
}

export default GuideEdit
