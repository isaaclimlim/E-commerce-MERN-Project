import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Check if the product already exists in the cart based on id
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (!existingProduct) {
        // Add product to the cart with quantity = 1
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        // Log if the product already exists
        console.log('Item is already added');
      }

      // Update derived state values
      state.selectedItems = calculateSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);
      state.tax = calculateTax(state);
      state.grandTotal = calculateGrandTotal(state);
    },
    updateQuantity: (state, action) => {
      // Ensure we are iterating over the correct products array
      const updatedProducts = state.products.map((product) => {
        if (product.id === action.payload.id) {
          if (action.payload.type === 'increment') {
            product.quantity += 1;
          } else if (action.payload.type === 'decrement' && product.quantity > 1) {
            product.quantity -= 1;
          }
        }
        return product; // Always return the product
      });

      state.products = updatedProducts; // Update the products array
      state.selectedItems = calculateSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);
      state.tax = calculateTax(state);
      state.grandTotal = calculateGrandTotal(state);
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter((product)=> product.id !== action.payload.id);
      state.selectedItems = calculateSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);
      state.tax = calculateTax(state);
      state.grandTotal = calculateGrandTotal(state);
    },
    clearCart: (state) => {
      state.products = []; 
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0; 
    }
    
  },
});

// Utility functions
export const calculateSelectedItems = (state) =>
  state.products.reduce((total, product) => total + product.quantity, 0);

export const calculateTotalPrice = (state) =>
  state.products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

export const calculateTax = (state) => calculateTotalPrice(state) * state.taxRate;

export const calculateGrandTotal = (state) =>
  calculateTotalPrice(state) + calculateTax(state);

// Export actions and reducer
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
