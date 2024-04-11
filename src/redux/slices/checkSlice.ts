import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckState {
    visible: boolean,
    isTheCorrectSubject: boolean | null,
    subject: string,
}

const initialState: CheckState = {
    visible: false,
    isTheCorrectSubject: null,
    subject: ""
};

const checkSlice = createSlice({
    name: 'check',
    initialState,
    reducers: {
        showCamera(state) {
            state.visible = true;
        },
        hideCamera(state) {
            state.visible = false;
        },
        cleanIsTheCorrectSubject(state) {
            state.isTheCorrectSubject = null;
        },
        yesIsTheCorrectSubject(state) {
            state.isTheCorrectSubject = true;
        },
        noIsTheCorrectSubject(state) {
            state.isTheCorrectSubject = false;
        },
        setSubject(state, action: PayloadAction<string>) {
            state.subject = action.payload;
        },
    },
});

export const { showCamera, hideCamera, cleanIsTheCorrectSubject, yesIsTheCorrectSubject, noIsTheCorrectSubject, setSubject } = checkSlice.actions;

export default checkSlice.reducer;