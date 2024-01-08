import { Link } from "react-router-dom";
import emptyWishList from "../../img/emptyWishList.png";
import fullWishList from "../../img/fullWishList.png"
import { useContext, useState } from "react";
import WishContext from "../store/wish-context";

const HostList = (props) => {
  const wishCtx = useContext(WishContext);

  const [chosenWish, setChosenWish] = useState(false);

  const wishItemRemoveHandler = (id) => {
    setChosenWish(false);
    wishCtx.removeItem(id);
  };

  const wishItemAddHandler = (id) => {
    wishCtx.addItem(id);
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
                    chosenWish ? ()=> wishItemAddHandler(host.hnum) : ()=>wishItemRemoveHandler(host.hnum)
                  }
                >
                  {chosenWish ? (
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
