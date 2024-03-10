import { useContext, useState, json } from "react";
import WishContext from "../../store/wish-context";
import WishListInclude from "./WishList";

const WishListPage = async () => {
  const wishCtx = useContext(WishContext);
  
  if (!wishCtx.hosts.length) {
    return <p>No Data In WishList</p>;

  } else {
    // 위시리스트에 값이 있다면 연결
    // 서버 단에서 로그인 한 

    let headers = new Headers();

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
      headers.append("Authorization", "Bearer " + accessToken);
    }
    const response = await fetch("http://localhost:8080/api/wishList/list", {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw json({ message: "Could not save wishList." }, { status: 500 });
    }
    <WishListInclude wishList={response} />
  }
};

export default WishListPage;
