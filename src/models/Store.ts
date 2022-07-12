import storage from 'redux-persist/lib/storage/session';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { compose, createStore, applyMiddleware, AnyAction } from 'redux';
import Thunk from 'redux-thunk';
import rootReducer from './index';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['PersonalInfo', 'Access_Control', 'CSMFiltering'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: any = createStore(persistedReducer, composeEnhancers(applyMiddleware(Thunk, createLogger())));

export const persistor = persistStore(store);

export default store;
