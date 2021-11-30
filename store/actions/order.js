import Order from '../../models/order';

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const fetchOrders = () => {
  return async (dispatchEvent, getState) => {
    const userId = getState().auth.userId
    try {
      const response = await fetch(
        `https://demolearningrn-default-rtdb.firebaseio.com/orders/${userId}.json`
      );
      
      const resData = await response.json();
      
      const orderDatas = [];
      for (const key in resData) {
        orderDatas.push(
          new Order(key, resData[key].cartItems,
          resData[key].totalAmount,
          new Date().toISOString()));
      }
      dispatchEvent({ type: SET_ORDER, orderDatas: orderDatas });
    }
    catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatchEvent, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    console.log(userId);
    const response = await fetch(
      `https://demolearningrn-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application.json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: new Date().toISOString(),
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Have some thing wrong!");
    }

    const resData = await response.json();
    // console.log(resData);
    dispatchEvent({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: new Date().toISOString(),
      },
    });
  };
};
