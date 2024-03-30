import { combineReducers } from '@reduxjs/toolkit';
import checkSlice from './slices/checkSlice';

const rootReducer = combineReducers({
    check: checkSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;