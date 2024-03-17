import { useReducer, json } from "react";
import WishContext from "./wish-context";
import { redirect } from "react-router-dom";

const defaultWishState = {
  hosts: [],
};

// 2번
const wishReducer = async (state, action) => {
  // 아래의 것들은 값을 계산하기 위함 (같은 것을 집어넣어도 값은 증가)

  let headers = new Headers();

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  if (action.type === "ADD") {
    let updatedHosts;
    updatedHosts = [...state.hosts]; // 기존에 담은 배열을 넣어줌
    updatedHosts = state.hosts.concat(action.hnum); // concat으로 불변성 지키면서 값(호스트번호) 추가

    // action.hnum fetch INSERT
    const response = await fetch("http://localhost:8080/api/wishList/save", {
      method: "POST",
      headers: headers,
      body: action.hnum,
    });

    if (response.state === 422) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: "Could not save board." }, { status: 500 });
    }

    return {
      hosts: updatedHosts,
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

    // action.hnum 를 찾아서 삭제해주는 fetch DELETE
    const response = await fetch("http://localhost:8080/api/wishList/delete", {
      method: "DELETE",
      headers: headers,
      body: action.hnum,
    });

    if (response.state === 422) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: "Could not save board." }, { status: 500 });
    }

    return {
      hosts: updatedHosts,
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
