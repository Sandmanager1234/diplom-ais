import { createSlice } from "@reduxjs/toolkit";

const maxDate = `${new Date(Date.now()).getFullYear() - 18}-${new Date(Date.now()).toLocaleDateString().slice(0, 2)}${new Date(Date.now()).toLocaleDateString().slice(2, 5)}`

const resumeValidationSlice = createSlice({
    name: "resumeValidation",
    initialState: {
        personalData: {
            surname: false,
            name: false,
            patronomic: true,
            birthday: true,
            country: false,
            region: false
        },
        contacts: {}

    },
    reducers: {
        checkSurname(state, action) {
            state.personalData.surname = action.payload !== '' && /[A-Za-zА-Яа-яЁё]{2,}/.test(action.payload);
        },
        checkName(state, action) {
            state.personalData.name = action.payload !== '' && /[A-Za-zА-Яа-яЁё]{2,}/.test(action.payload);
        },
        checkPatronomic(state, action) {
            state.personalData.patronomic = action.payload === '' || /[A-Za-zА-Яа-яЁё]{2,}/.test(action.payload);
        },
        checkBirthday(state, action) {
            state.personalData.birthday = action.payload === '' || (new Date(action.payload) > new Date('1910-01-01')
                && new Date(action.payload) < new Date(maxDate))
        },
        checkCountry(state, action) {
            state.personalData.country = action.payload !== '' 
        },
        checkRegion(state, action) {
            state.personalData.region = action.payload !== '' 
        },
        checkCity(state, action) {
            state.personalData.region = action.payload !== '' 
        }
    }
})

export const {checkSurname, checkPatronomic, checkName, checkBirthday, checkCountry, checkRegion, checkCity} = resumeValidationSlice.actions
export default resumeValidationSlice.reducer