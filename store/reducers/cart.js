import { ADD_TO_CART } from "../actions/cart";
import { REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";

import ProductCard from "../../models/product_cart";
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const productAdd = action.product;
      const productPrice = action.product.price;
      const productTitle = action.product.title;
      if (state.items[productAdd.id]) {
        const updatedProductAdd = new ProductCard(
          state.items[productAdd.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[productAdd.id].sum + productPrice
        );

        state = {
          ...state,
          items: { ...state.items, [productAdd.id]: updatedProductAdd },
          totalAmount: state.totalAmount + productPrice,
        };
        console.log(state);
        return state;
      } else {
        const newProductAdd = new ProductCard(
          1,
          productPrice,
          productTitle,
          productPrice
        );
        state = {
          ...state,
          items: { ...state.items, [productAdd.id]: newProductAdd },
          totalAmount: state.totalAmount + productPrice,
        };
        console.log(state);
        return state;
      }
    }
    case REMOVE_FROM_CART: {
      const productRemove = state.items[action.productId];
      const productRemoveQtt = productRemove.quantity;
      let productUpdates;
      if (productRemoveQtt > 1) {
        const productUpdate = new ProductCard(
          productRemoveQtt - 1,
          productRemove.productPrice,
          productRemove.productTitle,
          productRemove.sum - productRemove.productPrice
        );
        productUpdates = { ...state.items, [action.productId]: productUpdate };
      } else {
        productUpdates = { ...state.items };
        delete productUpdates[action.productId];
      }
      return {
        ...state,
        items: productUpdates,
        totalAmount: state.totalAmount - productRemove.productPrice,
      };
    }
    case ADD_ORDER: {
      return {
        ...state,
        items: {},
        totalAmount: 0,
      };
    }
    // case DELETE_PRODUCT: {
    //   const updatedItems = { ...state, items: state.items };
    //   const valueItem = updatedItems[action.pid].sum;
    //   if (updatedItems[action.pid]) {
    //     delete updatedItems[action.pid];
    //   } else {
    //     return;
    //   }
    //   return {
    //     ...state,
    //     items: updatedItems,
    //     totalAmount: state.totalAmount - valueItem,
    //   };
    // }
  }
  return state;
};
