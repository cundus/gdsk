import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.data = [...state.data, action.payload]
    },
    removeItem: (state, action) => {},
    clearCart: state => {},
  },
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
