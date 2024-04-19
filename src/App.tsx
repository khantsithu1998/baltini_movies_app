import React from "react";
// Context
import { ModalProvider } from "./context/ModalContext";
// components
import { Header } from "./components/shared/Header";
import { HomePage } from "./pages/HomePage";
import { AnimesPage } from "./pages/AnimesPage";
import { MyListPage } from "./pages/MyListPage";
import { Routes, Route } from "react-router-dom";
import { Modal } from "./components/modal/Modal";
import { useBookmark } from "./hooks/useBookmark";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const {
    myBookmarks,
    searchBookmark,
    filteredBookmarks,
    removeBookmark,
    bookmarkItem,
    isBookmarked,
    handleSearch,
  } = useBookmark();
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Header />
        <Modal />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                removeBookmark={removeBookmark}
                bookmarkItem={bookmarkItem}
                isBookmarked={isBookmarked}
              />
            }
          />

          <Route
            path="/animes"
            element={
              <AnimesPage
                removeBookmark={removeBookmark}
                bookmarkItem={bookmarkItem}
                isBookmarked={isBookmarked}
              />
            }
          />
          
          <Route
            path="/mylist"
            element={
              <MyListPage
                myBookmarks={myBookmarks}
                searchBookmark={searchBookmark}
                filteredBookmarks={filteredBookmarks}
                removeBookmark={removeBookmark}
                bookmarkItem={bookmarkItem}
                //isBookmarked={isBookmarked}
                handleSearch={handleSearch}
              />
            }
          />
        </Routes>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
