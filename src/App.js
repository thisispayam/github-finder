import React, { useState , Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';

const App =() => {
 
  const [alert, setAlert] = useState(null);
  
  // componentWillMount(){
  //   axios.get("https://api.github.com/users").then(res=> console.log(res.data));
  // }

  // //fetching the original default users
  // const fetchUsers = async () => {
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   setUsers(res.data);
  //   setLoading(false);
  // };
  // useEffect(() => { 
  //   fetchUsers() 
  // }, []);

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
                    <Search
                      setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )

                } />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component = {User} />/>

              </Switch>
              
            </div>
            
          </div>
        </Router>
      </GithubState>
    )
}

export default App
