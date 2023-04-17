import { createSlice } from '@reduxjs/toolkit'
import { getServerUrl, loginUser } from '../actions/auth'

const initialState = {
  isFetching: false,
  result: {},
  isLogin: false,
  serverUrl: '',
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // login reducer
    [loginUser.pending]: state => {
      state.isFetching = true
      state.error = null
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.result = payload
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
    }
  }
})

export default authSlice.reducer
