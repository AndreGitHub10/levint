import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/fonts/font.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import store from './components/storeState/store';
import { Provider } from 'react-redux'
// import LoginForm from './components/pages/loginForm';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    {/* <div>
      <LoginForm />
    </div> */}
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
