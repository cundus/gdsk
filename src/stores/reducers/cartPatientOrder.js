import { createSlice } from '@reduxjs/toolkit'

const cartPatientOrderSlice = createSlice({
  name: 'cart',
  initialState: {
    result: {},
    isFetching: false,
  },
  reducers: {
    updateCart: (state, action) => {
      state.result = action.payload
    },
  },
})

export const { updateCart } = cartPatientOrderSlice.actions
export default cartPatientOrderSlice.reducer
