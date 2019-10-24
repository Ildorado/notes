import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Notes from './notes';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/index'
import { Provider } from 'react-redux';
const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Notes/>
        </PersistGate>
    </Provider>
)
ReactDOM.render(
    <App />,
    document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
