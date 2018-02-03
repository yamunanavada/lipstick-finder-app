import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import MakeupContainer from './MakeupContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MakeupContainer />, document.getElementById('root'));
registerServiceWorker();
