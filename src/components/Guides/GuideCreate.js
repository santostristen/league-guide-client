
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { createGuide } from '../../api/guides'

class GuideCreate extends Component {
  constructor () {
    super()
    this.state = {
      guide: {
        title: '',
        text: ''
      },
      createdId: null
    }
  }

handleChange = (event) => {
  const updatedField = { [event.target.name]: event.target.value }

  this.setState(currState => {
    const updatedGuide = { ...currState.guide, ...updatedField }
    return { guide: updatedGuide }
  })
}

// handle form submission
handleSubmit = (event) => {
  event.preventDefault()

  const { user, msgAlert } = this.props

  createGuide(user, this.state.guide)
    .then((res) => {
      this.setState({ createdId: res.data.guide._id })
    })
    .then(() => {
      msgAlert({
        heading: 'Guide Posted!',
        message: 'Take a look!',
        variant: 'success'
      })
    })
    .catch((err) => {
      msgAlert({
        heading: 'Guide Post Failed :(',
        message: 'Try again. Error: ' + err.message,
        variant: 'danger'
      })
    })
}

render () {
  if (this.state.createdId) {
    return <Redirect to='/guides'/>
  }
  return (
    <React.Fragment>
      <p>Add a Guide</p>
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Guide Title Here"
          value={this.state.guide.title}
          onChange={this.handleChange}
          name="title"
        />
        <input
          placeholder="Guide Text Here"
          value={this.state.guide.text}
          onChange={this.handleChange}
          name="text"
        />
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  )
}
}

export default GuideCreate
