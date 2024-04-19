import { createContext, useEffect, useState } from "react";
import { useFetchDetails } from "../hooks/useFetchDetails";

const ModalContext = createContext<any>(null);

function ModalProvider({ children }: any) {
  const [movieID, setMovieID] = useState("");
  const DETAILS = useFetchDetails(movieID);
  const [modalStatus, SetModalStatus] = useState<{
    open: boolean;
    movieID: string | null;
  }>({
    open: false,
    movieID: null,
  });

  function openModal(movieID: string) {
    SetModalStatus({ open: true, movieID });
  }

  useEffect(() => {
    if (modalStatus.movieID === null) return;

    setMovieID(modalStatus.movieID);
  }, [modalStatus]);

  useEffect(() => {
    if (movieID === null) return;

    DETAILS.callAPI();
  }, [movieID]);

  function closeModal() {
    SetModalStatus({ open: false, movieID: null });
    // DETAILS.handleCancelRequest()
  }

  const modalHandlers = {
    openModal,
    closeModal,
    modalStatus,
    loading: DETAILS.loading,
    error: DETAILS.error,
    details: DETAILS.items,
  };

  return (
    <ModalContext.Provider value={modalHandlers}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
