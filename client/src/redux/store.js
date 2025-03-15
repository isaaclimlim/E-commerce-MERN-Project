import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import authReducer from './features/auth/authSlice'; 
import authApi from './features/auth/authApi';
import productsApi from './features/product/productApi';
import reviewApi from './features/reviews/reviewsApi';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, 
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewApi.reducerPath] : reviewApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, reviewApi.middleware),
});

export default store;
