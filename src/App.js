import React from 'react';
import {
  BrowserRouter as Router,

} from 'react-router-dom';
import Routes from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastProvider from './providers/ToastProvider';

function AppContainer({ children }) {
  return children;
}

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <Router>
          <AppContainer>
            <Navbar/>
            <div className="container">
              <Routes/>
            </div>
          </AppContainer>
        </Router>
        <Footer/>
      </ToastProvider>
    </div>
  );
}

export default App;
