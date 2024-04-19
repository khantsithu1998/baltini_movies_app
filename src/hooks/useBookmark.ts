import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { DB_NAMES } from "../utils/constants";
import { Movie } from "../types";

function useBookmark() {
  const myBookmarks = useLocalStorage([], DB_NAMES.BOOKMAKRS);
  const [searchBookmark, setSearchBookmark] = useState("");
  const [showBM, setShowBM] = useState<Movie[]>([]);
  const firstRender = useRef<boolean | null>(null);

  function bookmarkItem(item: Movie) {
    const mapItem = {
      ...item,
      saved: true,
    };
    const alreadySaved = myBookmarks.items.some(
      (item) => item.imdbID === mapItem.imdbID
    );
    if (alreadySaved) return;
    const newItems = [...myBookmarks.items, mapItem];
    myBookmarks.save(newItems);
  }

  function isBookmarked(arr: Movie[] | undefined) {
    if (!Array.isArray(arr)) return [];
    const checkSaved = arr.map((item) => {
      const bookmarked = myBookmarks.items.some(
        (el) => el.imdbID === item.imdbID
      );
      return {
        ...item,
        saved: bookmarked,
      };
    });
    return checkSaved;
  }

  function handleSearch(event: any) {
    event.preventDefault();
    const val = event.target.value.toLowerCase().trimStart();
    setSearchBookmark(val);
  }

  useEffect(() => {
    if (firstRender.current === null && myBookmarks.items.length > 0) {
      firstRender.current = true;
      const arr = [...myBookmarks.items];
      if (searchBookmark.length <= 3) {
        setShowBM(arr);
        return;
      }
      const filter = arr.filter((item) =>
        item?.Title.toLowerCase().includes(searchBookmark)
      );

      setShowBM(filter);
    } else if (firstRender.current) {
      firstRender.current = null;
    }
  }, [myBookmarks, searchBookmark]);

  const states = {
    myBookmarks: myBookmarks.items,
    searchBookmark,
    filteredBookmarks: showBM,
  };

  const functions = {
    bookmarkItem,
    removeBookmark: myBookmarks.remove,
    isBookmarked,
    handleSearch,
  };

  return { ...states, ...functions };
}

export { useBookmark };
