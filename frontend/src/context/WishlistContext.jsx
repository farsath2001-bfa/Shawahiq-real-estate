import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'shawahiq_wishlist';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setWishlist(JSON.parse(stored));
    } catch {
      setWishlist([]);
    }
  }, []);

  const persist = (next) => {
    setWishlist(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const isSaved = (id) => wishlist.includes(id);

  const toggle = (id) => {
    const next = isSaved(id) ? wishlist.filter((x) => x !== id) : [...wishlist, id];
    persist(next);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isSaved, toggle, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);