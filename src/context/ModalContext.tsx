import { createContext, useEffect, useState } from "react";
import { useFetchDetails } from "../hooks/useFetchDetails";
import { useFetchAnimeDetails } from "../hooks/useFetchAnimeDetails";

const ModalContext = createContext<any>(null);

function ModalProvider({ children }: any) {
  const [movieID, setMovieID] = useState("");
  const [animeMovieID, setAnimeMovieID] = useState("");

  const DETAILS = useFetchDetails(movieID);
  const ANIME_DETAILS = useFetchAnimeDetails(animeMovieID);
  const [modalStatus, SetModalStatus] = useState<{
    open: boolean;
    movieID: string | null;
    isAnime: boolean;
  }>({
    open: false,
    movieID: null,
    isAnime: false,
  });

  function openModal(movieID: string, isAnime: boolean) {
    SetModalStatus({ open: true, movieID, isAnime });
  }

  useEffect(() => {
    if (modalStatus.movieID === null) return;

    if (modalStatus.isAnime) {
      setAnimeMovieID(modalStatus.movieID);
    } else {
      setMovieID(modalStatus.movieID);
    }
  }, [modalStatus]);

  useEffect(() => {
    if (!movieID || modalStatus.isAnime) return;

    DETAILS.callAPI();
  }, [movieID]);

  useEffect(() => {
    if (!animeMovieID) return;

    if (modalStatus.isAnime) {
      ANIME_DETAILS.callAPI();
    }
  }, [animeMovieID]);

  function closeModal() {
    SetModalStatus({ open: false, movieID: null, isAnime: false });
    // DETAILS.handleCancelRequest()
  }

  const modalHandlers = {
    openModal,
    closeModal,
    modalStatus,
    loading: DETAILS.loading,
    error: DETAILS.error,
    details: DETAILS.items,
    animeDetails: ANIME_DETAILS.items,
    isSuccess : ANIME_DETAILS.isSuccess
  };

  return (
    <ModalContext.Provider value={modalHandlers}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
