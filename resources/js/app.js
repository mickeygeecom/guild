import App from './components/App';
import ReactDOM from 'react-dom';
import React from 'react';

const app = document.getElementById('app');
console.log(app);
if (app) {
    ReactDOM.render(
        <App />,
        app
    );
}
