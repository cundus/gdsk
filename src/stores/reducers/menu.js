import { createSlice } from '@reduxjs/toolkit'
import { getMenu } from '../actions/menu'

const initialState = {
  isFetching: false,
  menuData: [],
  error: null,
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: {
    // login reducer
    [getMenu.pending]: state => {
      state.isFetching = true
      state.error = null
    },
    [getMenu.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.menuData = payload
    },
    [getMenu.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.error = payload
    },
  },
})
// export const { turnOffSplash, setLogin, logout } = menuSlice.actions
export default menuSlice.reducer
