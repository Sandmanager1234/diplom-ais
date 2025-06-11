import { createSlice } from "@reduxjs/toolkit";
import { Directories } from 'types';

const initialState: Directories = {
    mas: {
        comment: [],
        position: [],
        region: [],
        city: [],
    },
    glossary: {
        "employment-type": [],
        "schedule-type": []
    }
}

export const dictionariesSlice = createSlice({
    name: "dictionaries",
    initialState,
    reducers: {
        addDictionary(state, action) {
            state.mas = {...state.mas, [action.payload.name]: action.payload.value}
        },
        addGlossary(state, action) {
            state.glossary = {...state.glossary, ...action.payload}
        },
    }
});

export const {addDictionary, addGlossary} = dictionariesSlice.actions;
export default dictionariesSlice.reducer;
