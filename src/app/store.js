import { configureStore } from "@reduxjs/toolkit"
import basketSlice from "../features/order/basket/basketSlice.js"; // Import the default export
import userSlice from "../features/user/userSlice";

export const store=configureStore({
reducer:{
    basket:basketSlice,
    user:userSlice
}
})

