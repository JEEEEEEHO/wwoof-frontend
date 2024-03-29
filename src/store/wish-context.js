import React from 'react';

const WishContext = React.createContext({
  hosts: [], // 호스트 번호가 담긴 배열 
  addHost: (hnum) => {},
  removeHost: (hnum) => {},
});

export default WishContext;