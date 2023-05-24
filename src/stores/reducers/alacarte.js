import { createSlice } from '@reduxjs/toolkit'
import { getAlacarteOrder } from '../actions/alacarte'
// import { getPatientOrder } from '../actions/patientOrder'

const initialState = {
  isFetching: false,
  data: [],
  error: null,
}

const alacarteOrderSlice = createSlice({
  name: 'alacarteOrder',
  initialState,
  reducers: {},
  extraReducers: {
    // login reducer
    [getAlacarteOrder.pending]: state => {
      state.isFetching = true
      state.error = null
    },
    [getAlacarteOrder.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.data = payload
    },
    [getAlacarteOrder.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.error = payload
    },
  },
})
// export const { turnOffSplash, setLogin, logout } = menuSlice.actions
export default alacarteOrderSlice.reducer
