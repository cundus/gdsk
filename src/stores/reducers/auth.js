import { createSlice } from '@reduxjs/toolkit'
import { getServerUrl, loginUser } from '../actions/auth'

const initialState = {
  isFetching: false,
  user: {},
  isLogin: false,
  serverUrl: '',
  error: null,
  isSplash: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    turnOffSplash: state => {
      return { ...state, isSplash: false }
    },
    setLogin: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        isLogin: true,
        serverUrl: action.payload.url,
      }
    },
    logout: state => {
      return initialState
    },
  },
  extraReducers: {
    // login reducer
    [loginUser.pending]: state => {
      state.isFetching = true
      state.error = null
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.user = payload
      state.isLogin = true
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.error = payload
    },

    // geturl reducer
    [getServerUrl.pending]: state => {
      state.isFetching = true
      state.error = null
    },
    [getServerUrl.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.serverUrl = payload
    },
    [getServerUrl.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.error = payload
    },
  },
})
export const { turnOffSplash, setLogin, logout } = authSlice.actions
export default authSlice.reducer
