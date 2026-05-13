import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  todos: [{}],
  allProducts: [],
  category: [],
  cartItems: [],
  Api: [],
  profile: JSON.parse(localStorage.getItem("profileStatus")) || {
    activeStatus: true,
  },
};
const todoSlice = createSlice({
  name: "todoApp",
  initialState,
  reducers: {
    apiData: (state, actions) => {
      state.Api = actions.payload;
    },
    apiAllProducts: (state, actions) => {
      state.allProducts.push(...actions.payload);
    },
    categoryProduct: (state, actions) => {
      state.category.push(...actions.payload);
    },
    cartData: (state, actions) => {
      state.cartItems = actions.payload;
    },
    addCart: (state, actions) => {
      const items = state.cartItems;
      items.push(actions.payload);
    },
    removeCart: (state, actions) => {
      let pid = actions.payload;
      let carts = state.cartItems;
      const filterData = carts.filter(
        (item) => !pid.includes(item.cartDetails.productId),
      );
      state.cartItems = filterData;
    },

    addTodo: (state, actions) => {
      state.todos.push(actions.payload);
      state.todos;
    },
    profileValue: (state, actions) => {
      let status = actions.payload;
      state.profile = status;
    },
  },
});
export const {
  addTodo,
  removeTodo,
  apiData,
  apiAllProducts,
  categoryProduct,
  cartData,
  addCart,
  removeCart,
  cartCount,
  profileValue,
} = todoSlice.actions;
export default todoSlice.reducer;
