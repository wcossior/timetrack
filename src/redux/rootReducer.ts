import { combineReducers } from '@reduxjs/toolkit';
import checkSlice from './slices/checkSlice';
import signInSlice from './slices/SignInSlice';

const rootReducer = combineReducers({
    check: checkSlice,
    signin: signInSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;