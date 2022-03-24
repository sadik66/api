import React from 'react';
import ReactDOM from 'react-dom';

import RouterComponent from "./routes"
import Context from "./components/context"

ReactDOM.render(
  <Context>
    <RouterComponent/>
  </Context>,
    
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

