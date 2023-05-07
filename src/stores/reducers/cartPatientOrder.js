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
    removeItem: (state, action) => {
      let cartOrder = { ...state.result }
      const itemIdx = cartOrder.detail.findIndex(
        item => item.id === action.payload.id,
      )
      cartOrder.menu.splice(itemIdx, 1)
      cartOrder.detail.splice(itemIdx, 1)
      cartOrder.price.splice(itemIdx, 1)
      cartOrder.quantity.splice(itemIdx, 1)
      cartOrder.total.splice(itemIdx, 1)
      cartOrder.remarks.splice(itemIdx, 1)

      cartOrder.grand_total = cartOrder.total.reduce((a, b) => a + b, 0)

      state.result = cartOrder
    },
  },
})

export const { updateCart, removeItem } = cartPatientOrderSlice.actions
export default cartPatientOrderSlice.reducer
