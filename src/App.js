import React, { Component , Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';

class App extends Component {
  state={
    users:[],
    user: {}, // single user
    loading: false,
    alert: null
  }
  // componentWillMount(){
  //   axios.get("https://api.github.com/users").then(res=> console.log(res.data));
  // }

  //fetching the original default users
  async componentDidMount(){
    this.setState({loading: true});
    //npm install axios
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data);
    this.setState({ users: res.data,loading: false });
  }

  //get a single Github user
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
         ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
         ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ user: res.data, loading: false, alert: null });
  }

  //gets the state of text from the Search component
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data);
    this.setState({ users: res.data.items, loading: false, alert:null });
  }
  clearUsers = () => {
    this.setState({
      loading: false,
      users:[],
      text:'',
      alert:null
    })
  }
  setAlert = (msg, type) => {
    if(msg===null || type===null){
      this.setState({ alert: null });
    }else{
      this.setState({ alert: { msg, type } }); //{msg: msg, type: type}
    }
    
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert}/>
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={this.state.users.length > 0 ? true : false}
                    setAlert={this.setAlert} />
                  <Users loading={this.state.loading} users={this.state.users} />
                </Fragment>
              )

              } />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} user={this.state.user} loading={this.state.loading} />
              )} />

            </Switch>
            
          </div>
          
        </div>
       </Router>
    )
  }
}

export default App
