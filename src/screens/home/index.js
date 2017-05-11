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
    }

    return (
    		<main className="container">
      <div className="panel panel-primary">
      
      <div className="panel-heading"><h1 className="myTitle">Chat</h1></div>
      <div className="panel-body">
      {messages.map((msg)=>{
          if (msg.type === 'text')
              return (
//                <table className="table">
//              <tbody>
//              <tr>
                <p className="text-border" key={msg.id}> <p className="myUser">{msg.user.username}</p> -{msg.data.value} </p>
//              </tr>
//          </tbody>
//          </table>
        )
      })}
      <div className="row text-area">
        <form onSubmit={submit}>
        	<input className="col-md-11" id ="rc" required type="text" ref={el=>textInput = el}/>
            <button className="btn-primary btn-sm col-md-1">Send</button>
            
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