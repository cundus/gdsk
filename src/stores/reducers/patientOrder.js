import { createSlice } from '@reduxjs/toolkit'
import { getPatientOrder, getPatientOrderRoom } from '../actions/patientOrder'

const initialState = {
  isFetching: false,
  data: [],
  data_room: [],
  error: null,
}

const patientOrderSlice = createSlice({
  name: 'patientOrder',
  initialState,
  reducers: {
    loading: state => {
      state.isFetching = !state.isFetching
    },
  },
  extraReducers: {
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
export const { loading } = patientOrderSlice.actions
export default patientOrderSlice.reducer
