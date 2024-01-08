import React from 'react';

const WishContext = React.createContext({
  hosts: [], // 호스트 번호가 담긴 배열 
  //totalAmount: 0,
  addHost: (hnum) => {},
  removeHost: (hnum) => {},
  clearWish: () => {}
});

export default WishContext;