import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';
import Details from './components/Details';



class App extends Component {
 // constructor (props) {
 //   super(props);
 // }

  render() {
    return (
      <div className="App"> 
        <Router>

          <header className="App-header">
            <h1 className="App-header-title">Labb 2 - Movies</h1>

            <nav className="App-nav">
            <Link to='/' className="App-nav-link">HOME</Link> 
            <Link to='/add' className="App-nav-link">ADD</Link>
            </nav>
          </header>  
          
            
            <Route exact path='/' component={Home} />
            <Route path='/add' component={Add} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/Details/:id' component={Details} />
        </Router>

       
      </div>
    );
  }
}

export default App;

