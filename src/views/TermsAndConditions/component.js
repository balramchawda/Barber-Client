import React, { PureComponent } from 'react'
// import Header from '../Header/container'
// import Footer from '../Footer/container'
import './styles.scss'

class TermAndCondition extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    document.title = 'Barber App'
    // this.props.getUser()
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return null
  // }

  render() {
    return (
      <div>
       <h1>Term & Condition</h1> 
      </div>
    )
  }
}

export default TermAndCondition
