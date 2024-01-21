import { useReducer } from "react";
import WishContext from "./wish-context";

const defaultWishState = {
  hosts: [],
};
// 3번
const wishReducer = (state, action) => {
  // 아래의 것들은 값을 계산하기 위함 (같은 것을 집어넣어도 값은 증가)

  if (action.type === "ADD") {
    let updatedHosts;

    updatedHosts = state.hosts.concat(action.item); // concat으로 불변성 지키면서 값(호스트번호) 추가

    return {
      hosts: updatedHosts,
    };
  }

  if (action.type === "REMOVE") {
    const existingHostIndex = state.hosts.findIndex(
      (host) => host === action.hnum
    );
    let updatedHosts;
    if(existingHostIndex){
      // 존재하는 번호가 있다면
      updatedHosts = state.hosts.filter((host) => host !== action.hnum);
      // 넘어온 값 (삭제값) 이 아닌 것들만 남겨놓음
    }
    
    return {
      hosts: updatedHosts,
    };
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

  // 1번 -> context 생성 파일로 넘어감
  const cartContext = {
    hosts: wishState.hosts,
    addHost: addItemToWishHandler,
    removeHost: removeItemFromWishHandler,
  };

  return (
    <WishContext.Provider value={cartContext}>
      {/* 4번 */}
      {props.children}
    </WishContext.Provider>
  );
};

export default WishProvider;
