import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './models/Store';
import RouterPage from './RouterPage';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
        <RouterPage></RouterPage>
    </Provider>,
    document.getElementById('root')
);
