import { createSlice } from "@reduxjs/toolkit";

type utilsRedux = {
    language: string;
};

const initialState: utilsRedux = {
    language: "es",
};

export const languageReducer = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguaje: (state, action) => {
            state.language = action.payload;
        }
    },
});
