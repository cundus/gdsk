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
export const getMenu = createAsyncThunk(
  'menu',
  async ({ serverUrl, clientId, patient }, { rejectWithValue, dispatch }) => {
    try {
      const params = {
        c: clientId,
        room_class_name: patient.class_name,
        meal_time_id: patient.meal_time_id,
        diet_category_id: patient.diet_category_id,
        diet_type_id: patient.diet_type_id,
      }
      const { data,request } = await axios.get(`${serverUrl}/menu`, {
        ...config,
        params,
      })
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        Alert.alert('error retrieving data floor ', error.message)
        return rejectWithValue(error.message)
      }
    }
  },
)
export const getMenuExtra = createAsyncThunk(
  'menu-extra',
  async ({ serverUrl, clientId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/menu-extra?c=${clientId}`,
        config,
      )

      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        Alert.alert('error retrieving data floor ', error.message)
        return rejectWithValue(error.message)
      }
    }
  },
)
