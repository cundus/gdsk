import { createSlice } from '@reduxjs/toolkit'
import { getMenu, getMenuExtra } from '../actions/menu'

const initialState = {
  isFetching: false,
  menuData: [],
  menuExtra: [],
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
    [getMenuExtra.pending]: state => {
      state.isFetching = true
      state.error = null
    },
    [getMenuExtra.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.menuExtra = payload
    },
    [getMenuExtra.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.error = payload
    },
  },
})
// export const { turnOffSplash, setLogin, logout } = menuSlice.actions
export default menuSlice.reducer
