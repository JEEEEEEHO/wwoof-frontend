import React from 'react';

const WishContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearWish: () => {}
});

export default WishContext;