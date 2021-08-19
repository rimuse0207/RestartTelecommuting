
import storage from "redux-persist/lib/storage/session";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import { compose, createStore, applyMiddleware, AnyAction } from "redux";

import rootReducer from "./index";

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["PersonalInfo"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: any = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(createLogger()))
);

export const persistor = persistStore(store)

export default store;