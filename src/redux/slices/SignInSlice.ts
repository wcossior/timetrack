import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignInState {
    visible: boolean,
}

const initialState: SignInState = {
    visible: false
};

const SignInSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        showForm(state) {
            state.visible = true;
        },
        hideForm(state) {
            state.visible = false;
        },
    },
});

export const { showForm, hideForm } = SignInSlice.actions;

export default SignInSlice.reducer;