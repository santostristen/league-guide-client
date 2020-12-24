import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { showGuide, deleteGuide } from '../../api/guides'

const GuideShow = (props) => {
  const [guide, setGuide] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    showGuide(user, match.params.guideId)
      .then(res => {
        setGuide(res.data.guide)
      })
      .then(() => {
        msgAlert({
          heading: 'Guide View Success',
          message: 'See the guide!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Guide View Failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteGuide(user, match.params.guideId)
      .then(() => {
        msgAlert({
          heading: 'Deleted Your Guide',
          message: 'Success',
          variant: 'success'
        })
      })
      .then(() => setDeleted(true))
      .catch(err => {
        msgAlert({
          heading: 'Deletion Failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  if (deleted) {
    return (
      <Redirect to='/guides' />
    )
  }

  return (
    <div>
      {guide ? (
        <div>
          <h2>{guide.title}</h2>
          <p>{guide.text}</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(GuideShow)
