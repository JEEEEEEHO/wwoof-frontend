import { useReducer } from "react";
import WishContext from "./wish-context";

const defaultWishState = {
    items : []
}

const wishReducer = (state, action)=>{

}

const WishProvider = (props) => {
    const[wishState, dispatchWishAction] = useReducer(
        wishReducer, 
        defaultWishState
    );
    const addItemToWishHandler = (item) => {
        dispatchWishAction({ type: 'ADD', item: item });
      };
    
      const removeItemFromWishHandler = (id) => {
        dispatchWishAction({ type: 'REMOVE', id: id });
      };
    
      const clearWishHandler = () => {
        dispatchWishAction({type: 'CLEAR'});
      };
    
      const cartContext = {
        items: wishState.items,
        addItem: addItemToWishHandler,
        removeItem: removeItemFromWishHandler,
        clearCart: clearWishHandler
      };

      return(
        <WishContext.Provider>
            {props.children}
        </WishContext.Provider>
      )

}

export default WishProvider;
