import { createSlice } from '@reduxjs/toolkit'
import { getFloor } from '../actions/floor'

const initialState = {
  isFetching: false,
  floorData: [],
  error: null,
  roomData: [],
}

const floorSlice = createSlice({
  name: 'floor',
  initialState,
  reducers: {},
  extraReducers: {
    // login reducer
    [getFloor.pending]: state => {
      state.isFetching = true
      state.error = null
    },
    [getFloor.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.floorData = payload
    },
    [getFloor.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.error = payload
    },
  },
})
// export const { turnOffSplash, setLogin, logout } = floorSlice.actions
export default floorSlice.reducer
