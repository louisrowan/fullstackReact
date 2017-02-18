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
      var todos = that.state.todos.concat([res])

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
  handleChange(e, id, i) {
    var newName = $('#' + 'input' + i.toString()).val()
    var that = this
    $.ajax({
      url: '/todos',
      type: 'put',
      data: { newName: newName, i: id }
    }).done(function(res){
      var todos = Object.assign([], that.state.todos)
      todos[i] = res.value
      // temporary fix to show updated list
      that.componentDidMount()
      $('#' + 'input' + i.toString()).val('')
      $('#' + 'span' + i.toString()).text(res.value.name)
    })
  },
  handleDelete(e, id, i){
    var that = this
    $.ajax({
      url: '/todos',
      type: 'delete',
      data: { i: id}
    }).done(function(res){
      var todos = Object.assign([], that.state.todos)
      todos.splice(i, 1)
      that.setState({ todos })
    })
  },

  render(){
    var todos;
    var that = this;
    if (this.state.todos != ''){
      todos =
      this.state.todos.map(function(m, i) {
          
          return (
          <tr key={i}>
            <td>
            <span id={'span' + i}>{m.name}</span>
            </td>
            <td>
            <input type='text' id={'input' + i} />
            </td>
            <td>
              <button onClick={(e) => that.handleChange(e, m._id, i)}>
            Update
            </button>
            </td>
            <td>
              <button onClick={(e) => that.handleDelete(e, m._id, i)}>Delete</button>
            </td>
          </tr>
          )
        })
    } else {
      todos = ''
    }
    return (
      <div>
        <a href='/otherpage'>CLICK</a>
        <table>
          <tbody>
          {todos}
          </tbody>
        </table>
        <h4>Add new:</h4>
        <input id='newTodo' /><br />
        <button onClick={()=> this.doSomething()}>Add</button>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))