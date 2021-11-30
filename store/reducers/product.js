import PRODUCTS from "../../dummy-data/Product";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT
} from "../actions/product";

const initialProducts = {
  availableProducts: "",
  userProducts: PRODUCTS.filter((pro) => pro.ownerId === "u1"),
};

export default (state = initialProducts, action) => {
  switch (action.type) {
    case SET_PRODUCT: {
      return {
        availableProducts: action.products,
        userProducts: action.products.filter((pro) => pro.ownerId === action.userId),
      }; 
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
    }
    case CREATE_PRODUCT: {
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.img,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    }
    case UPDATE_PRODUCT: {
      const productIndex = state.userProducts.findIndex(
        pro => pro.id === action.productId
      );
      const updateProduct = new Product(
        action.productId,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.img,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updateUserProduct = [...state.userProducts];
      
      updateUserProduct[productIndex] = updateProduct;
      
      const updateAvaiable = [...state.availableProducts];
      const indexUpdateAvaiable = state.availableProducts.findIndex(pro => pro.id === action.productId);
      updateAvaiable[indexUpdateAvaiable] = updateProduct;

      return {...state, userProducts: updateUserProduct, availableProducts: updateAvaiable}
    }
  }
  return state;
};
