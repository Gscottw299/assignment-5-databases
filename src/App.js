import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';


import List from "./components/list.component"
import Sight from "./components/sighted.component"
import Navbar from "./components/nav.component"
import Insert from "./components/insert.component"
import Update from "./components/update.component"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className='content'>
          <Route exact path="/" component={List} />
          <Route exact path="/:comname" component={Sight} />
          <Route exact path="/insert" component={Insert} />
          <Route exact path="/update/:comname" component={Update} />
        </div>
      </Router>
    </div>
  );
}

export default App;
