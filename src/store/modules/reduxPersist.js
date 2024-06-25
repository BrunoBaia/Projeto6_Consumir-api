import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default function persist(reducers) {
  const persistedReducers = persistReducer(
    {
      key: 'COMSUMO-API',
      storage,
      whiteList: ['auth'],   // nome do reducer no arquivo rootReducer
    },
    reducers
  );

  return persistedReducers;
};
