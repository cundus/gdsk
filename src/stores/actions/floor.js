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
export const getFloor = createAsyncThunk(
  'floor/',
  async ({ serverUrl, clientId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/floor?c=${clientId}`,
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
// export const getRoom = createAsyncThunk(
//   'floor/',
//   async ({ serverUrl, clientId }, { rejectWithValue, dispatch }) => {
//     try {
//       const { data } = await axios.get(`${serverUrl}/floor/${id}/room`, config)

//       console.log(data)

//       return data.data
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         Alert.alert('error retrieving data floor ', error.message)
//         return rejectWithValue(error.message)
//       }
//     }
//   },
// )