// authActions.js
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import * as env from '../../utils/env'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const header = env.API_HEADER

export const getServerUrl = createAsyncThunk(
  'auth/getUrl',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const value = await AsyncStorage.getItem('serverUrl')
      return value
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        Alert.alert('error retrieving url ', error.message)
        return rejectWithValue(error.message)
      }
    }
  },
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ serverUrl, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: header,
      }
      const { data } = await axios.post(
        `${serverUrl}/auth/login`,
        { email, password },
        config,
      )

      if (!data.data) {
        return Alert.alert('Email atau password salah!')
      }

      await AsyncStorage.setItem('user', JSON.stringify(data.data))
      await AsyncStorage.setItem('serverUrl', serverUrl)
      dispatch(getServerUrl())
      return data.data
    } catch (error) {
      console.log(error)
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)
