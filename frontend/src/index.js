import React from 'react';
// import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client'
import './index.css'; // Import your global styles
import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// Create a root

const root = createRoot(document.getElementById('root'));

// Initial render
root.render(
    <App />
);

// If you want to measure performance metrics, uncomment the line below and follow the instructions in the console.
// reportWebVitals();
