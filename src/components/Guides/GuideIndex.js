import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { indexGuides } from '../../api/guides'

class Guides extends Component {
  constructor () {
    super()
    this.state = {
      guides: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexGuides(user)
      .then(res => {
        this.setState({ guides: res.data.guides })
      })
      .then(() => {
        msgAlert({
          heading: 'Here are our guides!',
          message: 'Nice!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Index guides failed :(',
          message: 'Failed with error: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.guides) {
      return (
        'Loading...'
      )
    } else if (this.state.guides.length === 0) {
      return (
        'No guides to display :('
      )
    } else {
      return (
        <div>
          {this.state.guides.map(guide => (
            <Fragment key={guide._id}>
              <h2>{guide.title}</h2>
              <p>{guide.text}</p>
              <Link to={`/guides/${guide._id}`}>View</Link>
              <Link to={`/guides-update/${guide._id}`}>Edit</Link>
            </Fragment>
          ))}
        </div>
      )
    }
  }
}

export default Guides
