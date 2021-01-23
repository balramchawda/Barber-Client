import React, { Component } from 'react';
import {Link,withRouter}  from 'react-router-dom';
import { setLoggeedInUser,getLoggedInUser,removeLoggedInUser,postLogin } from '../../helpers/authUtils';

class Home extends Component{
componentDidMount(){
removeLoggedInUser();
}
	render(){

		return(
			<React.Fragment>
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <a class="navbar-brand" href="#">Home</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
      
      <li class="nav-item">
        <Link to="login" className="navbar-brand"><i className="ti-calendar"></i><span> Login </span> </Link>
      </li>
    </ul>
  </div>  
</nav>
			</React.Fragment>
		)
	}
}

export default withRouter(Home);