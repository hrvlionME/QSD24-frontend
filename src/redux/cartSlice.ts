import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    price: number;
    images: string[];
    color: string;
    size: string;
    brand: string;
    gender: string;
    description: string;
  }
  

interface CartSlice {
    products: Product[];
    totalPrice: number;
}

const initialState: CartSlice = {
    products: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addProductToCart: (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
        state.totalPrice += action.payload.price;
      },
      removeProductFromCart: (state, action: PayloadAction<number>) => {
        const productIndex = state.products.findIndex((product) => product.id === action.payload);
        if (productIndex !== -1) {
          const removedProduct = state.products[productIndex];
          state.products.splice(productIndex, 1);
          state.totalPrice -= removedProduct.price;
        }
      },
      clearCart: (state) => {
        state.products = [];
        state.totalPrice = 0;
      },
    },
  });
  
  export const { addProductToCart, removeProductFromCart, clearCart } = cartSlice.actions;
  
  export default cartSlice.reducer;