import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    price: number;
    images: { name: string }[];
    sizes: { name: string }[];
    color: string;
    selectedSize: any;
    brand: string[];
    gender: string;
    description: string;
    amount: number;
    totalPrice: number;
  }
  

interface CartSlice {
    products: Product[];
}

const initialState: CartSlice = {
    products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Product>) => {
      const existingProductIndex = state.products.findIndex(product => product.id === action.payload.id);
      
      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].amount += action.payload.amount;
        state.products[existingProductIndex].totalPrice += action.payload.price * action.payload.amount;
      } else {
        state.products.push({ ...action.payload, totalPrice: action.payload.price * action.payload.amount });
      }
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const productIndex = state.products.findIndex((product) => product.id === action.payload);
      if (productIndex !== -1) {
        state.products.splice(productIndex, 1);
      }
    },
    clearCart: (state) => {
      state.products = [];
    },
    updateProductAmount: (state, action: PayloadAction<{ productId: number; newAmount: number }>) => {
      const { productId, newAmount } = action.payload;
      const productToUpdate = state.products.find(product => product.id === productId);
      
      if (productToUpdate) {
        const priceDifference = (newAmount - productToUpdate.amount) * productToUpdate.price;
        productToUpdate.amount = newAmount;
        productToUpdate.totalPrice += priceDifference;
      }
    },
    updateProductSize: (state, action: PayloadAction<{ productId: number; newSize: string }>) => {
      const { productId, newSize } = action.payload;
      const productToUpdate = state.products.find(product => product.id === productId);

      if (productToUpdate) {
        productToUpdate.selectedSize = newSize;
      }
    },
  },
});
  
  export const { addProductToCart, removeProductFromCart, clearCart, updateProductAmount, updateProductSize } = cartSlice.actions;
  
  export default cartSlice.reducer;