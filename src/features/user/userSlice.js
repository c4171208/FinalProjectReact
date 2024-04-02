import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    currentUser: null,
    isAdmin: false
}
const userSlice = createSlice({

    name: "user",
    initialState,
    reducers: {

        userIn: (state, action) => {

            state.currentUser = action.payload;
            state.isAdmin = state.currentUser.role === "ADMIN" ? true : false;
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser))


        },

        userOut: (state, action) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser", JSON.stringify(state.currentUser))
            localStorage.removeItem("currentBasket")

            state.isAdmin = false;

        }
    }
})


export const { userIn, userOut } = userSlice.actions;
export default userSlice.reducer;
