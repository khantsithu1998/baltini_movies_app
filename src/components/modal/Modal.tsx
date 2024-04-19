import React, { useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { ModalContext } from "../../context/ModalContext";
import { createPortal } from "react-dom";
import { ModalContent } from "./ModalContent";
import { AnimeMedia, MovieDetails } from "../../types";
import { AnimeModalContent } from "./AnimeModalContent";

function Modal() {
  const { closeModal, modalStatus, loading, error, isSuccess, details, animeDetails } = useContext<{
    closeModal: any;
    modalStatus: any;
    loading: boolean;
    isSuccess : boolean;
    error: boolean;
    details: MovieDetails;
    animeDetails : AnimeMedia;
  }>(ModalContext);
  const modalContainer = document.getElementById(
    "modalContainer"
  ) as HTMLElement;

  function close(event: any) {
    event.stopPropagation();
    closeModal();
  }

  return (
    <AnimatePresence>
      {modalStatus.open && modalStatus.isAnime === false ? (
        <>
          {createPortal(
            <ModalContent
              onClose={close}
              loading={loading}
              error={error}
              details={details}
            />,
            modalContainer
          )}
        </>
      ) : null}

      {modalStatus.open && modalStatus.isAnime ? (
        <>
          {createPortal(
            <AnimeModalContent
              onClose={close}
              loading={loading}
              error={error}
              isSuccess={isSuccess}
              details={animeDetails}
            />,
            modalContainer
          )}
        </>
      ) : null}
    </AnimatePresence>
  );
}

export { Modal };
