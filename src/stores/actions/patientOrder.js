import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import * as env from '../../utils/env'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const header = env.API_HEADER
const config = {
  headers: header,
  rejectUnauthorized: false,
}
export const getPatientOrder = createAsyncThunk(
  'patientOrder/',
  async ({ serverUrl, clientId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/order-patient?c=${clientId}`,
        config,
      )
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        Alert.alert('error retrieving patient Order ', error.message)
        return rejectWithValue(error.message)
      }
    }
  },
)
export const syncPatientOrder = createAsyncThunk(
  'patientOrder/',
  async ({ serverUrl, body }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/order-patient/sync`,
        body,
        config,
      )
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        Alert.alert('error retrieving patient Order ', error.message)
        return rejectWithValue(error.message)
      }
    }
  },
)
export const syncPatientOrderExtra = createAsyncThunk(
  'patientOrder/',
  async ({ serverUrl, body }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/order-extra/sync`,
        body,
        config,
      )
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        Alert.alert('error retrieving patient Order ', error.message)
        return rejectWithValue(error.message)
      }
    }
  },
)
