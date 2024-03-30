import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckState {
    visible: boolean,
}

const initialState: CheckState = {
    visible: false
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
    },
});

export const { showCamera, hideCamera } = checkSlice.actions;

export default checkSlice.reducer;