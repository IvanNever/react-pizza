import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const particularPizza = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );

      if (particularPizza) {
        particularPizza.quantity++;
        particularPizza.totalPrice += particularPizza.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const particularPizza = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );

      if (particularPizza) {
        particularPizza.quantity--;
        particularPizza.totalPrice -= particularPizza.unitPrice;

        if (particularPizza.quantity === 0) {
          cartSlice.caseReducers.deleteItem(state, action);
        }
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((acc, pizza) => acc + pizza.quantity, 0);
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, pizza) => acc + pizza.totalPrice, 0);

export const getCurrentQuantityById = (pizzaId) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === pizzaId)?.quantity ?? 0;

export default cartSlice.reducer;
