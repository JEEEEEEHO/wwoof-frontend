import React from 'react';

const WishContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearWish: () => {}
});

export default WishContext;