import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import * as env from '../../utils/env'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const header = env.API_HEADER

export const getAlacarteOrder = createAsyncThunk(
  'alacarteOrder/',
  async ({ serverUrl, clientId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/order-alacarte?c=${clientId}`,
        header,
      )

      return data.reverse()
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        Alert.alert('error retrieving alacarte Order ', error.message)
        return rejectWithValue(error.message)
      }
    }
  },
)

export const submitAlacarteOrder = createAsyncThunk(
  'alacarteOrder/submit',
  async ({ serverUrl, body }, { rejectWithValue, dispatch }) => {
    try {
      console.log(JSON.stringify(body, null, 2))
      const { data } = await axios.post(
        `${serverUrl}/order-alacarte`,
        body,
        header,
      )
      console.log('RESPON SUBMIT ALACARTE', data)
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message)
        return rejectWithValue(error.response.data.message)
      } else {
        console.log(error.message)

        Alert.alert('error retrieving alacarte Order ', error.message)
        return rejectWithValue(error.message)
      }
    }
  },
)
