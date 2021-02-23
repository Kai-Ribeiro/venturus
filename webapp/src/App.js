import React from 'react';
import {
  BrowserRouter as Router,
  
} from 'react-router-dom';
import Routes from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppContainer({ children }) {
  return children;
}

function App() {
  return (
    <div className="App">
        <Router>
          <AppContainer>
            <Navbar/>
            <div className="container">
              <Routes/>
            </div>
          </AppContainer>
        </Router>
        <Footer/>
    </div>
  );
}

export default App;
