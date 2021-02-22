import React from 'react';
import {
  BrowserRouter as Router,
  
} from 'react-router-dom';
import Routes from './routes';
import Navbar from './components/Navbar';
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
      </ToastProvider>
    </div>
  );
}

export default App;
