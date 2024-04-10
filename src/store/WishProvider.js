import { useReducer, json } from "react";
import WishContext from "./wish-context";
import { redirect } from "react-router-dom";

const defaultWishState = {
  hosts: [],
  chosenWish : false
};

// 2번
const wishReducer =  (state, action) => {
  // 아래의 것들은 값을 계산하기 위함 (같은 것을 집어넣어도 값은 증가)

  if (action.type === "ADD") {
    let updatedHosts;
    updatedHosts = [...state.hosts]; // 기존에 담은 배열을 넣어줌
    updatedHosts = state.hosts.concat(action.hnum); // concat으로 불변성 지키면서 값(호스트번호) 추가


    return {
      hosts: updatedHosts
    };
  }

  if (action.type === "REMOVE") {
    const existingHostIndex = state.hosts.findIndex(
      (host) => host === action.hnum
    );

    let updatedHosts;
    if (existingHostIndex == 0) {
      // 존재하는 번호가 있다면
      updatedHosts = state.hosts.filter((host) => host !== action.hnum);
      // 넘어온 값 (삭제값) 이 아닌 것들만 남겨놓음
    }

    return {
      hosts: updatedHosts
    };
  }

  return defaultWishState;
};

// 1번
const WishProvider = (props) => {
  const [wishState, dispatchWishAction] = useReducer(
    wishReducer,
    defaultWishState
  );

  const addItemToWishHandler = (hnum) => {
    dispatchWishAction({ type: "ADD", hnum: hnum });
  };

  const removeItemFromWishHandler = (hnum) => {
    dispatchWishAction({ type: "REMOVE", hnum: hnum });
  };

  // 3번
  const wishContext = {
    hosts: wishState.hosts,
    chosenWish : wishState.chosenWish,
    addHost: addItemToWishHandler,
    removeHost: removeItemFromWishHandler,
  };

  return (
    <WishContext.Provider value={wishContext}>
      {/* 4번 */}
      {props.children}
    </WishContext.Provider>
  );
};

export default WishProvider;
