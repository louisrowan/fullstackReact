const React = require('react')
const ReactDOM = require('react-dom')
const $ = require('jquery')

const App = React.createClass({
  getInitialState(){
    return {
      todos: ''
    }
  },
  doSomething(){
    var input = document.getElementById('newTodo')
    var data = $(input).val()
    $(input).val('')
    var that = this
    $.ajax({
      url: '/bananas',
      type: 'post',
      data: { name: data}
    }).done(function(res){
      console.log(res)
      console.log(that.state.todos)
      var todos = that.state.todos.concat([res])

      console.log(todos)
      that.setState({ todos })
    })
  },
  componentDidMount(){
    var that = this
    $.ajax({
      url: '/todos'
    }).done(function(res){
      that.setState({ todos: res})
    })
  },
  render(){
    var todos;
    if (this.state.todos != ''){
      todos =
      this.state.todos.map(function(m, i) {
          return <li key={i}>{m.name}</li>
        })
    } else {
      todos = ''
    }
    return (
      <div>
        <ul>
          {todos}
        </ul>
        <input id='newTodo' />
        <button onClick={()=> this.doSomething()}>Add</button>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))