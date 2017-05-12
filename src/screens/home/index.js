import React, {Component} from 'react'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import {MessageActions, UserActions} from '../../store'


const {sendMessage, listen} = MessageActions
const {getUser} = UserActions

class HomeScreen extends Component {
  componentDidMount() {
    const {user} = this.props
    if (user)
      listen()
    else
      getUser()
  }
   
  render() {
	var height = 0;
	$('div.box p').each(function(i, value){
	    height += parseInt($(this).height());
	});
	height += '';
	$('div').animate({scrollTop: height}, "fast");
	  
    const {user, messages} = this.props
    
    if (!user) {
      requestAnimationFrame(()=>hashHistory.push('/login'))
      return null
    }

    let textInput = null
    
    const submit = (e)=>{
      e.preventDefault()
      sendMessage({value: textInput.value})
      textInput.value = ''
    	  console.log(textInput);
    }

    return (
      <main className="container">	            
	      <div className="panel panel-primary">
	      <div className="panel-heading"><h1 className="myTitle">Chat</h1></div>
	      <div className="panel-body" id="panel-border">
		      <div className="box">
			      {messages.map((msg)=>{
			          if (msg.type === 'text')
			              return (
			                <p className="text-border" key={msg.id}> <p className="myUser">{msg.user.username}:</p> {msg.data.value} </p>
			              )
			      })}
		      </div>
		      <div className="text-area">
		        <form onSubmit={submit}>
		        	<input id="rc" required type="text" ref={el=>textInput = el}/>
		            <button className="btn-primary btn-sm">Send</button>
		        </form>
		      </div>
	        </div>
	      </div>
      </main>
    )
  }
}

export default connect(
  state=>({
    user: state.user,
    messages: state.messages
  })
)(HomeScreen)