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
	    <div className="row">
	    	<div className="col-md-12 col-height">
				<form className="login-bg" onSubmit={submit}>
					<fieldset>
						<legend>Login:</legend>
					    <div>
					        <label className="login-text">Username: <input className="login-text" required type="text" ref={el=>usernameInput = el}/></label>
					    </div>
					    <div>
					        <label className="login-text">Password: <input className="login-text" required type="password" ref={el=>passwordInput = el}/></label>
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
