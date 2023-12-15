import {changeCountOfItemReducer} from "./reducers";

const {addToCartReducer, deleteFromCartReducer, addSameItemReducer, deleteSameItemReducer} = require("./reducers");
const {configureStore, createSlice} = require("@reduxjs/toolkit");
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalAmount: 0,
        countOfCartItems: 0
    },
    reducers: {
        addToCart(state, action) {
            addToCartReducer(state, action)
        },
        deleteFromCart(state, action) {
            deleteFromCartReducer(state, action)
        },
        addSameItem(state, action) {
            addSameItemReducer(state, action)
        },
        deleteSameItem(state, action) {
            deleteSameItemReducer(state, action)
        },
        changeCountOfItem(state,action){
            changeCountOfItemReducer(state,action)
        }
    }
});

const store = configureStore({
    reducer: cartSlice.reducer
});
export default store
export const cartActions = cartSlice.actions;