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
    removeItem: (state, action) => {},
    clearCart: state => {},
  },
})

export const { updateCart, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
