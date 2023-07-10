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
        `${serverUrl}/order-patient/floors?c=${clientId}`,
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

export const getPatientOrderRoom = createAsyncThunk(
  'patientOrder/',
  async ({ serverUrl, floorId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/order-patient/rooms?f=${floorId}`,
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
export const getPatientOrderPatient = createAsyncThunk(
  'patientOrder/',
  async (
    { serverUrl, floorId, roomId, rcId },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/order-patient/patients?f=${floorId}&r=${roomId}&rc=${rcId}`,
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

export const getPatientOrderExtra = createAsyncThunk(
  'patientOrder/',
  async ({ serverUrl, clientId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/order-extra?c=${clientId}`,
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
  'patientOrder/sync',
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
  'patientOrderExtra/sync',
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
