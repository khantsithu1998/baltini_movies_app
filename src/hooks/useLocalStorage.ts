import { useEffect, useState } from "react";
import { Movie } from "../types";

function useLocalStorage(initialValue : Movie[], DB_NAME : string) {
  const [items, setItems] = useState<Movie[]>([]);

  useEffect(() => {
    const localStorageItem = window.localStorage.getItem(DB_NAME);
    let parsedItem;
    // new user?
    if (!localStorageItem) {
      window.localStorage.setItem(DB_NAME, JSON.stringify(initialValue));
      parsedItem = [];
    } else {
      parsedItem = JSON.parse(localStorageItem);
    }

    setItems(parsedItem);
  }, []);

  function save(newItem: Movie[]) {
    window.localStorage.setItem(DB_NAME, JSON.stringify(newItem));
    setItems(newItem);
  }

  function remove(movieID: string) {
    const newItems = [...items];
    const searchIndex = newItems.findIndex((el) => el.imdbID === movieID);

    if (searchIndex === -1) return;

    newItems.splice(searchIndex, 1);
    save(newItems);
  }

  return { items, save, remove };
}

export { useLocalStorage };
