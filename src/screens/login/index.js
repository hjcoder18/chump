import React from 'react'
import {connect} from 'react-redux'
import {Link, hashHistory} from 'react-router'
import {UserActions} from '../../store'
const {login} = UserActions

function LoginScreen({user}){
  if (user) {
    requestAnimationFrame(()=>hashHistory.push('/'))
    return null
  }

  let usernameInput = null
  let passwordInput = null

  const submit = (e)=>{
    e.preventDefault()
    login(usernameInput.value, passwordInput.value, ()=>{
      hashHistory.push('/')
    })
  }
  return (
    <main className="container">
    	<div className="jumbotron jumbotron-bg">
    		<div className="col-md-8 jumbotron-text">
    			<h2>Chump</h2>
    			<h3>The simpliest chat application ever.</h3>
    			<p>So easy, even your grandmother can use it.</p>
    		</div>
    		<div className="col-md-4 login-bg">
			    <form onSubmit={submit}>
			      <fieldset>
			        <legend>Login:</legend>
			        <div>
			          <label>Username: <input required type="text" ref={el=>usernameInput = el}/></label>
			        </div>
			        <div>
			          <label>Password: <input required type="password" ref={el=>passwordInput = el}/></label>
			        </div>
			        <div>
			          <Link className="register" to="/register">Register</Link>
			          <button>Login</button>
			        </div>
			      </fieldset>
			    </form>
		    </div>
		</div>
    </main>
  )
}

export default connect(
  state=>({user: state.user})
)(LoginScreen)
