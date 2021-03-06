import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider, createTheme} from '@mui/material';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      common:{
          black:"#333",
          white: "#fff"
      },
      background:{
          paper: "#121212",
          default: "#121212"
      }
    },
    typography:{
        allVariants:{
            color: "white"
        }
    }
  });

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
