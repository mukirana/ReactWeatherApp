import React from 'react'
import Search from './Search.js'
class NavBar extends React.Component{
  render() {
      return (
      <>
        <nav className="navbar navbar-light" style={{background:"#563D7C"}}>

          <a className="navbar-brand ml-2" href="#" style={{color:"#f0ad4e"}}>
              Weather app
          </a>
          <div className="col-lg-6">
          <Search onSubmit={this.props.onSubmit} blankTextBox={this.props.blankTextBox}/> 
          </div>
        </nav>
      </>  
      )
  }
}
export default NavBar