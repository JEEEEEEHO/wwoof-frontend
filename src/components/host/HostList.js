import { Link } from "react-router-dom";
import { json } from "react";
import emptyWishList from "../../img/emptyWishList.png";
import fullWishList from "../../img/fullWishList.png";
import { useContext} from "react";
import WishContext from "../../store/wish-context";

const HostList = (props) => {
  const wishCtx = useContext(WishContext);


  const wishItemRemoveHandler = async (id) => {
    wishCtx.removeHost(id);

    let headers = new Headers();

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
      headers.append("Authorization", "Bearer " + accessToken);
    }
    // action.hnum 를 찾아서 삭제해주는 fetch DELETE
    const response = await fetch("http://localhost:8080/api/wishList/delete", {
      method: "DELETE",
      headers: headers,
      body: id,
    });

    if (response.state === 422) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: "Could not save board." }, { status: 500 });
    }
  };

  const wishItemAddHandler = async (id) => {
    wishCtx.addHost(id);

    let headers = new Headers();

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
      headers.append("Authorization", "Bearer " + accessToken);
    }

    // action.hnum fetch INSERT
    const response = await fetch("http://localhost:8080/api/wishList/save", {
      method: "POST",
      headers: headers,
      body: id,
    });

    if (response.state === 422) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: "Could not save board." }, { status: 500 });
    }
  };

  for (const { hnum } of props.hosts) {
    if (hnum < 0) {
      return <p>검색결과없음</p>;
    } else {
      return (
        <>
          <ul>
            {props.hosts.map((host) => (
              <li key={host.hnum}>
                <img
                  src={host.hostMainImg.fileUri}
                  alt={host.hostMainImg.filename}
                  style={{ width: "200px", height: "150px" }}
                />
                <button
                  type="button"
                  aria-label="위시리스트에 저장"
                  onClick={
                    wishCtx.chosenWish.get(host.hnum)
                      ? () => wishItemRemoveHandler(host.hnum)
                      : () => wishItemAddHandler(host.hnum)
                  }
                >
                  {wishCtx.chosenWish.get(host.hnum) ? (
                    <img
                      src={fullWishList}
                      alt="wishlist"
                      style={{ width: "10px", height: "10px" }}
                    />
                  ) : (
                    <img
                      src={emptyWishList}
                      alt="wishlist"
                      style={{ width: "10px", height: "10px" }}
                    />
                  )}
                </button>
                <Link to={host.hnum.toString()}>{host.shortintro}</Link>
              </li>
            ))}
          </ul>
        </>
      );
    }
    break;
  }
};

export default HostList;
