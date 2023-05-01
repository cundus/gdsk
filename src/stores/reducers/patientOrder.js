import { createSlice } from '@reduxjs/toolkit'
import { getPatientOrder } from '../actions/patientOrder'

const initialState = {
  isFetching: false,
  data: [],
  error: null,
}

const patientOrderSlice = createSlice({
  name: 'patientOrder',
  initialState,
  reducers: {},
  extraReducers: {
    // login reducer
    [getPatientOrder.pending]: state => {
      state.isFetching = true
      state.error = null
    },
    [getPatientOrder.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.data = payload
    },
    [getPatientOrder.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.error = payload
    },
  },
})
// export const { turnOffSplash, setLogin, logout } = menuSlice.actions
export default patientOrderSlice.reducer
