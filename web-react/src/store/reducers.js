export function addToCartReducer(state, action) {
    console.log(state)
    console.log(action)
    const existingItem = state.cart.find(laptop => laptop.id === action.payload.id);
    const quantity = action.payload.quantity || 1;
    if (existingItem) {
        existingItem.countOfSameLaptops += quantity;
        existingItem.price += existingItem.initialPrice * quantity;
        state.totalAmount = state.totalAmount + existingItem.initialPrice * quantity;
    } else {
        const newCartItem = {
            ...action.payload,
            countOfSameLaptops: quantity,
            price: action.payload.price * quantity,
            initialPrice: action.payload.price,
        };
        state.cart = [...state.cart, newCartItem];
        state.totalAmount = state.totalAmount + newCartItem.initialPrice * quantity;
        state.countOfCartItems = state.countOfCartItems + quantity;
    }
}

export function deleteFromCartReducer(state, action) {
    const deletedItem = state.cart.find(laptop => laptop.id === action.payload.id);

    if (!deletedItem) {
        return;
    }
    state.cart = state.cart.filter(laptop => laptop.id !== action.payload.id);
    state.totalAmount = state.totalAmount - (deletedItem.initialPrice * deletedItem.countOfSameLaptops);
    state.countOfCartItems -= 1;
}

export function addSameItemReducer(state, action) {
    const updatedCart = state.cart.map(laptop =>
        laptop.id === action.payload.id
            ? {
                ...laptop,
                countOfSameLaptops: laptop.countOfSameLaptops + 1,
                price: laptop.price
                    + action.payload.initialPrice,
            }
            : laptop
    );

    const updatedTotalAmount =
        state.totalAmount + action.payload.initialPrice;

    state.cart = updatedCart;
    state.totalAmount = updatedTotalAmount;
    state.countOfCartItems += 1;
}

export function deleteSameItemReducer(state, action) {
    if (action.payload.countOfSameLaptops === 1) {
        return;
    }

    const updatedCart = state.cart.map(laptop =>
        laptop.id === action.payload.id && laptop.countOfSameLaptops > 1
            ? {
                ...laptop,
                countOfSameLaptops: laptop.countOfSameLaptops - 1,
                price: laptop.price - action.payload.initialPrice,
            }
            : laptop
    );

    const updatedTotalAmount =
        state.totalAmount - action.payload.initialPrice;

    state.cart = updatedCart;
    state.totalAmount = updatedTotalAmount;
    state.countOfCartItems -= 1;
}

export function changeCountOfItemReducer(state, action) {
    let foundedItem = state.cart.find(laptop => laptop.id === action.payload.item.id);
    const itemIdx = state.cart.findIndex(laptop => laptop.id === action.payload.item.id);
    const countOfItems = action.payload.count;
    const updatedPrice = action.payload.item.initialPrice * countOfItems;
    foundedItem = {
        ...foundedItem,
        countOfSameLaptops: countOfItems,
        price:updatedPrice
    }
    state.cart[itemIdx] = foundedItem;
}