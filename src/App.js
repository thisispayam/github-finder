import React, { useState , Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';
import GithubState from './context/github/GithubState';

const App =() => {
  const [users, setUsers] = useState([]); // default set to empty array
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  
  // componentWillMount(){
  //   axios.get("https://api.github.com/users").then(res=> console.log(res.data));
  // }

  //fetching the original default users
  const fetchUsers = async () => {
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data);
    setLoading(false);
  };
  useEffect(() => { 
    fetchUsers(users) 
  }, [users]);

  //get a single Github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
         ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
         ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
    setAlert(null);
  }

  //get user's repos
  const getUserRepos = async (username) => {
   setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=
         ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
         ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   setRepos(res.data);
   setLoading(false);
   setAlert(null);
  }

  //gets the state of text from the Search component
  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data);
    setUsers(res.data.items);
    setLoading(false);
    setAlert(null);
  }
  const clearUsers = () => {
    setLoading(false);
    setUsers([]);
    // setText('');
    setAlert(null);
  }
  const showAlert = (msg, type) => {
    if(msg===null || type===null){
      setAlert(null);
    }else{
      setAlert({msg, type} );
    }
    
  }
    return (
      <GithubState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert alert={alert}/>
              <Switch>
                <Route exact path='/' render={props => (
                  <Fragment>
                    <Search searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert} />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )

                } />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' render={props => (
                  <User {...props} getUser={getUser} getUserRepos={getUserRepos}  user={user} repos={repos} loading={loading} />
                )} />

              </Switch>
              
            </div>
            
          </div>
        </Router>
      </GithubState>
    )
}

export default App
