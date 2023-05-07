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
    clearCart: state => {},
    increaseQuantity: (state, action) => {
      const { id } = action.payload
      let cartOrder = { ...state.result }
      const itemIdx = cartOrder.detail.findIndex(item => item.id === id)
      if (itemIdx !== -1) {
        cartOrder.quantity[itemIdx] = +cartOrder.quantity[itemIdx] + 1
        cartOrder.total[itemIdx] =
          +cartOrder.quantity[itemIdx] * +cartOrder.price[itemIdx]

        cartOrder.grand_total = cartOrder.total.reduce((a, b) => a + +b, 0)

        console.log('Item Idx: ', cartOrder.quantity)
        state.result = cartOrder
      }
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload
      let cartOrder = { ...state.result }
      const itemIdx = cartOrder.detail.findIndex(item => item.id === id)
      if (itemIdx !== -1) {
        if (cartOrder.quantity[itemIdx] !== 0) {
          cartOrder.quantity[itemIdx] = +cartOrder.quantity[itemIdx] - 1
          cartOrder.total[itemIdx] =
            +cartOrder.quantity[itemIdx] * +cartOrder.price[itemIdx]

          cartOrder.grand_total = cartOrder.total.reduce((a, b) => a + +b, 0)

          console.log('Item Idx: ', cartOrder.quantity)
          state.result = cartOrder
        }
      }
    },
  },
})

export const {
  updateCart,
  removeItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions
export default cartSlice.reducer
