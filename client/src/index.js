import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// local imports
import AuthProvider from './contexts/AuthContext';
import ThemeProvider from './contexts/ThemeContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);