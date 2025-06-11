import { createSlice } from '@reduxjs/toolkit'

const initialFields = {
  surname: '',
  name: '',
  patronym: '',
  contacts: [{}, {}, {}, {}, {}, {}, {}, {}],
  gender: 'male',
  dateBirth: '',
  country: 'Russia',
  region: '',
  city: '',
  nationalities: [
    {
      nationality: 'Russia',
    },
  ],
  workPermit: true,
  position: '',
  grade: '',
  skills: [],
  experiences: [
    {
      id: 0,
      position: '',
      companyName: '',
      startDate: '',
      endDate: '',
      site: '',
      description: '',
    },
  ],
  salary: null,
  currency: 'RUB',
  education: [
    {
      id: 0,
      educationType: '',
      universityName: '',
      method: 'education',
      faculty: '',
      specialization: '',
      endYear: null,
    },
    {
      id: 1,
      educationType: '',
      universityName: '',
      method: 'course',
      faculty: '',
      specialization: '',
      endYear: null,
    },
    {
      id: 2,
      educationType: '',
      universityName: '',
      method: 'certificate',
      faculty: '',
      specialization: '',
      endYear: null,
    },
  ],
  languages: [
    {
      id: 0,
      language: '',
      level: '',
    },
  ],
  relocation: 'impossible',
  employments: [
    {
      employmentType: '',
    },
  ],
  schedules: [{
    scheduleType: '',
  }],
  attachments: [],
  isBusinessTrip: 'never',
}

export const createResumeSlice = createSlice({
  name: 'createResume',
  initialState: {
    isEdit: false,
    fields: {
      surname: '',
      name: '',
      patronym: '',
      contacts: [{}, {}, {}, {}, {}, {}, {}, {}],
      gender: '',
      dateBirth: '',
      country: '',
      region: '',
      city: '',
      nationalities: [],
      workPermit: true,
      position: '',
      grade: '',
      skills: [],
      experiences: [
        {
          id: 0,
          position: '',
          companyName: '',
          startDate: '',
          endDate: '',
          site: '',
          description: '',
        },
      ],
      salary: null,
      currency: 'RUB',
      education: [
        {
          id: 0,
          educationType: '',
          universityName: '',
          method: 'education',
          faculty: '',
          specialization: '',
          endYear: null,
        },
        {
          id: 1,
          educationType: '',
          universityName: '',
          method: 'course',
          faculty: '',
          specialization: '',
          endYear: null,
        },
        {
          id: 2,
          educationType: '',
          universityName: '',
          method: 'certificate',
          faculty: '',
          specialization: '',
          endYear: null,
        },
      ],
      languages: [
        {
          id: 0,
          language: '',
          level: '',
        },
      ],
      relocation: 'impossible',
      employments: [
        {
          employmentType: '',
        },
      ],
      schedules: [{
        scheduleType: '',
      }],
      attachments: [],
      isBusinessTrip: 'never',
    },
    validation: {
      surnameValue: '',
      surnameError: '',
    },
  },
  reducers: {
    addField(state, action) {
      state.fields = { ...state.fields, ...action.payload }
    },
    setLanguages(state, action) {
      state.fields.languages = action.payload
    },
    setWorkExperience(state, action) {
      state.fields.experiences = action.payload
    },
    setEducation(state, action) {
      state.fields.education = action.payload
    },
    setFieldRegion(state, action) {
      state.fields.region = action.payload
    },
    setPositions(state, action) {
      state.fields.position = action.payload
    },
    setNationality(state, action) {
      state.fields.nationalities = action.payload
    },
    setSkillsList(state, action) {
      state.fields.skills = action.payload
    },
    addFieldLanguage(state, action) {
      state.fields.languages = action.payload
    },
    addFieldExperiences(state, action) {
      state.fields.experiences = action.payload
    },
    addFieldEducation(state, action) {
      state.fields.education = action.payload
    },
    setRelocations(state, action) {
      state.fields.relocation = action.payload
    },
    setBusinessTrips(state, action) {
      state.fields.isBusinessTrip = action.payload
    },
    setEmployments(state, action) {
      state.fields.employments = action.payload
    },
    setSchedules(state, action) {
      state.fields.schedules = action.payload
    },
    setMobilePhone(state, action) {
      state.fields.contacts[0] = action.payload
    },
    setEmail(state, action) {
      state.fields.contacts[1] = action.payload
    },
    setTelegram(state, action) {
      state.fields.contacts[2] = action.payload
    },
    setWhatApp(state, action) {
      state.fields.contacts[3] = action.payload
    },
    setVk(state, action) {
      state.fields.contacts[4] = action.payload
    },
    setHabr(state, action) {
      state.fields.contacts[5] = action.payload
    },
    setLinkedIn(state, action) {
      state.fields.contacts[6] = action.payload
    },
    setGit(state, action) {
      state.fields.contacts[7] = action.payload
    },
    setAttachments(state, action) {
      state.fields.attachments = [...state.fields.attachments, action.payload]
    },
    deleteAttachment(state, action) {
      state.fields.attachments = action.payload
    },
    clearFields(state) {
      state.fields = initialFields
    },
    setWorkPermit(state, action) {
      state.fields.workPermit = action.payload
    },
    setFields(state, action) {
      state.fields = action.payload
    },
    setEdit(state, action) {
      state.isEdit = action.payload
    },
    validatePersonData(state) {
      if (state.validation.surnameValue === '') {
        state.validation.surnameError = 'Ошибка'
      }
    },
    setSurname(state, action) {
      state.validation.surnameValue = action.payload
    },
  },
})

export const {
  addField,
  setFields,
  setLanguages,
  setWorkExperience,
  setEducation,
  setNationality,
  setSkillsList,
  addFieldLanguage,
  addFieldExperiences,
  setFieldRegion,
  addFieldEducation,
  setRelocations,
  setBusinessTrips,
  setEmployments,
  setSchedules,
  setMobilePhone,
  setEmail,
  setTelegram,
  setWhatApp,
  setVk,
  setHabr,
  setEdit,
  setLinkedIn,
  setGit,
  setPositions,
  setAttachments,
  deleteAttachment,
  clearFields,
  setWorkPermit,
  setSurname,
  validatePersonData,
} = createResumeSlice.actions
export default createResumeSlice.reducer
