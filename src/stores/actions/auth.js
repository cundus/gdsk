// authActions.js
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import * as env from '../../utils/env'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const header = env.API_HEADER

const saveServerUrl = async url => {
  try {
    await AsyncStorage.setItem('serverUrl', url)
  } catch (error) {
    Alert.alert('Error Saving Data', error.toString())
  }
}

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
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ serverUrl, email, password }, { rejectWithValue, dispatch }) => {
    try {
      console.log('LOGGING IN')
      const config = {
        headers: header,
        rejectUnauthorized: false
      }
      const { data } = await axios.post(
        `${serverUrl}/auth/login`,
        { email, password },
        config
      )

      console.log(data)

      return data.data
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
