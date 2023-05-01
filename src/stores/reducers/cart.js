import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    result: {},
    isFetching: false,
  },
  reducers: {
    updateCart: (state, action) => {
      state.result = action.payload
    },
    removeItem: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload.id)
      return state
    },
    clearCart: state => {},
  },
})

export const { updateCart, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
