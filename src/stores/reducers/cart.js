import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    result: [],
    isFetching: false,
  },
  reducers: {
    addItem: (state, action) => {
      state.data = [...state.data, action.payload]
    },
    removeItem: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload.id)
      return state
    },
    clearCart: state => {},
  },
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
