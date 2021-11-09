import React, { useState, useEffect } from 'react';
import { Alert } from "react-bootstrap";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Home from './homePage/Home';
import AboutPage from './homePage/AboutPage';
import ArticleList from './articles/ArticleList';
import ArticleInfo from './articles/ArticleInfo';
import ArticleCreate from './articles/ArticleCreate';
import NotFoundPage from './homePage/NotFoundPage';
import LoginPage from './login/LoginPage'
import RegisterPage from './register/RegisterPage'
import NavBar from './NavBar';
import './App.css';
import ArticleEdit from './articles/ArticleEdit';


function App( ) {

    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    // @desc    Get the current logged in user from the local storage
    useEffect(() => {
      const loggedUser = localStorage.getItem('loggedUser');
      if (loggedUser) {
        setUser(JSON.parse(loggedUser).username)
      }
    },[]);

    // @desc    login hook - checks if its a registration request to avoid showing the login form for new registration
    //          also, sets the loggedin user details in the local storage
    
    const login = async (details, isReg) => {
      setIsRegister(isReg);
      if(!isReg) {
        try {
          const config = {
            headers: {
              "Content-type": "application/json"
            }
          }
          const { data } = await axios.post(
            "/api/user/login",
            { username: details.name, password: details.password },
            config
          );
          localStorage.setItem('loggedUser', JSON.stringify(data));
          setUser(details.name);
        } catch(error) {
          setError(error.response.data.message);
        }  
      }
    }

    return (
      <div className="App">
        {user === "" ?
          <Router>
            {error ? 
                <Alert variant="danger" style={{ fontSize: 20 }}>
                  <strong>{error}</strong>
                </Alert> : null
            }
            <Routes>
              <Route path="/register" element={ <RegisterPage /> } exact />
              <Route path="/home" element={ 
                <div>
                  <NavBar /> 
                  <Home /> 
                </div> 
              } />
            </Routes>
            {!isRegister ? <LoginPage login={login} error={error}/> : null}
          </Router>
          :
          <Router>        
            <NavBar user={user}/>
            <div id="page-body">
              <Routes>
                <Route path="/" element={ <Home /> } exact />
                <Route path="/about" element={ <AboutPage /> } />
                <Route path="/articlelist" element={ <ArticleList /> }  />
                <Route path="/createarticle" element={ <ArticleCreate />} />;
                <Route path="/editarticle/:title" element={ <ArticleEdit />} />;
                <Route path="/login" element={ <LoginPage /> }  />
                <Route path="/register" element={ <RegisterPage /> }  />
                <Route path="/home" element={ <Home /> } />
                <Route path="/article/:title" 
                        element = {<ArticleInfo />}
                />
                <Route path="*" element = {<NotFoundPage /> } />
              </Routes>
            </div>
          </Router>
        }
      </div>
    );
  }

export default App;
