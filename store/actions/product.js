export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

import Product from "../../models/product";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://demolearningrn-default-rtdb.firebaseio.com/products.json"
      );
      if (!response.ok) {
        throw new Error("Some thing not good!");
      }
      const resData = await response.json();
      // console.log(resData);
      const loadedProduct = [];
      for (const key in resData) {
        loadedProduct.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].img,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({ type: SET_PRODUCT, products: loadedProduct, userId: userId });
    } catch (error) {
      throw error;
    }
  };
};
export const deleteProduct = (pid) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://demolearningrn-default-rtdb.firebaseio.com/products/${pid}.json?auth=${token}`
    ,
    {
      method: 'DELETE',
    })
    dispatch({type: DELETE_PRODUCT,pid : pid})
  }
};

export const createProduct = (title, img, price, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://demolearningrn-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          ownerId: userId,
          img,
          price,
          description,
        }),
      }
    );


    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        ownerId: userId,
        title,
        img,
        price,
        description,
      },
    });
  };
};
export const updateProduct = (id, title, img, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://demolearningrn-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, 
      {
        method: 'PATCH',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({
          title,
          img, 
          description
        })
      }
    );
    const resData = await response.json();
    dispatch({
      type: UPDATE_PRODUCT,
      productId: id,
      productData: {
        title: title,
        img: img,
        description: description,
      },
    });
  };
};
