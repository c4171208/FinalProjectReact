
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  basketArr: [],

}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      let index = state.basketArr.findIndex(item => item._id === action.payload._id);
      if (index === -1) {
        state.basketArr.push({ ...action.payload, count: 1 });
      }
      else {
        state.basketArr[index].count++;
      }

      localStorage.setItem("currentBasket", JSON.stringify(state.basketArr))
    },

    deleteFromBasket: (state, action) => {
      state.basketArr = state.basketArr.filter(item => item._id !== action.payload._id);
      localStorage.setItem("currentBasket", JSON.stringify(state.basketArr))

    },
    deletAllBasket: (state, action) => {
      state.basketArr = [];
      localStorage.setItem("currentBasket", JSON.stringify(state.basketArr))

    },
    decreaseProduct: (state, action) => {
      let index = state.basketArr.findIndex(item => item._id === action.payload._id);
      if (action.payload.count > 1) {
        state.basketArr[index].count--;
      }
      else
        state.basketArr = state.basketArr.filter(item => item._id !== action.payload._id);

      localStorage.setItem("currentBasket", JSON.stringify(state.basketArr))

    },

    increaseProduct: (state, action) => {
      let index = state.basketArr.findIndex(item => item._id === action.payload._id);
      state.basketArr[index].count++;

      localStorage.setItem("currentBasket", JSON.stringify(state.basketArr))

    },
    addToOrder: (state, action) => {

      let index = state.basketArr.findIndex(item => item._id === action.payload._id);
      state.basketArr[index].ToAdd = true;
    },
    okToOrder: (state, action) => {
      alert("okAdd")
      state.productToOrder = state.basketArr.filter(item => item.ToAdd == true)

    },
    cancleToOrder: (state, action) => {
      let index = state.basketArr.findIndex(item => item._id === action.payload._id);
      state.basketArr[index].ToAdd = false;

    }
    ,
    pushToBasket: (state, action) => {
      state.basketArr = action.payload;
    },

  }


})

export const { addToBasket, deleteFromBasket, decreaseProduct, increaseProduct, addToOrder, cancleToOrder, okToOrder, deletAllBasket, pushToBasket } = basketSlice.actions;


export default basketSlice.reducer;
