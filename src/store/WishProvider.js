import { useReducer } from "react";
import WishContext from "./wish-context";

const defaultWishState = {
  hosts: [],
  //totalAmount: 0
};
// 3번
const wishReducer = (state, action) => {
  // 아래의 것들은 값을 계산하기 위함 (같은 것을 집어넣어도 값은 증가)
  const existingWishHostIndex = state.hosts.findIndex(
    // 기존에 존재하는 hosts들
    (hnum) => hnum === action.host.hnum // true를 반환할 때까지 계속, 인덱스 반환
  );

  
  if (action.type === "ADD") {
    // const updatedTotalAmount =
    //   state.totalAmount + action.item.price * action.item.amount;

    const existingWishHost = state.hosts[existingWishHostIndex]; // 기존에 존재하는 인덱스
    let updatedItems;

    if (existingWishHost) {
      const updatedItem = {
        ...existingWishHost,
        amount: existingWishHost.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingWishHostIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      //totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultWishState;
  }

  return defaultWishState;
};

const WishProvider = (props) => {
  const [wishState, dispatchWishAction] = useReducer(
    wishReducer,
    defaultWishState
  );
  // 2번
  const addItemToWishHandler = (hnum) => {
    dispatchWishAction({ type: "ADD", hnum: hnum });
  };

  const removeItemFromWishHandler = (hnum) => {
    dispatchWishAction({ type: "REMOVE", hnum: hnum });
  };

  const clearWishHandler = () => {
    dispatchWishAction({ type: "CLEAR" });
  };

  // 1번 -> context 생성 파일로 넘어감
  const cartContext = {
    hosts: wishState.hosts,
    //totalAmount: wishState.totalAmount,
    addHost: addItemToWishHandler,
    removeHost: removeItemFromWishHandler,
    clearCart: clearWishHandler,
  };

  return (
    <WishContext.Provider value={cartContext}>
      {/* 4번 */}
      {props.children}
    </WishContext.Provider>
  );
};

export default WishProvider;
