import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// import 'antd/dist/antd.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

declare global {
  interface Window { aptos: any; }
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
